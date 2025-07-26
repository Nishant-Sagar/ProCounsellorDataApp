// 'use client';

// import { useState } from 'react';
// import { Info, ChevronDown, ChevronUp } from 'lucide-react';
// import { CollegeData } from '../../types/college';

// const CollegeOverview = ({ college }: { college: CollegeData }) => {
//   const [isAboutExpanded, setIsAboutExpanded] = useState(false);

//   // Function to check if text exceeds 12 lines (approximately)
//   const shouldShowReadMore = (text: string) => {
//     // Rough estimation: ~80 characters per line, 12 lines = ~960 characters
//     return text && text.length > 960;
//   };

//   const toggleAboutExpansion = () => {
//     setIsAboutExpanded(!isAboutExpanded);
//   };

//   return (
//     <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//       <div className="lg:col-span-2 space-y-8">
//         {/* About the University with Read More */}
//         <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <Info className="w-6 h-6 text-blue-600" />
//             </div>
//             About the University
//           </h2>
          
//           <div className="relative">
//             <div 
//               className={`text-gray-700 leading-relaxed text-lg transition-all duration-300 ease-in-out ${
//                 isAboutExpanded ? 'max-h-none' : 'max-h-80 overflow-hidden'
//               }`}
//             >
//               {college.collegeInfo}
//             </div>
            
//             {/* Fade overlay when collapsed */}
//             {!isAboutExpanded && shouldShowReadMore(college.collegeInfo) && (
//               <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
//             )}
//           </div>

//           {/* Read More/Less Button */}
//           {shouldShowReadMore(college.collegeInfo) && (
//             <div className="mt-4">
//               <button
//                 onClick={toggleAboutExpansion}
//                 className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group"
//               >
//                 <span>{isAboutExpanded ? 'Show Less' : 'Read More'}</span>
//                 {isAboutExpanded ? (
//                   <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//                 )}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Empty sidebar - Infrastructure will be placed here from page.tsx */}
//       <div className="space-y-6">
//         {/* This space will be filled by Infrastructure component from page.tsx */}
//       </div>
//     </section>
//   );
// };

// export default CollegeOverview;


'use client';

import { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { CollegeData } from '../../types/college';

const CollegeOverview = ({ college }: { college: CollegeData }) => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const shouldShowReadMore = (text: string) => {
    // Reduced from 960 to 480 characters (about 6 lines instead of 12)
    return text && text.length > 480;
  };

  const toggleAboutExpansion = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  return (
    // Reduced padding and height to match other sections
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        About the University
      </h2>
      
      <div className="relative">
        <div 
          className={`text-gray-700 leading-relaxed text-base transition-all duration-300 ease-in-out ${
            isAboutExpanded ? 'max-h-none' : 'max-h-32 overflow-hidden'
          }`}
        >
          {college.collegeInfo}
        </div>
        
        {!isAboutExpanded && shouldShowReadMore(college.collegeInfo) && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {shouldShowReadMore(college.collegeInfo) && (
        <div className="mt-3">
          <button
            onClick={toggleAboutExpansion}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
          >
            <span>{isAboutExpanded ? 'Show Less' : 'Read More'}</span>
            {isAboutExpanded ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CollegeOverview;
