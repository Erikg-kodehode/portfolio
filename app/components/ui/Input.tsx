import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  type?: 'text' | 'email' | 'textarea';
  rows?: number;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, type = 'text', className, rows = 4, icon, ...props }, ref) => {
    const baseInputStyles = `
      w-full 
      px-4 py-3
      rounded-lg 
      bg-white/95 dark:bg-slate-800/95
      border border-slate-200 dark:border-slate-700
      text-slate-800 dark:text-slate-100
      placeholder:text-slate-400 dark:placeholder:text-slate-500
      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
      hover:border-blue-300 dark:hover:border-blue-600
      transition-all duration-300
      disabled:opacity-50 
      disabled:cursor-not-allowed
      ${error ? 'border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-400' : ''}
    `;

    const labelStyles = `
      flex items-center
      text-sm font-medium 
      text-slate-700 dark:text-slate-300 
      mb-2 
      group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 
      transition-colors duration-200
    `;

    const iconStyles = `
      mr-2 
      text-slate-400 dark:text-slate-500 
      group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 
      transition-colors duration-200
    `;

    const errorStyles = `
      text-red-600 dark:text-red-400 
      text-sm mt-1
      transition-colors duration-200
    `;

    const inputStyles = twMerge(
      baseInputStyles,
      error && 'border-red-300 dark:border-red-500',
      className
    );

    const inputProps = {
      id: props.name,
      'aria-invalid': error ? 'true' : 'false',
      'aria-describedby': error ? `${props.name}-error` : undefined,
      ...props,
      ref,
      className: inputStyles,
    };

    return (
      <motion.div 
        className="group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label htmlFor={props.name} className={labelStyles}>
          {icon && <span className={iconStyles}>{icon}</span>}
          {label}
        </label>
        
        {type === 'textarea' ? (
          <textarea rows={rows} {...inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>} />
        ) : (
          <input type={type} {...inputProps as React.InputHTMLAttributes<HTMLInputElement>} />
        )}
        
        {error && (
          <p className={errorStyles} id={`${props.name}-error`} role="alert">
            {error}
          </p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

