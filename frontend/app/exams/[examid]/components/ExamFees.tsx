'use client';

import { CreditCard, Users } from 'lucide-react';

interface ExamFeesProps {
  exam: {
    applicationFees: {
      general: string;
      obc: string;
      sc_st: string;
    };
  };
}

export default function ExamFees({ exam }: ExamFeesProps) {
  const feeCategories = [
    { category: 'General', amount: exam.applicationFees.general, color: 'blue' },
    { category: 'OBC', amount: exam.applicationFees.obc, color: 'green' },
    { category: 'SC/ST', amount: exam.applicationFees.sc_st, color: 'purple' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <CreditCard className="w-6 h-6 text-green-600" />
        </div>
        Application Fees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feeCategories.map((fee, index) => (
          <div key={index} className={`border rounded-lg p-6 ${getColorClasses(fee.color)}`}>
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{fee.category}</span>
            </div>
            <p className="text-3xl font-bold">{fee.amount}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
            ₹
          </div>
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Payment Information</h3>
            <p className="text-yellow-800 text-sm">
              Application fees are non-refundable. Payment can be made through online mode only. 
              Please keep the payment receipt for future reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
