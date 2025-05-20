// app/about/page.jsx
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Om Meg - Erik Gulliksen',
  description: 'Lær mer om min bakgrunn, utviklerreise, og lidenskap for backend-utvikling med C# og .NET.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Om Meg</h1>
        <p className="text-xl text-blue-700 max-w-3xl mx-auto">
          Hei! Jeg er Erik Gulliksen, en utvikler med fokus på backend-teknologier 
          og en lidenskapelig interesse for å bygge robuste systemer og applikasjoner.
        </p>
      </header>

      <section className="mb-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white shadow-xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-lg">Portrett kommer</span>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6">Hvem er jeg?</h2>
            <div className="space-y-4 text-blue-100 text-lg">
              <p>
                Jeg er en utvikler tidlig i min karriere med en naturlig interesse for hvordan ting fungerer 
                under overflaten. Dette har ledet meg til å fokusere på backend-utvikling, 
                hvor jeg får muligheten til å jobbe med systemets "hjerne" og logikk.
              </p>
              <p>
                Min reise i programmeringsverdenen begynte med nysgjerrighet og har utviklet seg til en 
                stadig voksende lidenskap for å bygge effektive, skalerbare løsninger med C# og .NET økosystemet.
              </p>
              <p>
                Når jeg ikke koder, liker jeg å lære nye teknologier, utforske design patterns og 
                finne elegante løsninger på komplekse problemer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Min utviklerreise</h2>
        
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-hvite-100">Oppdagelsen av programmering</h3>
            <p className="text-hvite-100 mb-4 leading-relaxed">
              Min første opplevelse med koding vekket umiddelbart en fascinasjon. Å kunne skape noe 
              fra ingenting, bare med logisk tenkning og et tastatur, føltes magisk. Denne 
              tidlige fascinasjonen for problemløsning har formet min tilnærming til utvikling.
            </p>
            <p className="text-blue-100 leading-relaxed">
              C# fanget raskt min interesse med sitt ryddige syntaks og kraftige økosystem. Jeg 
              begynte med små konsollapplikasjoner og oppdaget gleden ved å bryte ned komplekse 
              utfordringer til håndterbare deler.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Fordypning i backend-utvikling</h3>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Ettersom mine ferdigheter utviklet seg, fant jeg større interesse i backend-utvikling. 
              Databaser, API-er og server-logikk føltes som en naturlig match for min systematiske 
              tenkning og problemløsningsevner.
            </p>
            <p className="text-blue-100 leading-relaxed">
              ASP.NET Core åpnet en ny verden av muligheter. Jeg begynte å bygge små backend-tjenester 
              og lærte hvordan man strukturerer kode for skalerbarhet og vedlikeholdbarhet.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Praktiske prosjekter</h3>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Jeg tror sterkt på læring gjennom praksis. Hvert prosjekt har vært en mulighet til å 
              utforske nye konsepter og løse reelle utfordringer. Fra Bomberman-backend til Discord-bots, 
              har hvert prosjekt utvidet min forståelse og ferdigheter.
            </p>
            <p className="text-blue-100 leading-relaxed">
              Disse prosjektene har ikke bare styrket mine tekniske ferdigheter, men også gitt meg 
              verdifull erfaring med prosjektstyring, feilsøking og arkitekturdesign.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-8">Min utviklingsfilosofi</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Kodeprinsippene jeg følger</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Enkelhet fremfor kompleksitet - elegant, lettleselig kode</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Lesbarhet og vedlikeholdbarhet er like viktig som funksjonalitet</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Systematisk testing og feilhåndtering for robust programvare</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Kontinuerlig læring og forbedring av kodepraksiser</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Min tilnærming til utfordringer</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Bryte ned komplekse problemer til håndterbare deler</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Utforske flere løsningsalternativer før implementering</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Lære av feil og feilsøkingsprosesser</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Balansere teoretisk kunnskap med praktisk implementering</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Mine mål fremover</h2>
        
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Kortsiktige mål</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Mestre grunnleggende ASP.NET Core konsepter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Bygge flere fullstendige backend-applikasjoner</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Utvide forståelsen av database-design og -optimalisering</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Mellomlangsiktige mål</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Utforske avanserte C# og .NET-konsepter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Lære mer om mikrotjeneste-arkitektur</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Bidra til open-source prosjekter innen .NET økosystemet</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Langsiktige mål</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Spesialisere meg innen backend-arkitektur og systemdesign</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Utforske AI og maskinlæring med .NET</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">•</span>
                  <span>Bygge mer komplekse, distribuerte systemer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">La oss kode sammen</h2>
        <p className="text-blue-700 max-w-2xl mx-auto mb-8">
          Jeg er alltid åpen for å diskutere nye prosjekter, læringsmuligheter eller potensielle samarbeid. 
          Hvis min bakgrunn og ferdigheter passer med dine behov, eller du bare vil slå av en prat om 
          teknologi, vil jeg gjerne høre fra deg!
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/projects" 
            className="py-3 px-6 bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-800 transition-colors"
          >
            Se mine prosjekter
          </Link>
          <Link 
            href="/contact" 
            className="py-3 px-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </div>
  );
}

