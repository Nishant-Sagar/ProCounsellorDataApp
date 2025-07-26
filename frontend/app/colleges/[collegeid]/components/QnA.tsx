'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

type QnAItem = {
  question: string;
  answer: string;
};

type QnAProps = {
  college: {
    QnA?: QnAItem[];
  };
};

export default function QnA({ college }: QnAProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Convert to array if needed, handle null/undefined
  const qnaItems = Array.isArray(college.QnA) 
    ? college.QnA 
    : college.QnA 
      ? [college.QnA] 
      : [];

  if (!qnaItems || qnaItems.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <HelpCircle className="w-5 h-5 text-green-600" />
          </div>
          Q&A
        </h3>
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No Q&A information available.</p>
        </div>
      </div>
    );
  }

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  // Show only first 2 questions unless "showAll" is true
  const displayedItems = showAll ? qnaItems : qnaItems.slice(0, 2);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <HelpCircle className="w-5 h-5 text-green-600" />
        </div>
        Q&A
      </h3>

      <div className="space-y-3">
        {displayedItems.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Question Header */}
            <div 
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 hover:border-green-200 p-3 cursor-pointer hover:shadow-sm transition-all duration-200"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  {expandedQuestion === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>

            {/* Answer Content */}
            {expandedQuestion === index && (
              <div className="border-t border-gray-200 bg-gray-50 p-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* See More / See Less Button - Only show when more than 2 items */}
      {qnaItems.length > 2 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <HelpCircle className="w-4 h-4" />
            {showAll ? 'Show Less' : `See More Q&A`}
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {showAll ? `Hide ${qnaItems.length - 2}` : `+${qnaItems.length - 2} More`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
