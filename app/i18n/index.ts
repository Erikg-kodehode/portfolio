import type { Translations } from './locales/translations.d';
export { useTranslations, TranslationsProvider } from './context';

// Cache for translations
const translationCache = new Map<string, Promise<Translations>>();

const dictionaries = {
  en: () => import('./locales/en').then((module) => module.default),
  no: () => import('./locales/no').then((module) => module.default),
} as const;

// Preload both language dictionaries
export function preloadTranslations() {
  Object.keys(dictionaries).forEach((locale) => {
    void getTranslations(locale);
  });
}

export async function getTranslations(locale: string): Promise<Translations> {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  const dictionary = dictionaries[locale as keyof typeof dictionaries];
  if (!dictionary) {
    throw new Error(`Locale ${locale} not found`);
  }

  // Store promise in cache
  const translationPromise = dictionary().catch(error => {
    // Remove failed promise from cache
    translationCache.delete(locale);
    throw error;
  });
  
  translationCache.set(locale, translationPromise);
  return translationPromise;
}

export function getLocaleFromPath(pathname: string): string {
  return pathname.startsWith('/en') ? 'en' : 'no';
}

// Preload translations in client
if (typeof window !== 'undefined') {
  preloadTranslations();
}
