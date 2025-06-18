import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, time, page } = body
    
    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Only log if there's some meaningful data
    if (!name && !email) {
      return NextResponse.json({ logged: false })
    }
    
    // Log form abandonment
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'Form abandonment detected',
        details: `Page: ${page}, Name: ${name || 'N/A'}, Email: ${email || 'N/A'}, Time: ${time}, IP: ${ipAddress}`,
        source: 'form-abandonment'
      }
    })
    
    return NextResponse.json({ logged: true })
  } catch (error) {
    console.error('Failed to log form abandonment:', error)
    return NextResponse.json({ logged: false })
  }
}

