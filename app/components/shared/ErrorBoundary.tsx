'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  private defaultFallback = ({ error, resetError }: ErrorBoundaryFallbackProps) => (
    <div className="flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">
          Something went wrong
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {error.message || 'An error occurred while loading this content.'}
        </p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  public render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error!,
          resetError: this.resetError
        });
      }
      return this.props.fallback || this.defaultFallback({ 
        error: this.state.error!, 
        resetError: this.resetError 
      });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
