import os
import json
import time
import re
import sys
import django
from datetime import datetime, timezone

# Django setup (adjust the path as per your project structure)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()

from firebase_config import db 

def get_timestamp():
    """Return current UTC timestamp"""
    return datetime.now(timezone.utc)


def load_college_data(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        return None


def college_exists(college_id):
    """
    Check if a college document with the given college_id exists in Firestore.
    """
    doc_ref = db.collection("colleges").document(college_id)
    doc = doc_ref.get()
    return doc.exists

def save_college(college_data):
    """
    Save college data to Firestore if it doesn't already exist.
    Adds created and updated timestamps.
    """
    college_id = college_data.get("collegeId")
    if not college_id:
        print("Error: 'collegeId' is missing in the data.")
        return

    if college_exists(college_id):
        print(f"College '{college_id}' already exists in Firestore. Skipping save.")
        return

    try:
        created_at = get_timestamp()
        updated_at = created_at
        college_data["created"] = created_at
        college_data["updated"] = updated_at

        db.collection("colleges").document(college_id).set(college_data)
        print(f"College '{college_id}' saved successfully.")
    except Exception as e:
        print(f"Failed to save college '{college_id}': {e}")

if __name__ == "__main__":
    # Adjust path to your JSON file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.normpath(os.path.join(current_dir, "../..", "college_data/WCE_SANGLI.json"))

    college_data = load_college_data(file_path)
    if college_data:
        save_college(college_data)