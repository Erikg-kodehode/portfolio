'use client';
import ContactForm from './ContactForm';

export default function ContactFormNo() {
  const labels = {
    name: "Navn",
    email: "E-post",
    subject: "Emne",
    message: "Melding",
    submit: {
      idle: "Send melding",
      submitting: "Sender..."
    },
    success: "Melding sendt! Jeg vil svare så snart som mulig.",
    error: "Beklager, noe gikk galt. Vennligst prøv igjen senere."
  };

  return <ContactForm labels={labels} />;
}

