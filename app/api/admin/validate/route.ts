import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const admin = await validateSession(token);
    
    if (!admin) {
      return NextResponse.json(
        { valid: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

