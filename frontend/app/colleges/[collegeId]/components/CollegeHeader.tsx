// app/colleges/[collegeId]/components/CollegeHeader.tsx
type CollegeHeaderProps = {
    data: any;
  };
  
  export default function CollegeHeader({ data }: CollegeHeaderProps) {
    return (
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {data.logoUrl && <img src={data.logoUrl} alt="College Logo" width={100} height={100} />}
        <div>
          <h1>{data.collegeName}</h1>
          <p>{data.collegeFullAddress}</p>
          <p><strong>State:</strong> {data.collegesLocationState}</p>
        </div>
      </header>
    );
  }
  