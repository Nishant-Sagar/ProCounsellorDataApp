from django.shortcuts import render
from django.http import JsonResponse, Http404
from firebase_config import db


# Create your views here.
def home(request):
    return render(request, 'core/home.html')

def index(request):
    return render(request, 'core/index.html')


def get_college_by_id(request, college_id):
    try:
        doc_ref = db.collection('colleges').document(college_id)
        doc = doc_ref.get()
        if doc.exists:
            return JsonResponse(doc.to_dict())
        else:
            raise Http404("College not found")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_exam_by_id(request, exam_id):
    try:
        doc_ref = db.collection('exams').document(exam_id)
        doc = doc_ref.get()
        if doc.exists:
            return JsonResponse(doc.to_dict())
        else:
            raise Http404("Exam not found")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_course_by_id(request, course_id):
    try:
        doc_ref = db.collection('courses').document(course_id)
        doc = doc_ref.get()
        if doc.exists:
            return JsonResponse(doc.to_dict())
        else:
            raise Http404("Courses not found")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)