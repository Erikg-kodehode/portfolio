// app/projects/page.jsx
export const metadata = {
  title: 'Prosjekter - Erik Gulliksen',
  description: 'Backend-utvikler med fokus på C# og .NET. Sjekk ut mine prosjekter innen spillutvikling og Discord-bots.',
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Mine Prosjekter</h1>
        <p className="text-xl text-blue-700 max-w-3xl mx-auto">
          Her er en samling av prosjekter jeg har jobbet med. Hvert prosjekt representerer 
          ulike aspekter av min reise som utvikler og viser forskjellige ferdigheter.
        </p>
      </header>

      <div className="space-y-20">
        {/* Bomberman Project */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Bomberman Spillmotor (Backend)</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded-lg">
                <p className="text-blue-100 text-lg leading-relaxed mb-4">
                  En konsolbasert Bomberman-spillmotor implementert i C#. Spillet inneholder funksjoner 
                  for spillerbevegelse, plassering av bomber, og en grunnleggende spillverden med hindringer.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {['C#', 'Console Application', 'Game Logic', 'OOP', 'Grid-based Movement'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="https://github.com/Erikg-kodehode/Bomberman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-950 transition-colors"
                >
                  Se kildekode
                </a>
              </div>
              
              <div className="bg-blue-700 bg-opacity-30 rounded-lg flex items-center justify-center relative overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-blue-200 text-5xl mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-blue-100">Skjermbilde kommer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Tekniske detaljer</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Utviklet en rutenett-basert spillverden representert av ASCII-tegn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Implementerte spillernavigasjon med tastaturkontroller</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Skapte logikk for plassering og detonering av bomber</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Bygget et system for å detektere og håndtere kollisjoner</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Utfordringer & Løsninger</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Synkronisering av spilltilstand mellom flere spillere - løst med en sentralisert tilstandsmodell</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Optimalisering av kollisjonsdeteksjon - implementerte en grid-basert tilnærming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Separere logikk fra presentasjon - bygget et klart API for frontend-integrasjon</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hangman Project */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hangman Spill</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded-lg">
                <p className="text-blue-100 text-lg leading-relaxed mb-4">
                  En konsolbasert implementasjon av det klassiske Hangman-spillet, med ASCII-art 
                  for å visualisere henging, ordgjetting, og spillstatistikk. Spillet har ulike 
                  vanskelighetsnivåer og et bredt utvalg av ord.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {['C#', 'Console Application', 'String Manipulation', 'ASCII Graphics', 'Random Word Selection'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="https://github.com/Erikg-kodehode/Hangman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-950 transition-colors"
                >
                  Se kildekode
                </a>
              </div>
              
              <div className="bg-blue-700 bg-opacity-30 rounded-lg flex items-center justify-center relative overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-blue-200 text-5xl mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-blue-100">Skjermbilde kommer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Tekniske detaljer</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Implementerte en dynamisk ordvalgsystem med tilfeldige ord</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Utviklet gjetningsmekanismer som håndterer både enkeltbokstaver og hele ord</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Skapte detaljerte ASCII-baserte visuelle representasjoner av hengningsfaser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Lagde et brukervennlig grensesnitt med farge-kodet tekst for tilbakemeldinger</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Utfordringer & Løsninger</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Håndtering av spesialkarakterer og norske tegn - implementerte en tilpasset tegn-matching logikk</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Balansere spillvanskelighet - skapte forskjellige vanskelighetsgrader basert på ordlengde</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Console UI-begrensninger - utviklet en brukervennlig visuell representasjon innenfor konsollets rammer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Discord Bot Project */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Discord Bot</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded-lg">
                <p className="text-blue-100 text-lg leading-relaxed mb-4">
                  En Discord-bot bygget med Discord.js som reagerer på brukerkommandoer og 
                  server-hendelser. Boten inkluderer basisfunksjonalitet som meldingshåndtering, 
                  brukerinteraksjoner, og server-administrasjon.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {['JavaScript', 'Node.js', 'Discord.js', 'Event Listeners', 'Command Patterns'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="https://github.com/Erikg-kodehode/discordBot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-950 transition-colors"
                >
                  Se kildekode
                </a>
              </div>
              
              <div className="bg-blue-700 bg-opacity-30 rounded-lg flex items-center justify-center relative overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-blue-200 text-5xl mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-blue-100">Skjermbilde av Discord-bot kommandoer kommer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Tekniske detaljer</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Implementert med Discord.js biblioteket for interaksjon med Discord API</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Event-basert design for å reagere på meldinger og brukerinteraksjoner</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Kommandohåndtering med prefiks-baserte kommandoer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Basis funksjonalitet for server-administrasjon og brukerrespons</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Utfordringer & Løsninger</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Håndtering av Discord API-restriksjoner - implementerte enkel feilhåndtering</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Kommandostruktur - bygget et enkelt, utvidbart kommandosystem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>Miljøvariabler - separerte konfigurasjon fra koden for sikkerhet</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

