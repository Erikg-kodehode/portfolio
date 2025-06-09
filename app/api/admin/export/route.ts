import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Check admin authorization
  const authResponse = await fetch(new URL('/api/admin/validate', request.url), {
    headers: request.headers
  });

  if (!authResponse.ok) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  try {
    // Fetch all relevant data
// Add error handling for each promise
const results = await Promise.allSettled([
      prisma.systemSettings.findFirst(),
      prisma.cVRequest.findMany({
        orderBy: { createdAt: 'desc' }
      }),
      prisma.systemLog.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ]);

    // Check if any promises failed
    const errors = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map(result => result.reason);

    if (errors.length > 0) {
      console.error('Errors during data export:', errors);
      throw new Error('Failed to fetch some data');
    }

    // Get the fulfilled values
    const [settings, cvRequests, logs] = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);

    // Create export object
    const exportData = {
      timestamp: new Date().toISOString(),
      settings,
      statistics: {
        total_cv_requests: cvRequests.length,
        pending_requests: cvRequests.filter((r: { status: string }) => r.status === 'PENDING').length,
        approved_requests: cvRequests.filter((r: { status: string }) => r.status === 'APPROVED').length,
        denied_requests: cvRequests.filter((r: { status: string }) => r.status === 'DENIED').length,
        expired_requests: cvRequests.filter((r: { status: string }) => r.status === 'EXPIRED').length,
      },
      cv_requests: cvRequests,
      system_logs: logs
    };

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Content-Disposition', `attachment; filename=system_data_${new Date().toISOString().split('T')[0]}.json`);

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers
    });
  } catch (error) {
const errorMessage = error instanceof Error ? error.message : 'Unknown error';
console.error('Error exporting system data:', {
  error: errorMessage,
  stack: error instanceof Error ? error.stack : undefined
});
    return NextResponse.json(
      { error: 'Failed to export system data' },
      { status: 500 }
    );
  }
}

