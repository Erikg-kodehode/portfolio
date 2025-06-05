import { prisma } from './prisma'
import type { CVRequest, RateLimit } from '../generated/prisma'

// Function to create a new CV request
export async function createCVRequest(data: {
  name: string
  email: string
  company?: string
  purpose: string
  ipAddress: string
  userAgent: string
}) {
  return prisma.cVRequest.create({
    data: {
      ...data,
      status: 'PENDING'
    }
  })
}

// Function to check if user has exceeded rate limit
export async function checkRateLimit(key: string): Promise<boolean> {
  const LIMIT = 3 // Maximum requests per hour
  const now = new Date()
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  // Get or create rate limit record
  const rateLimit = await prisma.rateLimit.upsert({
    where: { key },
    create: {
      key,
      count: 1,
      resetAt: now
    },
    update: {
      count: {
        increment: 1
      },
      resetAt: {
        set: now
      }
    }
  })

  // Reset count if last request was more than an hour ago
  if (rateLimit.resetAt < hourAgo) {
    await prisma.rateLimit.update({
      where: { key },
      data: {
        count: 1,
        resetAt: now
      }
    })
    return false
  }

  return rateLimit.count > LIMIT
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
  accessToken?: string
) {
  return prisma.cVRequest.update({
    where: { requestId },
    data: {
      status,
      reviewedAt: new Date(),
      ...(status === 'APPROVED' && accessToken
        ? {
            accessToken,
            accessExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
          }
        : {})
    }
  })
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

