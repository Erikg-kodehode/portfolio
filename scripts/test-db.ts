import { prisma } from '../lib/prisma'

async function testConnection() {
  try {
    // Test the connection
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Try to count CV requests
    const count = await prisma.cVRequest.count()
    console.log(`✅ Found ${count} CV requests in database`)

    // Create a test request
    const testRequest = await prisma.cVRequest.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        purpose: 'Testing database connection',
        ipAddress: '127.0.0.1',
        userAgent: 'Test Script'
      }
    })
    console.log('✅ Successfully created test request:', testRequest.requestId)

    // Clean up test data
    await prisma.cVRequest.delete({
      where: { id: testRequest.id }
    })
    console.log('✅ Successfully cleaned up test data')

  } catch (error) {
    console.error('❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

