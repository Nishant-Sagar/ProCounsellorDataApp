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

from typing import Dict


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



def fetch_college_info_from_gpt(college_name: str) -> str:
    return f"""
You are an expert in Indian higher education and factual data extraction.

🎯 Your task: Return a strictly valid, structured, and **verifiable** JSON object with complete factual information for the college: **{college_name}**

---

📌 **DO NOT guess or fabricate data.**
Return only what is published on:
- Official websites (e.g., iitd.ac.in, aiims.edu)
- NIRF Rankings, AICTE, UGC, NMC
- Trusted portals: Careers360, Shiksha, Collegedunia, JagranJosh
- LinkedIn Alumni, verified brochures, news media

---

## ✅ STREAMS AND BRANCHES LOGIC (IMPORTANT)

Use the full list of known **branches per stream** (provided below) as a **reference** — but:

- Only include **streams** that the specific college **actually offers**.
- Under each stream, only include **branches that are offered at this college**.
- Use college website, NIRF, Shiksha, or Careers360 to verify if a branch exists.
- Never guess based on other IITs or generic patterns.

---

Each stream must include:
- `streamName`
- `courseId` (e.g., ENGINEERING)
- `examId` (e.g., ["JEE_ADVANCED", "GATE"])
- `ranking`, `admissions`, `alumni` (as per the stream)
- `branches`: list of real, verifiable branches offered at the college

Each branch must include:
- `branchId` (UPPER_SNAKE_CASE of branchName)
- `branchName`
- `seat`, `cutoffs`, `faculty`, `placement`, `fees`

✅ Ensure this logic: `courseId` and `examId` are set **at the stream level**, NOT inside individual branches.

---

🎓 **Reference Master List of Streams and Branches** (for validation only):

MCOM_BRANCHES = [
    "Accounting and Finance",
    "Banking and Insurance",
    "Business Management",
    "Corporate Law"
]
MA_BRANCHES = [
    "Economics",
    "History",
    "Political Science",
    "Public Administration",
    "English Literature",
    "etc"
]
HEALTH_BRANCHES = [
    "MPT (Physiotherapy)",
    "MOT (Occupational Therapy)",
    "M.Sc Nursing",
    "MPH (Public Health)",
    "etc"
]
EDUCATION_PG_BRANCHES = [
    "M.Ed",
    "Special Education",
    "Early Childhood Education",
    "Educational Technology",
    "etc"
]
MPHARM_BRANCHES = [
    "Pharmaceutics",
    "Pharmacology",
    "Pharmaceutical Chemistry",
    "etc"
]
MARCH_BRANCHES = [
    "Urban Design",
    "Landscape Architecture",
    "Environmental Architecture",
    "Architectural Conservation",
    "etc"
]
MDES_BRANCHES = [
    "Product Design",
    "Industrial Design",
    "UI/UX Design",
    "Interaction Design",
    "etc"
]
LLM_BRANCHES = [
    "Constitutional Law",
    "Criminal Law",
    "Corporate and Commercial Law",
    "International Law",
   "etc"
]
MSC_BRANCHES = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biotechnology",
    "Microbiology",
    "Zoology",
   "etc"
]
MTECH_BRANCHES = [
    "Computer Science Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
   "etc"
]
EDUCATION_UG_BRANCHES = [
    "B.Ed (Bachelor of Education)"
]
HOTEL_MANAGEMENT_BRANCHES = [
    "Hotel Management",
    "Hospitality Management",
    "Culinary Arts",
   "etc"
]
AGRICULTURE_BRANCHES = [
    "B.Sc Agriculture",
    "Horticulture",
    "Agronomy",
    "Soil Science",
    "etc"
]
PHARMACY_BRANCHES = [
    "B.Pharm (Bachelor of Pharmacy)"
]
ARCHITECTURE_BRANCHES = [
    "Architecture (B.Arch)",
    "Landscape Architecture",
    "etc"
]
DESIGN_BRANCHES = [
    "Fashion Design",
    "Graphic Design",
    "Interior Design",
    "Product Design",
   "etc"
]
LAW_BRANCHES = [
    "Corporate Law",
    "Criminal Law",
    "Constitutional Law",
    "etc"
]
MANAGEMENT_BRANCHES = [
    "General Management",
    "Finance",
    "Marketing",
    "Human Resource Management",
    "etc"
]
MEDICAL_BRANCHES = [
    "MBBS",
    "BDS (Dental)",
    "BAMS (Ayurveda)",
    "BHMS (Homeopathy)",
    "etc"
]
ENGINEERING_BRANCHES = [
    "Aeronautical Engineering",
    "Aerospace Engineering",
    "Artificial Intelligence and Machine Learning",
    "Agricultural Engineering",
    "Automobile Engineering",
    "etc"
]
## ✅ OUTPUT FORMAT — VALID JSON ONLY

- No markdown, comments, or extra text
- All JSON keys below must appear (even if data is "NA")
- Use square brackets (`[]`) for all lists
- Use UPPER_SNAKE_CASE for `courseId`, `branchId`, and `examId`
- If a section is unavailable, fill with `"NA"` (never blank or null)

Return this structure:
```json
{{
  "collegeId": "",
  "collegeName": "",
  "collegeFullAddress": "",
  "collegesLocationState": "",
  "logoUrl": "",
  "bannerUrl": "",
  "collegeInfo": "",

  "faqs": [
    {{
      "question": "",
      "answer": ""
    }}
  ],

  "coursesOffered": [
    {{
      "streamName": "e.g., Engineering, Medical, MBA",
      "ranking": "e.g., NIRF 2024 rank or 'NA'",
      "admissions": "Admission process for this stream (e.g., JEE Advanced, GATE)",
      "alumni": "Alumni achievements related to this stream",
      "examId": ["e.g., JEE_ADVANCED", "GATE"],
      "courseId": "e.g., ENGINEERING",

      "branches": [
        {{
          "branchId": "e.g., COMPUTER_SCIENCE_ENGINEERING",
          "branchName": "e.g., Computer Science and Engineering",
          "seat": "e.g., 180",
          "cutoffs": "e.g., JEE Advanced 2023 closing rank: 2345 (Gen)",
          "faculty": "Faculty overview for this branch",
          "placement": {{
            "averageSalary2025": "e.g., ₹14.5 LPA",
            "highestSalary2025": "e.g., ₹82 LPA",
            "companiesVisited2025": ["Google", "Microsoft", "TCS"]
          }},
          "fees": "e.g., ₹2.3 lakh per year"
        }}
      ]
    }}
  ],

  "Reviews": [
    {{
      "reviewText": "e.g., IIT Bombay provides top-class engineering education..."
    }}
  ],

  "Infrastructure": [
    {{
      "infraDescription": "e.g., State-of-the-art labs, hostels, libraries, innovation centers",
      "infraPhotos": [
        {{ "photoUrl": "" }},
        {{ "photoUrl": "" }}
      ],
      "infraVideo": [
        {{ "videoUrl": "" }},
        {{ "videoUrl": "" }}
      ]
    }}
  ],

  "News": [
    {{
      "newsId": "",
      "newsHeading": "",
      "newsRelatedPhotoUrl": "",
      "newsRelatedVideoUrl": "",
      "fullNewsDescription": ""
    }}
  ],

  "Scholarships": [
    {{
      "scholarshipDescription": ""
    }}
  ],

  "Events": [
    {{
      "eventId": "",
      "eventHeading": "",
      "eventRelatedPhotoUrl": "",
      "eventRelatedVideoUrl": "",
      "eventFullDescription": ""
    }}
  ],

  "QnA": [
    {{
      "question": "",
      "answer": ""
    }}
  ],

  "videosrelatedToCollege": [
    {{
      "videoUrl": ""
    }}
  ],

  "ImportantDates": [
    {{
      "event": "",
      "details": [
        {{
          "stage": "",
          "date": ""
        }}
      ]
    }}
  ]
}}
"""

def call_openai(prompt: str) -> dict:
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=8000
    )
    content = response.choices[0].message.content
    try:
        return json.loads(content)
    except json.JSONDecodeError as e:
        print("❌ JSON Decode Error:", e)
        with open("broken_response.txt", "w", encoding="utf-8") as f:
            f.write(content)
        raise ValueError("Invalid JSON response saved to broken_response.txt")

def save_json(college_name: str, data: Dict):
    os.makedirs("college_data", exist_ok=True)
    filename = os.path.join("college_data", f"{college_name.replace(' ', '_')}.json")
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved: {filename}")

if __name__ == "__main__":
    college = "IIT Bombay"
    prompt = fetch_college_info_from_gpt(college)
    data = call_openai(prompt)
    save_json(college, data)