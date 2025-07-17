# firebase_config.py
import os
import base64
import json
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

# Step 1: Get base64 string
firebase_b64 = os.getenv("FIREBASE_CREDENTIALS_BASE64")

if not firebase_b64:
    raise ValueError("FIREBASE_CREDENTIALS_BASE64 not set")

# Step 2: Decode it and parse JSON
cred_dict = json.loads(base64.b64decode(firebase_b64))

# Step 3: Init Firebase
cred = credentials.Certificate(cred_dict)
firebase_admin.initialize_app(cred)

# Step 4: Get Firestore DB
db = firestore.client()
