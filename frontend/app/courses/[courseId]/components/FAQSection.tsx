'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CourseData } from '../types/course';

type FAQSectionProps = {
  data: CourseData;
};

export default function FAQSection({ data }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  if (!data.faqs || data.faqs.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-yellow-100 p-2 rounded-lg">
          <HelpCircle className="w-6 h-6 text-yellow-600" />
        </div>
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {data.faqs.map((faq) => (
          <div key={faq.faqId} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setOpenFAQ(openFAQ === faq.faqId ? null : faq.faqId)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
              {openFAQ === faq.faqId ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openFAQ === faq.faqId && (
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
