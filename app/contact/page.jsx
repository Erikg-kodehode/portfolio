import Link from 'next/link';
import DiscordLink from '../components/DiscordLink';

export const metadata = {
  title: 'Kontakt - Erik Gulliksen',
  description: 'Ta kontakt med meg for potensielle samarbeid, jobbmuligheter eller bare for å slå av en prat om utvikling.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">Ta Kontakt</h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto leading-snug transition-colors duration-200">
          Interessert i å samarbeide eller bare vil slå av en prat om utvikling? 
          Jeg er alltid åpen for nye muligheter og spennende samtaler!
        </p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <section className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-950 rounded-lg shadow-md mb-6 overflow-hidden transition-colors duration-200">
          <div className="p-5 md:p-6">
            <h2 className="text-xl font-bold mb-3 text-center text-white dark:text-green-white">La oss snakke sammen</h2>
            
            <p className="text-blue-100 dark:text-green-white mb-5 leading-relaxed text-center text-sm">
              Jeg er interessert i prosjektsamarbeid, læringsmuligheter eller 
              jobbmuligheter relatert til backend-utvikling med C# og .NET. 
              Har du en idé eller et prosjekt du vil diskutere? Jeg ser frem til å høre fra deg!
            </p>
            
            <div className="flex flex-col items-center mb-5">
              <h3 className="text-lg font-semibold mb-3 text-white dark:text-green-white">Finn meg på GitHub</h3>
              <a 
                href="https://github.com/Erikg-kodehode"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-100 hover:text-white dark:hover:text-green-white transition-all duration-300 bg-blue-500 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-50 hover:shadow-md hover:-translate-y-0.5 transform"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="text-base font-medium">GitHub Profil</span>
              </a>
              <p className="mt-3 text-blue-100 dark:text-green-white text-center text-xs max-w-lg">
                Sjekk ut min GitHub-profil for å se kildekoden til prosjektene mine og følge min utvikling som programmerer.
              </p>
            </div>
            
            <div className="bg-blue-500 dark:bg-blue-800 bg-opacity-40 dark:bg-opacity-30 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-center">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-blue-100 dark:text-green-white text-sm mb-2">
                Star og/eller følg mine prosjekter på GitHub for å ta kontakt med meg direkte, 
                eller for å se mer av det jeg jobber med.
              </p>
              <p className="text-blue-100 dark:text-green-white text-xs">
                Du kan også bruke "Issues" på GitHub-prosjektene mine for å kommentere, 
                foreslå forbedringer, eller rapportere feil.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md mb-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors duration-200">Direkte Kontakt</h2>
            <div className="space-y-3">
              <div className="flex items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                  <Link 
                    href="/contact/form"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
                  >
                    Send melding via kontaktskjema →
                  </Link>
                </span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                  E-post: <a href="mailto:Erik.gulliksen@gmail.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200">Erik.gulliksen@gmail.com</a>
                </span>
              </div>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                  Discord: <DiscordLink 
                    showIcon={false} 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
                  />
                </span>
              </div>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                  Telefon: <a href="tel:+4792634382" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200">+47 926 34 382</a>
                </span>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-500 dark:text-slate-500 transition-colors duration-200">
              <p>Jeg svarer vanligvis på henvendelser innen 1-2 virkedager.</p>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Prosjektsamarbeid</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">Har du et spennende prosjekt du trenger hjelp med? Ta kontakt for å diskutere mulig samarbeid.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">Læringsmuligheter</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">Åpen for mentorskap og muligheter til å lære fra erfarne utviklere i bransjen.</p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <div className="space-y-2 md:space-y-0 md:space-x-3 md:flex justify-center mb-4">
            <Link 
              href="/projects" 
              className="block md:inline-block text-center px-4 py-1.5 bg-blue-600 dark:bg-blue-800 text-white dark:text-green-white rounded hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
              Se mine prosjekter
            </Link>
            
            <Link 
              href="/about" 
              className="block md:inline-block text-center px-4 py-1.5 bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-green-white rounded hover:bg-blue-200 dark:hover:bg-slate-700 transition-colors duration-200 text-sm font-medium">
              Om meg
            </Link>
          </div>
          
          <Link 
            href="/" 
            className="inline-block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
