// app/colleges/[collegeId]/components/CollegeOverview.tsx
type CollegeOverviewProps = {
    data: any;
  };
  
  export default function CollegeOverview({ data }: CollegeOverviewProps) {
    return (
      <section style={{ marginTop: '2rem' }}>
        <h2>About the College</h2>
        <p>{data.collegeInfo}</p>
  
        <h3>Ranking</h3>
        {data.coursesOffered && data.coursesOffered[0]?.ranking ? (
          <p>{data.coursesOffered[0].ranking}</p>
        ) : (
          <p>Ranking information not available</p>
        )}
  
        {data.alumni && (
          <>
            <h3>Notable Alumni</h3>
            <p>{data.alumni}</p>
          </>
        )}
      </section>
    );
  }
  