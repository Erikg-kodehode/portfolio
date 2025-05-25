'use client';
import Link from 'next/link';
import { useTranslations } from '@/i18n';
import { usePathname } from 'next/navigation';
import { Container, Section, PageTitle } from '@/features/layout/components';
import { Card, Button, DiscordLink } from '@/components/ui';
import { FaGithub } from 'react-icons/fa';

export default function ContactPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  return (
    <Container as="main" maxWidth="xl" className="py-8 md:py-12">
      <Section>
        <PageTitle
          title={t.contact.title}
          subtitle={t.contact.description}
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card variant="elevated" padding="lg">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
              {isEnglish ? "Professional Profiles" : "Profesjonelle Profiler"}
            </h2>
            <div className="space-y-4">
              <Button
                href="https://github.com/Erikg-kodehode"
                variant="secondary"
                icon={<FaGithub />}
                external
                className="w-full justify-center"
              >
                GitHub Profile
              </Button>
              <DiscordLink className="w-full" />
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
              {isEnglish ? "Direct Contact" : "Direkte Kontakt"}
            </h2>
            <div className="space-y-4">
              <Button
                href={isEnglish ? "/en/contact/form" : "/contact/form"}
                variant="primary"
                className="w-full justify-center"
              >
                {isEnglish ? "Contact Form" : "Kontaktskjema"}
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
}