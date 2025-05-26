import { Suspense } from 'react';
import { TranslationsProvider } from '@/i18n/context';
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
  return (
    <Suspense fallback={<LoadingState />}>
      <ErrorBoundary>
        <TranslationsProvider>
          {children}
        </TranslationsProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

