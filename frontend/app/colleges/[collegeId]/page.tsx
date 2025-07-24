// import React from 'react';
// import CollegeHeader from './components/CollegeHeader';
// import CollegeOverview from './components/CollegeOverview';
// import { parseXmlToJson } from './components/xmlParser';

// type Props = { params: { collegeId: string } };

// export default async function CollegePage({ params }: Props) {
// //   const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/colleges/getCollegeById?collegeId=${params.collegeId}`;

// const apiUrl =`https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/getCollegeById?collegeId=${params.collegeId}`;
//   const res = await fetch(apiUrl, { cache: 'no-store' });

//   if (!res.ok) {
//     return <div>Failed to load college data</div>;
//   }

//   const xmlData = await res.text();
//   const collegeData = parseXmlToJson(xmlData);

//   return (
//     <main style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
//       <CollegeHeader data={collegeData} />
//       <CollegeOverview data={collegeData} />
//       {/* Add more components */}
//     </main>
//   );
// }

import React from 'react';
import { GraduationCap, MapPin, Users, Calendar, Award, BookOpen, Globe, Phone, Mail } from 'lucide-react';

// Mock data structure - replace with your actual parseXmlToJson result
const mockCollegeData = {
  name: "Stanford University",
  location: "Stanford, California",
  established: "1885",
  type: "Private Research University",
  ranking: "#3 National Universities",
  students: "17,249",
  acceptance: "4.3%",
  tuition: "$56,169",
  description: "Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
  programs: ["Computer Science", "Engineering", "Business", "Medicine", "Law"],
  facilities: ["24 Libraries", "Athletic Facilities", "Research Centers", "Student Housing"],
  contact: {
    phone: "+1 (650) 723-2300",
    email: "admission@stanford.edu",
    website: "www.stanford.edu"
  }
};

// Header Component
const CollegeHeader = ({ data = mockCollegeData }) => (
  <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
    
    <div className="relative z-10 p-8 md:p-12">
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {data.ranking}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {data.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{data.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">Est. {data.established}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{data.acceptance}</div>
            <div className="text-sm text-white/80">Acceptance Rate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Stats Component
const StatsSection = ({ data = mockCollegeData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.students}</div>
          <div className="text-gray-600">Total Students</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <Award className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.type}</div>
          <div className="text-gray-600">Institution Type</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-lg">
          <BookOpen className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.tuition}</div>
          <div className="text-gray-600">Annual Tuition</div>
        </div>
      </div>
    </div>
  </div>
);

// Overview Component
const CollegeOverview = ({ data = mockCollegeData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
    <div className="lg:col-span-2 space-y-8">
      {/* Description */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          About the University
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">{data.description}</p>
      </div>
      
      {/* Programs */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-green-600" />
          </div>
          Popular Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.programs.map((program, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors">
              <div className="font-semibold text-gray-900">{program}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-600" />
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <Phone className="w-4 h-4" />
            <span>{data.contact.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <Mail className="w-4 h-4" />
            <span>{data.contact.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>{data.contact.website}</span>
          </div>
        </div>
      </div>
      
      {/* Facilities */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          Key Facilities
        </h3>
        <div className="space-y-3">
          {data.facilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>{facility}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Apply Button */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
        <p className="text-blue-100 mb-4">Start your journey today</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
          Apply Now
        </button>
      </div>
    </div>
  </div>
);

// Main Page Component
export default function CollegePage({ params = { collegeId: '1' } }) {
  // Replace this with your actual data fetching logic
  const collegeData = mockCollegeData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollegeHeader data={collegeData} />
        <StatsSection data={collegeData} />
        <CollegeOverview data={collegeData} />
      </main>
    </div>
  );
}