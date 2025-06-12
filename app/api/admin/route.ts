import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { loginAdmin } from '@/lib/auth'

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

    console.log('🔑 [API] Calling loginAdmin function...');
    const result = await loginAdmin(username, password)
    
    if (!result) {
      console.log('🔑 [API] Login failed - invalid credentials');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const { session, admin } = result
    console.log('🔑 [API] Login successful for user:', admin.username);
    console.log('🔑 [API] Session created:', { token: session.token.substring(0, 10) + '...', expires: session.expires });

    // Set session cookie
    const cookieStore = await cookies()
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      expires: session.expires,
      path: '/'
    }
    
    console.log('🔑 [API] Setting session cookie with options:', {
      ...cookieOptions,
      token: session.token.substring(0, 10) + '...'
    });
    
    cookieStore.set('admin_session', session.token, cookieOptions)
    console.log('🔑 [API] Session cookie set successfully');

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

