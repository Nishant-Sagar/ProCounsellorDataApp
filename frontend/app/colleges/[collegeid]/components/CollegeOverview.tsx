import { Info, Building, GraduationCap } from 'lucide-react';
import { CollegeData } from '../../types/college';

const CollegeOverview = ({ college }: { college: CollegeData }) => (
  <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg"><Info className="w-6 h-6 text-blue-600" /></div>
          About the University
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">{college.collegeInfo}</p>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg"><GraduationCap className="w-6 h-6 text-green-600" /></div>
          Courses Offered
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Array.isArray(college.coursesOffered) ? college.coursesOffered : [college.coursesOffered]).map((program) => (
            <div key={program.courseId} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors">
              <div className="font-semibold text-gray-900">{program.streamName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-purple-600" />
          Infrastructure
        </h3>
        <p className="text-sm text-gray-700 line-clamp-6">{college.Infrastructure?.infraDescription || 'Detailed infrastructure information not available.'}</p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
        <p className="text-blue-100 mb-4">Start your journey today</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
          Visit Website
        </button>
      </div>
    </div>
  </section>
);

export default CollegeOverview;

