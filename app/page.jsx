// app/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <section className="section-container overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-10 md:p-16 md:w-3/5">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hei, jeg er <span className="highlight-text">Erik Gulliksen</span>
            </h1>
            
            <p className="text-xl section-text mb-8">
              Backend-utvikler fokusert på C# og .NET med en lidenskap for å bygge robuste og skalerbare løsninger.
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
              <Link 
                href="/projects" 
                className="block md:inline-block text-center primary-button"
              >
                Se mine prosjekter
              </Link>
              
              <Link 
                href="/about" 
                className="block md:inline-block text-center secondary-button"
              >
                Lær mer om meg
              </Link>
            </div>
          </div>
          
          <div className="profile-picture-container">
            <div className="profile-picture-placeholder">
              <div className="placeholder-text">
                Portrettbilde kommer
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container-light mt-24 text-center">
        <h2 className="text-2xl font-bold mb-6">Utforsk min portefølje</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link href="/about" className="card-container">
            <h3 className="text-xl font-semibold mb-2">Om Meg</h3>
            <p className="section-text text-center">Lær mer om min bakgrunn og mine mål innen utvikling.</p>
          </Link>
          
          <Link href="/projects" className="card-container">
            <h3 className="text-xl font-semibold mb-2">Prosjekter</h3>
            <p className="section-text text-center">Se mine prosjekter innen backend og spillutvikling.</p>
          </Link>
          
          <Link href="/skills" className="card-container">
            <h3 className="text-xl font-semibold mb-2">Ferdigheter</h3>
            <p className="section-text text-center">Teknologier og verktøy jeg bruker i utviklingen.</p>
          </Link>
        </div>
        
        <div className="mt-12">
          <Link 
            href="/contact" 
            className="inline-block action-button"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </div>
  );
}
