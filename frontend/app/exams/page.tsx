
// import Link from 'next/link';
// import { XMLParser } from 'fast-xml-parser';
// import { 
//   BookOpen, 
//   Users, 
//   Award, 
//   Clock, 
//   Calendar, 
//   Target, 
//   Globe,
//   TrendingUp,
//   Star,
//   ChevronRight,
//   Sparkles,
//   MessageCircle,
//   Smartphone,
//   Zap,
//   Shield
// } from 'lucide-react';

// interface Exam {
//   examId: string;
//   examName: string;
//   fullForm: string;
//   examLevel: string;
//   examType: string;
//   mode: string[];
//   conductingBody: string;
//   officialWebsite: string;
//   applicationFees: {
//     general: string;
//     obc: string;
//     sc_st: string;
//   };
//   eligibility: string;
//   subjectsTested: string[];
//   maxMarks: string;
//   duration: string;
//   examFrequency: string;
//   coursesLinked: string[];
// }

// export default async function ExamsPage() {
//   let exams: Exam[] = [];
  
//   try {
//     // Handle XML response like your colleges page
//     const res = await fetch('https://procounsellor-backend-1000407154647.asia-south1.run.app/api/exams/all');
    
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
    
//     // Parse XML instead of JSON
//     const xml = await res.text();
//     const parser = new XMLParser();
//     const json = parser.parse(xml);
    
//     // Adjust this based on your XML structure
//     exams = json.List?.item || json.ArrayList?.item || [];
    
//   } catch (error) {
//     console.error('Error fetching exams:', error);
//     // Mock data for development/fallback
//     exams = [
//       {
//         examId: "JEE_MAIN",
//         examName: "JEE Main",
//         fullForm: "Joint Entrance Examination Main",
//         examLevel: "Undergraduate",
//         examType: "National",
//         mode: ["Online"],
//         conductingBody: "NTA",
//         officialWebsite: "https://jeemain.nta.nic.in",
//         applicationFees: {
//           general: "₹1000",
//           obc: "₹500",
//           sc_st: "₹500"
//         },
//         eligibility: "12th pass",
//         subjectsTested: ["Physics", "Chemistry", "Mathematics"],
//         maxMarks: "300",
//         duration: "3 hours",
//         examFrequency: "Twice a year",
//         coursesLinked: ["B.Tech"]
//       },
//       {
//         examId: "NEET_UG",
//         examName: "NEET UG",
//         fullForm: "National Eligibility cum Entrance Test",
//         examLevel: "Undergraduate",
//         examType: "National",
//         mode: ["Offline"],
//         conductingBody: "NTA",
//         officialWebsite: "https://neet.nta.nic.in",
//         applicationFees: {
//           general: "₹1700",
//           obc: "₹1500",
//           sc_st: "₹900"
//         },
//         eligibility: "12th pass",
//         subjectsTested: ["Physics", "Chemistry", "Biology"],
//         maxMarks: "720",
//         duration: "3 hours",
//         examFrequency: "Once a year",
//         coursesLinked: ["MBBS"]
//       },
//       {
//         examId: "CAT",
//         examName: "CAT",
//         fullForm: "Common Admission Test",
//         examLevel: "Postgraduate",
//         examType: "National",
//         mode: ["Online"],
//         conductingBody: "IIMs",
//         officialWebsite: "https://iimcat.ac.in",
//         applicationFees: {
//           general: "₹2300",
//           obc: "₹1150",
//           sc_st: "₹1150"
//         },
//         eligibility: "Graduate",
//         subjectsTested: ["Quantitative Ability", "Data Interpretation", "Verbal Ability"],
//         maxMarks: "300",
//         duration: "2 hours",
//         examFrequency: "Once a year",
//         coursesLinked: ["MBA"]
//       }
//     ];
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Enhanced Background with Multiple Gradients */}
//       <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 pointer-events-none"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,146,60,0.08),transparent_50%)] pointer-events-none"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.05),transparent_50%)] pointer-events-none"></div>
      
//       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Enhanced Hero Section with Animations */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4 animate-pulse">
//             <Sparkles className="w-4 h-4 animate-spin" />
//             Discover Entrance Exams
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
//             Explore Entrance Exams
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Find comprehensive information about entrance exams for your desired courses and colleges across India.
//           </p>
//         </div>

//         {/* Enhanced Stats Section with Glow Effects */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-100 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
//             <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
//               <BookOpen className="w-6 h-6 text-orange-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">{exams.length}+</h3>
//             <p className="text-gray-600">Exams Listed</p>
//           </div>
          
//           <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-green-100 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
//             <div className="bg-gradient-to-br from-green-100 to-emerald-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
//               <Target className="w-6 h-6 text-green-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">All Levels</h3>
//             <p className="text-gray-600">UG & PG Covered</p>
//           </div>
          
