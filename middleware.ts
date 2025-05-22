import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const locales = ['en', 'no']
const defaultLocale = 'no'
 
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /en/about)
  const pathname = request.nextUrl.pathname
  
  // Special case for root path - allow direct access without redirection
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    )
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Only redirect if not at a locale root
  if (!pathnameHasLocale) {
    // Extract the first segment of the path (might be a page name)
    const segments = pathname.split('/').filter(Boolean)
    const firstSegment = segments[0]
    
    // If it's a direct page access without locale, add the default locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, assets)
    "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
  ],
}
