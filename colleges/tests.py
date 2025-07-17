from django.test import TestCase

# Create your tests here.
# colleges/sync_to_firestore.py

import os
import sys
import django
import re
from datetime import datetime

# Django setup
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()

from colleges.models import MbaCollegeInfo
from firebase_config import db  # Firestore setup

def clean_doc_id(name):
    return re.sub(r"[^\w]+", "_", name.strip().lower())

def sync_existing_to_firestore():
    colleges = MbaCollegeInfo.objects.all()
    print(f"🔁 Syncing {colleges.count()} records...")

    for college in colleges:
        try:
            doc_id = clean_doc_id(college.name)
            db.collection("mba_college_info").document(doc_id).set({
                "name": college.name,
                "data": college.data,
                "lastUpdated": datetime.utcnow()
            })
            print(f"✅ Synced: {college.name} → {doc_id}")
        except Exception as e:
            print(f"❌ Failed to sync {college.name}: {e}")

if __name__ == "__main__":
    sync_existing_to_firestore()
