'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { ThemeToggle, LanguageSwitcher } from '@/components/ui';
import { useTranslations } from '@/i18n/context';

interface NavLink {
  name: string;
  path: string;
}

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  
  const isEnglish = pathname?.startsWith('/en');
  
  const navLinks = useMemo(() => [
    { name: t.nav.home, path: isEnglish ? '/en' : '/' },
    { name: t.nav.about, path: `${isEnglish ? '/en' : ''}/about` },
    { name: t.nav.projects, path: `${isEnglish ? '/en' : ''}/projects` },
    { name: t.nav.skills, path: `${isEnglish ? '/en' : ''}/skills` },
    { name: t.nav.contact, path: `${isEnglish ? '/en' : ''}/contact` },
  ], [isEnglish, t.nav]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      key={isEnglish ? 'en' : 'no'}
      className={`sticky top-0 z-50 
        bg-white/90 dark:bg-slate-800/90 
        backdrop-blur-md shadow-theme 
        transform-gpu transition-all duration-300 ease-in-out
        py-4 ${className}`}
      role="banner"
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          href={isEnglish ? '/en' : '/'} 
          className="flex items-center group relative"
        >
          <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14
            rounded-full bg-white/50 dark:bg-slate-700/50 
            shadow-lg dark:shadow-slate-900/20
            overflow-hidden
            transform-gpu transition-all duration-300 ease-out
            before:absolute before:inset-0 before:rounded-full
            before:border-2 before:border-blue-200 dark:before:border-blue-800
            before:transition-all before:duration-300
            after:absolute after:inset-0 after:rounded-full
            after:border-2 after:border-transparent
            after:transition-all after:duration-300
            group-hover:before:border-blue-400 dark:group-hover:before:border-blue-600
            group-hover:after:border-blue-300 dark:group-hover:after:border-blue-700
            group-hover:after:scale-110
            group-hover:shadow-xl"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 transform-gpu transition-all duration-300 ease-out group-hover:scale-[1.05]">
              <Image
                src="/assets/Logo.jpg"
                alt="Erik Gulliksen Logo"
                className="object-cover w-full h-full rounded-full select-none 
                  transition-all duration-300
                  group-hover:brightness-105 group-hover:contrast-105"
                width={64}
                height={64}
                priority
                quality={95}
              />
              <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none
                bg-gradient-to-tr from-transparent via-transparent to-white/10 dark:to-white/5
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="sr-only">{t.nav.home}</span>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`interactive relative group ${
                    pathname === link.path 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-content hover:text-blue-600 dark:hover:text-blue-300'
                  }`}
                >
                  <span className="relative group-hover:translate-x-1 transition-transform duration-300 ease-out">
                    {link.name}
                    <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 
                      bg-blue-600 dark:bg-blue-400 
                      transition-all duration-300 ease-out group-hover:w-full
                      ${pathname === link.path ? 'w-full' : ''}`}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="interactive text-content hover:text-blue-600 dark:hover:text-blue-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
              rounded-lg p-1 transform hover:scale-105 active:scale-95
              transition-all duration-300 ease-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <nav 
        className={`md:hidden fixed inset-x-0 top-[72px] 
          bg-white/95 dark:bg-slate-800/95 
          backdrop-blur-2xl shadow-theme
          px-6 py-4 transform transition-all duration-300 ease-out
          ${isMenuOpen 
            ? 'translate-y-0 opacity-100 z-40' 
            : '-translate-y-full opacity-0 pointer-events-none -z-10'
          }`} 
        aria-label={t.nav.mobileMenu}
      >
        <ul 
          className={`flex flex-col gap-4 transform transition-all duration-300 ease-out
            ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`interactive relative group py-2 px-3 rounded-md
                  transform transition-all duration-300 hover:translate-x-2
                  ${pathname === link.path 
                    ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50/50 dark:bg-slate-700/50' 
                    : 'text-content hover:text-blue-600 dark:hover:text-blue-300'
                  }`}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <span className="relative inline-flex items-center">
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 
                    bg-blue-600 dark:bg-blue-400 
                    transition-all duration-300 ease-out group-hover:w-full
                    ${pathname === link.path ? 'w-full' : ''}`}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}