"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/i18n";
import { motion } from "framer-motion";

interface ProjectNavigationProps {
  currentProjectId: string;
}

export default function ProjectNavigation({ currentProjectId }: ProjectNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  // Get all project IDs in order
  const projectIds = Object.keys(t.projects.projects);
  const currentIndex = projectIds.indexOf(currentProjectId.split('-')[0]);
  
  // Get previous and next project IDs
  const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextProjectId = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  // Get project details
  const prevProject = prevProjectId ? t.projects.projects[prevProjectId] : null;
  const nextProject = nextProjectId ? t.projects.projects[nextProjectId] : null;

  return (
    <div className="flex justify-between items-center w-full mt-12 gap-4">
      {prevProject ? (
        <Link
          href={`${isEnglish ? '/en' : '/no'}/projects/${prevProjectId}`}
          className="group flex items-center space-x-3 p-4 rounded-lg
            bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
            hover:bg-white/80 dark:hover:bg-slate-800/80
            transition-all duration-200 flex-1 max-w-xs"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
            className="text-xl text-blue-600 dark:text-blue-400"
          >
            ←
          </motion.span>
          <div className="text-left">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {isEnglish ? "Previous Project" : "Forrige Prosjekt"}
            </div>
            <div className="text-sm font-medium text-blue-900 dark:text-blue-200 truncate">
              {prevProject.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1 max-w-xs" /> {/* Spacer */}
      )}

      {nextProject ? (
        <Link
          href={`${isEnglish ? '/en' : '/no'}/projects/${nextProjectId}`}
          className="group flex items-center justify-end space-x-3 p-4 rounded-lg
            bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
            hover:bg-white/80 dark:hover:bg-slate-800/80
            transition-all duration-200 flex-1 max-w-xs"
        >
          <div className="text-right">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {isEnglish ? "Next Project" : "Neste Prosjekt"}
            </div>
            <div className="text-sm font-medium text-blue-900 dark:text-blue-200 truncate">
              {nextProject.title}
            </div>
          </div>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="text-xl text-blue-600 dark:text-blue-400"
          >
            →
          </motion.span>
        </Link>
      ) : (
        <div className="flex-1 max-w-xs" /> {/* Spacer */}
      )}
    </div>
  );
}

