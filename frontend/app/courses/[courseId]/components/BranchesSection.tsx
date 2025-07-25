import { GraduationCap } from 'lucide-react';
import { CourseData } from '../types/course';

type BranchSectionProps = {
  data: CourseData;
};

export default function BranchSection({ data }: BranchSectionProps) {
  const branches = data.branches || [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-indigo-600" />
        Specializations Offered
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <div
            key={branch.branchId}
            className="border border-gray-100 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition"
          >
            <h4 className="font-semibold text-gray-800 mb-1">{branch.branchName}</h4>
            <p className="text-sm text-gray-500 mb-2">{branch.duration}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-green-600 font-medium">
                Avg: {branch.placementStats?.averageSalary2025 || 'N/A'}
              </span>
              <span className="text-xs text-blue-600 font-medium">
                High: {branch.placementStats?.highestSalary2025 || 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
