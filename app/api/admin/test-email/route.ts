import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateJWTFromRequest } from '@/lib/jwt-auth';

export const dynamic = 'force-dynamic';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('🔍 [TEST-EMAIL] Validating JWT token...');
  
  // Validate JWT token
  const admin = await validateJWTFromRequest(request)
  if (!admin) {
    console.log('🔍 [TEST-EMAIL] JWT validation failed');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  console.log('🔍 [TEST-EMAIL] JWT valid for admin:', admin.username);
  console.log('📧 [TEST-EMAIL] Attempting to send test email...');
  
  try {
    const result = await resend.emails.send({
      from: 'Erik Gulliksen <onboarding@resend.dev>',
      to: 'erik.gulliksen@gmail.com',
      subject: 'Test Email from Portfolio Admin',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from your portfolio admin panel.</p>
        <p>If you received this email, your email system is working correctly.</p>
        <hr>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    });

    console.log('Test email sent successfully:', result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}


