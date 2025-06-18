import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

// Use Resend's default domain until a custom domain is configured
// TODO: Change this to erik@gulliksen.dev once domain is verified
const SENDER_EMAIL = 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'erik.gulliksen@gmail.com';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

type BaseEmailConfig = {
  name: string;
  email: string;
  isEnglish: boolean;
};

type CVRequestEmailConfig = BaseEmailConfig & {
  company?: string;
  purpose: string;
};

type CVApprovalEmailConfig = BaseEmailConfig & {
  cvUrl: string;
};

export async function sendCVRequestEmail(config: CVRequestEmailConfig) {
  const { name, email, company, purpose, isEnglish = true } = config;
  const startTime = Date.now();
  
  try {
    const result = await resend.emails.send({
      from: 'Erik Gulliksen <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: isEnglish ? `New CV Request from ${name}` : `Ny CV-forespørsel fra ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2563eb; margin-bottom: 20px; }
            ul { list-style: none; padding: 0; }
            li { padding: 10px 0; border-bottom: 1px solid #eee; }
            strong { color: #1f2937; }
          </style>
        </head>
        <body>
          ${isEnglish ? `
            <h2>New CV Request</h2>
            <p>A new CV request has been submitted:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
              ${purpose ? `<li><strong>Purpose:</strong> ${purpose}</li>` : ''}
            </ul>
          ` : `
            <h2>Ny CV-forespørsel</h2>
            <p>En ny CV-forespørsel har blitt sendt inn:</p>
            <ul>
              <li><strong>Navn:</strong> ${name}</li>
              <li><strong>E-post:</strong> ${email}</li>
              ${company ? `<li><strong>Firma:</strong> ${company}</li>` : ''}
              ${purpose ? `<li><strong>Formål:</strong> ${purpose}</li>` : ''}
            </ul>
          `}
        </body>
        </html>
      `,
    });
    
    const deliveryTime = Date.now() - startTime;
    
    // Log successful email delivery
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'CV request email sent successfully',
        details: `To: ${ADMIN_EMAIL}, From: ${name} <${email}>, Delivery time: ${deliveryTime}ms, Language: ${isEnglish ? 'English' : 'Norwegian'}`,
        source: 'email-delivery'
      }
    });
    
    return result;
  } catch (error) {
    const deliveryTime = Date.now() - startTime;
    
    // Log failed email delivery
    await prisma.systemLog.create({
      data: {
        level: 'error',
        message: 'CV request email delivery failed',
        details: `To: ${ADMIN_EMAIL}, From: ${name} <${email}>, Error: ${error instanceof Error ? error.message : 'Unknown error'}, Delivery time: ${deliveryTime}ms`,
        source: 'email-delivery'
      }
    });
    
    console.error('Failed to send CV request email:', error);
    throw error;
  }
}

export async function sendCVApprovalEmail(config: CVApprovalEmailConfig) {
  const { name, email, cvUrl, isEnglish } = config;
  const startTime = Date.now();
  
  // Enhanced logging before sending
  console.log('🔍 [EMAIL-SERVICE] Attempting to send CV approval email:', {
    to: email,
    name,
    cvUrl: cvUrl.substring(0, 50) + '...',
    isEnglish,
    resendApiKey: process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing'
  });
  
  try {
    console.log('📤 [EMAIL-SERVICE] Sending CV approval email...');
    
    const result = await resend.emails.send({
      from: 'Erik Gulliksen <onboarding@resend.dev>',
      to: email,
      subject: isEnglish ? 'CV Access Approved' : 'CV-tilgang godkjent',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #4caf50; margin-bottom: 20px; }
            p { margin-bottom: 16px; }
            a { color: #2563eb; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          ${isEnglish ? `
            <h2>CV Access Approved</h2>
            <p>Hello ${name},</p>
            <p>Your request to access my CV has been approved. You can view the CV using the link below:</p>
            <p><a href="${cvUrl}">${cvUrl}</a></p>
            <p>Please note that this link is personal and should not be shared.</p>
            <p>Best regards,<br>Erik Gulliksen</p>
          ` : `
            <h2>CV-tilgang godkjent</h2>
            <p>Hei ${name},</p>
            <p>Din forespørsel om tilgang til min CV er godkjent. Du kan se CV-en ved å bruke lenken nedenfor:</p>
            <p><a href="${cvUrl}">${cvUrl}</a></p>
            <p>Vennligst merk at denne lenken er personlig og ikke bør deles.</p>
            <p>Med vennlig hilsen,<br>Erik Gulliksen</p>
          `}
        </body>
        </html>
      `,
    });
    
    console.log('✅ [EMAIL-SERVICE] Resend API response:', result);
    
    const deliveryTime = Date.now() - startTime;
    
    // Log successful email delivery
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'CV approval email sent successfully',
        details: `To: ${email}, Name: ${name}, CV URL: ${cvUrl.substring(0, 50)}..., Delivery time: ${deliveryTime}ms, Language: ${isEnglish ? 'English' : 'Norwegian'}`,
        source: 'email-delivery'
      }
    });
    
    return result;
  } catch (error) {
    const deliveryTime = Date.now() - startTime;
    
    // Log failed email delivery
    await prisma.systemLog.create({
      data: {
        level: 'error',
        message: 'CV approval email delivery failed',
        details: `To: ${email}, Name: ${name}, Error: ${error instanceof Error ? error.message : 'Unknown error'}, Delivery time: ${deliveryTime}ms`,
        source: 'email-delivery'
      }
    });
    
    console.error('Failed to send CV approval email:', error);
    throw error;
  }
}

export async function sendContactEmail({ name, email, subject, message }: { name: string; email: string; subject: string; message: string }) {
  try {
    console.log('Sending contact email with data:', { name, email, subject });
    
    const result = await resend.emails.send({
      from: `Erik <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2563eb; margin-bottom: 20px; }
            h3 { color: #1f2937; margin-top: 24px; }
            ul { list-style: none; padding: 0; }
            li { padding: 10px 0; border-bottom: 1px solid #eee; }
            strong { color: #1f2937; }
            .message { background: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 16px; }
          </style>
        </head>
        <body>
          <h2>New Contact Form Submission</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Subject:</strong> ${subject}</li>
          </ul>
          <h3>Message:</h3>
          <div class="message">${message.replace(/\n/g, '<br>')}</div>
        </body>
        </html>
      `,
      replyTo: email
    });

    console.log('Email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { success: false, error };
  }
}

