'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const toastStyles = {
  success: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800',
  error: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-100 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800',
};

const icons = {
  success: '✓',
  error: '×',
  warning: '⚠',
  info: 'ℹ',
};

export default function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-center justify-between gap-2
        px-4 py-3 rounded-lg shadow-lg border
        backdrop-blur-sm
        ${toastStyles[toast.type]}
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[toast.type]}</span>
        <p>{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </motion.div>
  );
}

