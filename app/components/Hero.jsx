// app/components/Hero.jsx
'use client';
import Navbar from './Navbar';

export default function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('prosjekter');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="hero-gradient min-h-[50vh] md:min-h-[50vh] flex flex-col justify-center items-center text-center p-3 relative">
      <Navbar />
      <div className="max-w-xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3">
          Hei, jeg er Erik Gulliksen {/* Oppdatert */}
        </h1>
        <p className="text-lg sm:text-xl text-slate-100 mb-6">
          En backend-fokusert utvikler med en lidenskap for å bygge solide og effektive løsninger.
          Har også erfaring med Next.js for frontend-utvikling.
        </p>
        <a
          href="#prosjekter"
          onClick={handleScrollToProjects}
          className="px-6 py-2.5 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-150 transform hover:scale-105"
        >
          Se mine prosjekter
        </a>
      </div>
    </header>
  );
}