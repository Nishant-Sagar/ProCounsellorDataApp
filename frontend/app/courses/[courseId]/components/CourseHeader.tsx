import { BookOpen, GraduationCap, Users, Heart } from 'lucide-react';
import { CourseData } from '../types/course';

type CourseHeaderProps = {
  data: CourseData;
};

export default function CourseHeader({ data }: CourseHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* Medical cross pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {data.streamLevel}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {data.courseType}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {data.courseName}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-lg">{data.branches?.length || 0} Specializations</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-lg">Healthcare Careers</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span className="text-lg">Advanced Practice</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-sm text-white/80">Years Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
