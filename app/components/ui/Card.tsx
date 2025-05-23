interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hoverable = true,
  variant = 'default',
  padding = 'md',
  onClick
}: CardProps) {
  const variants = {
    default: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md',
    elevated: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg',
    outlined: 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700'
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hoverable
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div 
      className={`
        rounded-lg
        transition-all duration-300
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

