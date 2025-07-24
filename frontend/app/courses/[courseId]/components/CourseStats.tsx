import { 
    TrendingUp, 
    Users, 
    Clock, 
    Award, 
    BookOpen, 
    Briefcase, 
    GraduationCap,
    Building,
    Target,
    Heart
  } from 'lucide-react';
  import { CourseData } from '../types/course';
  
  type CourseStatsProps = {
    data: CourseData;
  };
  
  export default function CourseStats({ data }: CourseStatsProps) {
    // Calculate comprehensive statistics
    const totalCompanies = new Set<string>();
    const totalColleges = new Set<string>();
    const totalJobRoles = new Set<string>();
    const allExams = new Set<string>();
  
    data.branches?.forEach(branch => {
      branch.placementStats?.companies?.forEach(company => totalCompanies.add(company));
      branch.popularColleges?.forEach(college => totalColleges.add(college));
      branch.jobRoles?.forEach(role => totalJobRoles.add(role));
      branch.examId?.forEach(exam => {
        if (exam !== 'NA') allExams.add(exam);
      });
    });
  
    // Calculate average fees
    const feeRanges = data.branches?.map(branch => {
      const feeString = branch.averageFeesRange?.replace(/[^\d.-]/g, '') || '0';
      const fees = feeString.split('–').map(f => parseFloat(f)).filter(f => !isNaN(f));
      return fees.length > 0 ? fees[0] : 0;
    }).filter(fee => fee > 0);
  
    const avgFees = feeRanges?.length > 0 
      ? (feeRanges.reduce((a, b) => a + b, 0) / feeRanges.length).toFixed(1)
      : 'N/A';
  
    return (
      <div className="space-y-6">
        {/* Course Highlights */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            {data.courseName} Highlights
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Stream Level</span>
              <span className="font-semibold text-gray-900">{data.streamLevel}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Course Type</span>
              <span className="font-semibold text-gray-900">{data.courseType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold text-gray-900">2 Years</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Specializations</span>
              <span className="font-semibold text-gray-900">{data.branches?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Avg. Fees</span>
              <span className="font-semibold text-gray-900">₹{avgFees} LPA</span>
            </div>
          </div>
        </div>
  
        {/* Career Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Career Opportunities
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Job Roles</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">{totalJobRoles.size}</div>
              <div className="text-sm text-blue-600">Career positions</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <Building className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Healthcare Employers</span>
              </div>
              <div className="text-2xl font-bold text-green-800">{totalCompanies.size}</div>
              <div className="text-sm text-green-600">Organizations hiring</div>
            </div>
          </div>
        </div>
  
        {/* Academic Information */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Academic Details
          </h3>
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Top Colleges</span>
              </div>
              <div className="text-2xl font-bold text-purple-800">{totalColleges.size}</div>
              <div className="text-sm text-purple-600">Premier institutions</div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-indigo-900">Entrance Exams</span>
              </div>
              <div className="text-2xl font-bold text-indigo-800">{allExams.size}</div>
              <div className="text-sm text-indigo-600">Admission tests</div>
            </div>
          </div>
        </div>
  
        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white text-center">
          <Heart className="w-8 h-8 mx-auto mb-3 text-white" />
          <h3 className="text-xl font-bold mb-2">Start Your Healthcare Journey</h3>
          <p className="text-green-100 mb-4">Explore colleges and specializations in health sciences</p>
          <div className="space-y-2">
            <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full">
              Find Colleges
            </button>
            <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-400 transition-colors w-full border border-green-400">
              Download Brochure
            </button>
          </div>
        </div>
  
        {/* Specialization Quick View */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Specializations</h3>
          <div className="space-y-2">
            {data.branches?.slice(0, 5).map((branch, index) => (
              <div key={branch.branchId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-700 truncate">{branch.branchName}</span>
                <span className="text-xs text-green-600 font-medium">
                  {branch.placementStats?.averageSalary2025}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  