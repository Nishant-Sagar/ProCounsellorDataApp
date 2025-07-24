import Link from 'next/link';
import { XMLParser } from 'fast-xml-parser';
import { pascalCase } from '../utils/pascalCase';
import { Button } from '@/components/Button';

interface College {
  collegeId: string;
  collegeName: string;
  logoUrl: string;
  collegesLocationState: string;
}

export default async function CollegesPage() {
  const res = await fetch('https://procounsellor-backend-1000407154647.asia-south1.run.app/api/colleges/all');

  const xml = await res.text();
  const parser = new XMLParser();
  const json = parser.parse(xml);
  const colleges: College[] = json.ArrayList.item;

  return (
    <main className="max-w-full min-h-screen bg-gray-50 mx-auto px-4 py-8">      
      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {colleges.map((college) => {
          const name = pascalCase(college.collegeName)
          return (
          <li
            key={college.collegeId}
            className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 hover:shadow-lg transition-shadow"
          >
            <img
              src={college.logoUrl}
              alt={name}
              width={64}
              height={64}
              className="mb-4 rounded-full object-cover bg-gray-100 object-contain h-16 w-16 "
            />
            <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
              {name}
            </h2>
            <p className="text-gray-600 mb-4 text-center">{college.collegesLocationState}</p>
            <Button variants='secondary' size='md' text='View' link={`/colleges/${college.collegeId}`}/>
          </li>
        )
        })}
      </ul>
    </main>
  );
}
