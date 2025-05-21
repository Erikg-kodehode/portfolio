import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: 'Erik Gulliksen - Portfolio',
  description: 'Backend developer portfolio'
};

export default function RootLayout({ children }) {
  const fontClass = inter?.className ?? '';
  
  return (
    <html lang="no" className={fontClass} suppressHydrationWarning>
      <body className="bg-gradient-to-br from-blue-50 via-blue-25 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-blue-900 dark:text-slate-100 antialiased min-h-screen flex flex-col transition-colors duration-200">
        <Providers>
          <Navigation />
          <main className="flex-grow w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
