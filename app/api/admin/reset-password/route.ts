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
    const { email } = await request.json();

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      // Return 200 even if email not found to prevent email enumeration
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link.'
      });
    }

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

    // Generate reset link
    const resetLink = `${process.env.NEXTAUTH_URL}/admin/reset-password/${resetToken}`;

    // Send reset email
    await resend.emails.send({
      from: 'Admin <onboarding@resend.dev>',
      to: admin.email,
      subject: 'Reset Your Password',
      react: createElement(PasswordResetEmail, {
        username: admin.username,
        resetLink
      })
    });

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
