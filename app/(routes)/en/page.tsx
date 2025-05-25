'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n';
import { Container, Section } from '@/features/layout/components';
import { Card, Button } from '@/components/ui';

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
  </Link>
);

export default function HomePage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const t = useTranslations();

  return (
    <Container as="main" maxWidth="xl" className="py-8 md:py-12">
      <Section className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="p-6 md:p-8 md:w-3/5">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              {t.home.title}
            </h1>
            
            <p className="text-lg text-blue-700 dark:text-blue-400 mb-6 leading-relaxed">
              {t.home.subtitle}
            </p>
          </div>
          
          <div className="p-6 md:w-2/5 flex justify-center">
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
        </div>
      </Section>
      
      <Section className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-8">
          {t.home.explore.title}
        </h2>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          role="navigation"
          aria-label={t.home.explore.title}
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
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-center gap-3">
          <Button
            href={`${isEnglish ? '/en' : ''}/projects`}
            variant="primary"
            className="shadow-theme hover:shadow-lg"
          >
            {t.home.cta.projects}
          </Button>
          <Button
            href={`${isEnglish ? '/en' : ''}/contact`}
            variant="primary"
            className="shadow-theme hover:shadow-lg"
          >
            {t.home.cta.contact}
          </Button>
        </div>
      </Section>
    </Container>
  );
}