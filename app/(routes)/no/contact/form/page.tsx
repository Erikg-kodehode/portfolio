'use client';
import { ContactForm } from '@/features/contact/components';
import { useTranslations } from '@/i18n';

export default function NorwegianContactFormPage() {
  const t = useTranslations();
  
  return (
    <ContactForm labels={{
      name: t.contact.form.name,
      email: t.contact.form.email,
      subject: t.contact.form.subject,
      message: t.contact.form.message,
      submit: {
        idle: t.contact.form.submit.idle,
        submitting: t.contact.form.submit.submitting
      },
      success: t.contact.form.success,
      error: t.contact.form.error
    }} />
  );
}