'use client';
import ProjectImage from '../../components/ProjectImage';
import { usePathname } from 'next/navigation';
import { useTranslations } from '../../i18n/context';

export default function ProjectsPage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const t = useTranslations();
  
  // Project keys for mapping
  const projectKeys = ['hangman', 'discordBot', 'bomberman'] as const;

  // Images for each project
  const projectImages = {
    hangman: '/assets/Hangman.jpeg',
    discordBot: '/assets/Bot.jpeg',
    bomberman: '/assets/Bomberman.jpeg'
  } as const;

  // Technologies for each project (these aren't in translations yet)
  const projectTechnologies = {
    hangman: ['Blazor WebAssembly', 'C#', '.NET 8', 'Bootstrap 5', 'HTML/CSS'],
    discordBot: ['C#', 'Discord.Net', 'SQLite', 'Entity Framework Core', 'Docker Swarm'],
    bomberman: ['C#', '.NET', 'xUnit', 'Game State Management', 'Message Bus Architecture']
  } as const;

  // URLs for each project
  const projectUrls = {
    hangman: {
      sourceCode: 'https://github.com/Erikg-kodehode/Hangman',
      liveDemo: 'https://hangman-eight-sable.vercel.app/'
    },
    discordBot: {
      sourceCode: 'https://github.com/Erikg-kodehode/Signup-bot',
      liveDemo: null
    },
    bomberman: {
      sourceCode: 'https://github.com/Erikg-kodehode/Bomberman',
      liveDemo: null
    }
  } as const;

  // Prepare projects data using translations
  const projects = projectKeys.map(key => ({
    key,
    title: t.projects.projects[key].title,
    description: t.projects.projects[key].description,
    imageUrl: projectImages[key],
    technologies: projectTechnologies[key],
    features: t.projects.projects[key].features,
    sourceCodeUrl: projectUrls[key].sourceCode,
    liveDemoUrl: projectUrls[key].liveDemo
  }));

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-200">{t.projects.title}</h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto transition-colors duration-200">
          {t.projects.intro}
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
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">{t.projects.labels.technologies}</h3>
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
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-200">{t.projects.labels.keyFeatures}</h3>
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
                      className="px-3 py-1.5 text-xs bg-blue-600 dark:bg-blue-700 text-white dark:text-green-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-slate-600 dark:bg-slate-700 text-white dark:text-green-white rounded hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200 font-medium"
                    >
                      {t.projects.labels.liveDemo}
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
