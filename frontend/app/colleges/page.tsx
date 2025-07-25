// import Link from 'next/link';
// import { XMLParser } from 'fast-xml-parser';
// import { pascalCase } from '../utils/pascalCase';
// import { Button } from '@/components/Button';

// interface College {
//   collegeId: string;
//   collegeName: string;
//   logoUrl: string;
//   collegesLocationState: string;
// }

// export default async function CollegesPage() {
//   const res = await fetch('https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/all');

//   const xml = await res.text();
//   const parser = new XMLParser();
//   const json = parser.parse(xml);
//   const colleges: College[] = json.ArrayList.item;

//   return (
//     <main className="max-w-full min-h-screen bg-gray-50 mx-auto px-4 py-8">      
//       <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//         {colleges.map((college) => {
//           const name = pascalCase(college.collegeName)
//           return (
//           <li
//             key={college.collegeId}
//             className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 hover:shadow-lg transition-shadow"
//           >
//             <img
//               src={college.logoUrl}
//               alt={name}
//               width={64}
//               height={64}
//               className="mb-4 rounded-full object-cover bg-gray-100 object-contain h-16 w-16 "
//             />
//             <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
//               {name}
//             </h2>
//             <p className="text-gray-600 mb-4 text-center">{college.collegesLocationState}</p>
//             <Button variants='secondary' size='md' text='View' link={`/colleges/${college.collegeId}`}/>
//           </li>
//         )
//         })}
//       </ul>
//     </main>
//   );
// }


import Link from 'next/link';
import { XMLParser } from 'fast-xml-parser';
import { pascalCase } from '../utils/pascalCase';
import { Button } from '@/components/Button';
import { Search, Filter, MapPin, Users, Award, ChevronRight, Sparkles, MessageCircle, Smartphone, Star, TrendingUp, Calendar, BookOpen } from 'lucide-react';

interface College {
  collegeId: string;
  collegeName: string;
  logoUrl: string;
  collegesLocationState: string;
}

export default async function CollegesPage() {
  const res = await fetch('https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/all');

  const xml = await res.text();
  const parser = new XMLParser();
  const json = parser.parse(xml);
  const colleges: College[] = json.ArrayList.item;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Discover Your Dream College
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Explore Top Colleges
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the perfect college for your future. Browse through our comprehensive list of top-rated institutions across India.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{colleges.length}+</h3>
            <p className="text-gray-600">Colleges Listed</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{new Set(colleges.map(c => c.collegesLocationState)).size}+</h3>
            <p className="text-gray-600">States Covered</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Verified Information</p>
          </div>
        </div>

        {/* Enhanced Colleges Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {colleges.map((college, index) => {
            const name = pascalCase(college.collegeName);
            
            return (
              <div
                key={college.collegeId}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                {/* Enhanced Card Header with Interactive Elements */}
                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pb-4 overflow-hidden">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>
                  
                  {/* Ranking Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Trending Badge */}
                  {index < 10 && (
                    <div className="absolute top-12 left-4 z-10">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center relative z-10">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow border-4 border-white/50 group-hover:border-blue-200">
                        <img
                          src={college.logoUrl}
                          alt={name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover object-contain"
                        />
                      </div>
                      {/* Achievement Badge */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-3 border-white flex items-center justify-center shadow-md">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>50+ Courses</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>5K+ Students</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 group-hover:skew-y-12 transition-transform duration-1000"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {name}
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <p className="text-gray-600 text-xs font-medium">{college.collegesLocationState}</p>
                    </div>
                  </div>

                  {/* Enhanced Features with Icons */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Engineering
                    </span>
                    <span className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      NAAC A+
                    </span>
                  </div>

                  {/* Admission Status */}
                  <div className="mb-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      <Calendar className="w-3 h-3" />
                      Admissions Open
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={`/colleges/${college.collegeId}`}
                    className="block w-full"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform group-hover:scale-105 flex items-center justify-center gap-2">
                      View Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>

                {/* Enhanced Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200">
            Load More Colleges
          </button>
        </div>

        {/* Talk to Counsellor App Download Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4" />
              Talk to Expert Counsellors
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Get Personalized Guidance</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Download our app to connect with expert counsellors who will help you choose the right college based on your interests, budget, and career goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Google Play Store Button */}
              <a 
                href="https://play.google.com/store/apps/details?id=your.app.package" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-emerald-600/70">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>
              </a>
              
              {/* App Store Button */}
              <a 
                href="https://apps.apple.com/app/your-app-name/idYOUR_APP_ID" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-700/50 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl hover:bg-emerald-700/70 transition-all duration-200 border border-emerald-400/30 flex items-center justify-center gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-white/70">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-emerald-200 text-sm">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Free Download
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Expert Counsellors
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Personalized Guidance
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
