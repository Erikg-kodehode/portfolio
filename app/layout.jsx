// app/layout.jsx
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Initialize the Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Portefølje - Erik Gulliksen',
  description: 'Backend-utvikler med fokus på C# og .NET, som viser prosjekter innen spillutvikling og Discord-bots.',
  keywords: 'C#, .NET, ASP.NET Core, Backend Utvikling, Portefølje, Spillutvikling',
};

export default function RootLayout({ children }) {
  return (
    <html lang="no" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-gradient-to-br from-blue-100 via-blue-50 to-white text-blue-900 antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-6 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
