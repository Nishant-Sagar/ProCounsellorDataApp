// import { GraduationCap } from "lucide-react"
// import Link from "next/link"
// import { Button } from "./Button"
// export default function Header(){
//     return <section>
//       <div className="bg-white shadow-sm relative z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <GraduationCap className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">COLLEGE</h1>
//                 <p className="text-sm text-gray-600 -mt-1">LISTING</p>
//               </div>
//             </div>

//             <nav className="flex items-center space-x-8">
//               <Link href='/colleges' className="text-gray-700 hover:text-blue-600 font-medium">Colleges</Link>
//               <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">Courses</Link>
//               <Link href="/exams" className="text-gray-700 hover:text-blue-600 font-medium">Exams</Link>
//               <Link href="/reviews" className="text-gray-700 hover:text-blue-600 font-medium">Reviews</Link>
//               <Button variants="primary" link="/login" size="lg" text="Login"/>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </section>
// }

'use client';

import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`bg-white transition-all duration-300 relative z-40 ${
      isScrolled 
        ? 'shadow-md border-b border-gray-100' 
        : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Clean Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ProCounsel
              </h1>
              {/* <p className="text-sm text-gray-600 -mt-1 font-medium">LISTING</p> */}
            </div>
          </div>

          {/* Simple Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href='/colleges' 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Colleges
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/courses" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/exams" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Exams
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            {/* <Link 
              href="/reviews" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link> */}
            
            {/* Simple Login Button */}
            {/* <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
              Login
            </button> */}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
