"use client";
import Link from "next/link";
import { DiscordLink } from "@/components/ui";
import { useTranslations } from "@/i18n";
import { usePathname } from "next/navigation";

export default function ContactPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
          {t.contact.title}
        </h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto leading-snug transition-colors duration-200">
          {t.contact.description}
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <section className="section-container-light mb-6 backdrop-blur-sm">
          <div className="p-5 md:p-6">
            <div className="flex flex-col items-center mb-5">
              <h2 className="text-base font-semibold mb-3 text-blue-800 dark:text-blue-300 transition-colors duration-200">
                {isEnglish ? "Find me on GitHub" : "Finn meg på GitHub"}
              </h2>
              <Link 
                href="https://github.com/Erikg-kodehode" 
                target="_blank"
                className="text-blue-700 dark:text-blue-400 hover:underline transition-colors duration-200"
              >
                GitHub Profile
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg mb-6 overflow-hidden transition-all duration-300">
          <div className="p-5">
            <h2 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-200">
              {isEnglish ? "Contact Options" : "Kontakt Muligheter"}
            </h2>
            <div className="space-y-4">
              <Link 
                href={isEnglish ? "/en/contact/form" : "/contact/form"}
                className="text-blue-700 dark:text-blue-400 hover:underline transition-colors duration-200 block"
              >
                {isEnglish ? "Contact Form" : "Kontaktskjema"}
              </Link>
              <DiscordLink 
                className="text-blue-700 dark:text-blue-400 hover:underline transition-colors duration-200 block"
                spanClassName="text-blue-700 dark:text-blue-400 hover:underline transition-colors duration-200"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
