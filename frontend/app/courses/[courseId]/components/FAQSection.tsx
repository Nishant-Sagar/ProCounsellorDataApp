'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CourseData, FAQ } from '../types/course';

type FAQSectionProps = {
  data: CourseData;
};

export default function FAQSection({ data }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  console.log('FAQSection data:', data);
  console.log('FAQs:', data.faqs);
  let faqs: FAQ[] = [];
  
  if (Array.isArray(data.faqs)) {
    faqs = data.faqs;
  } else if (data.faqs && typeof data.faqs === 'object') {
    const faqsObj = data.faqs as Record<string, unknown>;
    if (faqsObj.faq) {
      faqs = Array.isArray(faqsObj.faq) ? faqsObj.faq : [faqsObj.faq];
    } else if (faqsObj.FAQ) {
      faqs = Array.isArray(faqsObj.FAQ) ? faqsObj.FAQ : [faqsObj.FAQ];
    } else if (faqsObj.faqId || faqsObj.question) {
      // If it's a single FAQ object, wrap it in an array
      faqs = [data.faqs as FAQ];
    }
  }

  console.log('Processed FAQs:', faqs);

  if (faqs.length === 0) {
    console.log('No FAQs found, showing fallback with mock data');
    const mockFaqs = [
      {
        faqId: 'mock-1',
        question: 'What are the admission requirements for this course?',
        answer: 'Admission requirements typically include qualifying entrance exams, meeting minimum academic criteria, and participating in counseling processes.'
      },
      {
        faqId: 'mock-2', 
        question: 'What is the duration of this course?',
        answer: 'The course duration varies based on the program level and specialization chosen.'
      },
      {
        faqId: 'mock-3',
        question: 'What are the career prospects after completing this course?',
        answer: 'Graduates have diverse career opportunities in various industries with competitive salary packages.'
      }
    ];
    
    faqs = mockFaqs;
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-yellow-100 p-2 rounded-lg">
          <HelpCircle className="w-6 h-6 text-yellow-600" />
        </div>
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          // Handle different FAQ object structures
          const faqItem = faq as FAQ & Record<string, unknown>;
          const faqId = faqItem.faqId || (faqItem.id as string) || `faq-${index}`;
          const question = faqItem.question || (faqItem.q as string) || 'No question available';
          const answer = faqItem.answer || (faqItem.a as string) || 'No answer available';
          
          return (
            <div key={faqId} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenFAQ(openFAQ === faqId ? null : faqId)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{question}</h3>
                {openFAQ === faqId ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFAQ === faqId && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
