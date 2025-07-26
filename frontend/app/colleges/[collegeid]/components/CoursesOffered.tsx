'use client';

import { useState } from 'react';
import { 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Trophy, 
  Building,
  BookOpen,
  Target,
  Award,
  TrendingUp,
  User,
  IndianRupee
} from 'lucide-react';
import { CollegeData } from '../../types/college';

type Placement = {
  averageSalary2025: string;
  highestSalary2025: string;
  companiesVisited2025: string[];
};

type Branch = {
  branchId: string;
  branchName: string;
  seat: string;
  cutoffs: string;
  faculty: string;
  placement: Placement;
  fees: string;
};

type Course = {
  streamName: string;
  ranking: string;
  admissions: string;
  alumni: string;
  examId: string[];
  courseId: string;
  branches: Branch[];
};

type CoursesOfferedProps = {
  college:CollegeData
};

export default function CoursesOffered({ college }: CoursesOfferedProps) {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

  const courses = Array.isArray(college.coursesOffered) 
    ? college.coursesOffered 
    : college.coursesOffered 
      ? [college.coursesOffered] 
      : [];

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-green-600" />
          </div>
          Courses Offered
        </h2>
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No course information available.</p>
        </div>
      </div>
    );
  }

  const toggleCourse = (index: number) => {
    setExpandedCourse(expandedCourse === index ? null : index);
    setExpandedBranch(null);
  };

  const toggleBranch = (branchId: string) => {
    setExpandedBranch(expandedBranch === branchId ? null : branchId);
  };

  const getCourseIcon = (courseId: string | undefined) => {
  const id = courseId?.toLowerCase() || '';
  switch (id) {
    case 'engineering':
    case 'mtech':
      return <Building className="w-6 h-6 text-blue-600" />;
    case 'management':
      return <TrendingUp className="w-6 h-6 text-purple-600" />;
    case 'design':
      return <Target className="w-6 h-6 text-pink-600" />;
    case 'msc':
      return <BookOpen className="w-6 h-6 text-green-600" />;
    default:
      return <GraduationCap className="w-6 h-6 text-gray-600" />;
  }
};

const getCourseColor = (courseId: string | undefined) => {
  const id = courseId?.toLowerCase() || '';
  switch (id) {
    case 'engineering':
    case 'mtech':
      return 'from-blue-50 to-indigo-50 border-blue-100 hover:border-blue-200';
    case 'management':
      return 'from-purple-50 to-violet-50 border-purple-100 hover:border-purple-200';
    case 'design':
      return 'from-pink-50 to-rose-50 border-pink-100 hover:border-pink-200';
    case 'msc':
      return 'from-green-50 to-emerald-50 border-green-100 hover:border-green-200';
    default:
      return 'from-gray-50 to-slate-50 border-gray-100 hover:border-gray-200';
  }
};


  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-green-600" />
        </div>
        Courses Offered
      </h2>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={`${course.courseId}-${index}`} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Course Header */}
            <div 
              className={`bg-gradient-to-r ${getCourseColor(course.courseId)} p-4 cursor-pointer hover:shadow-md transition-all duration-200`}
              onClick={() => toggleCourse(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    {getCourseIcon(course.courseId)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {course.streamName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-white/60 px-2 py-1 rounded-full">
                        {course.ranking}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.branches?.length || 0} Branches
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-sm font-medium hidden sm:block">
                    {expandedCourse === index ? 'Less' : 'Details'}
                  </span>
                  {expandedCourse === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Course Content */}
            {expandedCourse === index && (
              <div className="border-t border-gray-200 bg-gray-50">
                {/* Course Overview */}
                <div className="p-6 space-y-6">
                  {/* Admissions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-600" />
                      Admission Process
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{course.admissions}</p>
                  </div>

                  {/* Alumni */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      Notable Alumni
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{course.alumni}</p>
                  </div>

                  {/* Entrance Exams */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Entrance Exams
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.examId?.map((exam, examIndex) => (
                        <span key={examIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {exam.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Branches */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-600" />
                      Available Branches ({course.branches?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {(
                          Array.isArray(course.branches)
                            ? course.branches
                            : course.branches
                              ? [course.branches]
                              : []
                        )?.map((branch) => (
                        <div key={branch.branchId} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          {/* Branch Header */}
                          <div 
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleBranch(branch.branchId)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 mb-1">{branch.branchName}</h5>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {branch.seat} Seats
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {branch.fees}
                                  </span>
                                </div>
                              </div>
                              {expandedBranch === branch.branchId ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </div>

                          {/* Branch Details */}
                          {expandedBranch === branch.branchId && (
                            <div className="border-t border-gray-200 bg-blue-50/30 p-4 space-y-4">
                              {/* Cutoffs */}
                              <div>
                                <h6 className="font-medium text-gray-900 mb-1">Cutoffs</h6>
                                <p className="text-sm text-gray-700">{branch.cutoffs}</p>
                              </div>

                              {/* Faculty */}
                              <div>
                                <h6 className="font-medium text-gray-900 mb-1">Faculty & Research</h6>
                                <p className="text-sm text-gray-700">{branch.faculty}</p>
                              </div>

                              {/* Placement Stats */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-3">
                                  <h6 className="font-medium text-gray-900 mb-2">Placement Statistics</h6>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Average Salary:</span>
                                      <span className="font-medium">{branch.placement?.averageSalary2025 || 'NA'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Highest Salary:</span>
                                      <span className="font-medium">{branch.placement?.highestSalary2025 || 'NA'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white rounded-lg p-3">
                                  <h6 className="font-medium text-gray-900 mb-2">Top Recruiters</h6>
                                  <div className="flex flex-wrap gap-1">
                                    {(Array.isArray(branch.placement?.companiesVisited2025)
                                      ? branch.placement.companiesVisited2025
                                      : branch.placement?.companiesVisited2025
                                        ? [branch.placement.companiesVisited2025]
                                        : []
                                    ).slice(0, 4).map((company, compIndex) => (
                                      <span key={compIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                        {company}
                                      </span>
                                    ))}
                                    {(Array.isArray(branch.placement?.companiesVisited2025)
                                      ? branch.placement.companiesVisited2025.length
                                      : branch.placement?.companiesVisited2025
                                        ? 1
                                        : 0
                                    ) > 4 && (
                                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                        +{(Array.isArray(branch.placement?.companiesVisited2025)
                                            ? branch.placement.companiesVisited2025.length
                                            : branch.placement?.companiesVisited2025
                                              ? 1
                                              : 0
                                        ) - 4} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
