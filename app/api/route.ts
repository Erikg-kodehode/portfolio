import { NextResponse } from 'next/server';

// Force dynamic to ensure Vercel doesn't cache old routes
export const dynamic = 'force-dynamic';

// Return 404 for any API requests since we've removed MongoDB
export async function GET() {
  return NextResponse.json(
    { error: 'API routes have been removed' },
    { status: 404 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'API routes have been removed' },
    { status: 404 }
  );
}

