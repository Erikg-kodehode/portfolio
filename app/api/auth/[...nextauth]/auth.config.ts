import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username }
        });

        if (!admin) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          admin.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        // Update last login time
        await prisma.admin.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() }
        });

        return {
          id: admin.id,
          email: admin.email,
          name: admin.username,
          role: admin.role,
          emailVerified: admin.emailVerified || null
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin',
    error: '/admin'
  }
};

import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
