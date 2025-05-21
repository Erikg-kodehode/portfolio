// app/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <section className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-6 md:p-8 md:w-3/5">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hei, jeg er <span className="text-blue-100">Erik Gulliksen</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              Backend-utvikler fokusert på C# og .NET med en lidenskap for å bygge robuste og skalerbare løsninger.
            </p>
            
            <div className="space-y-3 md:space-y-0 md:space-x-3 md:flex">
              <Link 
                href="/projects" 
                className="block md:inline-block text-center px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors text-sm font-medium"
              >
                Se mine prosjekter
              </Link>
              
              <Link 
                href="/about" 
                className="block md:inline-block text-center px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Lær mer om meg
              </Link>
            </div>
          </div>
          
          <div className="p-6 md:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-blue-100 shadow-md bg-slate-200">
              <Image
                src="/assets/Erik-BNW.jpg"
                alt="Erik Gulliksen"
                fill={true}
                sizes="(max-width: 768px) 100vw, 256px"
                style={{ objectFit: 'cover' }}
                priority={true}
                quality={90}
                loading="eager"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Utforsk min portefølje</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Link href="/about" className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Om Meg</h3>
            <p className="text-slate-600 text-sm">Lær mer om min bakgrunn og mine mål innen utvikling.</p>
          </Link>
          
          <Link href="/projects" className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Prosjekter</h3>
            <p className="text-slate-600 text-sm">Se mine prosjekter innen backend og spillutvikling.</p>
          </Link>
          
          <Link href="/skills" className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Ferdigheter</h3>
            <p className="text-slate-600 text-sm">Teknologier og verktøy jeg bruker i utviklingen.</p>
          </Link>
        </div>
        
        <div className="mt-8">
          <Link 
            href="/contact" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </div>
  );
}
