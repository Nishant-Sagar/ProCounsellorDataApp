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

def get_exam_prompt(exam_name: str) -> str:
    return f"""
You are an expert in Indian entrance exams across engineering, medical, management, law, design, and government 
services.

Your task is to return structured, factual, and verifiable information about the entrance exam named {exam_name} 
(e.g., JEE Main, NEET UG, CAT, CLAT, etc.).

Use only trusted and official Indian sources such as:
- Official exam websites (e.g., https://jeemain.nta.ac.in)
- NTA, AICTE, UGC
- Shiksha, Careers360, Collegedunia, JagranJosh, or verified national news outlets

Do NOT guess or make up any values. If any data is not available, return "NA" as the value.

Return the data strictly in the following JSON format:

{{
  "examId": "",
  "examName": "",
  "fullForm": "",
  "examLevel": "",
  "examType": "",
  "mode": [],
  "conductingBody": "",
  "officialWebsite": "",
  "applicationFees": {{
    "general": "",
    "obc": "",
    "sc_st": ""
  }},
  "eligibility": "",
  "subjectsTested": [],
  "maxMarks": "",
  "duration": "",
  "marksPerSubject": {{}},
  "negativeMarking": "",
  "examFrequency": "",
  "coursesLinked": [],
  "examSyllabusPdfUrl": "",
  "previousYearCutoffs": {{
    "general": "",
    "obc": "",
    "sc": "",
    "st": ""
  }},
  "examBrochureUrl": "",
  "faqs": {{
    "question": "",
    "answer": ""
  }}
}}

Notes:
- Use camelCase for keys.
- Use ALL CAPS snake_case for examId (e.g., "JEE_MAIN", "NEET", "CAT", "CLAT").
- Use direct URLs for syllabus and brochure if available.
- For 'subjectsTested', list the subjects individually (e.g., ["Physics", "Chemistry", "Mathematics"]).
- If the exam is not national-level (e.g., KCET, MHTCET), still include all fields honestly.

Only return **one exam JSON object per prompt**.
If any field is unavailable on public sources, return "NA" instead of guessing.
"""
def get_timestamp():
    return datetime.now(pytz.UTC)

def call_perplexity_api(prompt: str) -> str:
    # Use the OpenAI-compatible client to create chat completion
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=2000
    )

    # The response content is in response.choices[0].message.content
    return response.choices[0].message.content

def extract_json_from_text(text: str) -> str:
    """Extract JSON object from a text response."""
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group(0)
    else:
        raise ValueError("No JSON object found in the response")

uploaded_exams = []
skipped_exams = []

def save_exam_data(exam_id: str, exam_data: dict, folder: str = "exams_data"):
    """Save to local JSON + Firestore with timestamp check and Firestore skip logic."""

    # Set timestamps
    created_at = get_timestamp()
    updated_at = get_timestamp()
    exam_data["created"] = created_at
    exam_data["updated"] = updated_at

    # Save locally — convert datetime to ISO for JSON
    os.makedirs(folder, exist_ok=True)
    filename = os.path.join(folder, f"exam_{exam_id.lower()}.json")
    serializable_data = deepcopy(exam_data)

    for key in ["created", "updated"]:
        if isinstance(serializable_data.get(key), datetime):
            serializable_data[key] = serializable_data[key].isoformat()

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(serializable_data, f, indent=2, ensure_ascii=False)
    print(f"Saved locally: {filename}")

    # Upload to Firestore
    try:
        doc_ref = db.collection("exams").document(exam_id)
        doc_snapshot = doc_ref.get()

        if doc_snapshot.exists:
            skipped_exams.append(exam_id)
            print(f"Skipped Firestore (already exists): {exam_id}")
        else:
            doc_ref.set(exam_data)
            uploaded_exams.append(exam_id)
            print(f"Uploaded to Firestore: exams/{exam_id}")
    except Exception as e:
        print(f"Firestore upload failed for {exam_id}: {e}")


