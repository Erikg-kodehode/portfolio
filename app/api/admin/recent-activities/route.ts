import { NextResponse } from 'next/server';
import { validateJWTFromRequest } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Validate JWT token
    const admin = await validateJWTFromRequest(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // Fetch recent CV requests
    const recentCVRequests = await prisma.cVRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 50), // Cap at 50 for performance
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        purpose: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Fetch recent admin logs (if you have them)
    const recentLogs = await prisma.systemLog.findMany({
      where: {
        level: { in: ['INFO', 'WARN', 'ERROR'] },
        message: {
          contains: 'admin', // Filter for admin-related activities
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        level: true,
        message: true,
        createdAt: true,
        details: true,
      },
    }).catch(() => []); // Handle case where SystemLog table doesn't exist

    // Create activity objects
    const activities = [];

    // Add CV request activities
    for (const request of recentCVRequests) {
      let activityType: 'cv_request' | 'cv_approval' | 'cv_denial' = 'cv_request';
      let message = `New CV request from ${request.name}`;
      
      if (request.status === 'APPROVED') {
        activityType = 'cv_approval';
        message = `CV request approved for ${request.name}`;
      } else if (request.status === 'DENIED') {
        activityType = 'cv_denial';
        message = `CV request denied for ${request.name}`;
      }

      activities.push({
        id: `cv-${request.id}`,
        type: activityType,
        message,
        details: `${request.company} - ${request.purpose}`,
        timestamp: request.updatedAt.toISOString(),
        userId: request.id,
        userEmail: request.email,
      });
    }

    // Add admin login activities (simulated for now)
    if (recentLogs.length > 0) {
      for (const log of recentLogs) {
        if (log.message.includes('login') || log.message.includes('admin')) {
          activities.push({
            id: `log-${log.id}`,
            type: 'admin_login' as const,
            message: log.message,
            timestamp: log.createdAt.toISOString(),
          });
        }
      }
    }

    // Sort activities by timestamp (most recent first)
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Return the requested number of activities
    const limitedActivities = activities.slice(0, limit);

    return NextResponse.json({
      activities: limitedActivities,
      total: activities.length,
    });

  } catch (error) {
    console.error('Failed to fetch recent activities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

