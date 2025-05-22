import { TranslationsProvider } from '../i18n/context';
import { getTranslations } from '../i18n';

export default async function NoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translations = await getTranslations('no');
  
  return (
    <TranslationsProvider translations={translations}>
      {children}
    </TranslationsProvider>
  );
}

