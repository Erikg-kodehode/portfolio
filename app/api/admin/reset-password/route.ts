import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { createElement } from 'react';
import PasswordResetEmail from '@/app/emails/password-reset';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log('Password reset request received');
    
    // Check environment variables
    const resendKey = process.env.RESEND_API_KEY;
    const nextAuthUrl = process.env.NEXTAUTH_URL;
    
    console.log('Environment check:', {
      hasResendKey: !!resendKey,
      resendKeyLength: resendKey ? resendKey.length : 0,
      hasNextAuthUrl: !!nextAuthUrl,
      nextAuthUrl: nextAuthUrl
    });
    
    const { email } = await request.json();
    console.log('Password reset requested for email:', email);

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      console.log('No admin found with email:', email);
      // Return 200 even if email not found to prevent email enumeration
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link.'
      });
    }
    
    console.log('Admin found:', admin.username);

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiresAt
      }
    });

    // Log the password reset request
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: `Password reset requested for admin: ${admin.username}`,
        source: 'Auth',
        details: `Reset token expires at: ${resetTokenExpiresAt.toISOString()}`
      }
    });

    // Generate reset link - always use the public production URL
    const baseUrl = 'https://erikg-portfolio.vercel.app'; // Force public URL
    const resetLink = `${baseUrl}/admin/reset-password/${resetToken}`;

    // Send reset email
    console.log('Attempting to send email to:', admin.email);
    console.log('Reset link:', resetLink);
    
    const emailResult = await resend.emails.send({
      from: 'Erik Gulliksen <onboarding@resend.dev>',
      to: admin.email, // Use the admin's actual email address
      subject: 'Admin Password Reset Request',
      react: createElement(PasswordResetEmail, {
        username: admin.username,
        resetLink
      })
    });
    
    console.log('Email send result:', emailResult);

    return NextResponse.json({
      message: 'If an account exists with this email, you will receive a password reset link.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    // Find admin by reset token and check if it's valid
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiresAt: {
          gt: new Date()
        }
      }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update admin with new password and clear reset token
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiresAt: null
      }
    });

    // Log the successful password reset
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: `Password reset completed for admin: ${admin.username}`,
        source: 'Auth'
      }
    });

    return NextResponse.json({
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
