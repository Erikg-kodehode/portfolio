export const sendEmail = async (templateParams) => {
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
      templateParams
    );
    return result;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};
