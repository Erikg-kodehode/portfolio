import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'

// List of admin email addresses
const adminEmails = ['erikgithub@gmail.com'] // Replace with your email

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow sign in for admin emails
      return adminEmails.includes(user.email?.toLowerCase() || '')
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.role = user.role
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
