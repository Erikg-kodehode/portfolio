interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function PageTitle({ 
  title, 
  subtitle, 
  className = '',
  align = 'left'
}: PageTitleProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <header className={`
      mb-8 
      ${alignmentClasses[align]} 
      ${className}
      p-6 md:p-8
      bg-slate-100/10 dark:bg-slate-900/50 
      backdrop-blur-sm 
      rounded-lg 
      shadow-theme
      transition-all duration-300 
      hover:shadow-lg
      hover:-translate-y-1
      border border-blue-100/20 dark:border-blue-300/20
    `}>
      <h1 className="
        text-4xl sm:text-5xl 
        font-bold 
        mb-4
        bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200
        bg-clip-text 
        text-transparent
        transition-colors duration-200
      ">
        {title}
      </h1>
      {subtitle && (
        <p className="
          text-lg sm:text-xl 
          text-blue-700/90 dark:text-blue-400
          transition-colors duration-200
          max-w-2xl 
          mx-auto
          leading-relaxed
        ">
          {subtitle}
        </p>
      )}
    </header>
  );
}

