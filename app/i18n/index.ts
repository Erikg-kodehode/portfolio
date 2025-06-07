import type { Translations } from './locales/translations.d';
export { useTranslations, TranslationsProvider } from './context';

// Cache for translations
const translationCache = new Map<string, Promise<Translations>>();

// Import translations statically to ensure they're included in the build
import en from './locales/en';
import no from './locales/no';

const dictionaries = {
  en: () => Promise.resolve(en),
  no: () => Promise.resolve(no),
} as const;

// Preload both language dictionaries
export function preloadTranslations() {
  return Promise.all([
    getTranslations('en'),
    getTranslations('no'),
  ]);
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
