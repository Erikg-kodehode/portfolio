'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Loading state with matching dimensions
  if (!mounted) return (
    <button 
      className="p-2.5 rounded-lg bg-slate-200/90 dark:bg-slate-700/90 
        text-slate-800 dark:text-slate-200 
        shadow-theme backdrop-blur-sm 
        transition-all duration-300 ease-in-out
        w-10 h-10 flex items-center justify-center"
      aria-label="Theme toggle loading"
    >
      <span className="opacity-0">🌙</span>
    </button>
  );

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
        p-2.5 rounded-lg
        bg-slate-200/90 hover:bg-slate-300/90 
        dark:bg-slate-700/90 dark:hover:bg-slate-600/90 
        text-slate-800 dark:text-slate-200 
        shadow-theme hover:shadow-lg
        backdrop-blur-sm 
        transform hover:scale-105
        transition-all duration-300 ease-in-out
        w-10 h-10 flex items-center justify-center
        ${theme === 'dark' ? 'rotate-0' : 'rotate-[360deg]'}
      `}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {theme === 'dark' ? (
          <span 
            role="img" 
            aria-hidden="true" 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
          >
            🌞
          </span>
        ) : (
          <span 
            role="img" 
            aria-hidden="true" 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
          >
            🌙
          </span>
        )}
      </div>
    </button>
  );
}

