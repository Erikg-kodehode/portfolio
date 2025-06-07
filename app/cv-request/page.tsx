'use client';

import { CVRequestForm } from '@/components/cv-request-form'
import { usePathname } from 'next/navigation'

export default function CVRequestPage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          CV Access Request
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Please fill out this form to request access to my CV. I will review your request
          and get back to you via email with further instructions.
        </p>
        <CVRequestForm isEnglish={isEnglish ?? false} />
      </div>
    </main>
  )
}

