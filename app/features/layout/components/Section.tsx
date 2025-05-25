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
    ? 'bg-gradient-to-br from-slate-100/10 to-blue-50/10 dark:from-slate-900/70 dark:to-slate-800/60 text-blue-800 dark:text-slate-200'
    : 'bg-gradient-to-br from-blue-100/20 to-blue-200/20 dark:from-slate-900/80 dark:to-slate-800/70 text-blue-900 dark:text-slate-100';

  return (
    <section className={`${baseClasses} ${containerClass} ${themeClasses} ${className}`}>
      {children}
    </section>
  );
}

