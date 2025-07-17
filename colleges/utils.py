# colleges/utils.py
import os
import sys
import django
import json
from openai import OpenAI
from django.conf import settings
import re
from datetime import datetime


# Setup Django and system path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()
from colleges.models import EnggCollegeInfo, CollegeInfo
from firebase_config import db 

# Setup OpenAI client
# client = OpenAI(api_key=settings.OPENAI_API_KEY)

def fetch_college_info_from_gpt(college_name: str) -> dict:
    prompt = f'''
    You are an expert in Indian higher education data and act as a structured data extraction engine.

    Your job is to return only factual, structured, and verifiable information about the college named:
    {college_name}

    IMPORTANT INSTRUCTIONS:
    Use only trusted and official sources:
    - NIRF 2024 Rankings (https://www.nirfindia.org)
    - The official college website
    - Shiksha.com, Careers360.com, Collegedunia.com
    - National Medical Commission (for medical colleges)
    - Verified news portals

    If any data is missing, return "NA" (no empty strings, nulls, or guesses).

    In the `coursesOffered` section:
    - Include all streams/domains the college offers: e.g., Engineering, MBA, BBA, Medical, Law, etc.
    - Under each stream, dynamically fetch and include all branches/specializations offered (e.g., CSE, ECE, ISE, Civil, etc. for Engineering; Finance, HR, Marketing, etc. for MBA).
    - Do not hardcode branch names like CSE or Finance — extract the actual list of branches from trusted sources.

    For each branch, include:
    - Seat count (if available)
    - Cutoffs (if available)
    - Faculty details (brief)
    - Placement details for 2025: average salary, highest salary, companies visited
    - Fees (latest available)

    Also include for each stream:
    - Stream-level NIRF 2024 ranking
    - Admission criteria
    - General placement overview (if available)
    - Notable alumni

    For fields like `faqs`, `qna`, `news`, `events`, `infrastructure`, and `videosrelatedToCollege`, return only the most relevant or representative single entry.

    All links for images and videos must be direct and accessible URLs.

    The output must follow the exact JSON structure below, with **dynamic branch names** instead of placeholders. No fictional data. If something is not available, mark as "NA".

    REQUIRED JSON STRUCTURE:
    ```json
    {{
    "collegeId": "",
    "collegeName": "",
    "collegeFullAddress": "",
    "collegesLocationState": "",
    "logoUrl": "",
    "bannerUrl": "",
    "collegeInfo": "",
    "faqs": {{
        "question": "",
        "answer": ""
    }},
    "coursesOffered": {{
        "<StreamName>": {{
        "<BranchName>": {{
            "seat": "",
            "cutoffs": "",
            "faculty": "",
            "placement": {{
            "averageSalary2025": "",
            "highestSalary2025": "",
            "companiesVisited2025": ""
            }},
            "fees": ""
        }},
        "ranking": "",
        "Admissions": {{
            "eligibilityCriteria": "",
            "selectionCriteria(examsOfferedForSelectedCourse)": ""
        }},
        "alumuniSection": {{
            "alumuniName": "",
            "alumuniCurrentPosition": "",
            "alumuniConnectionLink": ""
        }},
        "averageSalary2025": "",
        "highestSalary2025": "",
        "companies visited 2025": "",
        "fees": ""
        }},
        "<AnotherStream>": {{
        ...
        }}
    }},
    "Reviews": "",
    "Infrastructure": {{
        "infraDescription": "",
        "infraPhotos": {{
        "photo1Url": "",
        "photo2Url": ""
        }},
        "infraVideo": {{
        "video1Url": "",
        "video2Url": ""
        }}
    }},
    "News": {{
        "newsId": "",
        "newsRelatedPhotoUrl": "",
        "newsRelatedVideoUrl": "",
        "newsHeading": "",
        "fullNewsDescription": ""
    }},
    "Scholarships": "",
    "Events": {{
        "eventId": "",
        "eventRelatedPhotoUrl": "",
        "eventRelatedVideoUrl": "",
        "eventHeading": "",
        "eventFullDescription": ""
    }},
    "QnA": {{
        "question": "",
        "answer": ""
    }},
    "videosrelatedToCollege": {{
        "videoUrl": "",
        "videoUrl2": ""
    }}
    }}
    '''

    # response = client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "user", "content": prompt}
    #     ],
    #     temperature=0,
    # )

    # content = response.choices[0].message.content

    # try:
    #     return json.loads(content)
    # except json.JSONDecodeError:
    #     return {"error": "Could not parse GPT response", "raw": content}

def clean_doc_id(name):
    """Clean Firestore document ID from college name"""
    return re.sub(r"[^\w]+", "_", name.strip().lower())

