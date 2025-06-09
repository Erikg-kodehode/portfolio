import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET settings
export async function GET() {
  try {
    const settings = await prisma.systemSettings.findFirst() || {};
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// UPDATE settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Create or update settings
    const settings = await prisma.systemSettings.upsert({
      where: { id: 1 },
      update: body,
      create: { id: 1, ...body }
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

