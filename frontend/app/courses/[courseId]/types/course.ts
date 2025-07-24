export interface PlacementStats {
    averageSalary2025: string;
    highestSalary2025: string;
    companies: string[];
  }
  
  export interface Branch {
    branchId: string;
    branchName: string;
    description: string;
    duration: string;
    coreSubjects: string[];
    careerOptions: string[];
    averageFeesRange: string;
    popularColleges: string[];
    jobRoles: string[];
    examId: string[];
    placementStats: PlacementStats;
    branchBrochureUrl: string;
  }
  
  export interface FAQ {
    faqId: string;
    question: string;
    answer: string;
  }
  
  export interface CourseData {
    courseId: string;
    courseName: string;
    courseType: string;
    streamLevel: string;
    admissionProcess: string;
    faqs: FAQ[];
    coursePhotoUrl: string;
    videoOverviewUrl: string;
    branches: Branch[];
  }
  