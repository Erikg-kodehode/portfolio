"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SkillLevelIndicator } from "@/features/skills/components";
import { useTranslations } from "@/i18n";
import { PageTitle } from "@/features/layout";
import { useLoading } from "@/components/providers/LoadingProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const articleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const patterns = {
  circles: (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
      <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-blue-200 dark:bg-blue-900/50" />
      <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-green-200 dark:bg-green-900/50" />
      <div className="absolute left-1/2 top-1/3 w-16 h-16 rounded-full bg-yellow-200 dark:bg-yellow-900/50" />
    </div>
  )
};

export default function SkillsPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const { isLanguageChanging } = useLoading();
  const isEnglish = pathname?.startsWith("/en");

  // Show loading state while language is changing
  if (isLanguageChanging || !t?.skills) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto mb-8"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl relative">
      {patterns.circles}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageTitle
          title={t.skills.title}
          subtitle={t.skills.intro}
          align="center"
        />
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(t.skills.categories).map(([id, category]) => (
          <motion.article 
            key={id}
            variants={articleVariants}
            className="backdrop-blur-sm bg-slate-100/10 dark:bg-slate-900/50 
              rounded-lg shadow-theme overflow-hidden 
              transition-all duration-300 
              hover:shadow-lg hover:-translate-y-1
              hover:bg-slate-100/20 dark:hover:bg-slate-900/60
              group"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 
                mb-1.5 transition-colors duration-200
                group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {category.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-3 transition-colors duration-200">
                {category.description}
              </p>
              
              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill.name} 
                      className="px-3 py-1 bg-blue-100/50 dark:bg-blue-900/50 
                        text-blue-700 dark:text-blue-300 rounded-full text-sm 
                        transition-all duration-300 
                        hover:-translate-y-0.5 hover:scale-105
                        hover:bg-blue-200/50 dark:hover:bg-blue-800/50"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-1.5 pt-2 border-t border-slate-50 dark:border-slate-700 transition-colors duration-200">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="flex flex-wrap items-center text-xs group/skill
                        hover:bg-blue-50/10 dark:hover:bg-blue-900/10 
                        rounded-md p-1 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-1.5 min-w-[110px]">
                        <span className="font-medium text-slate-700 dark:text-slate-300 
                          group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 
                          transition-colors duration-200"
                        >
                          {skill.name}
                        </span>
                        <SkillLevelIndicator level={skill.level} />
                      </div>
                      <span className="text-slate-500 dark:text-slate-400 ml-auto text-[10px] 
                        group-hover/skill:text-slate-600 dark:group-hover/skill:text-slate-300
                        transition-colors duration-200">
                        {skill.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Link
          href={isEnglish ? "/en/contact" : "/contact"}
          className="interactive block md:inline-block text-center px-4 py-2 
            bg-blue-600 hover:bg-blue-700 
            dark:bg-blue-700 dark:hover:bg-blue-600 
            text-slate-50 dark:text-slate-50 
            shadow-theme hover:shadow-lg
            rounded text-sm font-medium
            transform hover:scale-105 transition-all duration-300"
        >
          {t.home.cta.contact}
        </Link>
      </motion.div>
    </div>
  );
}
