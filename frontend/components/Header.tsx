import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { Button } from "./Button"
export default function Header(){
    return <section>
      <div className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">COLLEGE</h1>
                <p className="text-sm text-gray-600 -mt-1">LISTING</p>
              </div>
            </div>

            <nav className="flex items-center space-x-8">
              <Link href='/colleges' className="text-gray-700 hover:text-blue-600 font-medium">Colleges</Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">Courses</Link>
              <Link href="/exams" className="text-gray-700 hover:text-blue-600 font-medium">Exams</Link>
              <Link href="/reviews" className="text-gray-700 hover:text-blue-600 font-medium">Reviews</Link>
              <Button variants="primary" link="/login" size="lg" text="Login"/>
            </nav>
          </div>
        </div>
      </div>
    </section>
}
