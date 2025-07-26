// import React, { useState } from 'react';
// import { 
//   BookOpen, 
//   GraduationCap, 
//   Users, 
//   Calendar, 
//   Award, 
//   Clock, 
//   Globe, 
//   TrendingUp,
//   FileText,
//   DollarSign,
//   Target,
//   AlertCircle,
//   Download,
//   HelpCircle,
//   CheckCircle,
//   Building,
//   Briefcase,
//   Star,
//   ChevronDown,
//   ChevronUp,
//   Search
// } from 'lucide-react';

// // Mock data structure - replace with your actual course data
// const courseData = {
//   "courseId": "ENGINEERING",
//   "courseName": "Engineering",
//   "courseType": "PG",
//   "streamLevel": "Postgraduate",
//   "admissionProcess": "Admission to engineering courses in India is primarily based on national or state-level entrance exams such as JEE Main, JEE Advanced, state CETs, or university-specific exams. Candidates must qualify for these exams and participate in centralized counseling processes for seat allotment in top engineering colleges.",
//   "faqs": [
//     {
//       "faqId": "FAQ_1",
//       "question": "What are the top entrance exams for engineering in India?",
//       "answer": "The top entrance exams for engineering in India are JEE Main, JEE Advanced, state-level CETs (like MHT-CET, KCET), and university-specific exams (like VITEEE, BITSAT)."
//     }
//   ],
//   "coursePhotoUrl": "NA",
//   "videoOverviewUrl": "NA",
//   "branches": [
//     {
//       "branchId": "COMPUTER_SCIENCE_AND_ENGINEERING",
//       "branchName": "Computer Science and Engineering",
//       "description": "Computer Science and Engineering deals with the theory, design, development, and application of software and hardware systems. It covers programming, algorithms, data structures, artificial intelligence, and computer networks, preparing students for the rapidly evolving tech industry.",
//       "duration": "4 years",
//       "coreSubjects": [
//         "Data Structures and Algorithms",
//         "Operating Systems",
//         "Database Management Systems",
//         "Computer Networks",
//         "Artificial Intelligence",
//         "Software Engineering",
//         "Theory of Computation",
//         "Machine Learning"
//       ],
//       "careerOptions": [
//         "Software Developer",
//         "Systems Engineer"
//       ],
//       "averageFeesRange": "₹2–4 LPA",
//       "popularColleges": [
//         "IIT Delhi",
//         "IIT Kanpur"
//       ],
//       "jobRoles": [
//         "Software Engineer",
//         "Data Scientist",
//         "Systems Analyst"
//       ],
//       "examId": [
//         "JEE_MAIN",
//         "JEE_ADVANCED"
//       ],
//       "placementStats": {
//         "averageSalary2025": "₹18 LPA",
//         "highestSalary2025": "₹80 LPA",
//         "companies": [
//           "Google",
//           "Microsoft",
//           "Infosys"
//         ]
//       },
//       "branchBrochureUrl": "NA"
//     },
//     {
//       "branchId": "MECHANICAL_ENGINEERING",
//       "branchName": "Mechanical Engineering",
//       "description": "Mechanical Engineering is one of the oldest and broadest branches, dealing with the design, analysis, manufacturing, and maintenance of mechanical systems.",
//       "duration": "4 years",
//       "coreSubjects": [
//         "Engineering Mechanics",
//         "Thermodynamics",
//         "Fluid Mechanics",
//         "Machine Design",
//         "Heat and Mass Transfer",
//         "Manufacturing Technology"
//       ],
//       "careerOptions": [
//         "Design Engineer",
//         "Production Engineer"
//       ],
//       "averageFeesRange": "₹1.5–3 LPA",
//       "popularColleges": [
//         "IIT Madras",
//         "IIT Kanpur"
//       ],
//       "jobRoles": [
//         "Mechanical Engineer",
//         "Maintenance Engineer",
//         "Project Engineer"
//       ],
//       "examId": [
//         "JEE_MAIN",
//         "JEE_ADVANCED"
//       ],
//       "placementStats": {
//         "averageSalary2025": "₹6 LPA",
//         "highestSalary2025": "₹20 LPA",
//         "companies": [
//           "Tata Motors",
//           "Larsen & Toubro",
//           "Mahindra & Mahindra"
//         ]
//       },
//       "branchBrochureUrl": "NA"
//     }
//   ]
// };

