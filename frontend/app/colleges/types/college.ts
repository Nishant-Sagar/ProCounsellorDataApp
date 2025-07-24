
export interface CollegeData {
  Scholarships: Scholarship;
  videosrelatedToCollege: RelatedVideo[];
  QnA: QnA[];
  created: Timestamp;
  collegesLocationState: string;
  bannerUrl: string;
  coursesOffered: Course[]| Course;
  collegeFullAddress: string;
  logoUrl: string;
  collegeName: string;
  faqs: Faq[];
  Reviews: Review;
  collegeInfo: string;
  Events: CollegeEvent[];
  News: NewsItem;
  collegeId: string;
  Infrastructure: Infrastructure;
  updated: Timestamp;
  ImportantDates: ImportantDate[];
}

export interface Scholarship {
  scholarshipDescription: string;
}

export interface RelatedVideo {
  videoUrl: string;
}

export interface QnA {
  answer: string;
  question: string;
}

export interface Timestamp {
  seconds: string;
  nanos: string;
}

export interface Course {
  alumni: string;
  examId: string | string[];
  admissions: string;
  ranking: string;
  branches: Branch[];
  streamName: string;
  courseId: string;
}

export interface Branch {
  seat: string;
  cutoffs: string;
  branchId: string;
  fees: string;
  branchName: string;
  placement: Placement;
  faculty: string;
}

export interface Placement {
  averageSalary2025: string;
  highestSalary2025: string;
  companiesVisited2025: string | string[];
}

export interface Faq {
  answer: string;
  question: string;
}

export interface Review {
  reviewText: string;
}

export interface CollegeEvent {
  eventId: string;
  eventHeading: string;
  eventRelatedVideoUrl: string;
  eventFullDescription: string;
  eventRelatedPhotoUrl: string;
}

export interface NewsItem {
  newsId: string;
  newsRelatedPhotoUrl: string;
  newsHeading: string;
  fullNewsDescription: string;
  newsRelatedVideoUrl: string;
}

export interface Infrastructure {
  infraVideo: InfraVideo;
  infraPhotos: InfraPhoto[];
  infraDescription: string;
}

export interface InfraVideo {
  videoUrl: string;
}

export interface InfraPhoto {
  photoUrl: string;
}

export interface ImportantDate {
  details: DateDetail[];
  event: string;
}

export interface DateDetail {
  date: string;
  stage: string;
}
