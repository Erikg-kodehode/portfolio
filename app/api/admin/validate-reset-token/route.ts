import { NextResponse } from 'next/server'
import { validateResetToken } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { valid: false, error: 'Token is required' },
      { status: 400 }
    )
  }

  const isValid = await validateResetToken(token)

  return NextResponse.json({ valid: isValid })
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    console.log('🔍 [RESET TOKEN] Validating token:', token?.substring(0, 10) + '...');

    if (!token) {
      console.log('🔍 [RESET TOKEN] No token provided');
      return NextResponse.json(
        { valid: false, error: 'Token is required' },
        { status: 400 }
      )
    }

    const isValid = await validateResetToken(token)
    console.log('🔍 [RESET TOKEN] Token validation result:', isValid);

    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error('🔍 [RESET TOKEN] Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Validation failed' },
      { status: 500 }
    )
  }
}

