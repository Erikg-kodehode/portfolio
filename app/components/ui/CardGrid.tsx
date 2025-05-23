import Grid from './Grid';

interface CardGridProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

export default function CardGrid({
  children,
  className = '',
  stagger = true
}: CardGridProps) {
  return (
    <Grid 
      cols={{
        default: 1,
        md: 2,
        lg: 3
      }}
      gap={6}
      className={`
        relative
        ${stagger ? '[&>*:nth-child(even)]:md:translate-y-4' : ''}
        ${className}
      `}
    >
      {children}
    </Grid>
  );
}
