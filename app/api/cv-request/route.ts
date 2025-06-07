import { NextResponse } from 'next/server'
import { createCVRequest, checkRateLimit } from '../../../lib/cv-requests'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, purpose, isEnglish } = body

    // Basic validation
    if (!name || !email || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Check rate limit (using email as key)
    const isLimited = await checkRateLimit(email)
    if (isLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Create CV request
    const cvRequest = await createCVRequest({
      name,
      email,
      company,
      purpose,
      ipAddress,
      userAgent,
      isEnglish
    })

    return NextResponse.json({
      message: 'Request submitted successfully',
      requestId: cvRequest.requestId
    })
  } catch (error) {
    console.error('Error processing CV request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

