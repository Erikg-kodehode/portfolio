import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production'
)

export interface AdminPayload {
  id: string
  username: string
  role: string
  iat: number
  exp: number
}

// Edge-compatible JWT verification (no bcryptjs dependency)
export async function verifyJWTEdge(token: string): Promise<AdminPayload | null> {
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

