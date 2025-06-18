import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

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
  return pathname.startsWith('/en') ? 'en' : 'no';
}

async function logPageVisit(data: PageVisitData) {
  try {
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'Page visit tracked',
        details: `Path: ${data.path}, Language: ${data.language}, Bot: ${data.isBot}, IP: ${data.ipAddress}, UA: ${data.userAgent.substring(0, 100)}, Referer: ${data.referer || 'none'}`,
        source: 'page-analytics'
      }
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

