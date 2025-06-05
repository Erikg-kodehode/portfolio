'use client';

import { ReactNode, useState, useRef } from 'react';
import { Navigation, Footer } from '@/features/layout';
import { ErrorBoundary, CircuitBackground } from '@/components/shared';
import { Modal } from '@/components/ui';
import { ContactForm } from '@/features/contact/components';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function MainContent({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
const mailButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  return (
    <div className="flex flex-col relative isolate min-h-screen overflow-hidden">
      <CircuitBackground className="absolute inset-0 -z-10" />
      <Navigation className="flex-shrink-0" />
      <div className="pt-24" />
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 relative z-20">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <motion.button
        ref={mailButtonRef}
        onClick={() => setIsContactOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full 
          bg-gradient-to-br from-white/95 to-white/90 
          dark:from-slate-800/95 dark:to-slate-800/90
          hover:from-blue-50 hover:to-blue-50/95 
          dark:hover:from-slate-800/95 dark:hover:to-blue-500/5
          shadow-lg hover:shadow-xl dark:shadow-slate-950/10
          flex items-center justify-center z-50
          transform hover:scale-105 active:scale-95 
          transition-all duration-200
          backdrop-blur-[2px]
          border border-blue-100/20 dark:border-blue-400/10
          group
          hover:ring-4 hover:ring-blue-100/30 dark:hover:ring-blue-500/20
          before:absolute before:inset-0 before:rounded-full
          before:bg-gradient-to-br before:from-blue-100/20 before:to-transparent dark:before:from-blue-400/10 dark:before:to-transparent
          before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Contact me"
      >
        <FaEnvelope className="text-xl text-blue-500/90 dark:text-blue-400/90 
          group-hover:text-blue-600 dark:group-hover:text-blue-300 
          transition-colors duration-200 relative z-10" />
      </motion.button>

      <Modal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
        anchorRef={mailButtonRef}
        title={isEnglish ? "Contact Me" : "Kontakt Meg"}
      >
        <ContactForm />
      </Modal>

      <Footer className="flex-shrink-0 relative z-20" />
    </div>
  );
}
