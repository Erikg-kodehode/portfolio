import { Resend } from 'resend';
import ContactEmail from '@/app/emails/contact';
import CVRequestEmail from '@/app/emails/cv-request';
import CVApprovalEmail from '@/app/emails/cv-approval';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: 'Portfolio Website <onboarding@resend.dev>',
      to: 'erik.gulliksen@gmail.com',
      subject: `Contact Form: ${params.subject}`,
      react: ContactEmail(params)
    });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    throw error;
  }
}

export async function sendCVRequestEmail(params: {
  name: string;
  email: string;
  company: string;
  purpose: string;
}) {
  try {
    await resend.emails.send({
      from: 'Portfolio Website <onboarding@resend.dev>',
      to: 'erik.gulliksen@gmail.com',
      subject: 'New CV Access Request',
      react: CVRequestEmail(params)
    });
  } catch (error) {
    console.error('Failed to send CV request email:', error);
    throw error;
  }
}

export async function sendCVApprovalEmail(params: {
  name: string;
  email: string;
  cvUrl: string;
  isEnglish: boolean;
}) {
  try {
    await resend.emails.send({
      from: 'Erik Gulliksen <onboarding@resend.dev>',
      to: params.email,
      subject: params.isEnglish ? 'Your CV Access Request has been Approved' : 'Din CV-forespørsel har blitt godkjent',
      react: CVApprovalEmail({
        name: params.name,
        cvUrl: params.cvUrl,
        isEnglish: params.isEnglish
      })
    });
  } catch (error) {
    console.error('Failed to send CV approval email:', error);
    throw error;
  }
}

