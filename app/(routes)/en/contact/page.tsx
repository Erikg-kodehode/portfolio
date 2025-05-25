'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ContactForm, ContactLayout } from '@/features/contact/components';
import { PageTitle } from '@/features/layout/components';
import { LoadingSpinner } from '@/components/ui';
import { useTranslations } from '@/i18n';

export default function ContactPage() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const t = useTranslations();

  return (
    <ContactLayout isEnglish={isEnglish}>
      <PageTitle
        title={t.contact.title}
        subtitle={t.contact.description}
        align="center"
      />
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ContactForm />
      </Suspense>
    </ContactLayout>
  );
}
