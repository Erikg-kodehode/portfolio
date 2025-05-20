// app/components/Navigation.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Hjem', path: '/' },
    { name: 'Om Meg', path: '/about' },
    { name: 'Prosjekter', path: '/projects' },
    { name: 'Ferdigheter', path: '/skills' },
    { name: 'Kontakt', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm py-4">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Erik Gulliksen
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition-colors duration-200 hover:text-blue-600 ${
                pathname === link.path ? 'text-blue-600 font-medium' : 'text-blue-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-md">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors duration-200 hover:text-blue-600 ${
                  pathname === link.path ? 'text-blue-600 font-medium' : 'text-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

