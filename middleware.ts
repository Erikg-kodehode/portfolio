import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateSessionToken } from './lib/edge-auth'

const locales = ['en', 'no']
const defaultLocale = 'no'

// Paths that should skip locale check
const LOCALE_EXEMPT_PATHS = [
  '/admin',  // All admin routes should skip locale
  '/_next',
  '/api',
  '/static',
  '/assets',
  '/favicon.ico'
]

// Admin paths that require authentication
const PROTECTED_ADMIN_PATHS = [
  '/admin/cv-requests'
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check admin routes first
  if (pathname.startsWith('/admin')) {
    // Skip validation for login page and API routes
    if (pathname === '/admin/login' || pathname.startsWith('/admin/api/')) {
      return NextResponse.next()
    }

    // Only validate for protected admin paths
    if (PROTECTED_ADMIN_PATHS.some(path => pathname.startsWith(path))) {
      const sessionToken = request.cookies.get('admin_session')?.value

      if (!sessionToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      const admin = await validateSessionToken(sessionToken)
      if (!admin) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }

    return NextResponse.next()
  }

  // Skip locale check for exempt paths
  if (LOCALE_EXEMPT_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Special case for root path
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    )
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // Add the default locale if no locale is present
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }

  // If pathname already has a locale, continue without redirection
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|favicon.ico).*)',
    '/admin/:path*',
  ],
}

