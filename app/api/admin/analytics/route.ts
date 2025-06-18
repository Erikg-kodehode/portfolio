import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateJWTFromRequest } from '@/lib/jwt-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  console.log('📊 [ANALYTICS] Validating JWT token...');
  
  // Validate JWT token
  const admin = await validateJWTFromRequest(request)
  if (!admin) {
    console.log('📊 [ANALYTICS] JWT validation failed');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  console.log('📊 [ANALYTICS] JWT valid for admin:', admin.username);

  try {
    const url = new URL(request.url)
    const range = url.searchParams.get('range') || '7d'
    
    // Calculate date range
    const now = new Date()
    let startDate: Date
    
    switch (range) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default: // 7d
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    console.log('📊 [ANALYTICS] Fetching analytics for range:', range, 'from:', startDate.toISOString())

    // Fetch system logs within date range
    const logs = await prisma.systemLog.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      select: {
        level: true,
        message: true,
        details: true,
        source: true,
        createdAt: true
      }
    })

    console.log('📊 [ANALYTICS] Found', logs.length, 'log entries')

    // Aggregate page views
    const pageAnalytics = logs.filter(log => log.source === 'page-analytics')
    const pageViews = {
      total: pageAnalytics.length,
      english: pageAnalytics.filter(log => log.details?.includes('Language: en')).length,
      norwegian: pageAnalytics.filter(log => log.details?.includes('Language: no')).length,
      bots: pageAnalytics.filter(log => log.details?.includes('Bot: true')).length,
      humans: pageAnalytics.filter(log => log.details?.includes('Bot: false')).length
    }

    // Aggregate email metrics
    const emailLogs = logs.filter(log => log.source === 'email-delivery')
    const successfulEmails = emailLogs.filter(log => log.level === 'info')
    const failedEmails = emailLogs.filter(log => log.level === 'error')
    
    const emailMetrics = {
      totalSent: emailLogs.length,
      successRate: emailLogs.length > 0 ? (successfulEmails.length / emailLogs.length) * 100 : 0,
      averageDeliveryTime: calculateAverageDeliveryTime(successfulEmails),
      contactEmails: emailLogs.filter(log => log.details?.includes('contact form')).length,
      cvRequestEmails: emailLogs.filter(log => log.details?.includes('CV request email')).length,
      cvApprovalEmails: emailLogs.filter(log => log.details?.includes('CV approval email')).length
    }

    // Aggregate performance metrics
    const performanceLogs = logs.filter(log => log.source === 'database-performance')
    const rateLimitLogs = logs.filter(log => log.source === 'rate-limit')
    
    const performanceMetrics = {
      slowQueries: performanceLogs.length,
      averageResponseTime: calculateAverageResponseTime(logs),
      rateLimitTriggers: rateLimitLogs.length
    }

    // Aggregate user behavior
    const abandonmentLogs = logs.filter(log => log.source === 'form-abandonment')
    const cvRequests = await prisma.cVRequest.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    const userBehavior = {
      formAbandonments: abandonmentLogs.length,
      conversionRate: abandonmentLogs.length > 0 ? (cvRequests / (cvRequests + abandonmentLogs.length)) * 100 : 0,
      topPages: extractTopPages(pageAnalytics),
      topReferrers: extractTopReferrers(pageAnalytics)
    }

    const analytics = {
      pageViews,
      emailMetrics,
      performanceMetrics,
      userBehavior
    }

    console.log('📊 [ANALYTICS] Returning analytics data:', {
      pageViews: pageViews.total,
      emails: emailMetrics.totalSent,
      performance: performanceMetrics.slowQueries,
      behavior: userBehavior.formAbandonments
    })

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('📊 [ANALYTICS] Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function calculateAverageDeliveryTime(emailLogs: any[]): number {
  const deliveryTimes = emailLogs
    .map(log => {
      const match = log.details?.match(/Delivery time: (\d+)ms/)
      return match ? parseInt(match[1]) : null
    })
    .filter(time => time !== null)
  
  return deliveryTimes.length > 0 
    ? Math.round(deliveryTimes.reduce((a, b) => a + b, 0) / deliveryTimes.length)
    : 0
}

function calculateAverageResponseTime(logs: any[]): number {
  const responseTimes = logs
    .map(log => {
      const match = log.details?.match(/Response time: (\d+)ms/)
      return match ? parseInt(match[1]) : null
    })
    .filter(time => time !== null)
  
  return responseTimes.length > 0 
    ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
    : 0
}

function extractTopPages(pageAnalytics: any[]): Array<{ path: string; count: number }> {
  const pathCounts: Record<string, number> = {}
  
  pageAnalytics.forEach(log => {
    const match = log.details?.match(/Path: ([^,]+)/)
    if (match) {
      const path = match[1]
      pathCounts[path] = (pathCounts[path] || 0) + 1
    }
  })
  
  return Object.entries(pathCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }))
}

function extractTopReferrers(pageAnalytics: any[]): Array<{ domain: string; count: number }> {
  const referrerCounts: Record<string, number> = {}
  
  pageAnalytics.forEach(log => {
    const match = log.details?.match(/Referer: ([^,\s]+)/)
    if (match && match[1] !== 'none') {
      try {
        const domain = new URL(match[1]).hostname
        referrerCounts[domain] = (referrerCounts[domain] || 0) + 1
      } catch {
        // Invalid URL, skip
      }
    }
  })
  
  return Object.entries(referrerCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([domain, count]) => ({ domain, count }))
}

