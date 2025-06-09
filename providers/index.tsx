'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { AdminProvider } from '@/contexts/AdminContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <AdminProvider>
          {children}
        </AdminProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

