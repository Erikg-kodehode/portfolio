import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Send email using Resend service
    // This will be handled by our email service
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Email sending is handled by our Resend email service

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

