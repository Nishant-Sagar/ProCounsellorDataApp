import os
import json
import time
import re
from datetime import datetime
import pytz
from copy import deepcopy
from openai import OpenAI  # Official OpenAI-compatible client used for Perplexity
import sys
import django
from time import sleep


# Step 1: Go two levels up from the current file (colleges/scripts/test_exams.py)
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
YOUR_API_KEY = "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"

client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# Prompt Generator
import uuid

import json
from time import sleep

def get_prompt(course_id: str, course_name: str, branch_list: list) -> str:
    # Generate individual branch entries for the JSON template
    branches_json_entries = ",\n    ".join([
        f"""{{
      "branchId": "{b.upper().replace(' ', '_').replace('(', '').replace(')', '').replace('.', '_')}",
      "branchName": "{b}",
      "description": "Write a short summary of this branch and its scope.",
      "duration": "Mention the duration (e.g., 2 years).",
      "coreSubjects": ["List at least 4 major subjects, provide as many relevant core subjects as possible."],
      "careerOptions": ["Include at least 2 common career paths."],
      "averageFeesRange": "Provide a rough fee range (e.g., ₹1.5–3 LPA).",
      "popularColleges": ["Name at least 2 real Indian colleges."],
      "jobRoles": ["List 2–3 common roles."],
      "examId": ["List entrance exams in UPPER_SNAKE_CASE format like 'CUET_PG', 'NEET_PG', 'TISSNET', etc. Use 'NA' if unknown."],
      "placementStats": {{
        "averageSalary2025": "Give an estimate (e.g., ₹4.5 LPA).",
        "highestSalary2025": "Highest placement estimate or 'NA'.",
        "companies": ["List 2–3 relevant recruiters or hospitals."]
      }},
      "branchBrochureUrl": "Provide a brochure or info link if known, else 'NA'."
    }}"""
        for b in branch_list
    ])

    prompt = f"""
You are an expert in Indian higher education and academic career mapping.

Your task is to return complete, factual, and structured data for the course category:
**{course_name}**

Use data from trusted Indian sources like:
- NIRF, UGC, AICTE, NMC
- Official websites of IITs, AIIMS, NIFT, IIMs, JIPMER, etc.
- Trusted platforms: Shiksha, Careers360, Collegedunia, JagranJosh

---

🎯 CRITICAL INSTRUCTIONS:
- Return output in **strict JSON format** only.
- Use capital **camelCase** for all field keys.
- `branches` must be a **LIST** (array), NOT a map/object/dictionary.
- Each branch should have a `branchId` in **lower_snake_case** (e.g., "m_sc_neuroscience", "mpt_physiotherapy").
- ALL IDs including `examId` should be in **lower_snake_case** format (e.g., "cuet_pg", "neet_pg", "tissnet").
- `examId` should list **real exam names** in snake_case. Only use "na" if no entrance exam is applicable.
- `coreSubjects` should include **at least 4 subjects** - provide as many relevant core subjects as possible.
- Fill all fields with meaningful or estimated values — do not return all `"na"`.
- MUST include ALL {len(branch_list)} branches provided in the list.
- If you're unsure, make reasonable assumptions based on common data from Indian universities.

BRANCHES TO INCLUDE (ALL OF THEM):
{', '.join(branch_list)}

---

### ✅ REQUIRED JSON FORMAT:
{{
  "courseId": "{course_id}",
  "courseName": "{course_name}",
  "courseType": "UG" or "PG",
  "streamLevel": "Undergraduate" or "Postgraduate",
  "branches": [
    {branches_json_entries}
  ],
  "admissionProcess": "Explain how students typically get admitted to this course category.",
  "faqs": [
    {{
      "faqId": "FAQ_1",
      "question": "Provide a frequently asked question for this course.",
      "answer": "Provide a helpful, realistic answer."
    }}
  ],
  "coursePhotoUrl": "NA",
  "videoOverviewUrl": "NA"
}}

IMPORTANT: Return ALL {len(branch_list)} branches as a LIST, not a dictionary. Each branchId should be in UPPER_SNAKE_CASE.
ALL IDs (branchId, examId, faqId) should be in UPPER_SNAKE_CASE format.
Provide at least 4 core subjects per branch, more if relevant.

Only return raw JSON — no extra text, explanations, or markdown.
"""
    return prompt

# API call
def call_openai(prompt: str) -> str:
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=4000  # Increased token limit
    )
    return response.choices[0].message.content

