interface SectionProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  container?: boolean;
}

export default function Section({ 
  children, 
  className = '', 
  light = false,
  container = true 
}: SectionProps) {
  const baseClasses = 'py-8 md:py-12 rounded-lg shadow-md my-10 transition-colors duration-200';
  const containerClass = container ? 'container mx-auto px-6 md:px-10' : '';
  const themeClasses = light
    ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 text-blue-800 dark:text-slate-200'
    : 'bg-gradient-to-br from-blue-200 to-blue-400 dark:from-slate-800 dark:to-slate-900 text-blue-900 dark:text-slate-100';

  return (
    <section className={`${baseClasses} ${containerClass} ${themeClasses} ${className}`}>
      {children}
    </section>
  );
}

