"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  Clock,
  Star,
  Users,
  Award,
  ChevronRight,
  TrendingUp,
  ClipboardCheck,
  Wallet,
} from "lucide-react";
import AppLink from "@/components/AppLink";

// --- INTERFACES ---

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

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

// --- DATA ENRICHMENT ---

function enrichCourse(apiCourse: Partial<Course>): Course {
  return {
    courseId: apiCourse.courseId || "default-id",
    courseName: apiCourse.courseName || "Unnamed Course",
    courseType: apiCourse.courseType ?? "UG",
    category: apiCourse.category ?? "General",
    streamLevel: apiCourse.streamLevel ?? "Undergraduate",
    duration: apiCourse.duration ?? "3 years",
    description: apiCourse.description ?? "Description coming soon.",
    totalBranches: apiCourse.totalBranches ?? 0,
    averageFeesRange: apiCourse.averageFeesRange ?? "NA",
    topColleges: apiCourse.topColleges ?? [],
    popularityScore: apiCourse.popularityScore ?? 6,
    placementRate: apiCourse.placementRate ?? "NA",
    averageSalary: apiCourse.averageSalary ?? "NA",
    examRequired: apiCourse.examRequired ?? [],
    imageUrl: apiCourse.imageUrl ?? "",
  };
}

// --- STATIC COMPONENTS ---

const HeroSection = () => (
  <div className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white rounded-2xl overflow-hidden mb-12 shadow-2xl">
    <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover" />
    <div className="relative z-10 p-8 md:p-16">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white mb-4">
        <GraduationCap className="w-4 h-4" />
        Discover Courses
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Explore Top Courses
      </h1>
      <p className="text-lg md:text-xl text-white/90 max-w-2xl">
        Find the perfect course for your future. Browse detailed course info,
        specializations, career prospects, and top colleges.
      </p>
    </div>
  </div>
);

const StatsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
      <BookOpen className="w-10 h-10 mx-auto text-purple-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-800">20+</h3>
      <p className="text-gray-500">Courses Listed</p>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
      <Users className="w-10 h-10 mx-auto text-purple-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-800">5+</h3>
      <p className="text-gray-500">Streams Covered</p>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
      <Award className="w-10 h-10 mx-auto text-purple-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-800">100%</h3>
      <p className="text-gray-500">Verified Information</p>
    </div>
  </div>
);

// --- RE-DESIGNED COURSE CARD ---

const InfoPill = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
    <div className="text-purple-600 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800 text-sm">
        {value !== "NA" && value !== "₹ -" ? value : "Not Available"}
      </p>
    </div>
  </div>
);

const CourseCard = ({ course, onClick }: CourseCardProps) => (
  <div
    onClick={() => onClick(course)}
    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
  >
    {/* --- Image Section --- */}
    <div className="relative h-48 overflow-hidden">
      {course.imageUrl ? (
        <Image
          src={course.imageUrl}
          alt={course.courseName}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="h-48 bg-gradient-to-br from-purple-600 to-indigo-700" />
      )}
      <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-between">
        <div>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium mr-2">
            {course.category}
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
            {course.courseType}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {course.courseName}
        </h3>
      </div>
    </div>

    {/* --- Main Content Section --- */}
    <div className="p-5 flex-grow">
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {course.description}
      </p>

      {/* --- Key Stats Grid --- */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <InfoPill
          icon={<Clock className="w-5 h-5" />}
          label="Duration"
          value={course.duration}
        />
        <InfoPill
          icon={<TrendingUp className="w-5 h-5" />}
          label="Avg. Salary"
          value={course.averageSalary}
        />
        <InfoPill
          icon={<Wallet className="w-5 h-5" />}
          label="Avg. Fees"
          value={course.averageFeesRange}
        />
        <InfoPill
          icon={<ClipboardCheck className="w-5 h-5" />}
          label="Placement Rate"
          value={course.placementRate}
        />
      </div>

      {/* --- Exams & Colleges Tags --- */}
      {course.examRequired.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Entrance Exams
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {course.examRequired.map((exam) => (
              <span
                key={exam}
                className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>
      )}

      {course.topColleges.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Top Colleges
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {course.topColleges.slice(0, 3).map((college) => (
              <span
                key={college}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {college}
              </span>
            ))}
            {course.topColleges.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                +{course.topColleges.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>

    {/* --- Footer Section --- */}
    <div className="p-5 border-t border-gray-100 mt-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(course.popularityScore / 2)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {course.popularityScore}/10 Popularity
          </span>
        </div>
        <div className="flex items-center text-purple-600 group-hover:text-purple-800 transition-colors">
          <span className="font-semibold text-sm">View Details</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

const COURSES_PER_PAGE = 6;

export default function CoursesListingPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(COURSES_PER_PAGE);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/all`,
          { headers: { Accept: "application/json" }, cache: "no-cache" }
        );
        if (!res.ok) throw new Error("API failed");
        const rawCourses = await res.json();
        setCourses(rawCourses.map(enrichCourse));
      } catch (error) {
        console.error("Failed to fetch courses, using fallback:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + COURSES_PER_PAGE);
  };

  const handleClick = (course: Course) =>
    router.push(`/courses/${course.courseId}`);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <HeroSection />
        <StatsSection />
        <div className="mb-8">
            <AppLink />
        </div>
        
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading courses...
          </div>
        ) : courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, visibleCount).map((course) => (
                <CourseCard
                  key={course.courseId}
                  course={course}
                  onClick={handleClick}
                />
              ))}
            </div>
            {visibleCount < courses.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Load More Courses
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No courses available
            </h3>
            <p className="text-gray-500">
              Please check back later for our course listings.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}