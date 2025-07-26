import CollegeHeader from "./components/CollegeHeader";
import StatsSection from "./components/StatsSection";
import CollegeOverview from "./components/CollegeOverview";
import { CollegeData } from "../types/college";
import Events from "./components/Events";
import Scholarships from "./components/Scholarships";
import Infrastructure from "./components/Infrastructure";
import CoursesOffered from "./components/CoursesOffered";
import QnA from "./components/QnA"; 
import Faqs from "./components/Faqs";
import News from "./components/News";

export default async function CollegePage({params}:{params:Promise<{collegeid:string}>}){
  const {collegeid} = await params
  let college: CollegeData | null = null;
  try {
    const res = await fetch(`https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/getCollegeById?collegeId=${collegeid}`, {
      headers:{
        Accept:'application/json'
      },
      cache: 'no-cache',
    });

    if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

    college = await res.json()

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
        
        {/* Reduced spacing between sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CollegeOverview college={college} />
            <CoursesOffered college={college} />
            <Events college={college} />
            
            <Scholarships college={college} />
          </div>
          
          <div className="space-y-4">
            <Infrastructure data={{
              infrastructure: college.Infrastructure?.infraDescription || 'Detailed infrastructure information not available.'
            }} />
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
              <p className="text-blue-100 mb-4">Start your journey today</p>
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
                Visit Website
              </button>
            </div>

            <QnA college={college} />
            <Faqs college={college} />
            <News college={college} />

          </div>
        </div>
      </main>
    </div>
  );
}
