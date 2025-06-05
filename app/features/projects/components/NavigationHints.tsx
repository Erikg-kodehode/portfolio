"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationHintsProps {
  isEnglish: boolean;
  hasNextProject: boolean;
  hasPrevProject: boolean;
}

export default function NavigationHints({ isEnglish, hasNextProject, hasPrevProject }: NavigationHintsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeKey, setActiveKey] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveKey('left');
      } else if (e.key === 'ArrowRight') {
        setActiveKey('right');
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Show hints briefly when component mounts
  useEffect(() => {
    const hasSeenHints = localStorage.getItem('hasSeenNavigationHints');
    if (!hasSeenHints) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('hasSeenNavigationHints', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
            flex items-center gap-4 bg-black/80 text-white px-4 py-2 
            rounded-full text-sm backdrop-blur-sm z-50"
        >
          {hasPrevProject && (
            <motion.div
              animate={{
                scale: activeKey === 'left' ? 1.1 : 1,
                color: activeKey === 'left' ? '#60A5FA' : '#FFFFFF'
              }}
              className="flex items-center gap-1"
            >
              <span className="font-mono border border-white/20 px-2 py-0.5 rounded text-xs">←</span>
              <span className="hidden sm:inline">
                {isEnglish ? "Previous" : "Forrige"}
              </span>
            </motion.div>
          )}
          {hasNextProject && (
            <motion.div
              animate={{
                scale: activeKey === 'right' ? 1.1 : 1,
                color: activeKey === 'right' ? '#60A5FA' : '#FFFFFF'
              }}
              className="flex items-center gap-1"
            >
              <span className="hidden sm:inline">
                {isEnglish ? "Next" : "Neste"}
              </span>
              <span className="font-mono border border-white/20 px-2 py-0.5 rounded text-xs">→</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

