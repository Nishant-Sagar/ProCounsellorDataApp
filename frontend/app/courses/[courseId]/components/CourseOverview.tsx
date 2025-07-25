import { Target, TrendingUp, Award, BookOpen } from 'lucide-react';
import { CourseData } from '../types/course';

type CourseOverviewProps = {
  data: CourseData;
};

export default function CourseOverview({ data }: CourseOverviewProps) {
  // ✅ Ensure branches is always an array
  const branches = Array.isArray(data.branches) ? data.branches : [];

  // ✅ Calculate average salary safely
  const salaryRanges = branches
    .map(branch =>
      parseFloat(branch.placementStats?.averageSalary2025?.replace(/[^\d.]/g, '') || '0')
    )
    .filter(salary => salary > 0);

  const avgSalary =
    salaryRanges.length > 0
      ? (salaryRanges.reduce((a, b) => a + b, 0) / salaryRanges.length).toFixed(1)
      : 'N/A';

  // ✅ Calculate highest salary safely
  const highestSalaries = branches
    .map(branch =>
      parseFloat(branch.placementStats?.highestSalary2025?.replace(/[^\d.]/g, '') || '0')
    )
    .filter(salary => salary > 0);

  const maxSalary =
    highestSalaries.length > 0 ? Math.max(...highestSalaries).toFixed(1) : 'N/A';

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <Target className="w-6 h-6 text-green-600" />
        </div>
        Course Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Average Salary</h3>
          </div>
          <div className="text-2xl font-bold text-green-800">
            ₹{avgSalary} LPA
          </div>
          <div className="text-sm text-green-600 mt-1">Across healthcare roles</div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Highest Package</h3>
          </div>
          <div className="text-2xl font-bold text-blue-800">
            ₹{maxSalary} LPA
          </div>
          <div className="text-sm text-blue-600 mt-1">Top placement record</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Specializations</h3>
          </div>
          <div className="text-2xl font-bold text-purple-800">{branches.length}</div>
          <div className="text-sm text-purple-600 mt-1">Healthcare fields</div>
        </div>
      </div>
    </div>
  );
}