# Run as standalone script
if __name__ == "__main__":
    college_name = input("Enter college name: ").strip()
    # data = fetch_college_info_from_gpt(college_name)
    data = {
  "collegeId": "DSCEBLR",
  "collegeName": "Dayananda Sagar College of Engineering",
  "collegeFullAddress": "Shavige Malleshwara Hills, Kumaraswamy Layout, Bengaluru, Karnataka 560078, India",
  "collegesLocationState": "Karnataka",
  "logoUrl": "https://www.dsce.edu.in/images/logo.png",
  "bannerUrl": "https://www.dsce.edu.in/images/slider/slider1.jpg",
  "collegeInfo": "Dayananda Sagar College of Engineering (DSCE), established in 1979, is an autonomous institution affiliated to Visvesvaraya Technological University (VTU). It is accredited by NBA and NAAC (A grade), and offers undergraduate, postgraduate, and doctoral programs in engineering, management, and allied fields. DSCE is known for its strong placement record, industry collaborations, and research output.[1][2][3]",
  "faqs": {
    "question": "What is the NIRF 2024 Engineering ranking of DSCE Bangalore?",
    "answer": "DSCE Bangalore is ranked in the 151-200 band in the Engineering category as per NIRF 2024.[1]"
  },
  "coursesOffered": {
    "Engineering": {
      "branches": {
        "Computer Science and Engineering": {
          "seat": "180",
          "cutoffs": "KCET 2023 Closing Rank (General): 1236[2][3]",
          "faculty": "The department has experienced faculty with expertise in computer science, software engineering, and data science.[2][3]",
          "placement": {
            "averageSalary2025": "INR 7.5 LPA",
            "highestSalary2025": "INR 28 LPA",
            "companiesVisited2025": "200+"
          }
        },
        "Information Science and Engineering": {
          "seat": "180",
          "cutoffs": "KCET 2023 Closing Rank (General): 2024[2][3]",
          "faculty": "Faculty with backgrounds in information technology, data analytics, and software systems.[2][3]",
          "placement": {
            "averageSalary2025": "INR 7 LPA",
            "highestSalary2025": "INR 25 LPA",
            "companiesVisited2025": "200+"
          }
        },
        "Electronics and Communication Engineering": {
          "seat": "180",
          "cutoffs": "KCET 2023 Closing Rank (General): 3122[2][3]",
          "faculty": "Faculty with expertise in VLSI, embedded systems, and communication networks.[2][3]",
          "placement": {
            "averageSalary2025": "INR 6.5 LPA",
            "highestSalary2025": "INR 20 LPA",
            "companiesVisited2025": "200+"
          }
        },
        "Mechanical Engineering": {
          "seat": "180",
          "cutoffs": "KCET 2023 Closing Rank (General): 12981[2][3]",
          "faculty": "Faculty with specializations in design, manufacturing, and thermal engineering.[2][3]",
          "placement": {
            "averageSalary2025": "INR 5.5 LPA",
            "highestSalary2025": "INR 14 LPA",
            "companiesVisited2025": "200+"
          }
        },
        "Civil Engineering": {
          "seat": "120",
          "cutoffs": "KCET 2023 Closing Rank (General): 22207[2][3]",
          "faculty": "Faculty with expertise in structural, environmental, and geotechnical engineering.[2][3]",
          "placement": {
            "averageSalary2025": "INR 4.5 LPA",
            "highestSalary2025": "INR 10 LPA",
            "companiesVisited2025": "200+"
          }
        },
        "Artificial Intelligence and Machine Learning": {
          "seat": "60",
          "cutoffs": "KCET 2023 Closing Rank (General): 2975[2][3]",
          "faculty": "Faculty specialized in AI, ML, and data science.[2][3]",
          "placement": {
            "averageSalary2025": "INR 7.2 LPA",
            "highestSalary2025": "INR 24 LPA",
            "companiesVisited2025": "200+"
          }
        }
      },
      "fees": "INR 2,58,000 per year",
      "ranking": "151-200",
      "admissions": {
        "eligibilityCriteria": "10+2 with Physics, Chemistry, Mathematics. Admission through KCET/COMEDK/Management Quota.[2][3]",
        "selectionCriteria": "KCET, COMEDK UGET[2][3]"
      },
      "alumniSection": {
        "alumniName": "Girish R",
        "alumniCurrentPosition": "Co-Founder & CTO, Finbox",
        "alumniConnectionLink": "https://www.linkedin.com/in/girishr/"
      },
      "averageSalary2025": "INR 7 LPA",
      "highestSalary2025": "INR 28 LPA",
      "companiesVisited2025": "200+"
    },
    "MBA": {
      "branches": {
        "MBA": {
          "seat": "60",
          "cutoffs": "PGCET 2023 Closing Rank (General): 1622[2][3]",
          "faculty": "Experienced faculty in business administration, finance, and marketing.[2][3]",
          "placement": {
            "averageSalary2025": "INR 5.5 LPA",
            "highestSalary2025": "INR 12 LPA",
            "companiesVisited2025": "60+"
          }
        }
      },
      "fees": "INR 1,08,000 per year",
      "ranking": "NA",
      "admissions": {
        "eligibilityCriteria": "Bachelor’s degree with minimum 50% marks. Admission through PGCET/KMAT/Management Quota.[2][3]",
        "selectionCriteria": "PGCET, KMAT[2][3]"
      },
      "alumniSection": {
        "alumniName": "NA",
        "alumniCurrentPosition": "NA",
        "alumniConnectionLink": "NA"
      },
      "averageSalary2025": "INR 5.5 LPA",
      "highestSalary2025": "INR 12 LPA",
      "companiesVisited2025": "60+"
    },
    "Medical": {
      "branches": {},
      "fees": "NA",
      "ranking": "NA",
      "admissions": {
        "eligibilityCriteria": "NA",
        "selectionCriteria": "NA"
      },
      "alumniSection": {
        "alumniName": "NA",
        "alumniCurrentPosition": "NA",
        "alumniConnectionLink": "NA"
      },
      "averageSalary2025": "NA",
      "highestSalary2025": "NA",
      "companiesVisited2025": "NA"
    },
    "BachelorOfCommerce": {
      "placement": {
        "averageSalary2025": "NA",
        "highestSalary2025": "NA",
        "companiesVisited2025": "NA"
      },
      "fees": "NA",
      "ranking": "NA",
      "admissions": {
        "eligibilityCriteria": "NA",
        "selectionCriteria": "NA"
      },
      "alumniSection": {
        "alumniName": "NA",
        "alumniCurrentPosition": "NA",
        "alumniConnectionLink": "NA"
      },
      "averageSalary2025": "NA",
      "highestSalary2025": "NA",
      "companiesVisited2025": "NA"
    },
    "OtherCourses": []
  },
  "Reviews": "DSCE Bangalore is well-regarded for its academic environment, experienced faculty, placement support, and campus infrastructure. Students appreciate the industry-oriented curriculum and extracurricular opportunities.[2][3]",
  "Infrastructure": {
    "infraDescription": "The campus features modern classrooms, advanced laboratories, a central library, hostels, sports facilities, auditoriums, and innovation centers. The campus is Wi-Fi enabled and supports a range of academic and extracurricular activities.[2][3]",
    "infraPhotos": {
      "photo1Url": "https://www.dsce.edu.in/images/gallery/infra1.jpg",
      "photo2Url": "https://www.dsce.edu.in/images/gallery/infra2.jpg"
    },
    "infraVideo": {
      "video1Url": "https://www.youtube.com/watch?v=8eH8xwQ8w1E",
      "video2Url": "https://www.youtube.com/watch?v=FQ5mH1B3jzA"
    }
  },
  "News": {
    "newsId": "20250701-DSCE-Innovation",
    "newsRelatedPhotoUrl": "https://www.dsce.edu.in/images/news/news1.jpg",
    "newsRelatedVideoUrl": "NA",
    "newsHeading": "DSCE Bangalore Launches Innovation Lab for Startups",
    "fullNewsDescription": "Dayananda Sagar College of Engineering inaugurated a new Innovation Lab to support student startups and promote entrepreneurship on campus. (Source: The Hindu, July 2025)"
  },
  "Scholarships": "DSCE Bangalore offers government and private scholarships, including merit-based and need-based financial aid for eligible students.[2][3]",
  "Events": {
    "eventId": "DSCETechUtsav2025",
    "eventRelatedPhotoUrl": "https://www.dsce.edu.in/images/events/techutsav.jpg",
    "eventRelatedVideoUrl": "https://www.youtube.com/watch?v=DSCETechUtsav",
    "eventHeading": "Tech Utsav 2025",
    "eventFullDescription": "Tech Utsav is DSCE's annual technical festival, featuring workshops, competitions, and guest lectures, attracting participants from across Karnataka.[2][3]"
  },
  "QnA": {
    "question": "What are the 2025 placement statistics for Computer Science at DSCE Bangalore?",
    "answer": "The average salary for Computer Science in 2025 was INR 7.5 LPA, with the highest package at INR 28 LPA. Over 200 companies visited the campus for placements.[2][3]"
  },
  "videosRelatedToCollege": {
    "videoUrl": "https://www.youtube.com/watch?v=8eH8xwQ8w1E",
    "videoUrl2": "https://www.youtube.com/watch?v=DSCETechUtsav"
  }
}


    # print(json.dumps(data, indent=2, ensure_ascii=False))

    # Save to DB
    college_obj, created = CollegeInfo.objects.update_or_create(
        name=college_name,
        defaults={'data': data}
    )

    if created:
        print(f"✅ Created new entry for '{college_name}' in the database.")
    else:
        print(f"✅ Updated existing entry for '{college_name}' in the database.")

    # Save to Firestore
    try:
        doc_id = clean_doc_id(college_name)
        db.collection("collegeInfo").document(doc_id).set({
            "name": college_name,
            "data": data,
            "lastUpdated": datetime.utcnow()
        })
        print(f"Synced '{college_name}' to Firestore as document ID: {doc_id}")
    except Exception as e:
        print(f"Failed to sync to Firestore: {e}")
