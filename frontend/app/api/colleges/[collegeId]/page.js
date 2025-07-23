// app/colleges/[collegeId]/page.js

import React from 'react';

export async function generateStaticParams() {
  // Optional: preload known college IDs for static gen
  return []; // or [{ collegeId: 'IIT_DELHI' }, ...]
}

async function getCollegeData(collegeId) {
  const res = await fetch(`http://localhost:8000/api/college/${collegeId}/`, {
    cache: 'no-store', // disables caching for freshness
  });

  if (!res.ok) throw new Error('College not found');

  return res.json();
}

export default async function CollegePage({ params }) {
  const { collegeId } = params;
  const data = await getCollegeData(collegeId);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{data.collegeName}</h1>
      <p className="mb-4">{data.collegeInfo}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Courses Offered</h2>
      {data.coursesOffered.map((course) => (
        <div key={course.courseId} className="mb-4">
          <h3 className="text-xl font-bold">{course.streamName}</h3>
          {course.branches.map((branch) => (
            <div key={branch.branchId} className="ml-4 mt-2">
              <p className="font-semibold">{branch.branchName}</p>
              <p>Faculty: {branch.faculty}</p>
              <p>Fees: {branch.fees}</p>
              <p>Seats: {branch.seat}</p>
              <p>Cutoffs: {branch.cutoffs}</p>
            </div>
          ))}
        </div>
      ))}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Infrastructure</h2>
      {data.Infrastructure.map((infra, idx) => (
        <div key={idx}>
          <p>{infra.infraDescription}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {infra.infraPhotos.map((photo, i) => (
              <img key={i} src={photo.photoUrl} alt={`infra ${i}`} className="rounded shadow" />
            ))}
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Videos</h2>
      <div className="flex flex-wrap gap-4">
        {data.videosrelatedToCollege.map((video, idx) => (
          <iframe
            key={idx}
            src={video.videoUrl}
            width="300"
            height="200"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          ></iframe>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">FAQs</h2>
      <ul className="list-disc pl-6">
        {data.faqs.map((faq, i) => (
          <li key={i}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Scholarships</h2>
      {data.Scholarships.map((scholar, i) => (
        <p key={i}>{scholar.scholarshipDescription}</p>
      ))}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Location</h2>
      <p>{data.collegeFullAddress}</p>
    </div>
  );
}
