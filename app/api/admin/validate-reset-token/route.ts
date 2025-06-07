import { NextResponse } from 'next/server'
import { validateResetToken } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
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

