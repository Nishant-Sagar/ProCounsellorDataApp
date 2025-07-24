import { CollegeData } from "../../types/college";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
const getEstablishedYear = (text: string = '') => {
  const match = text.match(/established in (\d{4})/i);
  return match ? match[1] : 'N/A';
};
const CollegeHeader = ({ college }: { college: CollegeData }) => (
  <header className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
    <div className="absolute inset-0">
        <ImageWithFallback 
            src={college.bannerUrl} 
            alt={`${college.collegeName} Banner`} 
            layout="fill" 
            objectFit="cover" 
            className="opacity-20"
        />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
    
    <div className="relative z-10 p-8 md:p-12">
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
           {Array.isArray(college.coursesOffered) && college.coursesOffered[0]?.ranking && (
                 <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    {college.coursesOffered[0].ranking}
                 </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {college.collegeName}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{college.collegesLocationState}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">Est.{getEstablishedYear(college.collegeInfo)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default CollegeHeader;