//           <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-purple-100 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
//             <div className="bg-gradient-to-br from-purple-100 to-violet-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
//               <Award className="w-6 h-6 text-purple-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
//             <p className="text-gray-600">Updated Info</p>
//           </div>
//         </div>

//         {/* Enhanced Exams Grid */}
//         {exams && exams.length > 0 ? (
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {exams.map((exam, index) => (
//               <ExamCard key={exam.examId} exam={exam} index={index} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
//               <BookOpen className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-600 mb-2">Unable to load exams</h3>
//             <p className="text-gray-500 text-lg">Please check your connection or try again later.</p>
//           </div>
//         )}

//         {/* Enhanced Load More Section */}
//         {exams && exams.length > 0 && (
//           <div className="text-center mt-12">
//             <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//               Load More Exams
//             </button>
//           </div>
//         )}

//         {/* App Download Section */}
//         <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-2xl">
//           <div className="max-w-4xl mx-auto">
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <MessageCircle className="w-4 h-4" />
//               Get Exam Guidance
//             </div>
            
//             <h2 className="text-3xl font-bold mb-4">Prepare Better with Expert Help</h2>
//             <p className="text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
//               Download our app to get personalized exam preparation guidance and tips from experts.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a 
//                 href="https://play.google.com/store/apps/details?id=your.app.package" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//               >
//                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
//                 </svg>
//                 <div className="text-left">
//                   <div className="text-xs text-emerald-600/70">Get it on</div>
//                   <div className="text-sm font-bold">Google Play</div>
//                 </div>
//               </a>
              
//               <a 
//                 href="https://apps.apple.com/app/your-app-name/idYOUR_APP_ID" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="bg-emerald-700/50 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl hover:bg-emerald-700/70 transition-all duration-200 border border-emerald-400/30 flex items-center justify-center gap-3"
//               >
//                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
//                 </svg>
//                 <div className="text-left">
//                   <div className="text-xs text-white/70">Download on the</div>
//                   <div className="text-sm font-bold">App Store</div>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// // Enhanced Exam Card with Perfect Button Alignment and Cool Effects
// const ExamCard = ({ exam, index }: { exam: Exam; index: number }) => {
//   // Text trimming function for consistency
//   const trimToTwoWords = (text: string) => {
//     if (!text) return 'N/A';
//     const words = text.split(' ');
//     return words.length <= 2 ? text : words.slice(0, 2).join(' ');
//   };

//   return (
//     <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
//       {/* Magical Glow Effect */}
//       <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500 blur"></div>
      
//       {/* Enhanced Card Header with Stunning Effects */}
//       <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6 overflow-hidden h-32">
//         {/* Multiple Floating Elements */}
//         <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200/40 to-red-200/40 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700"></div>
//         <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-200/30 to-orange-200/30 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 group-hover:-rotate-180 transition-all duration-700"></div>
//         <div className="absolute top-2 left-1/2 w-8 h-8 bg-gradient-to-r from-yellow-200/50 to-orange-200/50 rounded-full group-hover:animate-bounce"></div>
        
//         {/* Ranking Badge with Glow */}
//         <div className="absolute top-4 right-4 z-10">
//           <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
//             #{index + 1}
//           </div>
//         </div>

//         {/* Animated Stars */}
//         <div className="absolute top-4 left-4 z-10">
//           <div className="flex items-center gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star 
//                 key={i} 
//                 className={`w-3 h-3 transition-all duration-300 ${i < 4 ? 'text-yellow-400 fill-current group-hover:animate-pulse' : 'text-gray-300'}`}
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Popular Badge with Animation */}
//         {index < 5 && (
//           <div className="absolute top-12 left-4 z-10">
//             <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg group-hover:animate-pulse">
//               <TrendingUp className="w-3 h-3 animate-bounce" />
//               Popular
//             </div>
//           </div>
//         )}
        
//         {/* Enhanced Icon with Multiple Effects */}
//         <div className="flex flex-col items-center justify-center h-full relative z-10">
//           <div className="relative">
//             <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 border-4 border-orange-100 group-hover:border-orange-300">
//               <BookOpen className="w-10 h-10 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
//             </div>
//             {/* Rotating Achievement Badge */}
//             <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg group-hover:rotate-180 transition-all duration-500">
//               <Award className="w-4 h-4 text-white" />
//             </div>
//             {/* Extra Glow Ring */}
//             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 scale-125 animate-ping"></div>
//           </div>
//         </div>

//         {/* Moving Shimmer Effect */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 group-hover:skew-y-12 group-hover:translate-x-full transition-all duration-1000"></div>
//       </div>

//       {/* Fixed Content Structure for Perfect Button Alignment */}
//       <div className="relative p-6 flex flex-col h-64">
//         {/* Exam Name - Fixed Height */}
//         <div className="h-12 flex items-center justify-center mb-3">
//           <h2 className="text-lg font-bold text-gray-900 text-center line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
//             {exam.examName || 'Unknown Exam'}
//           </h2>
//         </div>
        
//         {/* Exam Type Badge - Fixed Height */}
//         <div className="h-6 flex items-center justify-center mb-3">
//           <span className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
//             {trimToTwoWords(exam.examType || 'State-level')}
//           </span>
//         </div>

//         {/* Exam Level Badge - Fixed Height */}
//         <div className="h-6 flex items-center justify-center mb-3">
//           <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
//             {trimToTwoWords(exam.examLevel || 'Postgraduate')} Entrance
//           </span>
//         </div>

//         {/* Fee Information - Fixed Height */}
//         <div className="h-5 flex items-center justify-center mb-3">
//           <span className="text-gray-600 text-sm font-medium">
//             Fee: {exam.applicationFees?.general || 'N/A'}
//           </span>
//         </div>

//         {/* Duration Information - Fixed Height */}
//         <div className="h-5 flex items-center justify-center mb-6">
//           <span className="text-gray-600 text-sm font-medium flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             {exam.duration || 'N/A'}
//           </span>
//         </div>

//         {/* Perfectly Aligned CTA Button */}
//         <div className="mt-auto">
//           <Link href={`/exams/${exam.examId}`}>
//             <div className="relative bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105 flex items-center justify-center gap-2 overflow-hidden">
//               {/* Button Shine Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               <span className="relative">View Details</span>
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative" />
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* Enhanced Hover Overlay with Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//     </div>
//   );
// };


import Link from 'next/link';
import { 
  BookOpen, 
  Award,  
  Target, 
  TrendingUp,
  ChevronRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import AppLink from '@/components/AppLink';

interface Exam {
  examId: string;
  examName: string;
  fullForm: string;
  examLevel: string;
  examType: string;
  mode: string[];
  conductingBody: string;
  officialWebsite: string;
  applicationFees: {
    general: string;
    obc: string;
    sc_st: string;
  };
  eligibility: string;
  subjectsTested: string[];
  maxMarks: string;
  duration: string;
  examFrequency: string;
  coursesLinked: string[];
}

export default async function ExamsPage() {
  let exams: Exam[] = [];
  
  try {
    // Handle XML response like your colleges page
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/all`, {
      headers:{
        Accept:'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    exams = await res.json()
    
  } catch (error) {
    console.error('Error fetching exams:', error);
    // Mock data for development/fallback
    exams = [
      {
        examId: "JEE_MAIN",
        examName: "JEE Main",
        fullForm: "Joint Entrance Examination Main",
        examLevel: "Undergraduate",
        examType: "National",
        mode: ["Online"],
        conductingBody: "NTA",
        officialWebsite: "https://jeemain.nta.nic.in",
        applicationFees: {
          general: "₹1000",
          obc: "₹500",
          sc_st: "₹500"
        },
        eligibility: "12th pass",
        subjectsTested: ["Physics", "Chemistry", "Mathematics"],
        maxMarks: "300",
        duration: "3 hours",

        examFrequency: "Twice a year",
        coursesLinked: ["B.Tech"]
      },
      {
        examId: "NEET_UG",
        examName: "NEET UG",
        fullForm: "National Eligibility cum Entrance Test",
        examLevel: "Undergraduate",
        examType: "National",
        mode: ["Offline"],
        conductingBody: "NTA",
        officialWebsite: "https://neet.nta.nic.in",
        applicationFees: {
          general: "₹1700",
          obc: "₹1500",
          sc_st: "₹900"
        },
        eligibility: "12th pass",
        subjectsTested: ["Physics", "Chemistry", "Biology"],
        maxMarks: "720",
        duration: "3 hours",
        examFrequency: "Once a year",
        coursesLinked: ["MBBS"]
      },
      {
        examId: "CAT",
        examName: "CAT",
        fullForm: "Common Admission Test",
        examLevel: "Postgraduate",
        examType: "National",
        mode: ["Online"],
        conductingBody: "IIMs",
        officialWebsite: "https://iimcat.ac.in",
        applicationFees: {
          general: "₹2300",
          obc: "₹1150",
          sc_st: "₹1150"
        },
        eligibility: "Graduate",
        subjectsTested: ["Quantitative Ability", "Data Interpretation", "Verbal Ability"],
        maxMarks: "300",
        duration: "2 hours",
        examFrequency: "Once a year",
        coursesLinked: ["MBA"]
      }
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,146,60,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.05),transparent_50%)] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section with Animations */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4 animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            Discover Entrance Exams
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text animate-pulse">
            Explore Entrance Exams
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find comprehensive information about entrance exams for your desired courses and colleges across India.
          </p>
        </div>

        {/* Enhanced Stats Section with Glow Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-100 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{exams.length}+</h3>
            <p className="text-gray-600">Exams Listed</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-green-100 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">All Levels</h3>
            <p className="text-gray-600">UG & PG Covered</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-purple-100 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-purple-100 to-violet-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Updated Info</p>
          </div>
        </div>

        <AppLink/>

        {/* Enhanced Exams Grid */}
        {exams && exams.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exams.map((exam, index) => (
              <ExamCard key={exam.examId} exam={exam} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Unable to load exams</h3>
            <p className="text-gray-500 text-lg">Please check your connection or try again later.</p>
          </div>
        )}

        {/* Enhanced Load More Section */}
        {exams && exams.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Load More Exams
            </button>
          </div>
        )}

        {/* App Download Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4" />
              Get Exam Guidance
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Prepare Better with Expert Help</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Download our app to get personalized exam preparation guidance and tips from experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://play.google.com/store/apps/details?id=your.app.package" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-emerald-600/70">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
              
              <a 
                href="https://apps.apple.com/app/your-app-name/idYOUR_APP_ID" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-700/50 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl hover:bg-emerald-700/70 transition-all duration-200 border border-emerald-400/30 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white/70">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Enhanced Exam Card with Hover Tooltip and Larger Size
const ExamCard = ({ exam, index }: { exam: Exam; index: number }) => {
    // Text trimming function for consistency
    const trimToTwoWords = (text: string) => {
      if (!text) return 'N/A';
      const words = text.split(' ');
      return words.length <= 2 ? text : words.slice(0, 2).join(' ');
    };
  
    return (
      <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
        {/* Magical Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500 blur"></div>
        
        {/* Enhanced Card Header with Logo and Fee Info */}
        <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6 overflow-hidden h-36">
          {/* Multiple Floating Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200/40 to-red-200/40 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-200/30 to-orange-200/30 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 group-hover:-rotate-180 transition-all duration-700"></div>
          <div className="absolute top-2 left-1/2 w-8 h-8 bg-gradient-to-r from-yellow-200/50 to-orange-200/50 rounded-full group-hover:animate-bounce"></div>
          
          {/* Popular Badge with Animation - Only for first 5 */}
          {index < 5 && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg group-hover:animate-pulse">
                <TrendingUp className="w-3 h-3 animate-bounce" />
                Popular
              </div>
            </div>
          )}
          
          {/* Fee Information near Logo */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm">
              <div className="text-xs text-gray-600 text-center">
                <div>Fee: {exam.applicationFees?.general || 'N/A'}</div>
                <div className="mt-1">{exam.duration || 'N/A'}</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Icon with Multiple Effects */}
          <div className="flex flex-col items-center justify-center h-full relative z-10">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 border-4 border-orange-100 group-hover:border-orange-300">
                <BookOpen className="w-10 h-10 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
              </div>
              {/* Rotating Achievement Badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg group-hover:rotate-180 transition-all duration-500">
                <Award className="w-4 h-4 text-white" />
              </div>
              {/* Extra Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 scale-125 animate-ping"></div>
            </div>
          </div>
  
          {/* Moving Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 group-hover:skew-y-12 group-hover:translate-x-full transition-all duration-1000"></div>
        </div>
  
        {/* Fixed Content Structure - INCREASED HEIGHT for Better Spacing */}
        <div className="relative p-6 flex flex-col h-60">
          {/* Exam Name with Hover Tooltip - Fixed Height (Single Line) */}
          <div className="h-8 flex items-center justify-center mb-6 relative">
            <div className="relative group/tooltip w-full">
              <h2 className="text-lg font-bold text-gray-900 text-center group-hover:text-orange-600 transition-colors duration-300 w-full overflow-hidden text-ellipsis whitespace-nowrap px-2">
                {exam.examName || 'Unknown Exam'}
              </h2>
              
              {/* Hover Tooltip for Full Name */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap max-w-xs">
                {exam.examName || 'Unknown Exam'}
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
          
          {/* Exam Level Badge - Fixed Height */}
          <div className="h-6 flex items-center justify-center mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              {trimToTwoWords(exam.examLevel || 'Undergraduate')} Entrance
            </span>
          </div>
  
          {/* Exam Type Badge - Fixed Height */}
          <div className="h-6 flex items-center justify-center mb-8">
            <span className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              {trimToTwoWords(exam.examType || 'National')} Entrance
            </span>
          </div>
  
          {/* Perfectly Aligned CTA Button with More Space Above */}
          <div className="mt-auto">
            <Link href={`/exams/${exam.examId}`}>
              <div className="relative bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105 flex items-center justify-center gap-2 overflow-hidden">
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative">View Details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative" />
              </div>
            </Link>

          </div>
        </div>
  
        {/* Enhanced Hover Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    );
  };
  