import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Here we would integrate with an email service
    // For example SendGrid or EmailJS
    // For now, we'll log and simulate success
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Add actual email sending logic here
    // Example with EmailJS or similar service would go here

    return NextResponse.json({ 
      success: true,
      message: 'Melding mottatt! Jeg vil svare så snart som mulig.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Beklager, kunne ikke sende meldingen. Vennligst prøv igjen senere.' 
      },
      { status: 500 }
    );
  }
}

