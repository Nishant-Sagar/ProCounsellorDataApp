import Link from 'next/link';
import Image from 'next/image';

export default function HeaderLogo() {
  return (
    <Link
      href='/'
      className="flex items-center space-x-1"
    >
      <Image
        src='/logo.png'
        alt="ProCounsel icon"
        height={40} 
        width={40} 
        priority
      />

      <div>
        <h1 className="text-2xl font-bold text-orange-500">
          ProCounsel
        </h1>
      </div>
    </Link>
  );
}