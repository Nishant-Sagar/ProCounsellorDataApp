import os
import json
import time
import re
import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Optional, Any, Set
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor
import sys
import django
from pathlib import Path
import backoff
from openai import OpenAI
import hashlib
from fuzzywuzzy import fuzz, process


BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))

# Step 2: Add base directory to system path so Python can find `procounsel`
sys.path.append(BASE_DIR)

# Step 3: Set Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")

# Step 4: Setup Django
django.setup()

# Step 5: Now import Firebase config or any other Django-related files
from firebase_config import db

# Initialize the client once globally
YOUR_API_KEY = "ablx-ud6JSPH3GuYrHV9nd8j3s2uftpWdch3Yml4DFDZTJNVI5Nsy"

client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('college_data_fetch.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Django setup
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()

from firebase_config import db

@dataclass
class CollegeConfig:
    """Configuration for college data fetching"""
    api_key: str
    base_url: str = "https://api.perplexity.ai"
    max_retries: int = 3
    rate_limit_delay: float = 1.0
    chunk_size: int = 5
    output_dir: str = "college_data"
    cache_enabled: bool = True
    fuzzy_match_threshold: int = 80

class FirestoreDataManager:
    """Manages Firestore data operations and mappings"""
    
    def __init__(self, db_instance):
        self.db = db_instance
        self.courses_cache = {}
        self.exams_cache = {}
        self.course_keywords = {}
        self.exam_keywords = {}
    
    def find_strict_course_matches(self, college_streams: List[str], college_branches: List[str]) -> List[str]:
        """Find course IDs with strict stream + branch matches"""
        matched_course_ids = set()

        for course_id, course_data in self.courses_cache.items():
            stream_name = course_data.get('streamName', '').lower().strip()
            course_name = course_data.get('courseName', '').lower().strip()
            branches = course_data.get('branches', [])

            # Match exact stream
            if not any(stream_name == s.lower().strip() for s in college_streams):
                continue

            for branch in college_branches:
                branch_lower = branch.lower().strip()

                # Match course name
                if branch_lower in course_name:
                    matched_course_ids.add(course_id)
                    break

                # Match any branch inside this course
                for br in branches:
                    if isinstance(br, dict):
                        branch_name = br.get("branchName", "").lower()
                        if branch_lower in branch_name:
                            matched_course_ids.add(course_id)
                            break

        return list(matched_course_ids)

    def load_courses_data(self) -> Dict[str, Dict]:
        """Load all courses from Firestore"""
        try:
            courses_ref = self.db.collection('courses')
            courses_docs = courses_ref.stream()
            
            for doc in courses_docs:
                course_data = doc.to_dict()
                course_id = doc.id
                self.courses_cache[course_id] = course_data
                
                # Build keyword mapping for fuzzy matching
                course_name = course_data.get('courseName', '').lower()
                stream_name = course_data.get('streamName', '').lower()
                branches = course_data.get('branches', [])
                
                keywords = [course_name, stream_name]
                for branch in branches:
                    if isinstance(branch, dict):
                        keywords.extend([
                            branch.get('branchName', '').lower(),
                            branch.get('branchId', '').lower().replace('_', ' ')
                        ])
                
                self.course_keywords[course_id] = [kw for kw in keywords if kw]
                
            logger.info(f"Loaded {len(self.courses_cache)} courses from Firestore")
            return self.courses_cache
            
        except Exception as e:
            logger.error(f"Error loading courses data: {e}")
            return {}
    
    def load_exams_data(self) -> Dict[str, Dict]:
        """Load all exams from Firestore"""
        try:
            exams_ref = self.db.collection('exams')
            exams_docs = exams_ref.stream()
            
            for doc in exams_docs:
                exam_data = doc.to_dict()
                exam_id = doc.id
                self.exams_cache[exam_id] = exam_data
                
                # Build keyword mapping for fuzzy matching
                exam_name = exam_data.get('examName', '').lower()
                full_name = exam_data.get('examFullName', '').lower()
                exam_type = exam_data.get('examType', '').lower()
                
                keywords = [exam_name, full_name, exam_type]
                self.exam_keywords[exam_id] = [kw for kw in keywords if kw]
                
            logger.info(f"Loaded {len(self.exams_cache)} exams from Firestore")
            return self.exams_cache
            
        except Exception as e:
            logger.error(f"Error loading exams data: {e}")
            return {}
    
    def find_matching_courses(self, college_streams: List[str], college_branches: List[str]) -> List[str]:
        """Find matching course IDs based on college streams and branches"""
        matching_course_ids = []
        
        all_search_terms = college_streams + college_branches
        
        for course_id, keywords in self.course_keywords.items():
            for search_term in all_search_terms:
                if not search_term:
                    continue
                    
                search_term_clean = search_term.lower().strip()
                
                # Direct match
                if any(search_term_clean in keyword for keyword in keywords):
                    matching_course_ids.append(course_id)
                    break
                
                # Fuzzy matching
                for keyword in keywords:
                    if fuzz.ratio(search_term_clean, keyword) >= 80:
                        matching_course_ids.append(course_id)
                        break
                else:
                    continue
                break
        
        return list(set(matching_course_ids))
    
    def find_matching_exams(self, college_info: str, course_ids: List[str]) -> List[str]:
        """Find matching exam IDs based on college info and courses"""
        matching_exam_ids = []
        
        # Extract exam mentions from college info
        exam_mentions = self.extract_exam_mentions(college_info)
        
        # Get exams associated with matched courses
        course_related_exams = self.get_course_related_exams(course_ids)
        
        # Combine and deduplicate
        all_potential_exams = list(set(exam_mentions + course_related_exams))
        
        return all_potential_exams
    
    def extract_exam_mentions(self, text: str) -> List[str]:
        """Extract exam mentions from text using fuzzy matching"""
        if not text:
            return []
            
        text_lower = text.lower()
        matching_exams = []
        
        for exam_id, keywords in self.exam_keywords.items():
            for keyword in keywords:
                if len(keyword) > 2:  # Avoid very short keywords
                    if keyword in text_lower:
                        matching_exams.append(exam_id)
                        break
                    
                    # Fuzzy matching for exam names
                    if fuzz.partial_ratio(keyword, text_lower) >= 85:
                        matching_exams.append(exam_id)
                        break
        
        return matching_exams
    
    def get_course_related_exams(self, course_ids: List[str]) -> List[str]:
        """Get exams typically associated with given courses"""
        related_exams = []
        
        for course_id in course_ids:
            course_data = self.courses_cache.get(course_id, {})
            stream_name = course_data.get('streamName', '').lower()
            
            # Map common stream-exam relationships
            if 'engineering' in stream_name:
                related_exams.extend(['JEE_MAIN', 'JEE_ADVANCED', 'BITSAT', 'VITEEE'])
            elif 'mba' in stream_name or 'management' in stream_name:
                related_exams.extend(['CAT', 'XAT', 'GMAT', 'CMAT', 'MAT'])
            elif 'medical' in stream_name or 'mbbs' in stream_name:
                related_exams.extend(['NEET_UG', 'NEET_PG', 'AIIMS'])
            elif 'law' in stream_name:
                related_exams.extend(['CLAT', 'AILET', 'LSAT'])
        
        # Filter to only include exams that exist in our database
        return [exam for exam in related_exams if exam in self.exams_cache]

class CollegeDataFetcher:
    """Enhanced college data fetcher with Firestore integration"""
    
    def __init__(self, config: CollegeConfig):
        self.config = config
        self.client = OpenAI(api_key=config.api_key, base_url=config.base_url)
        self.cache_dir = Path(config.output_dir) / "cache"
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        
        # Initialize Firestore manager
        self.fs_manager = FirestoreDataManager(db)
        
        # Load existing data
        self.fs_manager.load_courses_data()
        self.fs_manager.load_exams_data()

    def get_cache_key(self, college_name: str, stream: str = None) -> str:
        """Generate cache key for college data"""
        key = f"{college_name}_{stream}" if stream else college_name
        return hashlib.md5(key.encode()).hexdigest()

    def load_from_cache(self, cache_key: str) -> Optional[Dict]:
        """Load data from cache if available and valid"""
        if not self.config.cache_enabled:
            return None
            
        cache_file = self.cache_dir / f"{cache_key}.json"
        if cache_file.exists():
            try:
                with open(cache_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    cache_time = datetime.fromisoformat(data.get('cached_at', '2000-01-01'))
                    if (datetime.now() - cache_time).total_seconds() < 86400:  # 24 hours
                        logger.info(f"Loaded from cache: {cache_key}")
                        return data.get('data')
            except Exception as e:
                logger.warning(f"Cache load error for {cache_key}: {e}")
        return None

    def save_to_cache(self, cache_key: str, data: Dict):
        """Save data to cache"""
        if not self.config.cache_enabled:
            return
            
        cache_file = self.cache_dir / f"{cache_key}.json"
        try:
            cache_data = {
                'data': data,
                'cached_at': datetime.now().isoformat()
            }
            with open(cache_file, 'w', encoding='utf-8') as f:
                json.dump(cache_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Cache save error for {cache_key}: {e}")

    @backoff.on_exception(backoff.expo, Exception, max_tries=3)
    def call_openai_with_retry(self, prompt: str) -> str:
        """Call OpenAI API with retry logic"""
        try:
            response = self.client.chat.completions.create(
                model="sonar-pro",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_tokens=4000
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API call failed: {e}")
            raise

    def get_college_analysis_prompt(self, college_name: str) -> str:
        """Generate prompt for college analysis and course/exam extraction"""
        available_courses = list(self.fs_manager.courses_cache.keys())
        available_exams = list(self.fs_manager.exams_cache.keys())
        
        return f"""
You are an expert analyst for Indian higher education institutions.

🎯 **TASK**: Analyze "{college_name}" and provide structured information.

📋 **AVAILABLE COURSES IN DATABASE**: {', '.join(available_courses[:20])}...
📋 **AVAILABLE EXAMS IN DATABASE**: {', '.join(available_exams[:15])}...

🔍 **ANALYSIS REQUIREMENTS**:
1. Research {college_name} from official sources
2. Identify all streams/courses offered
3. Identify all entrance exams accepted
4. Provide detailed college information

Return **ONLY** valid JSON in this format:

{{
  "collegeId": "{college_name.upper().replace(' ', '_').replace('-', '_')}",
  "collegeName": "{college_name}",
  "collegeFullAddress": "Complete address with pincode",
  "collegesLocationState": "State name",
  "collegeType": "Government/Private/Deemed",
  "establishedYear": "YYYY",
  "logoUrl": "Official logo URL or 'NA'",
  "bannerUrl": "Official banner/campus image URL or 'NA'",
  "collegeInfo": "Detailed description about the college, its history, achievements, and reputation",
  "website": "Official website URL",
  "contactInfo": {{
    "phone": "Contact number",
    "email": "Official email"
  }},
  "streamsOffered": [
    "Engineering",
    "Medical", 
    "MBA",
    "Law"
  ],
  "branchesOffered": [
    "Computer Science and Engineering",
    "Mechanical Engineering",
    "MBBS",
    "Finance",
    "Corporate Law"
  ],
  "entranceExams": [
    "JEE_MAIN",
    "JEE_ADVANCED", 
    "NEET_UG",
    "CAT"
  ],
  "nirf_ranking": {{
    "overall": "Overall NIRF rank or 'NA'",
    "category": "Category-wise rank or 'NA'",
    "year": "2024"
  }},
  "accreditation": [
    "NAAC A++",
    "NBA",
    "AICTE Approved"
  ],
  "facilities": [
    "Library",
    "Hostels", 
    "Sports Complex",
    "Medical Center"
  ],
  "placement_overview": {{
    "average_package": "Average placement package",
    "highest_package": "Highest placement package",
    "placement_percentage": "Placement rate percentage",
    "top_recruiters": ["Company1", "Company2", "Company3"]
  }},
  "admission_process": "Brief description of admission process",
  "fee_structure": "General fee information",
  "scholarships": [
    "Merit-based scholarships",
    "Need-based scholarships"
  ]
}}

🚨 **IMPORTANT**: 
- Use exact exam IDs from the database list
- Be factual and use only verified information
- If information is not available, use "NA"
- Do not fabricate data
"""

    def clean_json_response(self, response: str) -> str:
        """Clean and validate JSON response"""
        response = re.sub(r'```json\s*', '', response)
        response = re.sub(r'```\s*$', '', response)
        
        json_match = re.search(r'\{.*\}', response, re.DOTALL)
        if json_match:
            return json_match.group(0)
        
        return response.strip()

    async def fetch_college_data(self, college_name: str) -> Dict:
        """Fetch comprehensive college data"""
        cache_key = self.get_cache_key(college_name)
        cached_data = self.load_from_cache(cache_key)
        
        if cached_data:
            return cached_data
            
        prompt = self.get_college_analysis_prompt(college_name)
        
        try:
            response = self.call_openai_with_retry(prompt)
            cleaned_response = self.clean_json_response(response)
            data = json.loads(cleaned_response)
            
            # Enhance with Firestore mappings
            enhanced_data = self.enhance_with_firestore_mappings(data)
            
            self.save_to_cache(cache_key, enhanced_data)
            logger.info(f"Fetched and enhanced data for {college_name}")
            return enhanced_data
            
        except Exception as e:
            logger.error(f"Error fetching data for {college_name}: {e}")
            return self.get_fallback_college_data(college_name)

    def enhance_with_firestore_mappings(self, college_data: Dict) -> Dict:
        """Enhance college data with Firestore course and exam mappings"""
        try:
            # Pre-cleaned lists
            streams = [s.strip().lower() for s in college_data.get('streamsOffered', []) if s]
            branches = [b.strip().lower() for b in college_data.get('branchesOffered', []) if b]
            college_info = college_data.get('collegeInfo', '')

            print(f"Matching courses for '{college_data.get('collegeName')}' with streams: {streams} & branches: {branches}")

            # Strict matching
            matching_courses = self.fs_manager.find_strict_course_matches(streams, branches)
            logger.info(f"Found {len(matching_courses)} matching courses: {matching_courses}")

            matching_exams = self.fs_manager.find_matching_exams(college_info, matching_courses)
            logger.info(f"Found {len(matching_exams)} matching exams: {matching_exams}")

            # Add course data
            courses_offered = []
            for course_id in matching_courses:
                course_data = self.fs_manager.courses_cache.get(course_id)
                if course_data:
                    courses_offered.append({
                        "courseId": course_id,
                        "courseName": course_data.get('courseName', 'NA'),
                        "streamName": course_data.get('streamName', 'NA'),
                        "duration": course_data.get('duration', 'NA'),
                        "eligibility": course_data.get('eligibility', 'NA'),
                        "branches": course_data.get('branches', [])
                    })

            # Add exam data
            exams_accepted = []
            for exam_id in matching_exams:
                exam_data = self.fs_manager.exams_cache.get(exam_id)
                if exam_data:
                    exams_accepted.append({
                        "examId": exam_id,
                        "examName": exam_data.get('examName', 'NA'),
                        "examFullName": exam_data.get('examFullName', 'NA'),
                        "examType": exam_data.get('examType', 'NA'),
                        "conductedBy": exam_data.get('conductedBy', 'NA')
                    })

            college_data.update({
                "courseIds": matching_courses,
                "examIds": matching_exams,
                "coursesOffered": courses_offered,
                "examsAccepted": exams_accepted,
                "lastUpdated": datetime.now().isoformat(),
                "dataVersion": "2.0"
            })

            return college_data

        except Exception as e:
            logger.error(f"Error enhancing data with Firestore mappings: {e}")
            return college_data


    def get_fallback_college_data(self, college_name: str) -> Dict:
        """Return fallback data structure when API fails"""
        return {
            "collegeId": college_name.upper().replace(' ', '_').replace('-', '_'),
            "collegeName": college_name,
            "collegeFullAddress": "NA",
            "collegesLocationState": "NA",
            "collegeType": "NA",
            "establishedYear": "NA",
            "logoUrl": "NA",
            "bannerUrl": "NA",
            "collegeInfo": "NA",
            "website": "NA",
            "contactInfo": {"phone": "NA", "email": "NA"},
            "streamsOffered": [],
            "branchesOffered": [],
            "entranceExams": [],
            "courseIds": [],
            "examIds": [],
            "coursesOffered": [],
            "examsAccepted": [],
            "lastUpdated": datetime.now().isoformat(),
            "dataVersion": "2.0"
        }

    async def fetch_multiple_colleges(self, college_names: List[str]) -> Dict[str, Dict]:
        """Fetch data for multiple colleges concurrently"""
        results = {}
        
        for i in range(0, len(college_names), self.config.chunk_size):
            chunk = college_names[i:i + self.config.chunk_size]
            
            tasks = [self.fetch_college_data(college_name) for college_name in chunk]
            chunk_results = await asyncio.gather(*tasks, return_exceptions=True)
            
            for j, result in enumerate(chunk_results):
                college_name = chunk[j]
                if isinstance(result, Exception):
                    logger.error(f"College {college_name} failed: {result}")
                    results[college_name] = self.get_fallback_college_data(college_name)
                else:
                    results[college_name] = result
            
            logger.info(f"Completed chunk {i//self.config.chunk_size + 1}")
            
            if i + self.config.chunk_size < len(college_names):
                await asyncio.sleep(2)
        
        return results

    def save_to_firestore(self, college_data: Dict):
        """Save college data to Firestore"""
        try:
            college_id = college_data['collegeId']
            doc_ref = self.fs_manager.db.collection('colleges').document(college_id)
            doc_ref.set(college_data)
            logger.info(f"Saved {college_data['collegeName']} to Firestore")
        except Exception as e:
            logger.error(f"Error saving to Firestore: {e}")

    def save_results(self, results: Dict[str, Dict], output_file: str = None):
        """Save results to file and Firestore"""
        if output_file is None:
            output_file = f"college_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        # Save to local file
        output_path = Path(self.config.output_dir) / output_file
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Results saved to {output_path}")
        
        # Save to Firestore
        for college_name, data in results.items():
            self.save_to_firestore(data)

async def main():
    """Main function to demonstrate usage"""
    config = CollegeConfig(
        api_key= 'ablx-ud6JSPH3GuYrHV9nd8j3s2uftpWdch3Yml4DFDZTJNVI5Nsy',
        rate_limit_delay=1.5,
        chunk_size=3,
        cache_enabled=True
    )
    
    # List of colleges to process
    college_names = [
        "IIT Delhi"
    ]
    
    fetcher = CollegeDataFetcher(config)
    
    try:
        results = await fetcher.fetch_multiple_colleges(college_names)
        fetcher.save_results(results)
        
        print(f"\n✅ Successfully processed {len(results)} colleges")
        print("\n📊 Summary:")
        for college_name, data in results.items():
            courses_count = len(data.get('courseIds', []))
            exams_count = len(data.get('examIds', []))
            print(f"- {college_name}: {courses_count} courses, {exams_count} exams")
            
    except Exception as e:
        logger.error(f"Main execution error: {e}")

if __name__ == "__main__":
    asyncio.run(main())