import os
import sys
import django
import json

# Django setup (adjust the path as per your project structure)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()

from firebase_config import db  # Firestore client instance

def load_course_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def course_exists(course_id):
    """
    Check if a course document with the given course_id exists in Firestore.
    """
    doc_ref = db.collection("courses").document(course_id)
    doc = doc_ref.get()
    return doc.exists

def save_course(course_data):
    """
    Save course data to Firestore if it doesn't already exist.
    """
    course_id = course_data.get("courseId")
    if not course_id:
        print("Error: courseId missing in course data.")
        return

    if course_exists(course_id):
        print(f"Course '{course_id}' already exists in Firestore. Skipping save.")
        return

    try:
        db.collection("courses").document(course_id).set(course_data)
        print(f"Course '{course_id}' saved successfully.")
    except Exception as e:
        print(f"Failed to save course '{course_id}': {e}")

if __name__ == "__main__":
    # Adjust path to your JSON file (one folder back)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.normpath(os.path.join(current_dir, "../..", "ENGINEERING.json"))

    course_data = load_course_data(file_path)
    save_course(course_data)
