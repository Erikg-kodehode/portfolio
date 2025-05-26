'use client';

import { ReactNode, useEffect, useState, useRef, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  anchorRef?: RefObject<HTMLElement | HTMLButtonElement | null>;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title, anchorRef }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    setPortalTarget(document.body);
    return () => {
      setMounted(false);
      setPortalTarget(null);
    };
  }, []);

  if (!mounted || !portalTarget) {
    return null;
  }

  // Only render modal content and portal on client side
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            initial={{
              opacity: 0,
              scale: 0,
              transformOrigin: 'bottom right'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.8,
                restDelta: 0.001,
                restSpeed: 0.001
              }
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.15,
                ease: 'easeOut'
              }
            }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '6rem',
              zIndex: 100,
              transformOrigin: anchorRef?.current ? 
                `calc(100% + 1.5rem) calc(100% + 1.5rem)` : 
                'calc(100% + 1.5rem) calc(100% + 1.5rem)',
              willChange: 'transform, opacity'
            }}
            className="w-[22rem] max-h-[80vh] overflow-y-auto rounded-lg shadow-xl 
              bg-white dark:bg-slate-800 relative"
          >
            <div className="sticky top-0 left-0 right-0 flex items-center justify-between px-6 py-4 
              bg-gradient-to-br from-white via-white to-slate-50/80 
              dark:from-slate-800 dark:via-slate-800 dark:to-slate-800/95
              z-10 rounded-t-lg border-b border-slate-100 dark:border-slate-700 
              shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.1)]
              backdrop-blur-sm transition-all duration-200">
              {title && (
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-2 ml-6 text-slate-500 hover:text-slate-700 dark:text-slate-400 
                  dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 
                  transition-all duration-200 hover:scale-110 active:scale-95 
                  flex-shrink-0"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(
    modalContent,
    portalTarget
  );
}
