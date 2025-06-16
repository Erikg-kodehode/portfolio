import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cookieStore = await cookies()
    
    // Clear the JWT token cookie (no need for database cleanup with JWT)
    cookieStore.set('admin_token', '', {
      expires: new Date(0),
      path: '/'
    })

    console.log('🔓 [LOGOUT] JWT token cleared successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('🔓 [LOGOUT] Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

