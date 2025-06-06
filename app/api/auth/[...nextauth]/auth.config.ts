import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const dynamic = 'force-dynamic'

// List of admin email addresses
const adminEmails = ['erikgithub@gmail.com'] // Replace with your email

export const authOptions: NextAuthOptions = {
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
    async jwt({ token, user }) {
      if (user?.email && adminEmails.includes(user.email.toLowerCase())) {
        token.role = 'admin'
        token.isAdmin = true
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
}
