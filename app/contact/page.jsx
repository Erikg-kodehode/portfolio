// app/contact/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Kontakt - Erik Gulliksen',
  description: 'Ta kontakt med meg for potensielle samarbeid, jobbmuligheter eller bare for å slå av en prat om utvikling.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Ta Kontakt</h1>
        <p className="text-xl text-blue-700 max-w-3xl mx-auto">
          Interessert i å samarbeide eller bare vil slå av en prat om utvikling? 
          Jeg er alltid åpen for nye muligheter og spennende samtaler!
        </p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-10 text-white shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">La oss snakke sammen</h2>
          
          <p className="text-blue-100 mb-10 leading-relaxed text-center text-lg">
            Jeg er interessert i prosjektsamarbeid, læringsmuligheter eller 
            jobbmuligheter relatert til backend-utvikling med C# og .NET. 
            Har du en idé eller et prosjekt du vil diskutere? Jeg ser frem til å høre fra deg!
          </p>
          
          <div className="flex flex-col items-center mb-10">
            <h3 className="text-xl font-semibold mb-6">Finn meg på GitHub</h3>
            <a 
              href="https://github.com/Erikg-kodehode"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-100 hover:text-white transition-colors bg-blue-700 bg-opacity-50 p-6 rounded-lg shadow-md hover:bg-opacity-70 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="text-xl font-medium">GitHub Profil</span>
            </a>
            <p className="mt-6 text-blue-100 text-center max-w-lg">
              Sjekk ut min GitHub-profil for å se kildekoden til prosjektene mine og følge min utvikling som programmerer.
            </p>
          </div>
          
          <div className="bg-blue-700 bg-opacity-30 p-8 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-blue-100 text-lg mb-6">
              Star og/eller følg mine prosjekter på GitHub for å ta kontakt med meg direkte, 
              eller for å se mer av det jeg jobber med.
            </p>
            <p className="text-blue-100 text-sm">
              Du kan også bruke "Issues" på GitHub-prosjektene mine for å kommentere, 
              foreslå forbedringer, eller rapportere feil.
            </p>
          </div>
        </section>
        
        <div className="text-center">
          <Link 
            href="/projects" 
            className="inline-block py-3 px-6 bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-800 transition-colors"
          >
            Se mine prosjekter
          </Link>
        </div>
      </div>
    </div>
  );
}

