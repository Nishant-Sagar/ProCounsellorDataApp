'use client';

import { 
  BookOpen, 
  Globe, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  ExternalLink,
  Users
} from 'lucide-react';

interface ExamOverviewProps {
  exam: {
    examName: string;
    fullForm: string;
    examLevel: string;
    examType: string;
    mode: string[];
    conductingBody: string;
    officialWebsite: string;
    duration: string;
    maxMarks: string;
    examFrequency: string;
    subjectsTested: string[];
  };
}

export default function ExamOverview({ exam }: ExamOverviewProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-orange-100 p-3 rounded-xl">
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{exam.examName}</h1>
            <p className="text-gray-600 mt-1">{exam.fullForm}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {exam.examLevel}
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {exam.examType}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {exam.mode.join(', ')}
          </span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-gray-900">Duration</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{exam.duration}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Max Marks</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{exam.maxMarks}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Subjects</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{exam.subjectsTested.length}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Frequency</span>
          </div>
          <p className="text-lg font-bold text-purple-600">{exam.examFrequency}</p>
        </div>
      </div>

      {/* Conducting Body & Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-gray-600" />
            Conducting Body
          </h3>
          <p className="text-gray-700">{exam.conductingBody}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            Official Website
          </h3>
          <a 
            href={exam.officialWebsite} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium"
          >
            {exam.officialWebsite}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Subjects Tested */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-600" />
          Subjects Tested
        </h3>
        <div className="flex flex-wrap gap-2">
          {exam.subjectsTested.map((subject, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
