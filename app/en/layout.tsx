import { TranslationsProvider } from '../i18n/context';
import { getTranslations } from '../i18n';

export default async function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translations = await getTranslations('en');
  
  return (
    <TranslationsProvider translations={translations}>
      {children}
    </TranslationsProvider>
  );
}

