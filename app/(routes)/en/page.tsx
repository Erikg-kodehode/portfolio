'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n';
import { Container, Section } from '@/features/layout/components';
import { Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';

interface ExploreCardProps {
  href: string;
  title: string;
  description: string;
  isEnglish: boolean;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ href, title, description, isEnglish }) => (
  <Link 
    href={`${isEnglish ? '/en' : ''}${href}`}
    aria-label={`${title} - ${description}`}
  >
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        hoverable
        variant="elevated"
        padding="md"
        className="h-full dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600"
      >
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
        {title}
      </h3>
      <p className="text-blue-700 dark:text-blue-400 text-sm">
        {description}
      </p>
      </Card>
    </motion.div>
  </Link>
);

export default function HomePage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const t = useTranslations();

  return (
    <Container as="main" maxWidth="xl" className="py-8 md:py-12">
      <Section className="mb-16 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-blue-200/20 dark:bg-blue-900/20 blur-sm" />
          <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-green-200/20 dark:bg-green-900/20 blur-sm" />
          <div className="absolute left-1/2 top-1/3 w-16 h-16 rounded-full bg-yellow-200/20 dark:bg-yellow-900/20 blur-sm" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
          <div className="p-6 md:p-8 md:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              {t.home.title}
            </h1>
            
              <p className="text-lg text-blue-700 dark:text-blue-400 mb-6 leading-relaxed">
                {t.home.subtitle}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <motion.span 
                  className="px-3 py-1 bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  C#
                </motion.span>
                <motion.span 
                  className="px-3 py-1 bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  .NET
                </motion.span>
                <motion.span 
                  className="px-3 py-1 bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Backend
                </motion.span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="p-6 md:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 overflow-hidden rounded-full 
              border-4 border-blue-100/80 dark:border-blue-300/80 
              shadow-theme bg-slate-200/90 dark:bg-slate-700/90 
              transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400">
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
        </div>
      </Section>
      
      <Section className="text-center relative">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.home.explore.title}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          role="navigation"
          aria-label={t.home.explore.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ExploreCard
            href="/about"
            title={t.home.explore.about.title}
            description={t.home.explore.about.description}
            isEnglish={isEnglish}
          />
          
          <ExploreCard
            href="/projects"
            title={t.home.explore.projects.title}
            description={t.home.explore.projects.description}
            isEnglish={isEnglish}
          />
          
          <ExploreCard
            href="/skills"
            title={t.home.explore.skills.title}
            description={t.home.explore.skills.description}
            isEnglish={isEnglish}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Button
            href={`${isEnglish ? '/en' : ''}/contact`}
            variant="primary"
            size="lg"
            className="shadow-theme hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t.home.cta.contact}
          </Button>
        </motion.div>
      </Section>
    </Container>
  );
}