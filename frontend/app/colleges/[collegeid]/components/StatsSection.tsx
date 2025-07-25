import { Users, Award, BookOpen } from 'lucide-react';
import { CollegeData } from '../../types/college';

const getInstitutionType = (text: string = '') => {
    if (text.toLowerCase().includes('public technical')) return 'Public Technical';
    if (text.toLowerCase().includes('public')) return 'Public University';
    if (text.toLowerCase().includes('private')) return 'Private University';
    return 'University';
}

const StatsSection = ({ college }: { college: CollegeData }) => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">14:1</div>
          <div className="text-gray-600">Student-Teacher Ratio</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <Award className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">{getInstitutionType(college.collegeInfo)}</div>
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
          <div className="text-lg font-bold text-gray-900">{college.coursesOffered?.[0]?.branches?.[0]?.fees || 'N/A'}</div>
          <div className="text-gray-600">Approx. Annual Fee</div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
