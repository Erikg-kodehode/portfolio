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
  const [isVisible, setIsVisible] = useState(false);

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
        bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg
        shadow-theme hover:shadow-lg overflow-hidden
        transition-all duration-300 group
        hover:-translate-y-1
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
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-200">
          {title}
        </h2>
        <p className="text-blue-700 dark:text-blue-400 mb-4 text-sm transition-colors duration-200">
          {description}
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 
                    text-blue-800 dark:text-blue-300 rounded-full transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {sourceCodeUrl && (
              <a 
                href={sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-400 text-sm hover:underline transition-colors duration-200"
              >
                GitHub
              </a>
            )}
            {liveDemoUrl && (
              <a 
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-400 text-sm hover:underline transition-colors duration-200"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
