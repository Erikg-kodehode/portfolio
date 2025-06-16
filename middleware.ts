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
  '/admin',
  '/admin/cv-requests',
  '/admin/logs',
  '/admin/settings'
]

// Paths that don't require authentication
const PUBLIC_ADMIN_PATHS = [
  '/admin/login',
  '/admin/reset-password'
  // Note: /admin/reset-password/[token] routes are handled separately below
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check admin routes first
  if (pathname.startsWith('/admin')) {
    // Public admin paths that don't require authentication
    if (PUBLIC_ADMIN_PATHS.some(path => pathname.startsWith(path))) {
      return NextResponse.next()
    }
    
    // Special handling for password reset with token routes
    if (pathname.match(/^\/admin\/reset-password\/[^/]+$/)) {
      return NextResponse.next()
    }

    // API routes also don't require middleware auth (they handle their own)
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.next()
    }

    // For protected admin paths, check authentication
    if (PROTECTED_ADMIN_PATHS.some(path => pathname.startsWith(path))) {
      const sessionToken = request.cookies.get('admin_session')?.value

      if (!sessionToken) {
        console.log('🔐 [MIDDLEWARE] No session token found, redirecting to login');
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      console.log('🔐 [MIDDLEWARE] Session token found, validating...', sessionToken.substring(0, 10) + '...');
      
      try {
        const admin = await validateSessionToken(sessionToken)
        if (!admin) {
          console.log('🔐 [MIDDLEWARE] Session validation failed, redirecting to login');
          // Clear invalid session cookie
          const response = NextResponse.redirect(new URL('/admin/login', request.url))
          response.cookies.delete('admin_session')
          return response
        }
        console.log('🔐 [MIDDLEWARE] Session valid for admin:', admin.username);
      } catch (error) {
        console.error('🔐 [MIDDLEWARE] Session validation error:', error);
        const response = NextResponse.redirect(new URL('/admin/login', request.url))
        response.cookies.delete('admin_session')
        return response
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

