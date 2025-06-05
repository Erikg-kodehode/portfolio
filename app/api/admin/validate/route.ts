import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const admin = await validateSession(token)

    return NextResponse.json({
      valid: !!admin,
      admin: admin ? {
        id: admin.id,
        username: admin.username,
        role: admin.role
      } : null
    })
  } catch (error) {
    console.error('Validation error:', error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}

