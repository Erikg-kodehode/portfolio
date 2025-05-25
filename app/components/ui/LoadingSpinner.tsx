import { twMerge } from 'tailwind-merge';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const baseStyles = `
    animate-spin 
    rounded-full 
    border-2
    border-blue-400/20 dark:border-blue-300/20
    border-t-blue-600 dark:border-t-blue-400
    transition-colors duration-200
  `;

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={twMerge(baseStyles, sizeClasses[size], className)}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

