interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
}

export default function Grid({
  children,
  className = '',
  cols = {
    default: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3
  },
  gap = 6
}: GridProps) {
  const getGridCols = () => {
    const gridCols = [];
    
    if (cols.default) gridCols.push(`grid-cols-${cols.default}`);
    if (cols.sm) gridCols.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) gridCols.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) gridCols.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) gridCols.push(`xl:grid-cols-${cols.xl}`);
    
    return gridCols.join(' ');
  };

  return (
    <div className={`
      grid
      ${getGridCols()}
      gap-${gap}
      ${className}
    `}>
      {children}
    </div>
  );
}

