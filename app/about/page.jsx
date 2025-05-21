// app/about/page.jsx
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Om Meg - Erik Gulliksen',
  description: 'Lær mer om min bakgrunn som Verdensmester i robotprogrammering, min utviklerreise, og lidenskap for backend-utvikling med C# og .NET.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-200">Om Meg</h1>
        <p className="text-lg text-blue-700 dark:text-blue-400 max-w-2xl mx-auto transition-colors duration-200">
          Hei! Jeg er Erik Gulliksen, en utvikler med bakgrunn som Verdensmester i robotprogrammering for under 21. 
          Mitt fokus er nå på backend-utvikling med C# og .NET.
        </p>
      </header>

      {/* Profile Section with Image */}
      <section className="mb-8 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-600 dark:to-blue-900 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-6 md:w-1/3 flex justify-center">
            <div className="relative w-56 h-56 overflow-hidden rounded-full border-4 border-blue-100 dark:border-blue-300 shadow-md bg-slate-200 dark:bg-slate-700 transition-colors duration-200">
              <Image
                src="/assets/Erik-bnw.jpg"
                alt="Erik Gulliksen"
                fill={true}
                sizes="(max-width: 768px) 100vw, 224px"
                style={{ objectFit: 'cover', objectPosition: '0 -15px' }}
                priority={true}
                quality={90}
                loading="eager"
                className="rounded-full"
              />
            </div>
          </div>
          
          <div className="p-6 md:p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-white mb-4">Hvem er jeg?</h2>
            <div className="space-y-3 text-blue-100 text-base">
              <p>
                Jeg er en utvikler med en brennende lidenskap for faget, formet av en unik bakgrunn som verdensmester innen robotprogrammering. 
                Min fascinasjon for teknologi ble vekket tidlig, og denne erfaringen har dypt preget min tilnærming til programmering og kompleks problemløsning.
              </p>
              <p>
                I dag er mitt hovedfokus backend-utvikling med C# og .NET-økosystemet. Her får jeg fullt utløp for min systematiske og analytiske metode 
                for å designe og bygge robuste, skalerbare applikasjoner og tjenester.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Robotics Background */}
      <section className="mb-8 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors duration-200">Robotprogrammering: Min tidlige suksess</h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
            <p>
              Lenge før jeg begynte med tradisjonell programvareutvikling, fordypet jeg meg i robotprogrammering. 
              Denne interessen førte meg til internasjonale konkurranser hvor jeg konkurrerte mot talenter fra hele verden.
            </p>
            <p>
              Høydepunktet i min tidlige teknologireise var å vinne Verdensmestertittelen i robotprogrammering for deltakere under 21 år. 
              Denne erfaringen ga meg ikke bare tekniske ferdigheter innen programmering, men også uvurderlig erfaring med:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 transition-colors duration-200">
              <li>Algoritmetenkning og logisk problemløsning</li>
              <li>Teamarbeid under press</li>
              <li>Tid- og ressursoptimalisering</li>
              <li>Tilpasning til uventede utfordringer</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center transition-colors duration-200">Min utviklerreise</h2>
        
        <div className="space-y-4">
          <article className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Fra roboter til programvareutvikling</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-200">
                Overgangen fra robotprogrammering til tradisjonell programvareutvikling var naturlig. 
                De samme prinsippene for logikk, algoritmer og systematisk problemløsning jeg brukte 
                i robotkonkurranser viste seg å være direkte overførbare til programvareutvikling.
                C# fanget raskt min interesse med sitt ryddige syntaks og kraftige økosystem.
              </p>
            </div>
          </article>
          
          <article className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Backend-utvikling og systemarkitektur</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-200">
                Backend-utvikling tiltrakk meg naturlig. Databaser, API-er og server-logikk minner om 
                hvordan robotsystemer håndterer data og logikk under overflaten.
                Jeg utforsker nå ASP.NET Core, hvor jeg kan anvende min erfaring med systemarkitektur
                fra robotkonkurransene i oppbyggingen av robuste og skalerbare backend-løsninger.
              </p>
            </div>
          </article>
          
          <article className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Mitt fokus i dag</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-200">
                Jeg tror sterkt på læring gjennom praksis. Jeg bygger aktiv erfaring gjennom prosjekter 
                som Bomberman-backend og Discord-bots, hvor jeg anvender min bakgrunn fra robotverdenen.
                Min tilnærming er å bryte ned komplekse problemer, utforske alternative løsninger, 
                og balansere teoretisk kunnskap med praktisk implementering.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Goals Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center transition-colors duration-200">Mine mål fremover</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <article className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Kortsiktige mål</h3>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Mestre grunnleggende ASP.NET Core konsepter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Bygge flere fullstendige backend-applikasjoner</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Utvide forståelsen av database-design og -optimalisering</span>
                </li>
              </ul>
            </div>
          </article>
          
          <article className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Mellomlangsiktige mål</h3>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Utforske avanserte C# og .NET-konsepter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Lære mer om mikrotjeneste-arkitektur</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Bidra til open-source prosjekter innen .NET økosystemet</span>
                </li>
              </ul>
            </div>
          </article>
          
          <article className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Langsiktige mål</h3>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Spesialisere meg innen backend-arkitektur og systemdesign</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Utforske AI og maskinlæring med .NET</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                  <span>Bygge mer komplekse, distribuerte systemer</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-200">La oss kode sammen</h2>
        <p className="text-blue-700 dark:text-blue-400 max-w-2xl mx-auto mb-6 text-sm transition-colors duration-200">
          Jeg er alltid åpen for å diskutere nye prosjekter, læringsmuligheter eller potensielle samarbeid. 
          Hvis min bakgrunn og ferdigheter passer med dine behov, eller du bare vil slå av en prat om 
          teknologi, vil jeg gjerne høre fra deg!
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-3">
          <Link 
            href="/projects" 
            className="block md:inline-block text-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
          >
            Se mine prosjekter
          </Link>
          <Link 
            href="/contact" 
            className="block md:inline-block text-center px-4 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200 text-sm font-medium"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </div>
  );
}
