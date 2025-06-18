"use client";

import { usePathname } from "next/navigation";
import CVRequestForm from "./CVRequestForm";

export default function CVPage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  
  // Debug logging
  console.log('🔍 [CVPage] Pathname:', pathname);
  console.log('🔍 [CVPage] isEnglish:', isEnglish);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 text-center leading-tight">
            {isEnglish ? "CV Access" : "CV-tilgang"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed">
            {isEnglish
              ? "Please fill out the form below to request my CV."
              : "Vennligst fyll ut skjemaet nedenfor for å be om min CV."}
          </p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-slate-100/5 to-blue-50/5 dark:from-slate-900/95 dark:to-slate-800/90 shadow-xl dark:shadow-2xl dark:shadow-blue-500/5 rounded-2xl p-6">
          <CVRequestForm isEnglish={isEnglish} />
        </div>
      </div>
    </div>
  );
}

