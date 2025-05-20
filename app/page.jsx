// app/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-10 md:p-16 md:w-3/5">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hei, jeg er <span className="text-blue-200">Erik Gulliksen</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Backend-utvikler fokusert på C# og .NET med en lidenskap for å bygge robuste og skalerbare løsninger.
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
              <Link 
                href="/projects" 
                className="block md:inline-block text-center py-3 px-6 bg-blue-900 text-white rounded-md transition-colors hover:bg-blue-950 shadow-md"
              >
                Se mine prosjekter
              </Link>
              
              <Link 
                href="/about" 
                className="block md:inline-block text-center py-3 px-6 bg-white text-blue-700 rounded-md border border-blue-200 transition-colors hover:bg-blue-50"
              >
                Lær mer om meg
              </Link>
            </div>
          </div>
          
          <div className="md:w-2/5 p-8 flex justify-center items-center bg-blue-700 bg-opacity-50 h-full">
            <div className="relative h-64 w-64 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                Portrettbilde kommer
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mt-24 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Utforsk min portefølje</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link href="/about" className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-2">Om Meg</h3>
            <p className="text-blue-100 text-center">Lær mer om min bakgrunn og mine mål innen utvikling.</p>
          </Link>
          
          <Link href="/projects" className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-2">Prosjekter</h3>
            <p className="text-blue-100 text-center">Se mine prosjekter innen backend og spillutvikling.</p>
          </Link>
          
          <Link href="/skills" className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-2">Ferdigheter</h3>
            <p className="text-blue-100 text-center">Teknologier og verktøy jeg bruker i utviklingen.</p>
          </Link>
        </div>
        
        <div className="mt-12">
          <Link 
            href="/contact" 
            className="inline-block py-3 px-8 bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-800 transition-colors"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </div>
  );
}
