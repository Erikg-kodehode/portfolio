import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { logout } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (sessionToken) {
      await logout(sessionToken)
      cookies().delete('admin_session')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

