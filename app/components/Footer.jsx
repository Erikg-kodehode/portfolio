'use client';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import DiscordLink from './DiscordLink';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 bg-gradient-to-br from-blue-50 via-blue-25 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-blue-900 dark:text-slate-100 shadow-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} Erik Gulliksen. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 items-center">
            <Link 
              href="https://github.com/Erikg-kodehode" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              aria-label="GitHub Profile"
            >
              <FaGithub className="text-lg" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            <DiscordLink />
            <Link 
              href="/contact" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