// // Header Component
// const CourseHeader = ({ data = courseData }) => (
//   <div className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
//     <div className="absolute inset-0 bg-black/20"></div>
//     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    
//     {/* Decorative elements */}
//     <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
//     <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
    
//     <div className="relative z-10 p-8 md:p-12">
//       <div className="flex items-start justify-between flex-wrap gap-6">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
//               <GraduationCap className="w-8 h-8 text-white" />
//             </div>
//             <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
//               {data.streamLevel}
//             </span>
//             <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
//               {data.courseType}
//             </span>
//           </div>
          
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//             {data.courseName}
//           </h1>
          
//           <div className="flex flex-wrap items-center gap-6 text-white/90">
//             <div className="flex items-center gap-2">
//               <BookOpen className="w-5 h-5" />
//               <span className="text-lg">{data.branches?.length || 0} Specializations</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Users className="w-5 h-5" />
//               <span className="text-lg">Multiple Career Paths</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
//           <div className="text-center">
//             <div className="text-3xl font-bold mb-1">4</div>
//             <div className="text-sm text-white/80">Years Duration</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Course Overview Component
// const CourseOverview = ({ data = courseData }) => (
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//     <div className="lg:col-span-2 space-y-8">
//       {/* Admission Process */}
//       <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//           <div className="bg-blue-100 p-2 rounded-lg">
//             <CheckCircle className="w-6 h-6 text-blue-600" />
//           </div>
//           Admission Process
//         </h2>
//         <p className="text-gray-700 leading-relaxed text-lg">{data.admissionProcess}</p>
//       </div>
      
//       {/* FAQ Section */}
//       <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//           <div className="bg-yellow-100 p-2 rounded-lg">
//             <HelpCircle className="w-6 h-6 text-yellow-600" />
//           </div>
//           Frequently Asked Questions
//         </h2>
//         <div className="space-y-4">
//           {data.faqs?.map((faq, index) => (
//             <div key={faq.faqId} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//               <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
//               <p className="text-gray-700">{faq.answer}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
    
//     <div className="space-y-6">
//       {/* Course Stats */}
//       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//         <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//           <TrendingUp className="w-5 h-5 text-green-600" />
//           Course Highlights
//         </h3>
//         <div className="space-y-4">
//           <div className="flex justify-between items-center py-2 border-b border-gray-100">
//             <span className="text-gray-600">Stream Level</span>
//             <span className="font-semibold text-gray-900">{data.streamLevel}</span>
//           </div>
//           <div className="flex justify-between items-center py-2 border-b border-gray-100">
//             <span className="text-gray-600">Course Type</span>
//             <span className="font-semibold text-gray-900">{data.courseType}</span>
//           </div>
//           <div className="flex justify-between items-center py-2">
//             <span className="text-gray-600">Specializations</span>
//             <span className="font-semibold text-gray-900">{data.branches?.length || 0}</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Apply Now Button */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center">
//         <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
//         <p className="text-purple-100 mb-4">Explore specializations and start your journey</p>
//         <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
//           Explore Branches
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Branch Card Component
// const BranchCard = ({ branch }) => {
//   const [expanded, setExpanded] = useState(false);
  
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-gray-900 mb-2">{branch.branchName}</h3>
//           <p className="text-gray-600 text-sm mb-3">{branch.description}</p>
          
//           <div className="flex flex-wrap gap-2 mb-4">
//             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//               {branch.duration}
//             </span>
//             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
//               {branch.averageFeesRange}
//             </span>
//           </div>
//         </div>
//       </div>
      
//       {/* Placement Stats */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-green-50 rounded-lg p-3 border border-green-100">
//           <div className="text-sm text-green-600 mb-1">Average Salary</div>
//           <div className="font-bold text-green-800">{branch.placementStats?.averageSalary2025}</div>
//         </div>
//         <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
//           <div className="text-sm text-blue-600 mb-1">Highest Salary</div>
//           <div className="font-bold text-blue-800">{branch.placementStats?.highestSalary2025}</div>
//         </div>
//       </div>
      
//       {/* Expandable Section */}
//       <button
//         onClick={() => setExpanded(!expanded)}
//         className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//       >
//         <span className="font-medium text-gray-700">View Details</span>
//         {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//       </button>
      
