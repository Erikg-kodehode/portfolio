interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
}

export default function Divider({
  className = '',
  orientation = 'horizontal',
  label,
  variant = 'solid'
}: DividerProps) {
  const variants = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };

  if (orientation === 'vertical') {
    return (
      <div 
        className={`
          inline-flex h-full min-h-[20px]
          border-l border-slate-200 dark:border-slate-700
          ${variants[variant]}
          ${className}
        `} 
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div 
        className={`
          flex items-center gap-4
          text-slate-400 dark:text-slate-500
          ${className}
        `}
        role="separator"
        aria-orientation="horizontal"
      >
        <div className={`
          flex-1 border-t
          border-slate-200 dark:border-slate-700
          ${variants[variant]}
        `} />
        <span className="text-sm font-medium px-2">
          {label}
        </span>
        <div className={`
          flex-1 border-t
          border-slate-200 dark:border-slate-700
          ${variants[variant]}
        `} />
      </div>
    );
  }

  return (
    <div 
      className={`
        border-t
        border-slate-200 dark:border-slate-700
        ${variants[variant]}
        ${className}
      `}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}

