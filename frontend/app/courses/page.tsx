"use client"
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Award, 
  TrendingUp,
  ChevronRight,
  Star,
  Building,
  Grid,
  List,
  X
} from 'lucide-react';

// Course interface for the listing page
interface Course {
  courseId: string;
  courseName: string;
  courseType: string;
  category: string;
  streamLevel: string;
  duration: string;
  description: string;
  totalBranches: number;
  averageFeesRange: string;
  topColleges: string[];
  popularityScore: number;
  placementRate: string;
  averageSalary: string;
  examRequired: string[];
  imageUrl: string;
}

// Mock data for Indian courses - replace with your API data
const mockCoursesData: Course[] = [
  {
    courseId: "ENGINEERING",
    courseName: "Engineering",
    courseType: "UG",
    category: "Science",
    streamLevel: "Undergraduate",
    duration: "4 years",
    description: "Engineering programs covering various specializations like Computer Science, Mechanical, Electrical, and more.",
    totalBranches: 15,
    averageFeesRange: "₹2-8 LPA",
    topColleges: ["IIT Delhi", "IIT Bombay", "NIT Trichy"],
    popularityScore: 9.5,
    placementRate: "95%",
    averageSalary: "₹8-15 LPA",
    examRequired: ["JEE Main", "JEE Advanced"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "MBBS",
    courseName: "Medicine (MBBS)",
    courseType: "UG",
    category: "Science", 
    streamLevel: "Undergraduate",
    duration: "5.5 years",
    description: "Bachelor of Medicine and Bachelor of Surgery - comprehensive medical education program.",
    totalBranches: 8,
    averageFeesRange: "₹5-25 LPA",
    topColleges: ["AIIMS Delhi", "JIPMER", "CMC Vellore"],
    popularityScore: 9.8,
    placementRate: "98%",
    averageSalary: "₹6-12 LPA",
    examRequired: ["NEET UG"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "MANAGEMENT",
    courseName: "Master of Business Administration",
    courseType: "PG",
    category: "Commerce",
    streamLevel: "Postgraduate", 
    duration: "2 years",
    description: "Comprehensive business management program covering finance, marketing, operations, and strategy.",
    totalBranches: 12,
    averageFeesRange: "₹8-25 LPA",
    topColleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta"],
    popularityScore: 9.2,
    placementRate: "92%",
    averageSalary: "₹15-30 LPA",
    examRequired: ["CAT", "MAT", "XAT"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "LAW",
    courseName: "Bachelor of Laws (LLB)",
    courseType: "UG",
    category: "Arts",
    streamLevel: "Undergraduate",
    duration: "3-5 years",
    description: "Legal education covering constitutional law, criminal law, corporate law, and legal practice.",
    totalBranches: 6,
    averageFeesRange: "₹1-6 LPA",
    topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NUJS Kolkata"],
    popularityScore: 8.5,
    placementRate: "85%",
    averageSalary: "₹5-12 LPA",
    examRequired: ["CLAT", "AILET"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "COMPUTER_APPLICATIONS",
    courseName: "Computer Applications (BCA/MCA)",
    courseType: "UG",
    category: "Science",
    streamLevel: "Undergraduate",
    duration: "3 years",
    description: "Computer applications focusing on programming, software development, and IT solutions.",
    totalBranches: 8,
    averageFeesRange: "₹1-4 LPA",
    topColleges: ["JMI Delhi", "BHU Varanasi", "Pune University"],
    popularityScore: 8.2,
    placementRate: "88%",
    averageSalary: "₹4-8 LPA",
    examRequired: ["University Entrance"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "COMMERCE",
    courseName: "Bachelor of Commerce (B.Com)",
    courseType: "UG", 
    category: "Commerce",
    streamLevel: "Undergraduate",
    duration: "3 years",
    description: "Commerce education covering accounting, finance, economics, and business studies.",
    totalBranches: 10,
    averageFeesRange: "₹0.5-3 LPA",
    topColleges: ["SRCC Delhi", "LSR Delhi", "Christ University"],
    popularityScore: 8.0,
    placementRate: "82%",
    averageSalary: "₹3-6 LPA",
    examRequired: ["Merit Based"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "ARTS",
    courseName: "Bachelor of Arts (BA)",
    courseType: "UG",
    category: "Arts", 
    streamLevel: "Undergraduate",
    duration: "3 years",
    description: "Liberal arts education covering humanities, social sciences, languages, and literature.",
    totalBranches: 15,
    averageFeesRange: "₹0.3-2 LPA",
    topColleges: ["JNU Delhi", "BHU Varanasi", "Presidency Kolkata"],
    popularityScore: 7.5,
    placementRate: "75%",
    averageSalary: "₹2-5 LPA",
    examRequired: ["Merit Based"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "PHARMACY",
    courseName: "Bachelor of Pharmacy (B.Pharm)",
    courseType: "UG",
    category: "Science",
    streamLevel: "Undergraduate", 
    duration: "4 years",
    description: "Pharmaceutical sciences covering drug development, clinical pharmacy, and pharmaceutical technology.",
    totalBranches: 6,
    averageFeesRange: "₹2-6 LPA",
    topColleges: ["NIPER Mohali", "ICT Mumbai", "JSS Mysore"],
    popularityScore: 7.8,
    placementRate: "80%",
    averageSalary: "₹3-7 LPA",
    examRequired: ["JEE Main", "State CET"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "ARCHITECTURE",
    courseName: "Bachelor of Architecture (B.Arch)",
    courseType: "UG",
    category: "Science",
    streamLevel: "Undergraduate",
    duration: "5 years", 
    description: "Architectural design and planning covering building design, urban planning, and construction technology.",
    totalBranches: 4,
    averageFeesRange: "₹3-8 LPA",
    topColleges: ["IIT Roorkee", "SPA Delhi", "CEPT Ahmedabad"],
    popularityScore: 7.6,
    placementRate: "78%",
    averageSalary: "₹4-10 LPA",
    examRequired: ["NATA", "JEE Main"],
    imageUrl: "/api/placeholder/400/200"
  },
  {
    courseId: "MASS_COMMUNICATION",
    courseName: "Mass Communication & Journalism",
    courseType: "UG",
    category: "Arts",
    streamLevel: "Undergraduate",
    duration: "3 years",
    description: "Media studies covering journalism, advertising, public relations, and digital media.",
    totalBranches: 8,
    averageFeesRange: "₹1-5 LPA",
    topColleges: ["IIMC Delhi", "JMI Delhi", "Symbiosis Pune"],
    popularityScore: 7.4,
    placementRate: "76%",
    averageSalary: "₹3-8 LPA",
    examRequired: ["University Entrance"],
    imageUrl: "/api/placeholder/400/200"
  }
];

// Header Component
const PageHeader = () => (
  <div className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-48 -translate-y-48"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-32 translate-y-32"></div>
    
    <div className="relative z-10 p-8 md:p-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
              Explore Courses
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Discover your perfect academic path from thousands of courses
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-lg">1000+ Courses Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-6 h-6" />
            <span className="text-lg">Top Colleges & Universities</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6" />
            <span className="text-lg">Career Guidance</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Search and Filter Component
const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  viewMode,
  setViewMode,
  totalResults
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  totalResults: number;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses, specializations, colleges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 text-gray-700 focus:border-transparent text-lg"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[140px]"
      >
        <option value="">All Categories</option>
        <option value="Science">Science</option>
        <option value="Commerce">Commerce</option>
        <option value="Arts">Arts</option>
      </select>
      
      {/* Level Filter */}
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[120px]"
      >
        <option value="">All Levels</option>
        <option value="UG">Undergraduate</option>
        <option value="PG">Postgraduate</option>
      </select>
      
      {/* View Mode Toggle */}
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-3 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-3 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
    
    {/* Results Count */}
    <div className="mt-4 text-sm text-gray-600">
      Showing {totalResults} courses
    </div>
  </div>
);

// Course Card Component (Grid View)
const CourseCard = ({ course, onCourseClick }: { course: Course; onCourseClick: (course: Course) => void }) => (
  <div 
    onClick={() => onCourseClick(course)}
    className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
  >
    {/* Course Image/Header */}
    <div className="relative h-48 bg-gradient-to-br from-purple-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-4 left-4">
        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
          {course.category}
        </span>
      </div>
      <div className="absolute top-4 right-4">
        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
          {course.courseType}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold mb-1">{course.courseName}</h3>
        <div className="flex items-center gap-2 text-white/90">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{course.duration}</span>
        </div>
      </div>
      <ChevronRight className="absolute bottom-4 right-4 w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
    </div>
    
    {/* Course Content */}
    <div className="p-6">
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Specializations</span>
          </div>
          <div className="font-bold text-blue-800">{course.totalBranches}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Placement Rate</span>
          </div>
          <div className="font-bold text-green-800">{course.placementRate}</div>
        </div>
      </div>
      
      {/* Fees and Salary */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Average Fees</div>
          <div className="font-semibold text-gray-900">{course.averageFeesRange}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">Average Salary</div>
          <div className="font-semibold text-gray-900">{course.averageSalary}</div>
        </div>
      </div>
      
      {/* Top Colleges */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Top Colleges</div>
        <div className="flex flex-wrap gap-1">
          {course.topColleges.slice(0, 2).map((college: string, index: number) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {college}
            </span>
          ))}
          {course.topColleges.length > 2 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{course.topColleges.length - 2} more
            </span>
          )}
        </div>
      </div>
      
      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(course.popularityScore / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{course.popularityScore}/10</span>
        </div>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Course List Item Component (List View)
const CourseListItem = ({ course, onCourseClick }: { course: Course; onCourseClick: (course: Course) => void }) => (
  <div 
    onClick={() => onCourseClick(course)}
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{course.courseName}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.category}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{course.courseType}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Specializations</div>
            <div className="font-semibold text-gray-900">{course.totalBranches}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Average Fees</div>
            <div className="font-semibold text-gray-900">{course.averageFeesRange}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Placement Rate</div>
            <div className="font-semibold text-gray-900">{course.placementRate}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Avg. Salary</div>
            <div className="font-semibold text-gray-900">{course.averageSalary}</div>
          </div>
        </div>
      </div>
      
      <div className="ml-6 text-right">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(course.popularityScore / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{course.popularityScore}/10</span>
        </div>
        <button className="text-purple-600 cursor-pointer hover:text-purple-700 font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Main Component
export default function CoursesListingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    return mockCoursesData.filter(course => {
      const matchesSearch = 
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.topColleges.some(college => college.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesLevel = !selectedLevel || course.courseType === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const handleCourseClick = (course: Course) => {
    // Navigate to course details page
    router.push(`/courses/${course.courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredCourses.length}
        />
        
        {/* Courses Display */}
        {filteredCourses.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }>
            {filteredCourses.map((course) => (
              viewMode === 'grid' ? (
                <CourseCard 
                  key={course.courseId} 
                  course={course} 
                  onCourseClick={handleCourseClick}
                />
              ) : (
                <CourseListItem 
                  key={course.courseId} 
                  course={course} 
                  onCourseClick={handleCourseClick}
                />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search terms or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

// "use client"
// import React, { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, 
//   BookOpen, 
//   GraduationCap, 
//   Clock, 
//   Award, 
//   TrendingUp,
//   ChevronRight,
//   Star,
//   Building,
//   Grid,
//   List,
//   X,
//   Users,
//   MapPin,
//   Sparkles,
//   MessageCircle,
//   Smartphone,
//   Calendar,
//   Filter
// } from 'lucide-react';

// // Course interface for the listing page
// interface Course {
//   courseId: string;
//   courseName: string;
//   courseType: string;
//   category: string;
//   streamLevel: string;
//   duration: string;
//   description: string;
//   totalBranches: number;
//   averageFeesRange: string;
//   topColleges: string[];
//   popularityScore: number;
//   placementRate: string;
//   averageSalary: string;
//   examRequired: string[];
//   imageUrl: string;
// }


// // Enhanced Course Card Component (Grid View)
// const CourseCard = ({ course, onCourseClick, index }: { course: Course; onCourseClick: (course: Course) => void; index: number }) => (
//   <div 
//     onClick={() => onCourseClick(course)}
//     className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer"
//   >
//     {/* Enhanced Card Header with Interactive Elements */}
//     <div className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 pb-4 overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
//       <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>
      
//       {/* Ranking Badge */}
//       <div className="absolute top-4 right-4 z-10">
//         <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
//           #{index + 1}
//         </div>
//       </div>

//       {/* Rating Stars */}
//       <div className="absolute top-4 left-4 z-10">
//         <div className="flex items-center gap-1">
//           {[...Array(5)].map((_, i) => (
//             <Star 
//               key={i} 
//               className={`w-3 h-3 ${i < Math.floor(course.popularityScore / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
//             />
//           ))}
//         </div>
//       </div>

//       {/* Trending Badge */}
//       {index < 5 && (
//         <div className="absolute top-12 left-4 z-10">
//           <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//             <TrendingUp className="w-3 h-3" />
//             Popular
//           </div>
//         </div>
//       )}
      
//       <div className="flex flex-col items-center relative z-10">
//         <div className="relative">
//           <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow border-4 border-white/50 group-hover:border-purple-200">
//             <GraduationCap className="w-10 h-10 text-purple-600" />
//           </div>
//           {/* Achievement Badge */}
//           <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-3 border-white flex items-center justify-center shadow-md">
//             <Award className="w-4 h-4 text-white" />
//           </div>
//         </div>

//         {/* Course Type and Duration */}
//         <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
//           <div className="flex items-center gap-1">
//             <BookOpen className="w-3 h-3" />
//             <span>{course.courseType}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             <span>{course.duration}</span>
//           </div>
//         </div>
//       </div>

//       {/* Decorative Pattern */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 group-hover:skew-y-12 transition-transform duration-1000"></div>
//     </div>

//     {/* Card Content */}
//     <div className="p-6">
//       <h2 className="text-lg font-bold text-gray-900 mb-2 text-center line-clamp-2 group-hover:text-purple-600 transition-colors">
//         {course.courseName}
//       </h2>
      
//       <div className="flex items-center justify-center gap-2 mb-4">
//         <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
//           <Building className="w-3 h-3 text-gray-500" />
//           <p className="text-gray-600 text-xs font-medium">{course.category}</p>
//         </div>
//       </div>

//       <p className="text-gray-600 text-sm mb-4 line-clamp-2 text-center">{course.description}</p>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 gap-3 mb-4">
//         <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
//           <div className="flex items-center justify-center gap-1 mb-1">
//             <BookOpen className="w-3 h-3 text-blue-600" />
//             <span className="text-xs text-blue-600 font-medium">Branches</span>
//           </div>
//           <div className="font-bold text-blue-800">{course.totalBranches}</div>
//         </div>
//         <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
//           <div className="flex items-center justify-center gap-1 mb-1">
//             <TrendingUp className="w-3 h-3 text-green-600" />
//             <span className="text-xs text-green-600 font-medium">Placement</span>
//           </div>
//           <div className="font-bold text-green-800">{course.placementRate}</div>
//         </div>
//       </div>

//       {/* Fees and Salary */}
//       <div className="flex justify-between items-center mb-4 text-center">
//         <div className="flex-1">
//           <div className="text-xs text-gray-500 mb-1">Avg. Fees</div>
//           <div className="font-semibold text-gray-900 text-sm">{course.averageFeesRange}</div>
//         </div>
//         <div className="flex-1">
//           <div className="text-xs text-gray-500 mb-1">Avg. Salary</div>
//           <div className="font-semibold text-gray-900 text-sm">{course.averageSalary}</div>
//         </div>
//       </div>

//       {/* Enhanced Features with Icons */}
//       <div className="flex flex-wrap gap-2 mb-6 justify-center">
//         <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//           <Award className="w-3 h-3" />
//           Top Rated
//         </span>
//         <span className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//           <Users className="w-3 h-3" />
//           High Demand
//         </span>
//       </div>

//       {/* Admission Status */}
//       <div className="mb-4 text-center">
//         <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
//           <Calendar className="w-3 h-3" />
//           Admissions Open
//         </div>
//       </div>

//       {/* CTA Button */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform group-hover:scale-105 flex items-center justify-center gap-2">
//         View Details
//         <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//       </div>
//     </div>

//     {/* Enhanced Hover Effect Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//   </div>
// );

// // Course List Item Component (List View) - Enhanced
// const CourseListItem = ({ course, onCourseClick, index }: { course: Course; onCourseClick: (course: Course) => void; index: number }) => (
//   <div 
//     onClick={() => onCourseClick(course)}
//     className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
//   >
//     <div className="flex items-start justify-between">
//       <div className="flex-1">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="bg-purple-100 p-3 rounded-lg">
//             <GraduationCap className="w-8 h-8 text-purple-600" />
//           </div>
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-2">
//               <h3 className="text-xl font-bold text-gray-900">{course.courseName}</h3>
//               <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
//                 #{index + 1}
//               </div>
//             </div>
//             <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
//               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.category}</span>
//               <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{course.courseType}</span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {course.duration}
//               </span>
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star 
//                     key={i} 
//                     className={`w-3 h-3 ${i < Math.floor(course.popularityScore / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
//                   />
//                 ))}
//                 <span className="text-xs text-gray-600 ml-1">{course.popularityScore}/10</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <p className="text-gray-600 mb-4">{course.description}</p>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-xs text-gray-500 mb-1">Specializations</div>
//             <div className="font-semibold text-gray-900">{course.totalBranches}</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xs text-gray-500 mb-1">Average Fees</div>
//             <div className="font-semibold text-gray-900">{course.averageFeesRange}</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xs text-gray-500 mb-1">Placement Rate</div>
//             <div className="font-semibold text-gray-900">{course.placementRate}</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xs text-gray-500 mb-1">Avg. Salary</div>
//             <div className="font-semibold text-gray-900">{course.averageSalary}</div>
//           </div>
//         </div>
//       </div>
      
//       <div className="ml-6 text-right">
//         <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 group-hover:scale-105">
//           View Details
//           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Main Component
// export default function CoursesListingPage() {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [viewMode, setViewMode] = useState('grid');

//   // Filter and search courses
//   const filteredCourses = useMemo(() => {
//     return mockCoursesData.filter(course => {
//       const matchesSearch = 
//         course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.topColleges.some(college => college.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesCategory = !selectedCategory || course.category === selectedCategory;
//       const matchesLevel = !selectedLevel || course.courseType === selectedLevel;
      
//       return matchesSearch && matchesCategory && matchesLevel;
//     });
//   }, [searchTerm, selectedCategory, selectedLevel]);

//   const handleCourseClick = (course: Course) => {
//     router.push(`/courses/${course.courseId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Background Gradients */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 pointer-events-none"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none"></div>
      
//       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Compact Hero Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
//             <Sparkles className="w-3 h-3" />
//             Discover Your Perfect Course
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Explore Courses
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Find your ideal academic path from our comprehensive list of courses and specializations.
//           </p>
//         </div>

//         {/* Enhanced Search & Filter Section */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4 items-center">
//             {/* Enhanced Search Bar */}
//             <div className="flex-1 relative group w-full lg:w-auto">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search courses, specializations, colleges..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm('')}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center"
//                 >
//                   <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>
            
//             {/* Filter Buttons */}
//             <div className="flex gap-3 w-full lg:w-auto">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-700 px-5 py-4 rounded-xl font-medium transition-all duration-200 border border-purple-200 hover:border-purple-300 shadow-sm hover:shadow-md min-w-[140px]"
//               >
//                 <option value="">All Categories</option>
//                 <option value="Science">Science</option>
//                 <option value="Commerce">Commerce</option>
//                 <option value="Arts">Arts</option>
//               </select>
              
//               <select
//                 value={selectedLevel}
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//                 className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 px-5 py-4 rounded-xl font-medium transition-all duration-200 border border-green-200 hover:border-green-300 shadow-sm hover:shadow-md min-w-[120px]"
//               >
//                 <option value="">All Levels</option>
//                 <option value="UG">Undergraduate</option>
//                 <option value="PG">Postgraduate</option>
//               </select>

//               {/* View Mode Toggle */}
//               <div className="flex border border-gray-300 rounded-xl overflow-hidden">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-4 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
//                 >
//                   <Grid className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-4 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
//                 >
//                   <List className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Results Count */}
//           <div className="mt-4 text-sm text-gray-600">
//             Showing {filteredCourses.length} courses
//           </div>
//         </div>

//         {/* Compact Stats Section */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 text-center">
//             <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <BookOpen className="w-5 h-5 text-purple-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-1">{mockCoursesData.length}+</h3>
//             <p className="text-gray-600 text-sm">Courses</p>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 text-center">
//             <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <Building className="w-5 h-5 text-green-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-1">500+</h3>
//             <p className="text-gray-600 text-sm">Colleges</p>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 text-center">
//             <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <Award className="w-5 h-5 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-1">100%</h3>
//             <p className="text-gray-600 text-sm">Verified</p>
//           </div>
//         </div>

//         {/* Courses Display */}
//         {filteredCourses.length > 0 ? (
//           <div className={
//             viewMode === 'grid' 
//               ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//               : "space-y-6"
//           }>
//             {filteredCourses.map((course, index) => (
//               viewMode === 'grid' ? (
//                 <CourseCard 
//                   key={course.courseId} 
//                   course={course} 
//                   onCourseClick={handleCourseClick}
//                   index={index}
//                 />
//               ) : (
//                 <CourseListItem 
//                   key={course.courseId} 
//                   course={course} 
//                   onCourseClick={handleCourseClick}
//                   index={index}
//                 />
//               )
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-gray-400 mb-4">
//               <Search className="w-20 h-20 mx-auto" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h3>
//             <p className="text-gray-500 text-lg">Try adjusting your search terms or filters</p>
//           </div>
//         )}

//         {/* Load More Section */}
//         <div className="text-center mt-12">
//           <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200">
//             Load More Courses
//           </button>
//         </div>

//         {/* Talk to Counsellor App Download Section */}
//         <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-2xl">
//           <div className="max-w-4xl mx-auto">
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <MessageCircle className="w-4 h-4" />
//               Talk to Expert Counsellors
//             </div>
            
//             <h2 className="text-3xl font-bold mb-4">Get Personalized Course Guidance</h2>
//             <p className="text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
//               Download our app to connect with expert counsellors who will help you choose the right course based on your interests, aptitude, and career goals.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {/* Google Play Store Button */}
//               <a 
//                 href="https://play.google.com/store/apps/details?id=your.app.package" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
//                   </svg>
//                   <div className="text-left">
//                     <div className="text-xs text-emerald-600/70">Get it on</div>
//                     <div className="text-sm font-bold">Google Play</div>
//                   </div>
//                 </div>
//               </a>
              
//               {/* App Store Button */}
//               <a 
//                 href="https://apps.apple.com/app/your-app-name/idYOUR_APP_ID" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="bg-emerald-700/50 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl hover:bg-emerald-700/70 transition-all duration-200 border border-emerald-400/30 flex items-center justify-center gap-3 group"
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
//                   </svg>
//                   <div className="text-left">
//                     <div className="text-xs text-white/70">Download on the</div>
//                     <div className="text-sm font-bold">App Store</div>
//                   </div>
//                 </div>
//               </a>
//             </div>
            
//             <div className="mt-6 flex flex-wrap justify-center gap-6 text-emerald-200 text-sm">
//               <div className="flex items-center gap-2">
//                 <Smartphone className="w-4 h-4" />
//                 Free Download
//               </div>
//               <div className="flex items-center gap-2">
//                 <MessageCircle className="w-4 h-4" />
//                 Expert Counsellors
//               </div>
//               <div className="flex items-center gap-2">
//                 <Award className="w-4 h-4" />
//                 Personalized Guidance
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
