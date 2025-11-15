import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Don't reveal if user exists or not (security best practice)
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // In a real app, you would:
    // 1. Save resetToken and resetTokenExpiry to database
    // 2. Send email with reset link
    // For now, we'll log it (in production, use Resend or similar)

    console.log('Password reset token for', email, ':', resetToken);
    console.log('Reset link: http://localhost:3000/reset-password?token=' + resetToken);

    // TODO: Send email with reset link using Resend
    // const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    // await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been sent.',
      // Remove this in production - for development only
      devToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
