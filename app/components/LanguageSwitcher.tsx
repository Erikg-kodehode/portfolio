'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  // Function to transform the path when switching languages
  const getTargetPath = () => {
    // If we're on the root path for either language
    if (pathname === '/en' || pathname === '/no' || pathname === '/') {
      return isEnglish ? '/no' : '/en';
    }
    
    // If we're switching from English to Norwegian
    if (isEnglish) {
      // Remove /en prefix and ensure we have a path
      const noPrefix = pathname.replace(/^\/en/, '');
      // Add /no prefix if the path doesn't already have it
      return noPrefix === '' ? '/no' : `/no${noPrefix}`;
    } else {
      // We're switching from Norwegian to English
      // Remove /no prefix if present
      const withoutNoPrefix = pathname.replace(/^\/no/, '');
      // Add /en prefix
      return withoutNoPrefix === '' ? '/en' : `/en${withoutNoPrefix}`;
    }
  };

  const targetPath = getTargetPath();

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
      aria-label={isEnglish ? 'Bytt til norsk' : 'Switch to English'}
    >
      <Image
        src={isEnglish ? '/assets/no-flag.svg' : '/assets/gb-flag.svg'}
        alt={isEnglish ? 'Norwegian flag' : 'UK flag'}
        width={20}
        height={15}
        className="rounded-sm"
      />
    </Link>
  );
}