# Course data generator
def fetch_branch_data(course_id: str, course_name: str, branch_chunks: list) -> dict:
    all_branches = []
    course_data = {}

    for idx, chunk in enumerate(branch_chunks, start=1):
        print(f"\nProcessing chunk {idx}/{len(branch_chunks)}: {chunk}")
        prompt = get_prompt(course_id, course_name, chunk)

        try:
            response = call_openai(prompt)
            print(f"Raw response for chunk {idx}:")
            print(response[:200] + "..." if len(response) > 200 else response)
            
            parsed = json.loads(response)

            # Use course metadata from the first chunk
            if not course_data:
                course_data = {k: v for k, v in parsed.items() if k != "branches"}

            # Extract branches
            branches = parsed.get("branches", [])
            
            # Validate branches structure
            if isinstance(branches, list):
                print(f"Found {len(branches)} branches in chunk {idx}")
                for branch in branches:
                    if isinstance(branch, dict):
                        # Ensure branchId is in UPPER_SNAKE_CASE
                        branch_id = branch.get("branchId", "")
                        if branch_id != branch_id.upper():
                            print(f"🔧 Fixing branchId: {branch_id} -> {branch_id.upper()}")
                            branch["branchId"] = branch_id.upper()
                        
                        # Ensure examId is in UPPER_SNAKE_CASE
                        exam_ids = branch.get("examId", [])
                        if isinstance(exam_ids, list):
                            fixed_exam_ids = []
                            for exam_id in exam_ids:
                                if isinstance(exam_id, str):
                                    fixed_exam_id = exam_id.upper().replace(" ", "_").replace("-", "_")
                                    fixed_exam_ids.append(fixed_exam_id)
                                else:
                                    fixed_exam_ids.append(exam_id)
                            branch["examId"] = fixed_exam_ids
                        
                        all_branches.append(branch)
                    else:
                        print(f"Invalid branch structure in chunk {idx}: {branch}")
            elif isinstance(branches, dict):
                print(f"WARNING: 'branches' is a dict, converting to list for chunk {idx}")
                for branch_data in branches.values():
                    if isinstance(branch_data, dict):
                        # Ensure branchId is in UPPER_SNAKE_CASE
                        branch_id = branch_data.get("branchId", "")
                        if branch_id != branch_id.upper():
                            print(f"🔧 Fixing branchId: {branch_id} -> {branch_id.upper()}")
                            branch_data["branchId"] = branch_id.upper()
                        
                        # Ensure examId is in UPPER_SNAKE_CASE
                        exam_ids = branch_data.get("examId", [])
                        if isinstance(exam_ids, list):
                            fixed_exam_ids = []
                            for exam_id in exam_ids:
                                if isinstance(exam_id, str):
                                    fixed_exam_id = exam_id.upper().replace(" ", "_").replace("-", "_")
                                    fixed_exam_ids.append(fixed_exam_id)
                                else:
                                    fixed_exam_ids.append(exam_id)
                            branch_data["examId"] = fixed_exam_ids
                        
                        all_branches.append(branch_data)
            else:
                print(f"Error: 'branches' is not a valid structure for chunk {idx}")
                print("Raw branches data:", branches)
                continue

        except json.JSONDecodeError as e:
            print(f"JSONDecodeError: Could not parse response for chunk {idx}")
            print("Raw response:", response)
            print("Error:", e)

        except Exception as e:
            print(f"Unexpected error in chunk {idx}: {e}")

        sleep(1)

    course_data["branches"] = all_branches
    return course_data

def save_course_data(course_id: str, course_data: dict):
    filename = f"{course_id}.json"
    try:
        with open(filename, "w", encoding='utf-8') as f:
            json.dump(course_data, f, indent=2, ensure_ascii=False)
        print(f"Saved {filename}")
        print(f"Total branches saved: {len(course_data.get('branches', []))}")
    except Exception as e:
        print(f"Failed to save {filename}: {e}")

# Master function
def run_course_data_generator(course_id: str, branch_list: list, course_type="PG", stream_level="Postgraduate"):
    course_name = course_id.replace("_", " ").title()
    
    # Split branches into smaller chunks (5 per chunk for better processing)
    branch_chunks = [branch_list[i:i+5] for i in range(0, len(branch_list), 5)]
    
    print(f"Starting course data generation for: {course_name}")
    print(f"Total branches: {len(branch_list)}")
    print(f"Split into {len(branch_chunks)} chunks")
    
    course_data = fetch_branch_data(course_id, course_name, branch_chunks)
    course_data["courseType"] = course_type
    course_data["streamLevel"] = stream_level
    
    # Final validation
    branches = course_data.get("branches", [])
    print(f"\n Final Results:")
    print(f"  - Total branches processed: {len(branches)}")
    print(f"  - Expected branches: {len(branch_list)}")
    print(f"  - Branches structure: {'LIST' if isinstance(branches, list) else ' NOT LIST'}")
    
    if isinstance(branches, list):
        for branch in branches:
            branch_id = branch.get("branchId", "")
            is_upper_snake = branch_id.isupper() and "_" in branch_id
            print(f"  - {branch.get('branchName', 'Unknown')}: {branch_id} {'✅' if is_upper_snake else '❌'}")
    
    save_course_data(course_id, course_data)
    return course_data

if __name__ == "__main__":
    ENGINEERING_BRANCHES = [
    "Aeronautical Engineering",
    "Aerospace Engineering",
    "Artificial Intelligence and Machine Learning",
    "Agricultural Engineering",
    "Automobile Engineering",
    "Bioinformatics",
    "Biomedical Engineering",
    "Biotechnology Engineering",
    "Ceramic Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Data Science and Engineering",
    "Electrical and Electronics Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Electronics and Instrumentation Engineering",
    "Energy Engineering",
    "Environmental Engineering",
    "Food Technology",
    "Industrial Engineering",
    "Information Technology",
    "Instrumentation Engineering",
    "Marine Engineering",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Nanotechnology",
    "Petroleum Engineering",
    "Plastic and Polymer Engineering",
    "Production Engineering",
    "Robotics and Automation",
    "Software Engineering",
    "Structural Engineering",
    "Telecommunication Engineering",
    "Textile Engineering"
]

    result = run_course_data_generator("ENGINEERING", ENGINEERING_BRANCHES)
    
    # Print final summary
    print("\n" + "="*50)
    print("FINAL SUMMARY")
    print("="*50)
    print(f"Course: {result.get('courseName', 'Unknown')}")
    print(f"Branches: {len(result.get('branches', []))}")
    print(f"Structure: {'Correct' if isinstance(result.get('branches'), list) else 'Incorrect'}")