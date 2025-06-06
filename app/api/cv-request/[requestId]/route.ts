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
      where: { requestId: params.requestId }
    })

    if (!cvRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      )
    }

    // Determine language based on the request origin URL
    const isEnglish = cvRequest.userAgent.includes('/en/') || cvRequest.userAgent.includes('en-')

    const updatedRequest = await updateCVRequestStatus(
      params.requestId,
      status,
      isEnglish
    )

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error('Error updating CV request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
