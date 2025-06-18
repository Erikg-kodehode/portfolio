import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { level, message, details, source } = await request.json();

    await prisma.systemLog.create({
      data: {
        level,
        message, 
        details,
        source
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log page visit:', error);
    return NextResponse.json(
      { error: 'Failed to log page visit' },
      { status: 500 }
    );
  }
}

