'use client';

import { createContext, useContext } from 'react';
import type { Translations } from './locales/translations.d';

const TranslationsContext = createContext<Translations | null>(null);

export function useTranslations() {
  const translations = useContext(TranslationsContext);
  if (!translations) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return translations;
}

export function TranslationsProvider({
  translations,
  children,
}: {
  translations: Translations;
  children: React.ReactNode;
}) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}
