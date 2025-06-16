import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { subHours, subDays } from 'date-fns';
import { validateJWTFromRequest } from '@/lib/jwt-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Validate JWT token
    const admin = await validateJWTFromRequest(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const timeRange = searchParams.get('timeRange') || '24h';
    const search = searchParams.get('search') || '';
    const showResolved = searchParams.get('showResolved') === 'true';

    // Calculate date range
    const now = new Date();
    let dateFilter: Date;
    switch (timeRange) {
      case '1h':
        dateFilter = subHours(now, 1);
        break;
      case '24h':
        dateFilter = subHours(now, 24);
        break;
      case '7d':
        dateFilter = subDays(now, 7);
        break;
      case '30d':
        dateFilter = subDays(now, 30);
        break;
      default:
        dateFilter = new Date(0); // All time
    }

    const logs = await prisma.systemLog.findMany({
      where: {
        AND: [
          // Level filter
          type !== 'all' ? { level: type } : {},
          // Time range filter
          { createdAt: { gte: dateFilter } },
          // Search filter
          search ? {
            OR: [
              { message: { contains: search, mode: 'insensitive' } },
              { source: { contains: search, mode: 'insensitive' } },
              { details: { contains: search, mode: 'insensitive' } }
            ]
          } : {},
          // Resolved status filter
          !showResolved ? { resolvedAt: null } : {}
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching system logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system logs' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Validate JWT token
    const admin = await validateJWTFromRequest(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { action } = await request.json();
    const id = request.url.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      );
    }

    const log = await prisma.systemLog.update({
      where: { id },
      data: {
        resolvedAt: action === 'resolve' ? new Date() : null
      }
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error updating system log:', error);
    return NextResponse.json(
      { error: 'Failed to update system log' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Validate JWT token
    const admin = await validateJWTFromRequest(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete all resolved logs
    await prisma.systemLog.deleteMany({
      where: {
        resolvedAt: { not: null }
      }
    });

    return NextResponse.json({ message: 'Resolved logs cleared successfully' });
  } catch (error) {
    console.error('Error clearing resolved logs:', error);
    return NextResponse.json(
      { error: 'Failed to clear resolved logs' },
      { status: 500 }
    );
  }
}
