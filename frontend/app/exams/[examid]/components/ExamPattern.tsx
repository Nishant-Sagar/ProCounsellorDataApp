'use client';

import { Target, Clock, AlertTriangle, Award } from 'lucide-react';

interface ExamPatternProps {
  exam: {
    maxMarks: string;
    duration: string;
    marksPerSubject: {
      [key: string]: string;
    };
    negativeMarking: string;
    mode: string[];
  };
}

export default function ExamPattern({ exam }: ExamPatternProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Target className="w-6 h-6 text-blue-600" />
        </div>
        Exam Pattern
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Duration</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{exam.duration}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">Maximum Marks</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{exam.maxMarks}</p>
          </div>
        </div>

        {/* Mode */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-3">Exam Mode</h3>
          <div className="space-y-2">
            {exam.mode.map((mode, index) => (
              <div key={index} className="bg-white rounded px-3 py-2 border border-purple-200">
                <span className="text-purple-800 font-medium">{mode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marking Scheme */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Marking Scheme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(exam.marksPerSubject).map(([key, value], index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{key}</div>
              <div className="font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Negative Marking */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-2">Negative Marking</h3>
            <p className="text-red-800">{exam.negativeMarking}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
