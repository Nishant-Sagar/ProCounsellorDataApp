import { TrendingUp, Building, DollarSign, Users, Award } from 'lucide-react';
import { CourseData } from '../types/course';

type PlacementStatsProps = {
  data: CourseData;
};

export default function PlacementStats({ data }: PlacementStatsProps) {
  // ✅ Always work with a safe array
  const branches = Array.isArray(data.branches) ? data.branches : [];

  const allCompanies = new Set<string>();
  const salaryData: number[] = [];
  const highestSalaries: number[] = [];

  branches.forEach(branch => {
    if (Array.isArray(branch.placementStats?.companies)) {
      branch.placementStats.companies.forEach(company => allCompanies.add(company));
    }

    const avgSalary = parseFloat(
      branch.placementStats?.averageSalary2025?.replace(/[^\d.]/g, '') || '0'
    );
    const highSalary = parseFloat(
      branch.placementStats?.highestSalary2025?.replace(/[^\d.]/g, '') || '0'
    );

    if (avgSalary > 0) salaryData.push(avgSalary);
    if (highSalary > 0) highestSalaries.push(highSalary);
  });

  const avgSalary =
    salaryData.length > 0
      ? (salaryData.reduce((a, b) => a + b, 0) / salaryData.length).toFixed(1)
      : '0';

  const maxSalary = highestSalaries.length > 0 ? Math.max(...highestSalaries).toFixed(1) : '0';
  const minSalary = salaryData.length > 0 ? Math.min(...salaryData).toFixed(1) : '0';

  const topRecruiters = Array.from(allCompanies).slice(0, 8);

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
        Placement Statistics
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Average Package</h3>
          </div>
          <div className="text-2xl font-bold text-green-800">₹{avgSalary} LPA</div>
          <div className="text-sm text-green-600">Across specializations</div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Highest Package</h3>
          </div>
          <div className="text-2xl font-bold text-blue-800">₹{maxSalary} LPA</div>
          <div className="text-sm text-blue-600">Top offer recorded</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Top Employers</h3>
          </div>
          <div className="text-2xl font-bold text-purple-800">{allCompanies.size}</div>
          <div className="text-sm text-purple-600">Healthcare organizations</div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-900">Salary Range</h3>
          </div>
          <div className="text-lg font-bold text-orange-800">₹{minSalary}-{maxSalary} LPA</div>
          <div className="text-sm text-orange-600">Min-Max packages</div>
        </div>
      </div>

      {/* Top Recruiters */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-600" />
          Top Healthcare Recruiters
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topRecruiters.map((company, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
            >
              <div className="font-semibold text-gray-900 text-sm">{company}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization-wise Breakdown */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Specialization-wise Placement Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Specialization</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Average Salary</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Highest Salary</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Top Recruiters</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch, index) => (
                <tr
                  key={branch.branchId}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {branch.branchName}
                  </td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    {branch.placementStats?.averageSalary2025}
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">
                    {branch.placementStats?.highestSalary2025}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(branch.placementStats?.companies) &&
                        branch.placementStats.companies.slice(0, 2).map((company, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {company}
                          </span>
                        ))}
                      {Array.isArray(branch.placementStats?.companies) &&
                        branch.placementStats.companies.length > 2 && (
                          <span className="text-gray-500 text-xs">
                            +{branch.placementStats.companies.length - 2} more
                          </span>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
