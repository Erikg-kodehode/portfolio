'use client';
import Link from 'next/link';
import { FaGithub, FaAddressCard } from 'react-icons/fa';
import { DiscordLink } from '@/components/ui';
interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`w-full py-6 bg-gradient-to-br from-blue-50 via-blue-25 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-blue-900 dark:text-slate-100 shadow-md transition-colors duration-200 relative z-[20] mt-auto ${className}`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} Erik. All rights reserved.</p>
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
            <DiscordLink 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              spanClassName="hidden sm:inline"
            />
            <Link
              href="/contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              aria-label="Contact"
            >
              <FaAddressCard className="text-lg" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

