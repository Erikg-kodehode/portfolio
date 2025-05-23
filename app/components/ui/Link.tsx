import NextLink from 'next/link';
import { forwardRef } from 'react';

interface LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
  underline?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'subtle' | 'button';
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    children,
    href,
    className = '',
    external = false,
    underline = true,
    icon,
    onClick,
    variant = 'default'
  }, ref) => {
    const isExternal = external || href.startsWith('http');
    
    const variants = {
      default: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
      subtle: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
      button: `
        px-4 py-2 rounded-md
        bg-blue-600 text-white
        hover:bg-blue-700
        dark:bg-blue-500 dark:hover:bg-blue-600
        transition-colors
      `
    };

    const underlineClass = underline && variant !== 'button'
      ? 'hover:underline underline-offset-4'
      : '';

    const linkProps = isExternal ? {
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `${children} (opens in new tab)`
    } : {};

    return (
      <NextLink
        href={href}
        ref={ref}
        className={`
          inline-flex items-center gap-2
          transition-all duration-200
          ${variants[variant]}
          ${underlineClass}
          ${className}
        `}
        onClick={onClick}
        {...linkProps}
      >
        {icon && <span className="text-[1.1em]">{icon}</span>}
        {children}
        {isExternal && variant !== 'button' && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;

