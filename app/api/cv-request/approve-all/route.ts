import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateCVRequestStatus } from '@/lib/cv-requests';
import { validateJWTFromRequest } from '@/lib/jwt-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('🔍 [APPROVE-ALL] Validating JWT token...');
  
  // Validate JWT token
  const admin = await validateJWTFromRequest(request)
  if (!admin) {
    console.log('🔍 [APPROVE-ALL] JWT validation failed');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  console.log('🔍 [APPROVE-ALL] JWT valid for admin:', admin.username);
  
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

    // Log the result
    if (succeeded > 0) {
      await prisma.systemLog.create({
        data: {
          level: 'info',
          message: `Bulk approval completed`,
          details: `${succeeded} requests approved successfully`,
          source: 'cv-request-bulk-approval'
        }
      });
    } 

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

