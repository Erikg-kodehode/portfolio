'use client';

import { ReactNode } from 'react';
import { TranslationErrorBoundary } from '@/components/shared';
import { usePathname } from 'next/navigation';

export function LocalizedWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/en') ? 'en' : 'no';

  return (
    <TranslationErrorBoundary locale={locale}>
      {children}
    </TranslationErrorBoundary>
  );
}

