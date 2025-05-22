import type { Translations } from './locales/translations.d';

const dictionaries = {
  en: () => import('./locales/en').then((module) => module.default),
  no: () => import('./locales/no').then((module) => module.default),
} as const;

export async function getTranslations(locale: string): Promise<Translations> {
  const dictionary = dictionaries[locale as keyof typeof dictionaries];
  if (!dictionary) {
    throw new Error(`Locale ${locale} not found`);
  }
  return dictionary();
}

export function getLocaleFromPath(pathname: string): string {
  return pathname.startsWith('/en') ? 'en' : 'no';
}
