import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/app/lib/services/email';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const startTime = Date.now();
  const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    console.log('📬 [CONTACT] Received contact form submission');
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Log the submission attempt
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'Contact form submission received',
        details: `From: ${name} <${email}>, Subject: ${subject}, IP: ${ipAddress}`,
        source: 'contact-form'
      }
    });

    // Basic validation
    if (!name || !email || !subject || !message) {
      await prisma.systemLog.create({
        data: {
          level: 'warning',
          message: 'Contact form validation failed',
          details: `Missing fields. From: ${email}, IP: ${ipAddress}`,
          source: 'contact-form'
        }
      });
      
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('📬 [CONTACT] Attempting to send email with data:', { name, email, subject });
    
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message
    });

    const responseTime = Date.now() - startTime;

    if (result.error) {
      console.error('❌ [CONTACT] Failed to send email:', result.error);
      
      await prisma.systemLog.create({
        data: {
          level: 'error',
          message: 'Contact form email failed',
          details: `From: ${name} <${email}>, Error: ${result.error}, Response time: ${responseTime}ms`,
          source: 'contact-form'
        }
      });
      
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('✅ [CONTACT] Email sent successfully');
    
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'Contact form email sent successfully',
        details: `From: ${name} <${email}>, Subject: ${subject}, Response time: ${responseTime}ms`,
        source: 'contact-form'
      }
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Message received! I will respond as soon as possible.' 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const responseTime = Date.now() - startTime;
    
    console.error('❌ [CONTACT] Failed to send contact email:', {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    await prisma.systemLog.create({
      data: {
        level: 'error',
        message: 'Contact form system error',
        details: `Error: ${errorMessage}, IP: ${ipAddress}, Response time: ${responseTime}ms`,
        source: 'contact-form'
      }
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

