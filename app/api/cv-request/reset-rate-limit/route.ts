import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Delete the rate limit record for this email
    await prisma.rateLimit.delete({
      where: { key: email }
    })

    return NextResponse.json({ message: 'Rate limit reset successfully' })
  } catch (error) {
    console.error('Error resetting rate limit:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

