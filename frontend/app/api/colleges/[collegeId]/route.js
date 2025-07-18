import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { collegeId } = params;

  try {
    const res = await fetch(`http://localhost:8000/api/college/${collegeId}/`);

    if (!res.ok) {
      return NextResponse.json({ error: 'College not found' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
