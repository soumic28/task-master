'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-600">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link 
        href="/"
        className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
} 