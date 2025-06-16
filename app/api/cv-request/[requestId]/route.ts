import { NextResponse } from 'next/server'
import { updateCVRequestStatus } from '../../../../lib/cv-requests'
import { prisma } from '@/lib/prisma'
import { validateJWTFromRequest } from '@/lib/jwt-auth'

export const dynamic = 'force-dynamic'

export async function PATCH(request: Request) {
  console.log('🔍 [CV-REQUEST-UPDATE] Validating JWT token...');
  
  // Validate JWT token
  const admin = await validateJWTFromRequest(request)
  if (!admin) {
    console.log('🔍 [CV-REQUEST-UPDATE] JWT validation failed');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  console.log('🔍 [CV-REQUEST-UPDATE] JWT valid for admin:', admin.username);
  
  const { pathname } = new URL(request.url);
  const requestId = pathname.split('/').pop();

  if (!requestId) {
    return NextResponse.json(
      { error: 'Request ID is required' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json()
    const { status, isEnglish, toggleLanguage } = body

    // Handle language toggle
    if (toggleLanguage) {
      // Log the language toggle action
      await prisma.systemLog.create({
        data: {
          level: 'info',
          message: `Language switched to ${isEnglish ? 'English' : 'Norwegian'}`,
          details: `Request ID: ${requestId}`,
          source: 'cv-request'
        }
      });

      const updatedRequest = await prisma.cVRequest.update({
        where: { requestId },
        data: { isEnglish }
      })
      return NextResponse.json(updatedRequest)
    }

    // Handle status change
    if (!status || !['APPROVED', 'DENIED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Check if request was made from English version
    const cvRequest = await prisma.cVRequest.findUnique({
      where: { requestId },
      select: {
        name: true,
        email: true,
        status: true,
        isEnglish: true
      }
    })

    if (!cvRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      )
    }

    // Use the language preference from the request or fall back to stored value
    const useEnglish = isEnglish ?? cvRequest.isEnglish

    const updatedRequest = await updateCVRequestStatus(
      requestId, // Use the request ID from the URL
      status,
      useEnglish
    )

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error('Error updating CV request:', error)

    // Log the error
    await prisma.systemLog.create({
      data: {
        level: 'error',
        message: 'Failed to update CV request',
        details: error instanceof Error ? error.message : 'Unknown error',
        source: 'cv-request-approval'
      }
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
