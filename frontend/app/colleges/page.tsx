import Link from 'next/link';
import { XMLParser } from 'fast-xml-parser';
import { pascalCase } from '../utils/pascalCase';
import { Button } from '@/components/Button';
import { Search, Filter, MapPin, Users, Award, ChevronRight, Sparkles, MessageCircle, Smartphone, Star, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import ParticlesBackground from './[collegeid]/components/ParticlesBackground';
import AppLink from '@/components/AppLink';

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
    <>
    <div className="min-h-screen bg-gray-50 over">
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
    </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
            <div className="relative overflow-hidden mb-12">
            <ParticlesBackground />

            <div className="relative z-10 text-center mb-12">
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
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
          </div>

          <AppLink/>

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
      </main>
    </div>
    </>
  );
}
