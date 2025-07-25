import { XMLParser } from "fast-xml-parser"
import CollegeHeader from "./components/CollegeHeader";
import StatsSection from "./components/StatsSection";
import CollegeOverview from "./components/CollegeOverview";
import { CollegeData } from "../types/college";

export default async function CollegePage({params}:{params:{collegeid:string}}){
  const {collegeid} = await params
  let college: CollegeData | null = null;
  try {
    const res = await fetch(`https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/getCollegeById?collegeId=${collegeid}`, {
      cache: 'no-cache',
    });

    if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

    const xmlText = await res.text();
    const parser = new XMLParser();
    college = parser.parse(xmlText).HashMap;
//     if (college && college.coursesOffered && !Array.isArray(college.coursesOffered)) {
//       college.coursesOffered = [college.coursesOffered];
// }

  } catch (error) {
    console.error(error);
    college = null;
  }
  
  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">Failed to load college data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 isolate">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollegeHeader college={college} />
        <StatsSection college={college} />
        <CollegeOverview college={college} />
      </main>
    </div>
  );
}