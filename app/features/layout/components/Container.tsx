import { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}

const maxWidths = {
  sm: 'max-w-2xl',    // 672px
  md: 'max-w-3xl',    // 768px
  lg: 'max-w-4xl',    // 896px
  xl: 'max-w-5xl',    // 1024px
  '2xl': 'max-w-6xl', // 1152px
  'full': 'max-w-full'
};

export default function Container({
  children,
  className = '',
  as: Component = 'div',
  maxWidth = '2xl',
  padding = true
}: ContainerProps) {
  return (
    <Component
      className={`
        w-full
        mx-auto
        ${maxWidths[maxWidth]}
        ${padding ? 'px-4 sm:px-6 md:px-8' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
