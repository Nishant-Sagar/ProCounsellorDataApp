// 'use client';

// import { useState } from 'react';
// import { Award, ChevronDown, ChevronUp, GraduationCap, Users, Eye } from 'lucide-react';

// type Scholarship = {
//   scholarshipDescription: string;
// };

// type ScholarshipsProps = {
//   college: {
//     Scholarships?: Scholarship[] | Scholarship; // Can be array or single object
//   };
// };

// export default function Scholarships({ college }: ScholarshipsProps) {
//   const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);
//   const [showAll, setShowAll] = useState(false);

//   // Convert to array if it's a single object, handle null/undefined
//   const scholarships = Array.isArray(college.Scholarships) 
//     ? college.Scholarships 
//     : college.Scholarships 
//       ? [college.Scholarships] 
//       : [];

//   if (!scholarships || scholarships.length === 0) {
//     return (
//       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//         <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
//           <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded-lg">
//             <Award className="w-6 h-6 text-yellow-600" />
//           </div>
//           Scholarships
//         </h3>
//         <div className="text-center py-12">
//           <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//             <Award className="w-8 h-8 text-gray-400" />
//           </div>
//           <p className="text-gray-500">No scholarship information available.</p>
//         </div>
//       </div>
//     );
//   }

//   const toggleScholarship = (index: number) => {
//     setExpandedScholarship(expandedScholarship === index ? null : index);
//   };

//   // Show only first 2 scholarships unless "showAll" is true
//   const displayedScholarships = showAll ? scholarships : scholarships.slice(0, 2);

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//           <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded-lg">
//             <Award className="w-6 h-6 text-yellow-600" />
//           </div>
//           Scholarships & Financial Aid
//         </h3>
//         <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
//           {showAll ? scholarships.length : Math.min(2, scholarships.length)} of {scholarships.length}
//         </div>
//       </div>

//       <div className="space-y-3">
//         {displayedScholarships.map((scholarship, index) => (
//           <div 
//             key={index} 
//             className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
//           >
//             {/* Scholarship Header */}
//             <div 
//               className="flex items-center justify-between p-4 cursor-pointer hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-200"
//               onClick={() => toggleScholarship(index)}
//             >
//               <div className="flex items-center gap-4 flex-1">
//                 {/* Scholarship Icon */}
//                 <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
//                   <GraduationCap className="w-6 h-6 text-yellow-600" />
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">
//                     {scholarship.scholarshipDescription?.split('.')[0] || 'Scholarship Program'}
//                   </h4>
//                   <div className="flex items-center gap-2">
//                     <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//                       Financial Aid
//                     </span>
//                     <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//                       <Users className="w-3 h-3" />
//                       Students
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 text-yellow-600">
//                 <span className="text-sm font-medium hidden sm:block">
//                   {expandedScholarship === index ? 'Less' : 'Details'}
//                 </span>
//                 {expandedScholarship === index ? (
//                   <ChevronUp className="w-5 h-5" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5" />
//                 )}
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {expandedScholarship === index && (
//               <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-yellow-50/30 p-6">
//                 <h5 className="font-bold text-gray-900 mb-4 text-lg">
//                   Scholarship Details
//                 </h5>
//                 <p className="text-gray-700 leading-relaxed text-base">
//                   {scholarship.scholarshipDescription}
//                 </p>

//                 {/* Additional Info */}
//                 <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Award className="w-4 h-4 text-yellow-600" />
//                     <span className="font-semibold text-yellow-800">How to Apply</span>
//                   </div>
//                   <p className="text-sm text-yellow-700">
//                     Contact the college admission office for application procedures and eligibility criteria for this scholarship program.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* See More / See Less Button - Only show when more than 2 scholarships */}
//       {scholarships.length > 2 && (
//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <button 
//             onClick={() => setShowAll(!showAll)}
//             className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
//           >
//             <Eye className="w-5 h-5" />
//             {showAll ? 'Show Less' : `See More Scholarships`}
//             <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
//               {showAll ? `Hide ${scholarships.length - 2}` : `+${scholarships.length - 2} More`}
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Award, ChevronDown, ChevronUp, GraduationCap, Users, Eye, Info, DollarSign } from 'lucide-react';

type Scholarship = {
  scholarshipDescription: string;
};

type ScholarshipsProps = {
  college: {
    Scholarships?: Scholarship[] | Scholarship; // Can be array or single object
  };
};

export default function Scholarships({ college }: ScholarshipsProps) {
  const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Convert to array if it's a single object, handle null/undefined
  const scholarships = Array.isArray(college.Scholarships) 
    ? college.Scholarships 
    : college.Scholarships 
      ? [college.Scholarships] 
      : [];

  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          Scholarships & Financial Aid
        </h2>
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No scholarship information available.</p>
        </div>
      </div>
    );
  }

  const toggleScholarship = (index: number) => {
    setExpandedScholarship(expandedScholarship === index ? null : index);
  };

  // Show only first 2 scholarships unless "showAll" is true
  const displayedScholarships = showAll ? scholarships : scholarships.slice(0, 2);

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-yellow-100 p-2 rounded-lg">
          <Award className="w-6 h-6 text-yellow-600" />
        </div>
        Scholarships & Financial Aid
      </h2>

      <div className="space-y-4">
        {displayedScholarships.map((scholarship, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Scholarship Header */}
            <div 
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-100 hover:border-yellow-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => toggleScholarship(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {scholarship.scholarshipDescription?.split('.')[0] || 'Scholarship Program'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-white/60 px-2 py-1 rounded-full">
                        Financial Aid
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Students Eligible
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-sm font-medium hidden sm:block">
                    {expandedScholarship === index ? 'Less' : 'Details'}
                  </span>
                  {expandedScholarship === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Scholarship Content */}
            {expandedScholarship === index && (
              <div className="border-t border-gray-200 bg-gray-50">
                {/* Scholarship Overview */}
                <div className="p-6 space-y-6">
                  {/* Scholarship Description */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      Scholarship Details
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{scholarship.scholarshipDescription}</p>
                  </div>

                  {/* How to Apply & Additional Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      Application Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <h6 className="font-medium text-gray-900 mb-2">How to Apply</h6>
                        <p className="text-sm text-gray-700">
                          Contact the college admission office for application procedures and eligibility criteria for this scholarship program.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-3">
                        <h6 className="font-medium text-gray-900 mb-2">Eligibility</h6>
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Merit-based
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            Need-based
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            Category-specific
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* See More / See Less Button - Only show when more than 2 scholarships */}
      {scholarships.length > 2 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            {showAll ? 'Show Less' : `See More Scholarships`}
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {showAll ? `Hide ${scholarships.length - 2}` : `+${scholarships.length - 2} More`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
