import { prisma } from './prisma'
import type { CVRequest, RateLimit } from '@prisma/client'

// Utility function to fetch CV request data in a single query
async function fetchCVRequestData() {
  return prisma.$transaction([
    prisma.adminSession.findFirst({
      where: { expires: { gt: new Date() } },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.cVRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    })
  ]);
}

type CVRequestData = {
  name: string;
  email: string;
  company?: string;
  purpose: string;
  ipAddress: string;
  userAgent: string;
  isEnglish: boolean;
};

// Function to create a new CV request
export async function createCVRequest(data: CVRequestData) {
  // Send email notification using CV template
  try {
    const { sendCVRequestEmail } = await import('@/app/lib/services/email');
    await sendCVRequestEmail({
      isEnglish: data.isEnglish,
      name: data.name,
      email: data.email,
      company: data.company || '',
      purpose: data.purpose
    });
  } catch (error) {
    console.error('Failed to send CV request notification:', error);
    // Don't throw - we still want to create the request even if email fails
  }

  return prisma.cVRequest.create({
    data: {
      ...data,
      status: 'PENDING'
    }
  })
}

// Function to check if user has exceeded rate limit
export async function checkRateLimit(key: string): Promise<boolean> {
  const LIMIT = 10 // Maximum requests per hour
  const now = new Date()
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  // Get existing rate limit record
  const existingRateLimit = await prisma.rateLimit.findUnique({
    where: { key }
  })

  // If no existing record or last request was more than an hour ago,
  // create/reset the rate limit
  if (!existingRateLimit || existingRateLimit.resetAt < hourAgo) {
    await prisma.rateLimit.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        resetAt: now
      },
      update: {
        count: 1,
        resetAt: now
      }
    })
    return false
  }

  // If within the hour window and already at limit, reject
  if (existingRateLimit.count >= LIMIT) {
    // Log rate limit trigger
    try {
      await prisma.systemLog.create({
        data: {
          level: 'warning',
          message: 'Rate limit triggered',
          details: `Key: ${key}, Count: ${existingRateLimit.count}, Limit: ${LIMIT}, Reset at: ${existingRateLimit.resetAt.toISOString()}`,
          source: 'rate-limit'
        }
      });
    } catch (logError) {
      console.error('Failed to log rate limit trigger:', logError);
    }
    return true
  }

  // Otherwise increment the count but keep the original resetAt time
  await prisma.rateLimit.update({
    where: { key },
    data: {
      count: {
        increment: 1
      }
    }
  })

  return false
}

// Function to get CV request by ID
export async function getCVRequest(requestId: string) {
  return prisma.cVRequest.findUnique({
    where: { requestId }
  })
}

// Function to update CV request status
export async function updateCVRequestStatus(
  requestId: string,
  status: 'APPROVED' | 'DENIED' | 'EXPIRED',
  isEnglish: boolean
) {
  // Log the action
  await prisma.systemLog.create({
    data: {
      level: 'info',
      message: `CV request ${status.toLowerCase()}`,
      details: `Request ID: ${requestId}, Language: ${isEnglish ? 'English' : 'Norwegian'}`,
      source: 'cv-request'
    }
  });

  const updatedRequest = await prisma.cVRequest.update({
    where: { requestId },
    data: {
      status,
      reviewedAt: new Date()
    }
  })

  // If request is approved, send the CV access email
  if (status === 'APPROVED') {
    try {
      const { sendCVApprovalEmail } = await import('@/app/lib/services/email');
      
      // Use language-specific CV URLs
      const cvUrl = isEnglish
        ? process.env.CV_URL_EN
        : process.env.CV_URL_NO;

      console.log('🔍 [CV-APPROVAL] Checking CV URL:', { cvUrl, isEnglish });

      if (!cvUrl) {
        throw new Error(`CV URL not found in environment variables. CV_URL_EN: ${process.env.CV_URL_EN}, CV_URL_NO: ${process.env.CV_URL_NO}`);
      }

      if (cvUrl.includes('[your-cv-url')) {
        throw new Error(`CV URL contains placeholder value. CV_URL_EN: "${process.env.CV_URL_EN}", CV_URL_NO: "${process.env.CV_URL_NO}". Please update environment variables with actual CV URLs.`);
      }

      console.log('📧 [CV-APPROVAL] Sending approval email to:', updatedRequest.email);
      await sendCVApprovalEmail({
        name: updatedRequest.name,
        email: updatedRequest.email,
        cvUrl,
        isEnglish
      });
      console.log('✅ [CV-APPROVAL] Email sent successfully');
    } catch (error) {
      console.error('❌ [CV-APPROVAL] Failed to send CV approval email:', error);
      // Log the error to database
      await prisma.systemLog.create({
        data: {
          level: 'error',
          message: 'Failed to send CV approval email',
          details: error instanceof Error ? error.message : 'Unknown error',
          source: 'cv-approval-email'
        }
      });
      // Don't throw the error - we don't want to rollback the status update
      // just because the email failed to send
    }
  }

  return updatedRequest
}

// Function to validate and increment access count
export async function validateAccess(accessToken: string): Promise<CVRequest | null> {
  const request = await prisma.cVRequest.findUnique({
    where: { accessToken }
  })

  if (!request) return null
  if (request.status !== 'APPROVED') return null
  if (request.accessExpiresAt && request.accessExpiresAt < new Date()) return null

  // Increment access count
  return prisma.cVRequest.update({
    where: { id: request.id },
    data: {
      accessCount: { increment: 1 }
    }
  })
}