//       {expanded && (
//         <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
//           {/* Core Subjects */}
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//               <BookOpen className="w-4 h-4 text-blue-600" />
//               Core Subjects
//             </h4>
//             <div className="grid grid-cols-2 gap-2">
//               {branch.coreSubjects?.slice(0, 6).map((subject, index) => (
//                 <div key={index} className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs">
//                   {subject}
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Job Roles */}
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//               <Briefcase className="w-4 h-4 text-purple-600" />
//               Job Roles
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {branch.jobRoles?.map((role, index) => (
//                 <span key={index} className="bg-purple-50 text-purple-800 px-2 py-1 rounded text-xs">
//                   {role}
//                 </span>
//               ))}
//             </div>
//           </div>
          
//           {/* Top Companies */}
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//               <Building className="w-4 h-4 text-green-600" />
//               Top Recruiters
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {branch.placementStats?.companies?.map((company, index) => (
//                 <span key={index} className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs">
//                   {company}
//                 </span>
//               ))}
//             </div>
//           </div>
          
//           {/* Popular Colleges */}
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//               <Award className="w-4 h-4 text-orange-600" />
//               Popular Colleges
//             </h4>
//             <div className="space-y-1">
//               {branch.popularColleges?.map((college, index) => (
//                 <div key={index} className="text-sm text-gray-700">• {college}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Branches Section Component
// const BranchesSection = ({ data = courseData }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name');
  
//   const filteredBranches = data.branches?.filter(branch =>
//     branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     branch.description.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];
  
//   const sortedBranches = [...filteredBranches].sort((a, b) => {
//     switch (sortBy) {
//       case 'salary':
//         return parseInt(b.placementStats?.averageSalary2025?.replace(/[^\d]/g, '') || '0') - 
//                parseInt(a.placementStats?.averageSalary2025?.replace(/[^\d]/g, '') || '0');
//       case 'name':
//       default:
//         return a.branchName.localeCompare(b.branchName);
//     }
//   });
  
//   return (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//           <div className="bg-purple-100 p-2 rounded-lg">
//             <BookOpen className="w-8 h-8 text-purple-600" />
//           </div>
//           Specializations ({data.branches?.length || 0})
//         </h2>
//       </div>
      
//       {/* Search and Filter */}
//       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search branches..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           >
//             <option value="name">Sort by Name</option>
//             <option value="salary">Sort by Salary</option>
//           </select>
//         </div>
//       </div>
      
//       {/* Branches Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {sortedBranches.map((branch) => (
//           <BranchCard key={branch.branchId} branch={branch} />
//         ))}
//       </div>
      
//       {sortedBranches.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <Search className="w-16 h-16 mx-auto" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-600 mb-2">No branches found</h3>
//           <p className="text-gray-500">Try adjusting your search terms</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Page Component
// export default function CoursePage({ params = { courseId: 'ENGINEERING' } }) {
//   // Replace this with your actual data fetching logic
//   const courseData = courseData;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 pointer-events-none"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none"></div>
      
//       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <CourseHeader data={courseData} />
//         <CourseOverview data={courseData} />
//         <BranchesSection data={courseData} />
//       </main>
//     </div>
//   );
// }


import React from 'react';
import Link from 'next/link';
import CourseHeader from './components/CourseHeader';
import CourseOverview from './components/CourseOverview';
// import AdmissionProcess from './components/AdmissionProcess';
import ExamInfo from './components/ExamInfo';
import PlacementStats from './components/PlacementStats';
import FAQSection from './components/FAQSection';
// import BranchesSection from './components/BranchesSection';
import CourseStats from './components/CourseStats';
import { CourseData } from './types/course';
import BranchesSection from './components/BranchesSection';
import AdmissionProcess from './components/AdmissionProcess';

type Props = {
  params: { courseId: string }
};

export default async function CoursePage({ params }: Props) {
  const { courseId } = await params;
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/getCourseById?courseId=${courseId}`;
  
  const res = await fetch(apiUrl,{
      headers: {
      Accept: 'application/json',
    },
    cache:'no-cache'
  });
  
  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <h2 className="font-bold text-lg mb-2">Error Loading Course</h2>
            <p>Failed to load course data. Please try again later.</p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link
            href="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  let courseData: CourseData;
  
  try {
    courseData = await res.json();
  } catch (error) {
    console.error('Error parsing course data:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <h2 className="font-bold text-lg mb-2">Data Processing Error</h2>
            <p>There was an error processing the course information.</p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unable to Load Course Data</h1>
          <p className="text-gray-600 mb-6">Please contact support if this issue persists.</p>
          <Link
            href="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  // Set dynamic background and theme based on course type
  const getBackgroundStyle = (courseName: string) => {
    const courseType = courseName.toLowerCase();
    
    if (courseType.includes('health') || courseType.includes('medical')) {
      return {
        gradient: 'from-green-50/50 to-emerald-50/50',
        radial: 'bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.05),transparent_50%)]'
      };
    } else if (courseType.includes('engineering') || courseType.includes('technology')) {
      return {
        gradient: 'from-blue-50/50 to-indigo-50/50',
        radial: 'bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent_50%)]'
      };
    } else if (courseType.includes('law') || courseType.includes('legal')) {
      return {
        gradient: 'from-amber-50/50 to-orange-50/50',
        radial: 'bg-[radial-gradient(circle_at_30%_40%,rgba(245,158,11,0.05),transparent_50%)]'
      };
    } else if (courseType.includes('management') || courseType.includes('business')) {
      return {
        gradient: 'from-purple-50/50 to-violet-50/50',
        radial: 'bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_50%)]'
      };
    }
    
    // Default theme
    return {
      gradient: 'from-gray-50/50 to-slate-50/50',
      radial: 'bg-[radial-gradient(circle_at_30%_40%,rgba(100,116,139,0.05),transparent_50%)]'
    };
  };

  const backgroundStyle = getBackgroundStyle(courseData.courseName);
  console.log(courseData.courseName)
  return (
    // 🔧 FIX 2: Remove the <head> section - metadata is handled by generateMetadata
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundStyle.gradient} pointer-events-none`}></div>
      <div className={`absolute inset-0 ${backgroundStyle.radial} pointer-events-none`}></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <CourseHeader data={courseData} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Overview */}
            <CourseOverview data={courseData} />
            
            {/* Admission Process */}
            <AdmissionProcess data={courseData} />
            
            {/* Entrance Exam Information */}
            <ExamInfo data={courseData} />
            
            {/* Placement Statistics */}
            <PlacementStats data={courseData} />

              {/* Branches/Specializations */}
            <BranchesSection data={courseData} />
            
            {/* FAQ Section */}
            <FAQSection data={courseData} />
          
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CourseStats data={courseData} />
            </div>
          </div>
        </div>


        
        {/* Footer Actions */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your {courseData.courseName} Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore colleges offering {courseData.courseName} programs and take the first step towards your career in this field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Find Colleges
              </button>
              <button className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors">
                Download Brochure
              </button>
              <button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Get Counseling
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for dynamic routes (optional, for better performance)
export async function generateStaticParams() {
  return [
    { courseId: 'HEALTH_SCIENCE' },
    { courseId: 'ENGINEERING' },
    { courseId: 'LAW' },
    { courseId: 'MANAGEMENT' },
  ];
}

// Generate metadata dynamically (Next.js 13+ App Router)
export async function generateMetadata({ params }: Props) {
  const { courseId } = await params;
  
  try {
    const apiUrl =`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/getCourseById?courseId=${courseId}`;
    const res = await fetch(apiUrl, { 
      headers:{
        Accept:'application/json'
      },
      cache: 'no-store' });
    
    if (!res.ok) {
      return {
        title: 'Course Not Found',
        description: 'The requested course could not be found.'
      };
    }
    
    const courseData = await res.json();
    
    return {
      title: `${courseData.courseName} Course Details | ${courseData.streamLevel}`,
      description: `Explore ${courseData.courseName} course with ${courseData.branches?.length || 0} specializations. Learn about admission process, placement statistics, entrance exams, and career opportunities.`,
      keywords: `${courseData.courseName}, ${courseData.courseType}, ${courseData.streamLevel}, admission, placement, career`,
      openGraph: {
        title: `${courseData.courseName} Course Details`,
        description: `Complete information about ${courseData.courseName} course including specializations, admissions, and placements.`,
        type: 'website',
      },
    };
  } catch (e) {
    return {
      title: 'Course Information',
      description: 'Course details and information'
    };
  }
}
