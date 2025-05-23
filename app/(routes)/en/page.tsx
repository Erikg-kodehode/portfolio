'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n';

interface ExploreCardProps {
  href: string;
  title: string;
  description: string;
  isEnglish: boolean;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ href, title, description, isEnglish }) => (
  <Link 
    href={`${isEnglish ? '/en' : ''}${href}`}
    className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-200">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      {description}
    </p>
  </Link>
);

export default function HomePage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <section className="hero-container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-6 md:p-8 md:w-3/5">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              {t.home.title}
            </h1>
            
            <p className="text-lg text-slate-800 dark:text-slate-200 mb-6 leading-relaxed">
              {t.home.subtitle}
            </p>
            
            <div className="space-y-3 md:space-y-0 md:space-x-3 md:flex">
              <Link 
                href={`${isEnglish ? '/en' : ''}/projects`}
                className="block md:inline-block text-center px-4 py-2 bg-slate-600 dark:bg-slate-800 text-blue-50/90 dark:text-green-white/90 rounded hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors duration-200 text-sm font-medium">
                {t.home.cta.projects}
              </Link>
              
              <Link 
                href={`${isEnglish ? '/en' : ''}/about`}
                className="block md:inline-block text-center px-4 py-2 bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-green-white rounded hover:bg-blue-200 dark:hover:bg-slate-700 transition-colors duration-200 text-sm font-medium">
                {t.home.cta.about}
              </Link>
            </div>
          </div>
          
          <div className="p-6 md:w-2/5 flex justify-center">
            <div className="relative w-72 h-72 overflow-hidden rounded-full border-4 border-blue-50/90 dark:border-slate-700 shadow-md bg-slate-200 dark:bg-slate-700 transition-colors duration-200">
              <Image
                src="/assets/Erik-bnw.jpg"
                alt="Erik Gulliksen"
                width={500}
                height={500}
                priority={true}
                quality={100}
                loading="eager"
                className="rounded-full object-cover object-center absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-200">
          {t.home.explore.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
        
        <div className="mt-8">
          <Link 
            href={`${isEnglish ? '/en' : ''}/contact`}
            className="inline-block px-4 py-2 bg-slate-600 dark:bg-slate-800 text-blue-50/90 dark:text-green-white/90 rounded hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors duration-200 text-sm font-medium">
            {t.home.cta.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}

