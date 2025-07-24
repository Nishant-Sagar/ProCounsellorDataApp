import { XMLParser } from "fast-xml-parser"
import CollegeHeader from "./components/CollegeHeader";
interface CollegeData {
  Scholarships: Scholarship;
  videosrelatedToCollege: RelatedVideo[];
  QnA: QnA[];
  created: Timestamp;
  collegesLocationState: string;
  bannerUrl: string;
  coursesOffered: Course[];
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

interface Scholarship {
  scholarshipDescription: string;
}

interface RelatedVideo {
  videoUrl: string;
}

interface QnA {
  answer: string;
  question: string;
}


interface Timestamp {
  seconds: string;
  nanos: string;
}

interface Course {
  alumni: string;
  examId: string | string[];
  admissions: string;
  ranking: string;
  branches: Branch[];
  streamName: string;
  courseId: string;
}

interface Branch {
  seat: string;
  cutoffs: string;
  branchId: string;
  fees: string;
  branchName: string;
  placement: Placement;
  faculty: string;
}

interface Placement {
  averageSalary2025: string;
  highestSalary2025: string;
  companiesVisited2025: string | string[];
}

interface Faq {
  answer: string;
  question: string;
}

interface Review {
  reviewText: string;
}

interface CollegeEvent {
  eventId: string;
  eventHeading: string;
  eventRelatedVideoUrl: string;
  eventFullDescription: string;
  eventRelatedPhotoUrl: string;
}

interface NewsItem {
  newsId: string;
  newsRelatedPhotoUrl: string;
  newsHeading: string;
  fullNewsDescription: string;
  newsRelatedVideoUrl: string;
}


interface Infrastructure {
  infraVideo: InfraVideo;
  infraPhotos: InfraPhoto[];
  infraDescription: string;
}


interface InfraVideo {
  videoUrl: string;
}

interface InfraPhoto {
  photoUrl: string;
}


interface ImportantDate {
  details: DateDetail[];
  event: string;
}

interface DateDetail {
  date: string;
  stage: string;
}


export default async function CollegePage({params}:{params:{collegeid:string}}){
  const {collegeid} = await params
  let college:CollegeData;
  const res = await fetch(`https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/getCollegeById?collegeId=${collegeid}`, 
    {cache:'no-cache'}
  )
  if(!res.ok){
    console.log('failed to fetch data')
  }
  const data = await res.text()
  const parser = new XMLParser()
  const json = parser.parse(data)
  college = json.HashMap;

  

  return <main className="min-h-screen bg-gray-50">
    <h1 className="text-black">{college.collegeName}</h1>
  </main>
}