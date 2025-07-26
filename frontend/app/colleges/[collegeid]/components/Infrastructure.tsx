'use client';

import { useState } from 'react';
import { Building, ChevronDown, ChevronUp } from 'lucide-react';

type InfrastructureProps = {
  data: {
    infrastructure: string;
  };
};

export default function Infrastructure({ data }: InfrastructureProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div 
        className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Building className="w-6 h-6 text-orange-600" />
          </div>
          Infrastructure
        </h3>
        
        <div className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors">
          <span className="text-sm font-medium">
            {isExpanded ? 'Show Less' : 'Show More'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform duration-200" />
          )}
        </div>
      </div>

      {/* Content with increased collapsed height */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? 'max-h-screen mt-4' : 'max-h-40 mt-4'
      }`}>
        <div className="text-gray-700 leading-relaxed relative">
          {data?.infrastructure || 'No infrastructure data available'}
          
          {/* Fade overlay when collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
}


