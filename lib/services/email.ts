import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailConfig = {
  name: string;
  email: string;
  company?: string;
  purpose?: string;
  cvUrl?: string;
  isEnglish?: boolean;
};

export async function sendCVRequestEmail(config: EmailConfig) {
  const { name, email, company, purpose } = config;
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New CV Request from ${name}`,
      html: `
        <h2>New CV Request</h2>
        <p>A new CV request has been submitted:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          ${purpose ? `<li><strong>Purpose:</strong> ${purpose}</li>` : ''}
        </ul>
      `,
    });
  } catch (error) {
    console.error('Failed to send CV request email:', error);
    throw error;
  }
}

export async function sendCVApprovalEmail(config: EmailConfig) {
  const { name, email, cvUrl, isEnglish } = config;
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: isEnglish ? 'CV Access Approved' : 'CV-tilgang godkjent',
      html: isEnglish
        ? `
          <h2>CV Access Approved</h2>
          <p>Hello ${name},</p>
          <p>Your request to access my CV has been approved. You can view the CV using the link below:</p>
          <p><a href="${cvUrl}">${cvUrl}</a></p>
          <p>Please note that this link is personal and should not be shared.</p>
          <p>Best regards,<br>Erik Gjelsvik</p>
        `
        : `
          <h2>CV-tilgang godkjent</h2>
          <p>Hei ${name},</p>
          <p>Din forespørsel om tilgang til min CV er godkjent. Du kan se CV-en ved å bruke lenken nedenfor:</p>
          <p><a href="${cvUrl}">${cvUrl}</a></p>
          <p>Vennligst merk at denne lenken er personlig og ikke bør deles.</p>
          <p>Med vennlig hilsen,<br>Erik Gjelsvik</p>
        `,
    });
  } catch (error) {
    console.error('Failed to send CV approval email:', error);
    throw error;
  }
}

