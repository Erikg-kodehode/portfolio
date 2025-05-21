import ProjectImage from '../components/ProjectImage';

export const metadata = {
  title: 'Prosjekter - Erik Gulliksen',
  description: 'Backend-utvikler med fokus på C# og .NET. Sjekk ut mine prosjekter innen spillutvikling og Discord-bots.',
};

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Hangman Spill',
      description: 'En Blazor WebAssembly-implementasjon av det klassiske Hangman-spillet. Spilles direkte i nettleseren med responsivt design, temaveksling og interaktivt tastatur.',
      imageUrl: '/assets/Hangman.jpeg',
      technologies: ['Blazor WebAssembly', 'C#', '.NET 8', 'Bootstrap 5', 'HTML/CSS'],
      features: [
        'Klassisk Hangman-gameplay med visuell galgerepresentasjon',
        'Flere ordkategorier å velge mellom',
        'Rent, responsivt UI som fungerer på både desktop og mobile enheter',
        'Mørk/lys tema-veksler',
        'Interaktivt tastatur for bokstavvalg'
      ],
      sourceCodeUrl: 'https://github.com/Erikg-kodehode/Hangman',
      liveDemoUrl: 'https://hangman-eight-sable.vercel.app/'
    },
    {
      title: 'Innsjekking Discord Bot',
      description: 'En C#-basert Discord-bot for håndtering av daglige arbeidsinnsjekk. Poster en innsjekk-melding hver ukedag morgen og tilbyr knapper for å sjekke inn på kontor eller hjemmekontor.',
      imageUrl: '/assets/Bot.jpeg',
      technologies: ['C#', 'Discord.Net', 'SQLite', 'Entity Framework Core', 'Docker Swarm'],
      features: [
        'Poster innsjekk-melding hver morgen på ukedager',
        'Sletter forrige dags innsjekk-melding automatisk',
        'Lagrer innsjekk-data i SQLite-database',
        'Admin-kommandoer for å se innsjekk, slette oppføringer og liste manglende brukere',
        'Hopper over helger og norske helligdager'
      ],
      sourceCodeUrl: 'https://github.com/Erikg-kodehode/Signup-bot',
      liveDemoUrl: null
    },
    {
      title: 'Bomberman Backend Engine',
      description: 'En C# backend-motor for et Bomberman-lignende spill, designet for integrasjon i større systemer med meldingsbasert arkitektur.',
      imageUrl: '/assets/Bomberman.jpeg',
      technologies: ['C#', '.NET', 'xUnit', 'Game State Management', 'Message Bus Architecture'],
      features: [
        'Spilltilstand håndtert via GameSession med kart, spillere og aktive bomber',
        'Rutenettbasert kart med støtte for vegger, spillere, bomber og power-ups',
        'Spillerforflytning med kollisjonsdeteksjon',
        'Bombemekanikk med timer, eksplosjon og kjedereaksjoner',
        'Power-ups for å øke spillerstyrke'
      ],
      sourceCodeUrl: 'https://github.com/Erikg-kodehode/Bomberman',
      liveDemoUrl: null
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-200">Mine Prosjekter</h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto transition-colors duration-200">
          Her er en samling av prosjekter jeg har jobbet med. Hvert prosjekt representerer 
          ulike aspekter av min reise som utvikler.
        </p>
      </header>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <article key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative aspect-[4/3] md:aspect-auto w-full h-full">
                <ProjectImage
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                />
              </div>
              <div className="md:col-span-2 p-5 flex flex-col">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">{project.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 transition-colors duration-200">{project.description}</p>
                
                {project.technologies?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">Teknologier</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full transition-colors duration-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.features?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">Hovedfunksjoner</h3>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4 transition-colors duration-200">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex gap-2 mt-auto pt-3 border-t border-slate-200 dark:border-slate-700 transition-colors duration-200">
                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-slate-600 dark:bg-slate-700 text-white rounded hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200 font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
