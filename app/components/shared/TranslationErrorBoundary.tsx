'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  locale: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class TranslationErrorBoundary extends Component<Props, State> {
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
    console.error(`Translation error in ${this.props.locale} layout:`, error, errorInfo);
  }

  private getErrorMessage(): string {
    if (this.props.locale === 'en') {
      return 'Failed to load English translations. Please try refreshing the page.';
    }
    return 'Kunne ikke laste inn norske oversettelser. Vennligst prøv å laste siden på nytt.';
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">
              {this.props.locale === 'en' ? 'Translation Error' : 'Oversettelsesfeil'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {this.getErrorMessage()}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {this.props.locale === 'en' ? 'Reload Page' : 'Last siden på nytt'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default TranslationErrorBoundary;

