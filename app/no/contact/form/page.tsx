'use client';
import Link from 'next/link';
import ContactForm from '../../components/ContactForm';

export default function ContactFormPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">Send meg en melding</h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto leading-snug transition-colors duration-200">
          Fyll ut skjemaet under for å ta kontakt direkte.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <ContactForm />
      </div>

      <div className="mt-6 text-center">
        <Link 
          href="/contact"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
        >
          ← Tilbake til kontaktsiden
        </Link>
      </div>
    </div>
  );
}

