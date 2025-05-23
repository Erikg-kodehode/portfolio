'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SkillLevelIndicator from '../../components/SkillLevelIndicator';
import { useTranslations } from '../../i18n/context';

export default function SkillsPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">{t.skills.title}</h1>
        <p className="text-base text-blue-700 dark:text-blue-400 max-w-2xl mx-auto leading-snug transition-colors duration-200">
          {t.skills.intro}
        </p>
      </header>

      <div className="space-y-4">
        {Object.entries(t.skills.categories).map(([id, category]) => (
          <article key={id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1.5 transition-colors duration-200">{category.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-3 transition-colors duration-200">{category.description}</p>
              
              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full transition-colors duration-200">
                      {skill.name}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-1.5 pt-2 border-t border-slate-50 dark:border-slate-700 transition-colors duration-200">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-wrap items-center text-xs">
                      <div className="flex items-center space-x-1.5 min-w-[110px]">
                        <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">{skill.name}</span>
                        <SkillLevelIndicator level={skill.level} />
                      </div>
                      <span className="text-slate-500 dark:text-slate-400 ml-auto text-[10px] transition-colors duration-200">{skill.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link
          href={isEnglish ? "/en/contact" : "/contact"} 
          className="inline-block px-4 py-1.5 bg-blue-600 dark:bg-blue-700 text-white dark:text-green-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
        >
          {t.contact.form.send}
        </Link>
      </div>
    </div>
  );
}
