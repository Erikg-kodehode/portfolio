"use client";
import { useState, useEffect } from "react";
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
  // Add debug logging
  console.log(`ProjectCard rendering for ${title}:`, {
    hasSourceCode: Boolean(sourceCodeUrl),
    sourceCodeUrl,
    hasLiveDemo: Boolean(liveDemoUrl),
    liveDemoUrl
  });

  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ article: null, content: null, buttons: null });

  // Debug: Log container dimensions
  useEffect(() => {
    const articleEl = document.getElementById(`project-${title.replace(/\s+/g, "-").toLowerCase()}`);
    const contentEl = articleEl?.querySelector('.content-wrapper');
    const buttonsEl = articleEl?.querySelector('.buttons-wrapper');

    if (articleEl && contentEl && buttonsEl) {
      const dims = {
        article: {
          height: articleEl.offsetHeight,
          scroll: articleEl.scrollHeight,
          client: articleEl.clientHeight
        },
        content: {
          height: contentEl.offsetHeight,
          scroll: contentEl.scrollHeight,
          client: contentEl.clientHeight
        },
        buttons: {
          height: buttonsEl.offsetHeight,
          scroll: buttonsEl.scrollHeight,
          client: buttonsEl.clientHeight
        }
      };
      console.log(`Dimensions for ${title}:`, dims);
      setDimensions(dims);
    }
  }, [title, isVisible]);

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

  return (
    <article 
      id={`project-${title.replace(/\s+/g, "-").toLowerCase()}`}
      className={`
        bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl
        border border-slate-200/20 dark:border-slate-700/20
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]
        transition-all duration-500 ease-out group
        hover:-translate-y-1
        transform-gpu will-change-transform 
        relative flex flex-col
        min-h-[600px] max-h-[800px]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      <ErrorBoundary fallback={
        <div className="w-full aspect-[16/9] bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-t-lg">
          <span className="text-slate-600 dark:text-slate-300">Could not load image</span>
        </div>
      }>
        <ProjectImage 
          src={imageUrl} 
          alt={imageAlt}
          priority={priority}
        />
      </ErrorBoundary>
      
      <div className="
        content-wrapper
        p-4 flex flex-col
        min-h-[250px]
      ">
        <h2 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3 transition-colors duration-300 tracking-tight leading-snug group-hover:text-blue-800 dark:group-hover:text-blue-100">
          {title}
        </h2>
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <p className="text-blue-800/70 dark:text-blue-300/70 text-sm leading-relaxed mb-8 transition-colors duration-300 line-clamp-4 text-balance">
              {description}
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-xs font-semibold uppercase text-blue-900/60 dark:text-blue-200/60 mb-2 transition-colors duration-300">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-[0.15rem] text-[10px] leading-relaxed font-medium bg-blue-50/50 dark:bg-blue-900/20
                    text-blue-700 dark:text-blue-300 rounded border border-blue-100/50 dark:border-blue-800/30
                    transition-colors duration-200"
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
            flex justify-start gap-3 p-4 mt-auto
            border-t border-slate-200 dark:border-slate-700
            relative z-20
          "
          onMouseEnter={() => console.log(`Buttons container for ${title} - mouse enter`)}
        >
          {sourceCodeUrl && (
            <a 
              href={sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                console.log('GitHub button clicked:', { url: sourceCodeUrl });
                // Don't prevent default - let the link work normally
              }}
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
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
