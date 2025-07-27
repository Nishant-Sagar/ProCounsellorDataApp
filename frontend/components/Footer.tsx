// export default function Footer(){
//     return  <footer className="bg-gray-800 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="font-bold text-lg mb-4">ProCounsellor</h3>
//               <p className="text-gray-400">
//                 Your one-stop solution for finding the best colleges and courses.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-bold text-lg mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400">Colleges</a></li>
//                 <li><a href="#" className="hover:text-blue-400">Courses</a></li>
//                 <li><a href="#" className="hover:text-blue-400">Exams</a></li>
//                 <li><a href="#" className="hover:text-blue-400">Reviews</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-lg mb-4">Contact Us</h3>
//               <p className="text-gray-400">Email: support@procounsellor.co.in</p>
//               <p className="text-gray-400">Phone: +91 7741285247</p>
//             </div>
//             <div>
//               <h3 className="font-bold text-lg mb-4">Follow Us</h3>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.014c0 4.438 2.865 8.225 6.839 9.54.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.014C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 ProCounsellor. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
// }

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import HeaderLogo from "./HeaderLogo"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern - matching your course page */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */} 
          <div className="space-y-4">
            <HeaderLogo/>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the best colleges and courses in India. Your gateway to quality education and bright career prospects.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/colleges" className="text-gray-300 hover:text-purple-400 transition-colors">Colleges</Link></li>
              <li><Link href="/courses" className="text-gray-300 hover:text-purple-400 transition-colors">Courses</Link></li>
              <li><Link href="/exams" className="text-gray-300 hover:text-purple-400 transition-colors">Exams</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-purple-400 transition-colors">Reviews</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Popular Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/courses?category=Engineering" className="text-gray-300 hover:text-purple-400 transition-colors">Engineering</Link></li>
              <li><Link href="/courses?category=Medical" className="text-gray-300 hover:text-purple-400 transition-colors">Medical</Link></li>
              <li><Link href="/courses?category=Management" className="text-gray-300 hover:text-purple-400 transition-colors">Management</Link></li>
              <li><Link href="/courses?category=Design" className="text-gray-300 hover:text-purple-400 transition-colors">Design</Link></li>
              <li><Link href="/courses?category=Science" className="text-gray-300 hover:text-purple-400 transition-colors">Science</Link></li>
              <li><Link href="/courses?category=Arts" className="text-gray-300 hover:text-purple-400 transition-colors">Arts</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-gray-300 text-sm">support@procounsel.co.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-300 text-sm">Pune, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ProCounsel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