def run_exam_data_pipeline(exam_list: list):
    for idx, exam_name in enumerate(exam_list, start=1):
        print(f"\n→ Fetching {idx}/{len(exam_list)}: {exam_name}")
        prompt = get_exam_prompt(exam_name)

        try:
            response_text = call_perplexity_api(prompt)

            json_text = extract_json_from_text(response_text)
            data = json.loads(json_text)

            exam_id = data.get("examId", exam_name.lower().replace(" ", "_"))
            save_exam_data(exam_id, data)  # Save parsed JSON data
        except json.JSONDecodeError:
            print(f"JSON parse error for {exam_name}")
            print(response_text)
        except Exception as e:
            print(f"Unexpected error for {exam_name}: {e}")
        time.sleep(1)  # Avoid rate limits

if __name__ == "__main__":
    exam_list = [
    # Engineering
    "JEE Main",
    "JEE Advanced",
    "BITSAT",
    "VITEEE",
    "SRMJEEE",
    "COMEDK UGET",
    "MHT CET",
    "WBJEE",
    "KIITEE",
    "AMUEEE",
    "AP EAMCET",
    "TS EAMCET",
    "KCET",
    "OJEE",
    "GUJCET",
    "UPSEE (UPCET)",

    # Medical & Allied Health
    "NEET UG",
    "AIIMS B.Sc Nursing",
    "JIPMER Nursing",
    "NEET PG",
    "INI CET",
    "AIAPGET",

    # Management
    "CAT",
    "XAT",
    "CMAT",
    "MAT",
    "NMAT",
    "SNAP",
    "IIFT",
    "TISSNET",
    "MICAT",
    "ATMA",
    "KMAT",

    # Law
    "CLAT",
    "AILET",
    "LSAT India",
    "SLAT",
    "MH CET Law",
    "CUET LLB",
    
    # Design
    "NID DAT",
    "UCEED",
    "CEED",
    "NIFT Entrance Exam",
    "PEARL Academy Entrance",
    "AIEED",

    # Architecture
    "NATA",
    "JEE Main (Paper 2)",

    # Pharmacy
    "GPAT",
    "BITS Pilani Pharmacy",
    "MHT CET (Pharmacy)",

    # Agriculture
    "ICAR AIEEA UG",
    "ICAR AIEEA PG",
    "BHU UET (Agri)",
    
    # Hotel Management
    "NCHMCT JEE",

    # Government/Defense
    "UPSC Civil Services (IAS)",
    "SSC CGL",
    "SSC CHSL",
    "RRB NTPC",
    "IBPS PO",
    "IBPS Clerk",
    "SBI PO",
    "SBI Clerk",
    "RBI Grade B",
    "NDA",
    "CDS",
    "AFCAT",
    "CAPF",

    # Teaching
    "CTET",
    "TET (State wise)",
    "UGC NET",

    # University Entrance
    "CUET UG",
    "CUET PG",
    "IGNOU OPENMAT",
    "DUET",
    "BHU UET",
    "AMU Entrance",

    # Master's Entrance Exams
    "GATE",                     # M.Tech, M.E
    "CEED",                     # M.Des
    "CUET PG",                  # Central Universities – MA, MSc, MCom, etc.
    "TISSNET",                  # MA, MSW at TISS
    "ICAR AIEEA PG",            # MSc Agriculture
    "INI CET",                  # PG medical (already listed)
    "AIAPGET",                  # Ayurveda, Homeopathy PG (already listed)
    "PGIMER Entrance",          # M.Sc Nursing, Paramedical
    "BHU PET",                  # MA, M.Sc, etc.
    "JNU PG Entrance (via CUET)",
    "IGNOU OPENMAT",            # MBA via IGNOU (already listed)
    "AILET PG",                 # LLM
    "CLAT PG",                  # LLM
    "LSAT India PG",            # LLM
    "NID M.Des Entrance",       # PG Design
    "NIFT PG Entrance",         # PG Fashion Design
    "IIT JAM",                  # M.Sc (IITs)
    "JNUEE (PG)",               # JNU M.Sc, MA (now moved under CUET PG)
    "ICMR JRF",                 # MSc/PhD Life Sciences
    "CSIR NET",                 # MSc to PhD science/research
    "DAIICT PG Entrance",       # M.Sc IT, M.Des, etc.
    "ISBF Entrance (LSE PG courses)",
    "IFMR/GIM/IRMA PG Entrance",# Niche B-Schools
]
    # run_exam_data_pipeline(exam_list)
    print(uploaded_exams)
    print(skipped_exams)


