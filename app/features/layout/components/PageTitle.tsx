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
    <header className={`mb-8 ${alignmentClasses[align]} ${className}`}>
      <h1 className="
        text-4xl sm:text-5xl 
        font-bold 
        text-blue-900 dark:text-blue-100 
        mb-4
        bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-300 dark:to-blue-100
        bg-clip-text text-transparent
        transition-colors duration-200
      ">
        {title}
      </h1>
      {subtitle && (
        <p className="
          text-lg sm:text-xl 
          text-slate-600 dark:text-slate-400
          transition-colors duration-200
        ">
          {subtitle}
        </p>
      )}
    </header>
  );
}

