import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production'
)

const JWT_EXPIRY = '7d' // 7 days

export interface AdminPayload {
  id: string
  username: string
  role: string
  iat: number
  exp: number
}

// Create JWT token
export async function createJWT(admin: { id: string; username: string; role: string }) {
  const token = await new SignJWT({
    id: admin.id,
    username: admin.username,
    role: admin.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET)

  return token
}

// Verify JWT token
export async function verifyJWT(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    // Validate that payload has required fields
    if (
      typeof payload.id === 'string' &&
      typeof payload.username === 'string' &&
      typeof payload.role === 'string' &&
      typeof payload.iat === 'number' &&
      typeof payload.exp === 'number'
    ) {
      return payload as unknown as AdminPayload
    }
    
    console.error('JWT payload validation failed: missing required fields')
    return null
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Login with JWT
export async function loginAdminJWT(username: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) {
      console.log('Admin not found:', { username })
      return null
    }

    const passwordValid = await bcrypt.compare(password, admin.passwordHash)
    if (!passwordValid) {
      console.log('Invalid password for:', { username })
      return null
    }

    // Update last login time
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    })

    // Create JWT token
    const token = await createJWT({
      id: admin.id,
      username: admin.username,
      role: admin.role
    })

    return {
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      },
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

// Validate JWT from request
export async function validateJWTFromRequest(request: Request): Promise<AdminPayload | null> {
  // Try to get token from Authorization header first
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    return await verifyJWT(token)
  }

  // Fallback to cookie
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    const token = cookies['admin_token']
    if (token) {
      return await verifyJWT(token)
    }
  }

  return null
}

