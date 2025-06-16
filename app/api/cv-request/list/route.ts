import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { validateJWTFromRequest } from '@/lib/jwt-auth'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    console.log('📋 [CV-REQUESTS-API] Validating JWT token...');
    
    // Validate JWT token
    const admin = await validateJWTFromRequest(request)
    if (!admin) {
      console.log('📋 [CV-REQUESTS-API] JWT validation failed');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('📋 [CV-REQUESTS-API] JWT valid for admin:', admin.username);
    console.log('📋 [CV-REQUESTS-API] Fetching CV requests...');

    // Get all CV requests
    const requests = await prisma.cVRequest.findMany({
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

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching CV requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}
