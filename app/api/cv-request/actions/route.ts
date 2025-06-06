import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'clearRequests':
        await prisma.cVRequest.deleteMany({})
        return NextResponse.json({ message: 'All CV requests cleared' })

      case 'resetRateLimits':
        await prisma.rateLimit.deleteMany({})
        return NextResponse.json({ message: 'All rate limits reset' })

      case 'resetAll':
        await prisma.$transaction([
          prisma.cVRequest.deleteMany({}),
          prisma.rateLimit.deleteMany({})
        ])
        return NextResponse.json({ message: 'All requests and rate limits reset' })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error performing admin action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

