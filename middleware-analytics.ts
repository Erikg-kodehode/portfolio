import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Analytics data structure
interface PageVisitData {
  path: string;
  userAgent: string;
  ipAddress: string;
  referer?: string;
  language: string;
  isBot: boolean;
}

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i, /crawl/i, /spider/i, /search/i, /facebook/i, /twitter/i,
  /linkedin/i, /whatsapp/i, /telegram/i, /googlebot/i, /bingbot/i
];

function detectBot(userAgent: string): boolean {
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

function detectLanguage(pathname: string): 'en' | 'no' {
  // Check if the path starts with /en/ or is exactly /en
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }
  // Check if the path starts with /no/ or is exactly /no  
  if (pathname === '/no' || pathname.startsWith('/no/')) {
    return 'no';
  }
  // Default to 'no' for root and other paths (since default locale is 'no')
  return 'no';
}

async function logPageVisit(data: PageVisitData) {
  try {
    // Use fetch to call our logging API instead of direct Prisma access
    // This works in Edge runtime unlike Prisma
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    await fetch(`${baseUrl}/api/log-page-visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        level: 'info',
        message: 'Page visit tracked',
        details: `Path: ${data.path}, Language: ${data.language}, Bot: ${data.isBot}, IP: ${data.ipAddress}, UA: ${data.userAgent.substring(0, 100)}, Referer: ${data.referer || 'none'}`,
        source: 'page-analytics'
      })
    });
  } catch (error) {
    console.error('Failed to log page visit:', error);
  }
}

export async function trackPageVisit(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const ipAddress = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  const referer = request.headers.get('referer');

  // Skip tracking for certain paths
  const skipPaths = [
    '/api/', '/_next/', '/favicon.ico', '/robots.txt', '/sitemap.xml',
    '/assets/', '/public/', '.png', '.jpg', '.ico', '.svg', '.css', '.js'
  ];

  if (skipPaths.some(path => pathname.includes(path))) {
    return;
  }

  const visitData: PageVisitData = {
    path: pathname,
    userAgent,
    ipAddress,
    referer: referer || undefined,
    language: detectLanguage(pathname),
    isBot: detectBot(userAgent)
  };

  // Log the visit asynchronously (don't wait for it)
  logPageVisit(visitData).catch(console.error);
}

