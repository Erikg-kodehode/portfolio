"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/i18n";
import { PageTitle } from "@/features/layout";
import ProjectCard from "./ProjectCard";
import ProjectLayout from "./ProjectLayout";

export default function ProjectsPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  return (
    <ProjectLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-7xl">
        <PageTitle
          title={t.projects.title}
          subtitle={t.projects.intro}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Hangman Project */}
          <ProjectCard
            title={t.projects.projects.hangman.title}
            description={t.projects.projects.hangman.description}
            imageUrl="/assets/Hangman.jpeg"
            imageAlt={isEnglish ? "Hangman game screenshot" : "Skjermbilde av Hangman spill"}
            priority={true}
            technologies={t.projects.projects.hangman.technologies}
            sourceCodeUrl="https://github.com/Erikg-kodehode/Hangman"
            liveDemoUrl="https://hangman-eight-sable.vercel.app"
          />

          {/* Discord Bot Project */}
          <ProjectCard
            title={t.projects.projects.bot.title}
            description={t.projects.projects.bot.description}
            imageUrl="/assets/Bot.jpeg"
            imageAlt={isEnglish ? "Discord bot screenshot" : "Skjermbilde av Discord bot"}
            technologies={t.projects.projects.bot.technologies}
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
    </ProjectLayout>
  );
}
