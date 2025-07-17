import React, { useState } from 'react';
import { Search, GraduationCap } from 'lucide-react';

export default function CollegeListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in city:', selectedCity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
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

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Colleges</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Courses</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Exams</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Reviews</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find the best college for you
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Search top rated colleges and explore courses, fees, reviews, exams, and more.
          </p>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-gray-50 rounded-lg border">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter a college or course"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select city</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Colleges Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Top colleges</h2>
          
          {/* College Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* College Card 1 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">College Name</h3>
                  <p className="text-gray-600">City</p>
                </div>
              </div>
            </div>

            {/* College Card 2 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">College Name</h3>
                  <p className="text-gray-600">City</p>
                </div>
              </div>
            </div>

            {/* College Card 3 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">College Name</h3>
                  <p className="text-gray-600">City</p>
                </div>
              </div>
            </div>

            {/* College Card 4 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">College Name</h3>
                  <p className="text-gray-600">City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}