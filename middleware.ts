import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'no']
const defaultLocale = 'no'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Special case for root path
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    )
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
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
    // Skip all internal paths (_next, assets, favicon)
    "/((?!_next/static|_next/image|assets|favicon.ico).*)",
  ],
}
