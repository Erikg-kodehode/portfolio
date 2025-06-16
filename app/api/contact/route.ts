import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/app/lib/services/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    console.log('Received contact form submission');
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('Attempting to send email with data:', { name, email, subject });
    
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message
    });

    if (result.error) {
      console.error('Failed to send email:', result.error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully');
    return NextResponse.json({ 
      success: true,
      message: 'Message received! I will respond as soon as possible.' 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send contact email:', {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Sorry, could not send the message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

