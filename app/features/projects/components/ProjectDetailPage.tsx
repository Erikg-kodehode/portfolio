"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/i18n";
import { ErrorBoundary } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProjectSwipeNav from "./ProjectSwipeNav";

interface ProjectDetailPageProps {
  projectId: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  type ProjectKey = 'bot' | 'hangman' | 'bomberman';
  type ProjectUrlKey = ProjectKey | 'checkinbot' | 'check-in' | 'discordbot' | 'discord-bot';

  // Define the master project configuration
  const projectConfig: {
    urlToKey: Record<ProjectUrlKey, ProjectKey>;
    assetNames: Record<ProjectKey, string>;
    order: ProjectKey[];
  } = {
    // Map all possible URL variations to the canonical project key
    urlToKey: {
      'checkinbot': 'bot',
      'check-in': 'bot',
      'discordbot': 'bot',
      'discord-bot': 'bot',
      'bot': 'bot',
      'hangman': 'hangman',
      'bomberman': 'bomberman'
    },
    // Map project keys to image asset names
    assetNames: {
      'bot': 'Bot',
      'hangman': 'Hangman',
      'bomberman': 'Bomberman'
    },
    // Define the fixed navigation order
    order: ['hangman', 'bot', 'bomberman']
  };

  // Process the incoming project ID
  const baseId = projectId.toLowerCase().split('-')[0] as ProjectUrlKey;
  const canonicalKey = projectConfig.urlToKey[baseId] || (baseId as ProjectKey);
  const assetName = projectConfig.assetNames[canonicalKey] || canonicalKey;
  
  // Handle navigation
  const currentIndex = projectConfig.order.indexOf(canonicalKey);
  const prevProjectId = currentIndex > 0 ? projectConfig.order[currentIndex - 1] : null;
  const nextProjectId = currentIndex < projectConfig.order.length - 1 ? projectConfig.order[currentIndex + 1] : null;
  
  const project = t.projects.projects[canonicalKey as keyof typeof t.projects.projects];

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">
          {isEnglish ? "Project not found" : "Prosjektet ble ikke funnet"}
        </h1>
        <Link 
          href={isEnglish ? "/en/projects" : "/no/projects"}
          className="group text-blue-600 hover:text-blue-700 dark:text-blue-400 
            dark:hover:text-blue-300 inline-flex items-center"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span className="relative">
            {isEnglish ? "Back to Projects" : "Tilbake til Prosjekter"}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-left 
              scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <Link 
          href={isEnglish ? "/en/projects" : "/no/projects"}
          className="group inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 
            dark:hover:text-blue-300 transition-colors duration-200 mb-8 hover:bg-blue-50/10 
            dark:hover:bg-blue-900/10 rounded-lg px-3 py-2 -ml-3"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span className="relative">
            {isEnglish ? "Back to Projects" : "Tilbake til Prosjekter"}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-left 
              scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
          </span>
        </Link>

      <article className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
        <ErrorBoundary fallback={
          <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-slate-600 dark:text-slate-300">Could not load image</span>
          </div>
        }>
          <div className="relative w-full h-[600px]">
            <Image
              src={`/assets/${assetName}.jpeg`}
              alt={project.title}
              fill
              className="object-contain p-6 hover:p-2 transition-all duration-300 bg-slate-50 dark:bg-slate-900/50"
              priority
            />
          </div>
        </ErrorBoundary>

        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6">
            {project.title}
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">
                {isEnglish ? "Description" : "Beskrivelse"}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">
                {isEnglish ? "Key Features" : "Hovedfunksjoner"}
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-slate-700 dark:text-slate-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">
                {isEnglish ? "Technologies" : "Teknologier"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium 
                      bg-blue-50/50 dark:bg-blue-900/20
                      text-blue-700 dark:text-blue-300 
                      rounded-md border border-blue-100/50 dark:border-blue-800/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
              <a
                href={`https://github.com/Erikg-kodehode/${
                  canonicalKey === 'bot' ? 'Signup-bot' :
                  canonicalKey === 'hangman' ? 'Hangman' :
                  'Bomberman'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 
                  text-sm font-medium border-2 border-blue-400 dark:border-blue-600
                  bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 
                  rounded-md hover:bg-blue-50/80 dark:hover:bg-blue-900/30 
                  transition-all duration-200 hover:border-blue-500 dark:hover:border-blue-500 
                  hover:scale-[1.02] shadow-md hover:shadow-lg min-w-[160px]"
              >
                GitHub
              </a>
              {canonicalKey === 'hangman' && (
                <a
                  href="https://hangman-eight-sable.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 
                    text-sm font-medium bg-blue-600 dark:bg-blue-500 
                    border-2 border-blue-700 dark:border-blue-400 text-white 
                    rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 
                    transition-all duration-200 shadow-md hover:shadow-lg 
                    hover:scale-[1.02] min-w-[160px]"
                >
                  {t.projects.labels.liveDemo}
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Static navigation under content */}
      <div className="mt-8">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/20 dark:border-slate-700/20 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:bg-white/95 dark:hover:bg-slate-800/95 group">
          <ProjectSwipeNav
            prevProjectId={prevProjectId}
            nextProjectId={nextProjectId}
            isEnglish={isEnglish}
          />
        </div>
      </div>
    </div>
  );
}

