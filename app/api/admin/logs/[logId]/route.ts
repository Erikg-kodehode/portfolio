import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateJWTFromRequest } from '@/lib/jwt-auth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request, 
  { params }: { params: Promise<{ logId: string }> }
) {
  try {
    // Validate JWT token
    const admin = await validateJWTFromRequest(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { logId } = await params
    const { action } = await request.json()

    if (!['resolve', 'unresolve'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Update the log status
    const updateData = action === 'resolve' 
      ? { resolvedAt: new Date() }
      : { resolvedAt: null }

    const updatedLog = await prisma.systemLog.update({
      where: { id: logId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      log: updatedLog
    })
  } catch (error) {
    console.error('Error updating log:', error)
    return NextResponse.json(
      { error: 'Failed to update log' },
      { status: 500 }
    )
  }
}

