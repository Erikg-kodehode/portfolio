import { DefaultSession, DefaultUser } from 'next-auth'
import { User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: string
      isAdmin?: boolean
    } & DefaultSession['user']
  }

  interface User extends DefaultUser, PrismaUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: string
    isAdmin?: boolean
  }
}
