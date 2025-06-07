import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateCVRequestStatus } from '@/lib/cv-requests';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Get all pending requests
    const pendingRequests = await prisma.cVRequest.findMany({
      where: {
        status: 'PENDING'
      },
      select: {
        requestId: true,
        isEnglish: true
      }
    });

    // Process each request
    const results = await Promise.allSettled(
      pendingRequests.map(request =>
        updateCVRequestStatus(request.requestId, 'APPROVED', request.isEnglish)
      )
    );

    // Count successes and failures
    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    // Log any failures
    if (failed > 0) {
      await prisma.systemLog.create({
        data: {
          level: 'warning',
          message: `Bulk approval partially failed`,
          details: `${succeeded} requests approved successfully, ${failed} failed`,
          source: 'cv-request-bulk-approval'
        }
      });
    }

    return NextResponse.json({
      message: 'Bulk approval completed',
      succeeded,
      failed
    });
  } catch (error) {
    console.error('Error in bulk approval:', error);

    // Log the error
    await prisma.systemLog.create({
      data: {
        level: 'error',
        message: 'Bulk approval failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        source: 'cv-request-bulk-approval'
      }
    });

    return NextResponse.json(
      { error: 'Failed to process bulk approval' },
      { status: 500 }
    );
  }
}

