'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the English ContactForm component
const ContactFormEn = dynamic(() => import('../../../components/ContactFormEn'), {
  loading: () => <FormLoadingState />,
  ssr: false,
});

// Loading state component
function FormLoadingState() {
  return (
    <div className="space-y-4">
      {/* Name field skeleton */}
      <div>
        <div className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="w-full h-10 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-slate-100 dark:bg-slate-700 animate-pulse"></div>
      </div>

      {/* Email field skeleton */}
      <div>
        <div className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 w-14 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="w-full h-10 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-slate-100 dark:bg-slate-700 animate-pulse"></div>
      </div>

      {/* Subject field skeleton */}
      <div>
        <div className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="w-full h-10 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-slate-100 dark:bg-slate-700 animate-pulse"></div>
      </div>

      {/* Message field skeleton */}
      <div>
        <div className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="w-full h-32 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-slate-100 dark:bg-slate-700 animate-pulse"></div>
      </div>

      {/* Button skeleton */}
      <div>
        <div className="w-full h-10 bg-blue-600 dark:bg-blue-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export default function ContactFormPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">Send me a message</h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto leading-snug transition-colors duration-200">
          Fill out the form below to contact me directly.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <Suspense fallback={<FormLoadingState />}>
          <ContactFormEn />
        </Suspense>
      </div>

      <div className="mt-6 text-center">
        <Link 
          href="/en/contact"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
        >
          ← Back to contact page
        </Link>
      </div>
    </div>
  );
}
