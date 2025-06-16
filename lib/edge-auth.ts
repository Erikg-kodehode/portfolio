// Cache validation results for 1 minute to prevent excessive API calls
const validationCache = new Map<string, { admin: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

export async function validateSessionToken(token: string) {
  try {
    console.log('🔍 [EDGE-AUTH] Validating token:', token.substring(0, 10) + '...');
    
    // Check memory cache first
    const cached = validationCache.get(token);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      console.log('🔍 [EDGE-AUTH] Using cached validation for admin:', cached.admin.username);
      return cached.admin;
    }

    // Skip localStorage check in edge runtime

    // If no cache hit, validate with API
    // Use the public production URL for consistency
    const baseUrl = 'https://erikg-portfolio.vercel.app';
    console.log('🔍 [EDGE-AUTH] Making validation API call to:', `${baseUrl}/api/admin/validate`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${baseUrl}/api/admin/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log('🔍 [EDGE-AUTH] API response status:', response.status);

    if (!response.ok) {
      console.log('🔍 [EDGE-AUTH] API response not ok, status:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('🔍 [EDGE-AUTH] API response data:', data);
    
    if (data.valid && data.admin) {
      console.log('🔍 [EDGE-AUTH] Validation successful for admin:', data.admin.username);
      // Cache successful validations
      validationCache.set(token, {
        admin: data.admin,
        timestamp: Date.now()
      });
      return data.admin;
    }

    console.log('🔍 [EDGE-AUTH] Validation failed - invalid session');
    return null;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('🔍 [EDGE-AUTH] Session validation timeout');
    } else {
      console.error('🔍 [EDGE-AUTH] Session validation error:', error);
    }
    return null;
  }
}

