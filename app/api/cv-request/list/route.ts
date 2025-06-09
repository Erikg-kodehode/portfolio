import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'
import { cookies } from 'next/headers'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Validate session
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const admin = await validateSession(sessionToken)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all CV requests and session data in a single transaction
    const [session, requests] = await prisma.$transaction([
      prisma.adminSession.findFirst({
        where: {
          token: sessionToken,
          expires: { gt: new Date() }
        }
      }),
      prisma.cVRequest.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          requestId: true,
          name: true,
          email: true,
          company: true,
          purpose: true,
          status: true,
          createdAt: true,
          accessCount: true
        },
        take: 100 // Limit to last 100 requests
      })
    ])

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching CV requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}
