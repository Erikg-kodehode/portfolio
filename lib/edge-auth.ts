// Cache validation results for 1 minute to prevent excessive API calls
const validationCache = new Map<string, { admin: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

export async function validateSessionToken(token: string) {
  try {
    // Check memory cache first
    const cached = validationCache.get(token);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.admin;
    }

    // If no cache, try localStorage (for just after login)
    if (typeof window !== 'undefined') {
      const storedAdmin = localStorage.getItem('admin_data');
      if (storedAdmin) {
        const admin = JSON.parse(storedAdmin);
        validationCache.set(token, {
          admin,
          timestamp: Date.now()
        });
        return admin;
      }
    }

    // If no cache hit, validate with API
    // In edge runtime, we can use the request URL as base
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
      cache: 'no-store'
    });

    if (!response.ok) return null;

    const data = await response.json();
    
    if (data.valid) {
      // Cache successful validations
      validationCache.set(token, {
        admin: data.admin,
        timestamp: Date.now()
      });
      return data.admin;
    }

    return null;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}

