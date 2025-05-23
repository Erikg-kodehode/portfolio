'use client';
import ContactForm from './ContactForm';

export default function ContactFormEn() {
  const labels = {
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    submit: {
      idle: 'Send message',
      submitting: 'Sending...'
    },
    success: 'Message sent! I will respond as soon as possible.',
    error: 'Sorry, something went wrong. Please try again later.'
  };

  return <ContactForm labels={labels} />;
}
