import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { loginAdminJWT } from '@/lib/jwt-auth'

export const dynamic = 'force-dynamic'

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function POST(request: Request) {
  try {
    console.log('🔑 [API] Login request received');
    
    const body = await request.json();
    const { username, password } = body;
    console.log('🔑 [API] Login attempt for user:', { username });
    console.log('🔑 [API] Password provided:', !!password, 'length:', password?.length);

    if (!username || !password) {
      console.log('🔑 [API] Missing credentials');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    console.log('🔑 [API] Calling loginAdminJWT function...');
    const result = await loginAdminJWT(username, password)
    
    if (!result) {
      console.log('🔑 [API] Login failed - invalid credentials');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const { token, admin } = result
    console.log('🔑 [API] Login successful for user:', admin.username);
    console.log('🔑 [API] JWT token created:', { token: token.substring(0, 20) + '...' });

    // Set JWT cookie with longer expiry
    const cookieStore = await cookies()
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    }
    
    console.log('🔑 [API] Setting JWT cookie with options:', cookieOptions);
    
    cookieStore.set('admin_token', token, cookieOptions)
    console.log('🔑 [API] JWT cookie set successfully');

    const responseData = {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    };
    
    console.log('🔑 [API] Returning success response:', responseData);
    
    // Return admin data for initial cache
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('🔑 [API] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

