import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Try to get token from request body first
    let token;
    try {
      const body = await request.json();
      token = body.token;
    } catch {
      // If no body or parsing fails, that's okay
    }

    // If no token in body, try to get from cookies
    if (!token) {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        token = cookies['admin_session'];
      }
    }

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'No session token found' },
        { status: 401 }
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

