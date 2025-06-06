import { NextResponse } from 'next/server'
import { updateCVRequestStatus } from '../../../../lib/cv-requests'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status || !['APPROVED', 'DENIED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Check if request was made from English version
    const cvRequest = await prisma.cVRequest.findUnique({
      where: { requestId: params.requestId },
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

    // Use the stored language preference
    const isEnglish = cvRequest.isEnglish

    const updatedRequest = await updateCVRequestStatus(
      params.requestId,
      status,
      isEnglish
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
