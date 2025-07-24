import { GraduationCap, Calendar, FileText, Target, AlertCircle } from 'lucide-react';
import { CourseData } from '../types/course';

type ExamInfoProps = {
  data: CourseData;
};

export default function ExamInfo({ data }: ExamInfoProps) {
  // Collect all unique exams
  const allExams = new Set<string>();
  const examBranchMap: { [key: string]: string[] } = {};

  data.branches?.forEach(branch => {
    branch.examId?.forEach(exam => {
      if (exam !== 'NA') {
        allExams.add(exam);
        if (!examBranchMap[exam]) {
          examBranchMap[exam] = [];
        }
        examBranchMap[exam].push(branch.branchName);
      }
    });
  });

  const examList = Array.from(allExams);

  // Exam details mapping (you can expand this based on your requirements)
  const examDetails: { [key: string]: { fullName: string; type: string; frequency: string } } = {
    'CUET_PG': { fullName: 'Common University Entrance Test - Postgraduate', type: 'National', frequency: 'Annual' },
    'INI_CET': { fullName: 'Institute of National Importance Combined Entrance Test', type: 'National', frequency: 'Annual' },
    'NEET_PG': { fullName: 'National Eligibility cum Entrance Test - Postgraduate', type: 'National', frequency: 'Annual' },
    'TISSNET': { fullName: 'Tata Institute of Social Sciences National Entrance Test', type: 'Institute Specific', frequency: 'Annual' },
    'JIPMER_PG': { fullName: 'JIPMER Postgraduate Entrance Examination', type: 'Institute Specific', frequency: 'Annual' },
    'AILET_PG': { fullName: 'All India Law Entrance Test - Postgraduate', type: 'National', frequency: 'Annual' }
  };

  if (examList.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
        </div>
        Entrance Examination Information
      </h2>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-600 mt-1" />
          <div>
            <h3 className="font-semibold text-indigo-900 mb-2">Admission Requirements</h3>
            <p className="text-indigo-800 leading-relaxed">{data.admissionProcess}</p>
          </div>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {examList.map((exam, index) => (
          <div key={exam} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {exam.replace(/_/g, ' ')}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {examDetails[exam]?.fullName || 'Entrance Examination'}
                </p>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    examDetails[exam]?.type === 'National' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {examDetails[exam]?.type || 'Exam'}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {examDetails[exam]?.frequency || 'Annual'}
                  </span>
                </div>
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
            </div>

            {/* Applicable specializations */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Applicable for:</h4>
              <div className="flex flex-wrap gap-1">
                {examBranchMap[exam]?.slice(0, 3).map((branch, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {branch}
                  </span>
                ))}
                {examBranchMap[exam]?.length > 3 && (
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                    +{examBranchMap[exam].length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exam Calendar (Generic timeline) */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Typical Exam Calendar
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Application</h4>
              <p className="text-sm text-gray-600">Feb - Apr</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Examination</h4>
              <p className="text-sm text-gray-600">May - Jul</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Counselling</h4>
              <p className="text-sm text-gray-600">Jul - Sep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
