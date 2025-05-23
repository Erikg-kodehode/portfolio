import emailjs from '@emailjs/browser';

// Define TypeScript interface for email template parameters
export interface EmailTemplateParams {
  from_name: string;
  reply_to: string;
  subject: string;
  message: string;
  to_name: string;
  email: string;  // Added for backwards compatibility
}

export async function sendEmail(templateParams: EmailTemplateParams) {
  try {
    // Dynamically import EmailJS only when needed
    const emailjsModule = await import('@emailjs/browser');
    const emailjs = emailjsModule.default;
    
    // Initialize EmailJS with your public key only when needed
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    });
    
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams as unknown as Record<string, unknown>
    );
    return result;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
}
