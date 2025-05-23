import { Suspense } from 'react';
import { TranslationsProvider } from '@/i18n/context';
import { getTranslations } from '@/i18n';
import { ErrorBoundary } from '@/components/shared';

function LoadingState() {
  return (
    <div className="hidden" aria-hidden="true" />
  );
}

export default async function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translations = await getTranslations('en').catch(error => {
    console.error('Failed to load English translations:', error);
    throw error;
  });
  
  return (
    <Suspense fallback={<LoadingState />}>
      <ErrorBoundary>
        <TranslationsProvider translations={translations}>
          {children}
        </TranslationsProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

