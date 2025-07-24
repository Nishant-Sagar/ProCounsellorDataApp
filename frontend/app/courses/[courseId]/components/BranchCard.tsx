'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Building, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Clock,
  DollarSign,
  GraduationCap,
  Stethoscope
} from 'lucide-react';
import { Branch } from '../types/course';

type BranchCardProps = {
  branch: Branch;
};

export default function BranchCard({ branch }: BranchCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">{branch.branchName}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{branch.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {branch.duration}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {branch.averageFeesRange}
            </span>
          </div>
        </div>
      </div>
      
      {/* Placement Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
          <div className="text-sm text-green-600 mb-1">Average Salary</div>
          <div className="font-bold text-green-800">{branch.placementStats?.averageSalary2025}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="text-sm text-blue-600 mb-1">Highest Salary</div>
          <div className="font-bold text-blue-800">{branch.placementStats?.highestSalary2025}</div>
        </div>
      </div>
      
      {/* Career Options Preview */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Career Paths:</h4>
        <div className="flex flex-wrap gap-1">
          {branch.careerOptions?.slice(0, 3).map((career, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {career}
            </span>
          ))}
          {branch.careerOptions?.length > 3 && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
              +{branch.careerOptions.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      {/* Expandable Section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-gray-700">View Detailed Information</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {expanded && (
        <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
          {/* Core Subjects */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Core Subjects
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {branch.coreSubjects?.map((subject, index) => (
                <div key={index} className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs">
                  {subject}
                </div>
              ))}
            </div>
          </div>
          
          {/* Job Roles */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              Job Roles
            </h4>
            <div className="flex flex-wrap gap-2">
              {branch.jobRoles?.map((role, index) => (
                <span key={index} className="bg-purple-50 text-purple-800 px-2 py-1 rounded text-xs">
                  {role}
                </span>
              ))}
            </div>
          </div>
          
          {/* Top Healthcare Employers */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Building className="w-4 h-4 text-green-600" />
              Top Healthcare Employers
            </h4>
            <div className="flex flex-wrap gap-2">
              {branch.placementStats?.companies?.map((company, index) => (
                <span key={index} className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs">
                  {company}
                </span>
              ))}
            </div>
          </div>
          
          {/* Popular Colleges */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-600" />
              Popular Colleges
            </h4>
            <div className="space-y-1">
              {branch.popularColleges?.map((college, index) => (
                <div key={index} className="text-sm text-gray-700">• {college}</div>
              ))}
            </div>
          </div>
          
          {/* Entrance Exams */}
          {branch.examId?.filter(exam => exam !== 'NA').length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Entrance Exams
              </h4>
              <div className="flex flex-wrap gap-2">
                {branch.examId?.filter(exam => exam !== 'NA').map((exam, index) => (
                  <span key
