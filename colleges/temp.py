import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import pytz
import os
import sys
import django
import re

# Django setup
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "procounsel.settings")
django.setup()
from firebase_config import db 

# Your JSON data (replace ... with your actual data)
exam = {
  "collegeId": "AIIMS_NEW_DELHI",
  "collegeName": "All India Institute of Medical Sciences (AIIMS), New Delhi",
  "collegeFullAddress": "Ansari Nagar, New Delhi - 110029, Delhi, India",
  "collegesLocationState": "Delhi",
  "logoUrl": "https://www.aiims.edu/images/logo.png",
  "bannerUrl": "https://www.aiims.edu/images/aiims_banner.jpg",
  "collegeInfo": "AIIMS New Delhi is India's premier medical institute established in 1956. It is recognized for excellence in medical education, research, and patient care. AIIMS offers undergraduate, postgraduate, doctoral, and super-specialty courses in medical and allied health sciences.",
  "faqs": [
    {
      "question": "What is the admission process for AIIMS New Delhi medical courses?",
      "answer": "Admission to undergraduate medical courses is through NEET UG, while postgraduate courses require NEET PG. Super-specialty courses require NEET SS. Some allied health courses have separate entrance exams conducted by AIIMS."
    }
  ],
  "coursesOffered": [
    {
      "streamName": "Undergraduate Medical",
      "branches": [
        {
          "branchId": "MBBS",
          "branchName": "MBBS",
          "seat": "125",
          "cutoffs": "NEET UG percentile cutoff varies yearly; generally above 98 percentile for general category",
          "faculty": "Highly qualified faculty with extensive clinical and research experience across multiple specialties.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "₹1,400 per annum approx."
        },
        {
          "branchId": "B_SC_NURSING",
          "branchName": "B.Sc Nursing",
          "seat": "40-50",
          "cutoffs": "Admission through AIIMS entrance exam or relevant national exams",
          "faculty": "Qualified nursing faculty with clinical and academic expertise.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        }
      ],
      "examId": "NEET",
      "courseId": "MASTER_OF_COMMERCE"
    },
    {
      "streamName": "Postgraduate Medical",
      "branches": [
        {
          "branchId": "MD_MS_VARIOUS_SPECIALTIES",
          "branchName": "MD/MS (Various Specialties)",
          "seat": "150-200",
          "cutoffs": "NEET PG percentile cutoff generally above 95 percentile for general category",
          "faculty": "Experienced clinicians and researchers in respective specialties.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "₹1,400 per annum approx."
        },
        {
          "branchId": "MPT_PHYSIOTHERAPY",
          "branchName": "MPT (Physiotherapy)",
          "seat": "15-20",
          "cutoffs": "Admission through AIIMS PG entrance or NEET PG as applicable",
          "faculty": "Experienced faculty specializing in physiotherapy and rehabilitation sciences.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "MOT_OCCUPATIONAL_THERAPY",
          "branchName": "MOT (Occupational Therapy)",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS PG entrance or NEET PG as applicable",
          "faculty": "Faculty experienced in occupational therapy and rehabilitation.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_NURSING",
          "branchName": "M.Sc Nursing",
          "seat": "20-30",
          "cutoffs": "Admission based on AIIMS entrance exam or relevant national exams",
          "faculty": "Qualified nursing faculty with clinical and academic expertise.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "MPH_PUBLIC_HEALTH",
          "branchName": "MPH (Public Health)",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS entrance or relevant national exams",
          "faculty": "Experienced public health professionals and researchers.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "MHA_HOSPITAL_ADMINISTRATION",
          "branchName": "MHA (Hospital Administration)",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS entrance or relevant exams",
          "faculty": "Faculty with expertise in healthcare management and hospital administration.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_CLINICAL_PSYCHOLOGY",
          "branchName": "M.Sc Clinical Psychology",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS entrance or relevant exams",
          "faculty": "Experienced clinical psychologists and academicians.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_RADIOLOGY",
          "branchName": "M.Sc Radiology",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS PG or relevant exams",
          "faculty": "Experienced radiologists and technical faculty.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_ANESTHESIA_TECHNOLOGY",
          "branchName": "M.Sc Anesthesia Technology",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS PG or relevant exams",
          "faculty": "Faculty specialized in anesthesia technology and critical care.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_MEDICAL_LAB_TECHNOLOGY",
          "branchName": "M.Sc Medical Lab Technology",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS entrance or relevant exams",
          "faculty": "Experienced faculty in medical laboratory sciences.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_OPTOMETRY",
          "branchName": "M.Sc Optometry",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS entrance or relevant exams",
          "faculty": "Faculty specialized in optometry and vision sciences.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        },
        {
          "branchId": "M_SC_NEUROSCIENCE",
          "branchName": "M.Sc Neuroscience",
          "seat": "10-15",
          "cutoffs": "Admission through AIIMS PG or relevant exams",
          "faculty": "Experienced neuroscientists and researchers.",
          "placement": [
            {
              "averageSalary2025": "NA",
              "highestSalary2025": "NA",
              "companiesVisited2025": "NA"
            }
          ],
          "fees": "NA"
        }
      ],
      "examId": "NEET_PG",
      "courseId": "HEALTH_SCIENCES_PG"
    }
  ],
  "Reviews": [
    {
      "reviewText": "AIIMS New Delhi is consistently rated as the top medical institute in India, known for its cutting-edge research, excellent clinical training, and highly qualified faculty."
    }
  ],
  "Infrastructure": [
    {
      "infraDescription": "AIIMS New Delhi has state-of-the-art infrastructure including advanced hospitals, research labs, lecture halls, hostels, and sports facilities.",
      "infraPhotos": [
        { "photoUrl": "https://www.aiims.edu/images/campus1.jpg" },
        { "photoUrl": "https://www.aiims.edu/images/campus2.jpg" }
      ],
      "infraVideo": [
        { "videoUrl": "https://www.youtube.com/embed/AIIMS_campus_tour" },
        { "videoUrl": "NA" }
      ]
    }
  ],
  "News": [
    {
      "newsId": "20240812_AIIMS_NIRF_2024",
      "newsRelatedPhotoUrl": "https://www.aiims.edu/images/news_nirf2024.jpg",
      "newsRelatedVideoUrl": "NA",
      "newsHeading": "AIIMS New Delhi retains top rank in NIRF Medical Rankings 2024",
      "fullNewsDescription": "AIIMS New Delhi has once again secured the number one position in the NIRF Medical Rankings 2024, reaffirming its status as the premier medical institute in India."
    }
  ],
  "Scholarships": [
    {
      "scholarshipDescription": "AIIMS offers various scholarships including merit-cum-means scholarships, SC/ST scholarships, and financial aid for needy students."
    }
  ],
  "Events": [
    {
      "eventId": "AIIMS_Annual_Convocation_2025",
      "eventRelatedPhotoUrl": "https://www.aiims.edu/images/convocation2025.jpg",
      "eventRelatedVideoUrl": "NA",
      "eventHeading": "AIIMS Annual Convocation 2025",
      "eventFullDescription": "The annual convocation ceremony celebrates the achievements of graduating students and honors distinguished faculty and alumni."
    }
  ],
  "QnA": [
    {
      "question": "What entrance exams are required for admission to AIIMS New Delhi?",
      "answer": "NEET UG is required for MBBS admission, NEET PG for postgraduate medical courses, and AIIMS PG entrance or university-specific exams for allied health and paramedical courses."
    }
  ],
  "videosrelatedToCollege": [
    { "videoUrl": "https://www.youtube.com/embed/AIIMS_overview" },
    { "videoUrl": "https://www.youtube.com/embed/AIIMS_research_highlights" }
  ],
  "ImportantDates": [
    {
      "event": "Recruitment Examination for Nursing Officer (NORCET-8) – 2025",
      "details": [
        { "stage": "Entrance Examination (Stage I)", "date": "12th April, 2025 (Saturday)" },
        { "stage": "Result Notification", "date": "30th April, 2025 (Wednesday)" }
      ]
    },
    {
      "event": "Fellowship Programme July, 2025 Session",
      "details": [
        { "stage": "Entrance Examination (Stage I)", "date": "19th April, 2025 (Saturday)" },
        { "stage": "Result Notification", "date": "28th April, 2025 (Monday)" }
      ]
    },
    {
      "event": "INI-CET PG (MD/MS/M.Ch (6 years) /DM(6 years)/MDS) July, 2025 Session",
      "details": [
        { "stage": "Entrance Examination (Stage I)", "date": "17th May, 2025 (Saturday)" },
        { "stage": "Result Notification", "date": "24th May, 2025 (Saturday)" }
      ]
    }
  ]
}

def get_timestamp():
    return datetime.now(pytz.UTC)


def upload_exams(exams):
    ref = db.collection('colleges')
    for exam in exams:
        exam["created"] = get_timestamp()
        exam["updated"] = get_timestamp()
        ref.document(exam["collegeId"]).set(exam)
    print("Exams uploaded.")


if __name__ == "__main__":
    upload_exams([exam])
    print("All data uploaded to Firestore.")


# -------------------------------

# 📁 exams
#    └── JEE_Main
#    └── NEET
#    └── COMEDK

# 📁 courses
#    └── Engineering
#    └── Medical
#    └── Management

# 📁 colleges
#    └── IIT_Delhi
#    └── AIIMS_Delhi
#    └── NIT_Trichy

# 📁 exam-metadata (deadlines)
#    └── JEE_Main
#    └── NEET


