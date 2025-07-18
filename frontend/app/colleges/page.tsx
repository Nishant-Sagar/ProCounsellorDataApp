'use client';
import React, { useEffect, useState } from 'react';

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/colleges')
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading colleges...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Colleges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colleges.map((college) => (
          <div key={college.id} className="bg-white p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p className="text-gray-600">{college.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
