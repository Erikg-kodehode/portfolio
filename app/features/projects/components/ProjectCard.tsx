"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProjectImage from "./ProjectImage";
import { ErrorBoundary } from "@/components/shared";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  priority?: boolean;
  technologies: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}

export default function ProjectCard({ 
  title,
  description,
  imageUrl,
  imageAlt,
  priority = false,
  technologies = [],
  liveDemoUrl,
  sourceCodeUrl
}: ProjectCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`project-${title.replace(/\s+/g, "-").toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [title]);

  const handleCardClick = () => {
    if (isNavigating) return; // Prevent multiple clicks during navigation
    
    setIsNavigating(true);
    const getProjectId = (title: string) => {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('check-in') || lowerTitle.includes('discord')) {
        return 'bot';
      }
      return lowerTitle
        .split(' ')[0]
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };
    
    const projectId = getProjectId(title);
    
    const basePath = isEnglish ? "/en/projects/" : "/no/projects/";
    router.push(`${basePath}${projectId}`);
  };

  return (
    <article 
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      role="button"
      tabIndex={0}
      id={`project-${title.replace(/\s+/g, "-").toLowerCase()}`}
      className={`
        bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl
        border border-slate-200/20 dark:border-slate-700/20
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]
        transition-all duration-500 ease-out group
        hover:-translate-y-1
        transform-gpu will-change-transform 
        relative flex flex-col
        min-h-[500px] h-full
        ${isNavigating ? 'cursor-wait pointer-events-none opacity-70' : 'cursor-pointer'}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      <ErrorBoundary fallback={
        <div className="w-full h-[240px] bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-t-2xl">
          <span className="text-slate-600 dark:text-slate-300">Could not load image</span>
        </div>
      }>
        <div className="relative w-full h-[400px] overflow-hidden rounded-t-2xl group-hover:opacity-95 transition-opacity duration-300">
          <ProjectImage 
            src={imageUrl} 
            alt={imageAlt}
            priority={priority}
            className="rounded-t-2xl transition-transform duration-500 object-contain p-4 hover:p-1 bg-slate-50 dark:bg-slate-900/50"
          />
        </div>
      </ErrorBoundary>
      
      <div className="flex flex-col" style={{ height: 'calc(100% - 400px)' }}>
        <div className="p-5 flex-1">
          <h2 className="
            text-lg font-bold 
            text-blue-900 dark:text-blue-200 
            mb-3 transition-colors duration-300 
            tracking-tight leading-snug 
            group-hover:text-blue-800 dark:group-hover:text-blue-100
          ">
            {title}
          </h2>
          
          <div className="min-h-[120px]">
            <p className="
              text-blue-800/70 dark:text-blue-300/70 
              text-sm leading-relaxed 
              transition-colors duration-300
              text-balance
            ">
              {description}
            </p>
          </div>
        </div>
        
        <div className="p-5 border-t border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xs font-semibold uppercase text-blue-900/60 dark:text-blue-200/60 mb-3 transition-colors duration-300">
            {isEnglish ? "Technologies" : "Teknologier"}
          </h3>
          <div className="flex flex-wrap gap-2" style={{ height: '80px' }}>
            {technologies.map((tech) => (
              <span
                key={tech}
                className="
                  px-2 py-0.5 text-[11px] leading-relaxed font-medium 
                  bg-blue-50/50 dark:bg-blue-900/20
                  text-blue-700 dark:text-blue-300 rounded 
                  border border-blue-100/50 dark:border-blue-800/30
                  transition-colors duration-200
                  group-hover:border-blue-200/50 dark:group-hover:border-blue-700/30
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="
          buttons-wrapper
          flex justify-start gap-3 py-4 px-5
          border-t border-slate-200 dark:border-slate-700
          relative z-20
        "
      >
        {sourceCodeUrl && (
          <a 
            href={sourceCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              min-w-[120px] px-4 py-2 text-sm font-medium 
              border-2 border-blue-400 dark:border-blue-600
              bg-white dark:bg-slate-800
              text-blue-700 dark:text-blue-300 
              rounded-md hover:bg-blue-50/80 dark:hover:bg-blue-900/30
              transition-all duration-200 
              hover:border-blue-500 dark:hover:border-blue-500 
              hover:scale-[1.02]
              shadow-md hover:shadow-lg 
              flex items-center justify-center
              z-30
            "
          >
            GitHub
          </a>
        )}
        {liveDemoUrl && (
          <a 
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              min-w-[120px] px-4 py-2 text-sm font-medium 
              bg-blue-600 dark:bg-blue-500 
              border-2 border-blue-700 dark:border-blue-400
              text-white rounded-md 
              hover:bg-blue-700 dark:hover:bg-blue-600
              transition-all duration-200 
              shadow-md hover:shadow-lg 
              hover:scale-[1.02]
              flex items-center justify-center
              z-30
            "
          >
            {isEnglish ? "Live Demo" : "Se Demo"}
          </a>
        )}
      </div>
    </article>
  );
}
