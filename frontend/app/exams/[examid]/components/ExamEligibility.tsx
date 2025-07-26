'use client';

import { Users, CheckCircle } from 'lucide-react';

interface ExamEligibilityProps {
  exam: {
    eligibility: string;
    examLevel: string;
  };
}

export default function ExamEligibility({ exam }: ExamEligibilityProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <Users className="w-6 h-6 text-green-600" />
        </div>
        Eligibility Criteria
      </h2>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                {exam.examLevel} Level Requirements
              </h3>
              <p className="text-green-800 leading-relaxed">{exam.eligibility}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
              !
            </div>
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Important Note</h3>
              <p className="text-yellow-800 text-sm">
                Please refer to the official information bulletin for detailed eligibility criteria, 
                age limits, and any specific requirements for different categories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
