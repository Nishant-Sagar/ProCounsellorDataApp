import { BookOpenCheck } from 'lucide-react';
import { CourseData } from '../types/course';

type AdmissionProcessProps = {
  data: CourseData;
};

export default function AdmissionProcess({ data }: AdmissionProcessProps) {
  const content = data.admissionProcess?.trim();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
        <BookOpenCheck className="w-5 h-5 text-green-600" />
        Admission Process
      </h3>
      {content ? (
        <p className="text-gray-700 leading-relaxed">{content}</p>
      ) : (
        <p className="text-gray-500">Admission process details are not available.</p>
      )}
    </div>
  );
}
