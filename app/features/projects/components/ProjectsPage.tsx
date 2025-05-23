"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/i18n";
import ProjectCard from "./ProjectCard";

export default function ProjectsPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
          {t.projects.title}
        </h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto leading-snug transition-colors duration-200">
          {t.projects.intro}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {/* Hangman Project */}
        <ProjectCard
          title={t.projects.projects.hangman.title}
          description={t.projects.projects.hangman.description}
          imageUrl="/assets/hangman.png"
          imageAlt={isEnglish ? "Hangman game screenshot" : "Skjermbilde av Hangman spill"}
          priority={true}
          technologies={t.projects.projects.hangman.technologies}
          sourceCodeUrl="https://github.com/Erikg-dev"
          liveDemoUrl="#"
        />

        {/* Discord Bot Project */}
        <ProjectCard
          title={t.projects.projects.discordBot.title}
          description={t.projects.projects.discordBot.description}
          imageUrl="/assets/Bot.jpeg"
          imageAlt={isEnglish ? "Discord bot screenshot" : "Skjermbilde av Discord bot"}
          technologies={t.projects.projects.discordBot.technologies}
          sourceCodeUrl="https://github.com/Erikg-dev"
        />

        {/* Bomberman Project */}
        <ProjectCard
          title={t.projects.projects.bomberman.title}
          description={t.projects.projects.bomberman.description}
          imageUrl="/assets/bomberman.png"
          imageAlt={isEnglish ? "Bomberman game screenshot" : "Skjermbilde av Bomberman spill"}
          technologies={t.projects.projects.bomberman.technologies}
          sourceCodeUrl="https://github.com/Erikg-dev"
        />
      </div>
    </div>
  );
}
