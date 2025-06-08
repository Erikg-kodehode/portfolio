import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function validateResetToken(token: string): Promise<boolean> {
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiresAt: {
          gt: new Date()
        }
      }
    });

    return !!admin;
  } catch (error) {
    console.error('Error validating reset token:', error);
    return false;
  }
}

// Session duration in seconds (30 days)
const SESSION_DURATION = 30 * 24 * 60 * 60

// Generate a random session token
function generateSessionToken() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('base64');
}

// Create a new session for an admin
async function createSession(adminId: string) {
  const token = generateSessionToken()
  const expires = new Date(Date.now() + SESSION_DURATION * 1000)

  await prisma.adminSession.create({
    data: {
      adminId,
      token,
      expires,
    },
  })

  return { token, expires }
}

// Validate admin credentials and create session
export async function loginAdmin(username: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) return null

    const passwordValid = await bcrypt.compare(password, admin.passwordHash)
    if (!passwordValid) return null

    // Create session
    const session = await createSession(admin.id)

    // Update last login time
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    })

    return { admin, session }
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

// Validate session token
export async function validateSession(token: string) {
  try {
    const session = await prisma.adminSession.findUnique({
      where: { token },
      include: { admin: true },
    })

    if (!session) return null
    if (session.expires < new Date()) {
      await prisma.adminSession.delete({ where: { id: session.id } })
      return null
    }

    return session.admin
  } catch (error) {
    console.error('Session validation error:', error)
    return null
  }
}

// End session (logout)
export async function logout(token: string) {
  try {
    await prisma.adminSession.delete({
      where: { token },
    })
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Get current admin from session cookie
export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) return null

    return validateSession(sessionToken)
  } catch (error) {
    console.error('Get current admin error:', error)
    return null
  }
}

