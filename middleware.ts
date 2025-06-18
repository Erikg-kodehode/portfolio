import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWTEdge } from '@/lib/edge-jwt'
import { trackPageVisit } from './middleware-analytics'

const locales = ['en', 'no']
const defaultLocale = 'no'

// Paths that should skip locale check
const LOCALE_EXEMPT_PATHS = [
  '/admin',  // All admin routes should skip locale
  '/docs',   // Documentation pages should skip locale
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
  
  // Track page visits for analytics (async, doesn't block request)
  trackPageVisit(request).catch(console.error)

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
      const jwtToken = request.cookies.get('admin_token')?.value
      
      console.log('🔐 [MIDDLEWARE] Checking path:', pathname);
      console.log('🔐 [MIDDLEWARE] JWT token present:', !!jwtToken);

      if (!jwtToken) {
        console.log('🔐 [MIDDLEWARE] No JWT token found, redirecting to login');
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      console.log('🔐 [MIDDLEWARE] JWT token found, validating...', jwtToken.substring(0, 20) + '...');
      
      try {
        const admin = await verifyJWTEdge(jwtToken)
        if (!admin) {
          console.log('🔐 [MIDDLEWARE] JWT validation failed, redirecting to login');
          console.log('🔐 [MIDDLEWARE] Clearing invalid JWT cookie');
          
          const response = NextResponse.redirect(new URL('/admin/login?error=token_invalid', request.url))
          response.cookies.set('admin_token', '', {
            expires: new Date(0),
            path: '/'
          })
          return response
        }
        console.log('🔐 [MIDDLEWARE] JWT valid for admin:', admin.username);
        console.log('🔐 [MIDDLEWARE] Proceeding to', pathname);
      } catch (error) {
        console.error('🔐 [MIDDLEWARE] JWT validation error:', error);
        console.log('🔐 [MIDDLEWARE] Clearing token due to validation error');
        
        const response = NextResponse.redirect(new URL('/admin/login?error=validation_error', request.url))
        response.cookies.set('admin_token', '', {
          expires: new Date(0),
          path: '/'
        })
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

