'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import en from '../i18n/locales/en';
import no from '../i18n/locales/no';
import type { Translations } from '../i18n/locales/translations';

interface NavLink {
  name: string;
  path: string;
}

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isEnglish = pathname?.startsWith('/en');
  const t: Translations = isEnglish ? en : no;
  
  const navLinks: NavLink[] = [
    { name: t.nav.home, path: isEnglish ? '/en' : '/' },
    { name: t.nav.about, path: `${isEnglish ? '/en' : ''}/about` },
    { name: t.nav.projects, path: `${isEnglish ? '/en' : ''}/projects` },
    { name: t.nav.skills, path: `${isEnglish ? '/en' : ''}/skills` },
    { name: t.nav.contact, path: `${isEnglish ? '/en' : ''}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-sm py-4 transition-colors duration-200">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href={isEnglish ? '/en' : '/'} className="text-xl font-bold text-blue-700 dark:text-blue-400 transition-colors duration-200">
          Erik Gulliksen
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300 ${
                    pathname === link.path 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-blue-800 dark:text-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="text-blue-800 dark:text-slate-200 focus:outline-none transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-slate-800 px-6 py-4 shadow-md transition-colors duration-200" aria-label={t.nav.mobileMenu}>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300 ${
                    pathname === link.path 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-blue-800 dark:text-slate-200'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

