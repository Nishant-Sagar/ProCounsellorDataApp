import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  Clock, 
  Globe, 
  Phone, 
  Mail,
  FileText,
  DollarSign,
  Target,
  AlertCircle,
  Download,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

// Mock data structure - replace with your actual exam data
const mockExamData = {
  "examId": "AFCAT",
  "examName": "AFCAT",
  "fullForm": "Air Force Common Admission Test",
  "examLevel": "National",
  "examType": "Recruitment",
  "mode": ["Online"],
  "conductingBody": "Indian Air Force",
  "officialWebsite": "https://afcat.cdac.in",
  "applicationFees": {
    "general": "INR 250",
    "obc": "INR 250",
    "sc_st": "INR 250"
  },
  "eligibility": "Indian citizens (Men and Women) with minimum educational qualifications as per the branch applied for (Flying Branch: Graduation with minimum 60% marks and Physics and Mathematics at 10+2; Ground Duty (Technical): B.E./B.Tech with minimum 60%; Ground Duty (Non-Technical): Graduation with minimum 60%). Age limits and other criteria as per official notification.",
  "subjectsTested": [
    "General Awareness",
    "Verbal Ability in English",
    "Numerical Ability and Reasoning",
    "Military Aptitude Test"
  ],
  "maxMarks": "300",
  "duration": "2 hours",
  "marksPerSubject": {
    "General Awareness": "NA",
    "Verbal Ability in English": "NA",
    "Numerical Ability and Reasoning": "NA",
    "Military Aptitude Test": "NA"
  },
  "negativeMarking": "1 mark deducted for every incorrect answer",
  "examFrequency": "Twice a year",
  "coursesLinked": [
    "Flying Branch",
    "Ground Duty (Technical)",
    "Ground Duty (Non-Technical)"
  ],
  "examSyllabusPdfUrl": "https://cdn-images.prepp.in/public/image/AFCAT_2_Notification_2025_69bd689ffeb48f4decacd5dd4219b9f6.pdf",
  "previousYearCutoffs": {
    "general": "NA",
    "obc": "NA",
    "sc": "NA",
    "st": "NA"
  },
  "examBrochureUrl": "https://cdn-images.prepp.in/public/image/AFCAT_2_Notification_2025_69bd689ffeb48f4decacd5dd4219b9f6.pdf",
  "faqs": {
    "question": "How many attempts are allowed for AFCAT?",
    "answer": "There is no fixed limit on the number of attempts for AFCAT, provided the candidate fulfills the age and other eligibility criteria for each attempt."
  },
  "created": "2025-07-13T07:49:39.685260+00:00",
  "updated": "2025-07-13T07:49:39.685348+00:00"
};

// Header Component
const ExamHeader = ({ data = mockExamData }) => (
  <div className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
    
    <div className="relative z-10 p-8 md:p-12">
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {data.examLevel} Level
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {data.examType}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
            {data.examName}
          </h1>
          <p className="text-xl text-white/90 mb-4">{data.fullForm}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="text-lg">{data.conductingBody}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">{data.examFrequency}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{data.maxMarks}</div>
            <div className="text-sm text-white/80">Total Marks</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Quick Stats Component
const QuickStats = ({ data = mockExamData }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.duration}</div>
          <div className="text-gray-600">Duration</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <Target className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.maxMarks}</div>
          <div className="text-gray-600">Max Marks</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-lg">
          <BookOpen className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.mode.join(', ')}</div>
          <div className="text-gray-600">Exam Mode</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-lg">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">Yes</div>
          <div className="text-gray-600">Negative Marking</div>
        </div>
      </div>
    </div>
  </div>
);

// Main Content Component
const ExamContent = ({ data = mockExamData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
    <div className="lg:col-span-2 space-y-8">
      {/* Eligibility */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          Eligibility Criteria
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">{data.eligibility}</p>
      </div>
      
      {/* Subjects Tested */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          Subjects Tested
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.subjectsTested.map((subject, index) => (
            <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 hover:border-green-200 transition-colors">
              <div className="font-semibold text-gray-900">{subject}</div>
              <div className="text-sm text-gray-600 mt-1">
                Marks: {data.marksPerSubject[subject] || 'As per pattern'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Courses Linked */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          Career Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.coursesLinked.map((course, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 hover:border-purple-200 transition-colors">
              <div className="font-semibold text-gray-900">{course}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <HelpCircle className="w-6 h-6 text-yellow-600" />
          </div>
          Frequently Asked Questions
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">{data.faqs.question}</h3>
          <p className="text-gray-700">{data.faqs.answer}</p>
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      {/* Application Fees */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Application Fees
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">General</span>
            <span className="font-semibold text-gray-900">{data.applicationFees.general}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">OBC</span>
            <span className="font-semibold text-gray-900">{data.applicationFees.obc}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">SC/ST</span>
            <span className="font-semibold text-gray-900">{data.applicationFees.sc_st}</span>
          </div>
        </div>
      </div>
      
      {/* Important Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Important Information
        </h3>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="font-semibold text-red-800 mb-1">Negative Marking</div>
            <div className="text-red-700 text-sm">{data.negativeMarking}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="font-semibold text-blue-800 mb-1">Exam Frequency</div>
            <div className="text-blue-700 text-sm">{data.examFrequency}</div>
          </div>
        </div>
      </div>
      
      {/* Downloads */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-600" />
          Downloads
        </h3>
        <div className="space-y-3">
          <a 
            href={data.examSyllabusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-700 font-medium">Exam Syllabus</span>
          </a>
          <a 
            href={data.examBrochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">Exam Brochure</span>
          </a>
        </div>
      </div>
      
      {/* Official Website */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Official Website
        </h3>
        <a 
          href={data.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="break-all">{data.officialWebsite}</span>
        </a>
      </div>
      
      {/* Previous Year Cutoffs */}
      {Object.values(data.previousYearCutoffs).some(cutoff => cutoff !== "NA") && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            Previous Year Cutoffs
          </h3>
          <div className="space-y-3">
            {Object.entries(data.previousYearCutoffs).map(([category, cutoff]) => (
              <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600 capitalize">{category}</span>
                <span className="font-semibold text-gray-900">{cutoff}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Apply Now Button */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
        <p className="text-emerald-100 mb-4">Start your preparation today</p>
        <button className="bg-white text-emerald-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
          Apply Now
        </button>
      </div>
    </div>
  </div>
);

// Main Page Component
export default function ExamPage({ params = { examId: 'AFCAT' } }) {
  // Replace this with your actual data fetching logic
  const examData = mockExamData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExamHeader data={examData} />
        <QuickStats data={examData} />
        <ExamContent data={examData} />
      </main>
    </div>
  );
}