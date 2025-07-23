from django.urls import path
from .views import home, index
from . import views

urlpatterns = [
    # path('', home, name='home'),
    path('', index, name='index'), 
    path('api/college/<str:college_id>/', views.get_college_by_id, name='get_college_by_id'),
    path('api/exam/<str:exam_id>/', views.get_exam_by_id, name='get_exam_by_id'),
    path('api/course/<str:course_id>/', views.get_course_by_id, name='get_course_by_id'),
]