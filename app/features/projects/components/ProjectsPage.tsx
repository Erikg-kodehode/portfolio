"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/i18n";
import ProjectCard from "./ProjectCard";

export default function ProjectsPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-7xl">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4 transition-colors duration-300">
          {t.projects.title}
        </h1>
        <p className="text-lg text-blue-800/70 dark:text-blue-300/70 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
          {t.projects.intro}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Hangman Project */}
        <ProjectCard
          title={t.projects.projects.hangman.title}
          description={t.projects.projects.hangman.description}
          imageUrl="/assets/Hangman.jpeg"
          imageAlt={isEnglish ? "Hangman game screenshot" : "Skjermbilde av Hangman spill"}
          priority={true}
          technologies={t.projects.projects.hangman.technologies}
          // Repository URL for Hangman project
          sourceCodeUrl="https://github.com/Erikg-kodehode/Hangman"
          // TODO: Replace with your actual live demo URL
          liveDemoUrl="https://hangman-game-beta.vercel.app"
        />

        {/* Discord Bot Project */}
        <ProjectCard
          title={t.projects.projects.discordBot.title}
          description={t.projects.projects.discordBot.description}
          imageUrl="/assets/Bot.jpeg"
          imageAlt={isEnglish ? "Discord bot screenshot" : "Skjermbilde av Discord bot"}
          technologies={t.projects.projects.discordBot.technologies}
          sourceCodeUrl="https://github.com/Erikg-kodehode/Signup-bot"
        />

        {/* Bomberman Project */}
        <ProjectCard
          title={t.projects.projects.bomberman.title}
          description={t.projects.projects.bomberman.description}
          imageUrl="/assets/Bomberman.jpeg"
          imageAlt={isEnglish ? "Bomberman game screenshot" : "Skjermbilde av Bomberman spill"}
          technologies={t.projects.projects.bomberman.technologies}
          sourceCodeUrl="https://github.com/Erikg-kodehode/Bomberman"
        />
      </div>
    </div>
  );
}
