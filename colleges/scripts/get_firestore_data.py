import os
import sys
import django
import json

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()

from firebase_config import db 

def fetch_exam_ids_from_firestore(collection_name="courses"):
    """
    Fetch all exam IDs from Firestore 'exams' collection using the imported `db` client.
    Assumes each document has an 'examId' field in uppercase snake case.
    Returns a set of exam IDs.
    """
    exam_ids = set()
    docs = db.collection(collection_name).stream()
    for doc in docs:
        data = doc.to_dict()
        exam_id = data.get("courseId")
        if exam_id:
            exam_ids.add(exam_id)
    return exam_ids

if __name__ == "__main__":
    exam = fetch_exam_ids_from_firestore()
    print(exam)