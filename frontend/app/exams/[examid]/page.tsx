import { notFound } from 'next/navigation';
import ExamOverview from './components/ExamOverview';
import ExamEligibility from './components/ExamEligibility';
import ExamPattern from './components/ExamPattern';
import ExamFees from './components/ExamFees';
// import ExamDates from './components/ExamDates';
// import ExamSyllabus from './components/ExamSyllabus';
// import ExamFAQs from './components/ExamFAQs';

interface ExamDetailsProps {
  params: {
    examId: string;
  };
}

export default async function ExamDetailsPage({ params }: ExamDetailsProps) {
  const { examId } = params;

  try {
    // Replace with your actual API endpoint
    const res = await fetch(`https://your-api-endpoint.com/api/exams/${examId}`);
    
    if (!res.ok) {
      throw new Error('Exam not found');
    }

    const exam = await res.json();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(234,88,12,0.05),transparent_50%)] pointer-events-none"></div>
        
        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <ExamOverview exam={exam} />
            <ExamEligibility exam={exam} />
            <ExamPattern exam={exam} />
            <ExamFees exam={exam} />
            <ExamDates exam={exam} />
            <ExamSyllabus exam={exam} />
            <ExamFAQs exam={exam} />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
