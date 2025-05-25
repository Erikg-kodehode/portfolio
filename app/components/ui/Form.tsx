import { twMerge } from 'tailwind-merge';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  status?: 'idle' | 'success' | 'error';
  successMessage?: string;
  errorMessage?: string;
}

export default function Form({ 
  children, 
  status = 'idle',
  successMessage,
  errorMessage,
  className,
  ...props 
}: FormProps) {
  const baseStyles = `
    max-w-2xl 
    mx-auto 
    p-6 
    space-y-6
    bg-slate-50/90 dark:bg-slate-800/90
    backdrop-blur-sm 
    rounded-lg 
    shadow-theme
    border border-blue-100/80 dark:border-blue-300/20
  `;

  const messageStyles = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400'
  };

  return (
    <form 
      {...props} 
      className={twMerge(baseStyles, className)}
    >
      {children}
      
      {status === 'success' && successMessage && (
        <div 
          className={`text-center ${messageStyles.success}`}
          role="alert"
        >
          {successMessage}
        </div>
      )}
      
      {status === 'error' && errorMessage && (
        <div 
          className={`text-center ${messageStyles.error}`}
          role="alert"
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
}

