'use client';
import { useTranslations } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/features/layout';


export default function EnglishAboutPage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <PageTitle
        title={t.about.title}
        subtitle={t.about.subtitle}
        align="center"
      />

      <section className="mb-8 hero-container backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-6 md:w-1/3 flex justify-center">
            <div className="relative w-56 h-56 overflow-hidden rounded-full 
              border-4 border-blue-100/80 dark:border-blue-300/80 
              shadow-theme bg-slate-200/90 dark:bg-slate-700/90 
              transition-all duration-300">
              <Image
                src="/assets/Erik-bnw.jpg"
                alt="Erik Gulliksen"
                fill={true}
                sizes="(max-width: 768px) 100vw, 224px"
                style={{ objectFit: 'cover', objectPosition: '0 -15px' }}
                priority={true}
                quality={90}
                loading="eager"
                className="rounded-full"
              />
            </div>
          </div>
          
          <div className="p-6 md:p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.about.whoAmI.title}</h2>
            <div className="space-y-3 text-blue-700 dark:text-blue-400 text-base">
              <p>{t.about.whoAmI.description1}</p>
              <p>{t.about.whoAmI.description2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.about.robotics.title}</h2>
          <div className="space-y-3 text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200">
            <p>{t.about.robotics.intro}</p>
            <p>{t.about.robotics.highlight}</p>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 dark:text-blue-400 transition-colors duration-200">
              {t.about.robotics.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center transition-colors duration-200">{t.about.journey.title}</h2>
        
        <div className="space-y-4">
          <article className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg 
            shadow-theme hover:shadow-lg overflow-hidden 
            transition-all duration-300 hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.about.journey.sections.fromRobots.title}</h3>
              <p className="text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200 leading-relaxed">
                {t.about.journey.sections.fromRobots.description}
              </p>
            </div>
          </article>
          
          <article className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.about.journey.sections.backend.title}</h3>
              <p className="text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200 leading-relaxed">
                {t.about.journey.sections.backend.description}
              </p>
            </div>
          </article>
          
          <article className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.about.journey.sections.currentFocus.title}</h3>
              <p className="text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200 leading-relaxed">
                {t.about.journey.sections.currentFocus.description}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center transition-colors duration-200">
          {t.about.goals.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <article className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg 
            shadow-theme hover:shadow-lg overflow-hidden 
            transition-all duration-300 hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
                {t.about.goals.shortTerm.title}
              </h3>
              <ul className="space-y-1.5 text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200">
                {t.about.goals.shortTerm.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                    <span className="text-blue-700 dark:text-blue-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          
          <article className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
                {t.about.goals.mediumTerm.title}
              </h3>
              <ul className="space-y-1.5 text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200">
                {t.about.goals.mediumTerm.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                    <span className="text-blue-700 dark:text-blue-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          
          <article className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
                {t.about.goals.longTerm.title}
              </h3>
              <ul className="space-y-1.5 text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200">
                {t.about.goals.longTerm.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                    <span className="text-blue-700 dark:text-blue-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-200">
          {t.about.cta.title}
        </h2>
        <p className="text-blue-700 dark:text-blue-400 max-w-2xl mx-auto mb-6 text-sm transition-colors duration-200">
          {t.about.cta.description}
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-3">
          <Link 
            href={`${isEnglish ? '/en' : ''}/projects`}
            className="interactive block md:inline-block text-center px-4 py-2 
              bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-700 dark:hover:bg-blue-600 
              text-slate-50 dark:text-slate-50 
              shadow-theme hover:shadow-lg
              rounded text-sm font-medium"
          >
            {t.about.cta.projects}
          </Link>
          <Link 
            href={`${isEnglish ? '/en' : ''}/contact`}
            className="interactive block md:inline-block text-center px-4 py-2 
              bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-700 dark:hover:bg-blue-600 
              text-slate-50 dark:text-slate-50 
              shadow-theme hover:shadow-lg
              rounded text-sm font-medium"
          >
            {t.about.cta.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}








