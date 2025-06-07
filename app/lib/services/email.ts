import { Resend } from 'resend';
import ContactEmail from '@/app/emails/contact';
import CVRequestEmail from '@/app/emails/cv-request';
import CVApprovalEmail from '@/app/emails/cv-approval';
import { createElement } from 'react';

// Only initialize Resend on the server side
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY);
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendContactEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!resend) {
    throw new Error('Resend client is not initialized. Check your API key configuration.');
  }

  try {
    console.log('Attempting to send contact email...');
    const result = await resend.emails.send({
      from: 'Erik <onboarding@resend.dev>',
      to: 'erik.gulliksen@gmail.com',
      subject: `Contact Form: ${params.subject}`,
      react: createElement(ContactEmail, params)
    });
    console.log('Contact email sent successfully:', result);
    return result;
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
  if (!resend) {
    throw new Error('Resend client is not initialized. Check your API key configuration.');
  }

  try {
    console.log('Attempting to send CV request email...');
    const result = await resend.emails.send({
      from: 'Erik <onboarding@resend.dev>',
      to: 'erik.gulliksen@gmail.com',
      subject: 'New CV Access Request',
      react: createElement(CVRequestEmail, params)
    });
    console.log('CV request email sent successfully:', result);
    return result;
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
  if (!resend) {
    throw new Error('Resend client is not initialized. Check your API key configuration.');
  }

  try {
    console.log('Attempting to send CV approval email...');
    const result = await resend.emails.send({
      from: 'Erik <onboarding@resend.dev>',
      to: params.email,
      subject: params.isEnglish ? 'Your CV Access Request has been Approved' : 'Din CV-forespørsel har blitt godkjent',
      react: createElement(CVApprovalEmail, {
        name: params.name,
        cvUrl: params.cvUrl,
        isEnglish: params.isEnglish
      })
    });
    console.log('CV approval email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send CV approval email:', error);
    throw error;
  }
}
