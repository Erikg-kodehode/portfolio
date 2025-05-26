import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ProjectCard from './ProjectCard';
import { ErrorBoundary } from '@/components/shared';
import { useTranslations } from '@/i18n';

const FALLBACK_DIMENSIONS = {
  width: 1200,
  height: 900,
  aspectRatio: '4/3'
} as const;

interface FailedProjectCardProps {
  title: string;
  onRetry: () => void;
  lang: string;
}

function FailedProjectCard({ title, onRetry, lang }: FailedProjectCardProps) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full p-4">
      <div className="flex flex-col items-center justify-center text-center h-full gap-4">
        <div className="text-red-500 dark:text-red-400">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">
            {lang === 'no' ? 'Kunne ikke laste prosjekt' : 'Failed to load project'}
            {title && `: ${title}`}
          </h3>
        </div>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          {lang === 'no' ? 'Prøv igjen' : 'Try again'}
        </button>
      </div>
    </article>
  );
}

interface ProjectCardSkeletonProps {
  animate?: boolean;
}

function ProjectCardSkeleton({ animate = true }: ProjectCardSkeletonProps) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Image skeleton */}
      <div 
        className={`relative w-full bg-slate-200 dark:bg-slate-700 ${animate ? 'animate-pulse' : ''}`}
        style={{ aspectRatio: '4/3' }}
      />
      
      {/* Content skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title skeleton */}
        <div 
          className={`h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3 ${animate ? 'animate-pulse' : ''}`}
        />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div 
            className={`h-4 w-full bg-slate-200 dark:bg-slate-700 rounded ${animate ? 'animate-pulse' : ''}`}
          />
          <div 
            className={`h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded ${animate ? 'animate-pulse' : ''}`}
          />
        </div>
        
        {/* Technologies skeleton */}
        <div className="mb-3">
          <div 
            className={`h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2 ${animate ? 'animate-pulse' : ''}`}
          />
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full ${animate ? 'animate-pulse' : ''}`}
              />
            ))}
          </div>
        </div>
        
        {/* Links skeleton */}
        <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
          <div 
            className={`h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded ${animate ? 'animate-pulse' : ''}`}
          />
          <div 
            className={`h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded ${animate ? 'animate-pulse' : ''}`}
          />
        </div>
      </div>
    </article>
  );
}


interface ProjectImage {
  url: string;
  alt: {
    no: string;
    en: string;
  };
  width: number;
  height: number;
  aspectRatio: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  sourceCodeUrl?: string;
  liveDemoUrl?: string;
  image: ProjectImage;
}

const projectData: Project[] = [
  {
    id: "0",
    title: "Hangman Spill",
    description: "En implementasjon av det klassiske Hangman spillet | An implementation of the classic Hangman game",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    sourceCodeUrl: "https://github.com/Erikg-kodehode/Hangman",
    liveDemoUrl: "https://hangman-eight-sable.vercel.app",
    image: {
      url: "/assets/Hangman.jpeg",
      alt: {
        no: "Skjermbilde av Hangman spill",
        en: "Hangman game screenshot"
      },
      width: 1200,
      height: 900,
      aspectRatio: "4/3"
    }
  },
  {
    id: "1",
    title: "Discord Bot",
    description: "En Discord bot bygget med Node.js og Discord API | A Discord bot built with Node.js and Discord API",
    technologies: ["JavaScript", "Node.js", "Discord API"],
    sourceCodeUrl: "https://github.com/Erikg-kodehode/Signup-bot",
    // liveDemoUrl is omitted since there's no live demo
    image: {
      url: "/assets/Bot.jpeg",
      alt: {
        no: "Skjermbilde av Discord bot i aksjon",
        en: "Screenshot of Discord bot in action"
      },
      width: 1200,
      height: 900,
      aspectRatio: "4/3"
    }
  },
  {
    id: "2",
    title: "Bomberman Backend Engine",
    description: "En backend motor for Bomberman spill implementasjon | A backend engine for Bomberman game implementation",
    technologies: ["TypeScript", "Node.js", "Express"],
    sourceCodeUrl: "https://github.com/Erikg-kodehode/Bomberman",
    image: {
      url: "/assets/Bomberman.jpeg",
      alt: {
        no: "Bomberman spillmotor diagram",
        en: "Bomberman engine diagram"
      },
      width: 1200,
      height: 900,
      aspectRatio: "4/3"
    }
  },
  // Add more projects here as needed
];
interface ProjectCardPropsWithoutImage extends Omit<Project, 'image'> {
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageAspectRatio: string;
  priority?: boolean;
}

function mapProjectToCardProps(project: Project, lang: string, isPriority: boolean): ProjectCardPropsWithoutImage {
  const { image, ...rest } = project;
  // Explicitly map sourceCodeUrl to ensure it's preserved
  const mappedProps = {
    ...rest,
    sourceCodeUrl: project.sourceCodeUrl, // Explicitly preserve the URL
    imageUrl: image.url,
    imageAlt: image.alt[lang as keyof typeof image.alt] || image.alt.en, // Fallback to English
    imageWidth: image.width ?? FALLBACK_DIMENSIONS.width,
    imageHeight: image.height ?? FALLBACK_DIMENSIONS.height,
    imageAspectRatio: image.aspectRatio ?? FALLBACK_DIMENSIONS.aspectRatio,
    priority: isPriority
  };
  
  // Debug log the mapped props
  console.log('Mapped props for', project.title, {
    originalUrl: project.sourceCodeUrl,
    mappedUrl: mappedProps.sourceCodeUrl
  });
  
  return mappedProps;
}

export default function Projects() {
  const pathname = usePathname();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionId = "prosjekter";
  const titleId = `${sectionId}-title`;
  const currentLang = pathname?.startsWith('/en') ? 'en' : 'no';

  useEffect(() => {
    // Simulate data loading with a minimum delay
    const loadProjects = async () => {
      const minDelay = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        // In the future, this could be an actual API call
        await minDelay;
        console.log('Loading projects:', projectData); // Debug: Check initial data
        setProjects(projectData);
        console.log('Projects loaded successfully'); // Debug: Confirm state update
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);
  
  return (
    <section 
      id={sectionId} 
      className="
        section-container
        border-4 border-pink-300 dark:border-pink-700
        bg-pink-50/30 dark:bg-pink-900/10
        p-8 rounded-2xl
      "
      aria-labelledby={titleId}
    >
      <header className="text-center mb-8">
        <h2 id={titleId} className="section-title">{t.projects.title}</h2>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
          {t.projects.intro}
        </p>
      </header>

      {isLoading ? (
        // Loading skeleton grid
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-10"
          aria-hidden="true"
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-h-[24rem]">
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <ul 
          className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
            gap-8 md:gap-10
            min-h-[800px]
            border-4 border-purple-300 dark:border-purple-700
            bg-purple-50/30 dark:bg-purple-900/10
            p-4 rounded-xl
          "
          aria-label={currentLang === 'no' ? 'Liste over prosjekter' : 'List of projects'}
        >
          {projects.map((project: Project) => {
            console.log('Rendering project:', project.title, { 
              sourceCodeUrl: project.sourceCodeUrl,
              mappedProps: mapProjectToCardProps(project, currentLang, parseInt(project.id) <= 3)
            }); // Debug: Check project props
            return (
              <li 
                key={project.id}
                className="
                  min-h-[600px] max-h-[800px]
                  border-4 border-orange-300 dark:border-orange-700
                  bg-orange-50/30 dark:bg-orange-900/10
                  rounded-xl overflow-visible
                  relative
                  flex
                "
              >
              <ErrorBoundary
                fallback={({ resetError }) => (
                  <FailedProjectCard
                    title={project.title}
                    onRetry={() => {
                      resetError();
                    }}
                    lang={currentLang}
                  />
                )}
              >
                <ProjectCard 
                  {...mapProjectToCardProps(
                    project,
                    currentLang,
                    parseInt(project.id) <= 3
                  )}
                />
              </ErrorBoundary>
            </li>
          )})}
        </ul>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            {currentLang === 'no' ? 'Ingen prosjekter å vise.' : 'No projects to display.'}
          </p>
          {/* Optional: Add a retry button if loading failed */}
          <button
            onClick={() => setIsLoading(true)}
            className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-2 py-1"
          >
            {currentLang === 'no' ? 'Prøv igjen' : 'Try again'}
          </button>
        </div>
      )}
    </section>
  );
}
