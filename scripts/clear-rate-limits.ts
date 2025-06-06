import { prisma } from '../lib/prisma'

async function clearRateLimits() {
  try {
    await prisma.rateLimit.deleteMany({})
    console.log('Successfully cleared all rate limits')
  } catch (error) {
    console.error('Failed to clear rate limits:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearRateLimits()

