import os
import sys
import django
import json

# Step 1: Go two levels up from the current file (colleges/scripts/test_exams.py)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))

# Step 2: Add base directory to system path so Python can find `procounsel`
sys.path.append(BASE_DIR)

# Step 3: Set Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")

# Step 4: Setup Django
django.setup()

# Step 5: Now import Firebase config or any other Django-related files
from firebase_config import db  # Assuming `db` is your Firestore client instance

def fetch_exam_ids_from_firestore(collection_name="exams"):
    """
    Fetch all exam IDs from Firestore 'exams' collection using the imported `db` client.
    Assumes each document has an 'examId' field in uppercase snake case.
    Returns a set of exam IDs.
    """
    exam_ids = set()
    docs = db.collection(collection_name).stream()
    for doc in docs:
        data = doc.to_dict()
        exam_id = data.get("examId")
        if exam_id:
            exam_ids.add(exam_id)
    return exam_ids

def find_missing_exams(course_data: dict, firestore_exam_ids: set) -> list:
    """
    Compare exam IDs in course data with those fetched from Firestore.
    Return list of exam IDs present in course data but missing in Firestore.
    """
    missing_exams = set()
    for branch in course_data.get("branches", []):
        for exam_id in branch.get("examId", []):
            if exam_id != "NA" and exam_id not in firestore_exam_ids:
                missing_exams.add(exam_id)
    return sorted(missing_exams)

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Traverse one folder back to get the file path
    file_path = os.path.join(current_dir, "../..", "ENGINEERING.json")

    # Normalize the path
    file_path = os.path.normpath(file_path)

    # Load JSON file
    with open(file_path, "r", encoding="utf-8") as f:
        course_data = json.load(f)

    print(f"Loaded course data from: {file_path}")

    # Fetch exam IDs from Firestore
    firestore_exam_ids = fetch_exam_ids_from_firestore(collection_name="exams")

    # Find exams missing in Firestore exam collection
    missing_exams = find_missing_exams(course_data, firestore_exam_ids)
    # print(firestore_exam_ids)
    if missing_exams:
        print("Exams missing in Firestore 'exams' collection and need to be added:")
        for exam in missing_exams:
            print(f"- {exam}")
    else:
        print("All exams in course data are present in Firestore.")
