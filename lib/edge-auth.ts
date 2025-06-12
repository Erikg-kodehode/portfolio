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

    // Skip localStorage check in edge runtime

    // If no cache hit, validate with API
    // Use the public production URL for consistency
    const baseUrl = 'https://erikg-portfolio.vercel.app';
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

