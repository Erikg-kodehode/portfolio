'use client';
import { useTranslations } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTitle } from '@/features/layout';

interface GoalSection {
  title: string;
  items: string[];
}

export default function NorwegianAboutPage() {
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

      <motion.section 
        className="mb-8 hero-container backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-blue-200/20 dark:bg-blue-900/20 blur-sm" />
          <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-green-200/20 dark:bg-green-900/20 blur-sm" />
          <div className="absolute left-1/2 top-1/3 w-16 h-16 rounded-full bg-yellow-200/20 dark:bg-yellow-900/20 blur-sm" />
        </div>
        <div className="flex flex-col md:flex-row items-center relative">
          <motion.div 
            className="p-6 md:w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative w-56 h-56 overflow-hidden rounded-full 
              border-4 border-blue-100/80 dark:border-blue-300/80 
              shadow-theme bg-slate-200/90 dark:bg-slate-700/90 
              transition-all duration-300 hover:scale-105">
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
          </motion.div>
          
          <motion.div 
            className="p-6 md:p-8 md:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.about.whoAmI.title}</h2>
            <div className="space-y-3 text-blue-700 dark:text-blue-400 text-base">
              <p>{t.about.whoAmI.description1}</p>
              <p>{t.about.whoAmI.description2}</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section 
        className="mb-8 bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-theme hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
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
      </motion.section>

      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center transition-colors duration-200">{t.about.journey.title}</h2>
        
        <div className="space-y-4">
          {Object.entries(t.about.journey.sections).map(([key, section], index) => (
            <motion.article 
              key={key}
              className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg 
                shadow-theme hover:shadow-lg overflow-hidden 
                transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
            >
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
                  {section.title}
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center transition-colors duration-200">
          {t.about.goals.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(t.about.goals)
            .filter(([key]) => ['shortTerm', 'mediumTerm', 'longTerm'].includes(key))
            .map(([key, section], index) => {
              const goalSection = section as GoalSection;
              return (
                <motion.article 
                key={key}
                className="bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg 
                  shadow-theme hover:shadow-lg overflow-hidden 
                  transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
              >
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
                    {goalSection.title}
                  </h3>
                  <ul className="space-y-1.5 text-blue-700 dark:text-blue-400 text-sm transition-colors duration-200">
                    {goalSection.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">•</span>
                        <span className="text-blue-700 dark:text-blue-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
              );
            })}
        </div>
      </motion.section>
      <motion.section 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-200">
          {t.about.cta.title}
        </h2>
        <p className="text-blue-700 dark:text-blue-400 max-w-2xl mx-auto mb-6 text-sm transition-colors duration-200">
          {t.about.cta.description}
        </p>
        <motion.div 
          className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
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
        </motion.div>
      </motion.section>
    </div>
  );
}



