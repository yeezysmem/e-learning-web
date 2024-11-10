// app/not-found.tsx or pages/404.tsx
"use client";
import Link from 'next/link';
import notFound from '../public/notFound.svg';
import Image from 'next/image';
import { useState } from 'react';
import { CircleDashed } from 'lucide-react';

const NotFoundPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => {
        setIsLoading(true);
      }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <Image src={notFound} alt="Not Found" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      {isLoading ? (
        <Link href="/" onClick={handleClick} className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center gap-2'>
            <CircleDashed className="w-7 h-7 animate-spin" />
            <span>Loading...</span>
        </Link>
        ) : (
            <Link href="/" onClick={handleClick} className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'>
            Go to Home
        </Link>
        )}
      
    </div>
  );
};

export default NotFoundPage;
