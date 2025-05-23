import { Suspense } from 'react';
import { TranslationsProvider } from '@/i18n/context';
import { getTranslations } from '@/i18n';
import { ErrorBoundary } from '@/components/shared';

function LoadingState() {
  return (
    <div className="hidden" aria-hidden="true" />
  );
}

export default async function NoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translations = await getTranslations('no').catch(error => {
    console.error('Failed to load Norwegian translations:', error);
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
