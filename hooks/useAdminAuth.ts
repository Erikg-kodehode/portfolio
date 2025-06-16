'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AdminData = {
  id: string
  username: string
  role: string
}

export function useAdminAuth() {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔐 [useAdminAuth] Hook initialized, checking authentication...');
    
    const initializeAuth = async () => {
      try {
        // Check if we're on the client side
        if (typeof window === 'undefined') {
          console.log('🔐 [useAdminAuth] Server-side render detected, skipping auth check');
          return;
        }
        
        console.log('🔐 [useAdminAuth] Client-side detected, checking localStorage...');
        
        // First check if admin data exists in localStorage
        const storedAdmin = localStorage.getItem('admin_data');
        console.log('🔐 [useAdminAuth] Stored admin data found:', !!storedAdmin);
        
        if (storedAdmin) {
          try {
            const adminData = JSON.parse(storedAdmin);
            console.log('🔐 [useAdminAuth] Parsed admin data:', adminData);
            
            // Validate that the admin data has required fields
            if (adminData && adminData.id && adminData.username) {
              setAdmin(adminData);
              setLoading(false); // Set loading false immediately when admin data is found
              console.log('🔐 [useAdminAuth] Admin state set successfully from localStorage');
              return; // Exit early if localStorage data is valid
            } else {
              console.warn('🔐 [useAdminAuth] Invalid admin data structure, clearing localStorage...');
              localStorage.removeItem('admin_data');
            }
          } catch (err) {
            console.error('🔐 [useAdminAuth] Failed to parse admin data:', err);
            localStorage.removeItem('admin_data');
          }
        }
        
        console.log('🔐 [useAdminAuth] No valid localStorage data, checking JWT token...');
        // No localStorage data, check if there's a valid JWT token
        await validateJWTToken();
        
      } catch (error) {
        console.error('🔐 [useAdminAuth] Error during auth initialization:', error);
        setLoading(false);
        router.push('/admin/login?error=auth_failed');
      }
    };
    
    // Use setTimeout to ensure component is fully mounted
    const timeoutId = setTimeout(initializeAuth, 100);
    
    return () => clearTimeout(timeoutId);
  }, [])

  async function validateJWTToken() {
    console.log('🔍 [useAdminAuth] Validating JWT token...');
    
    try {
      const response = await fetch('/api/admin/validate', {
        method: 'POST',
        credentials: 'include'
      })
      
      console.log('🔍 [useAdminAuth] JWT validation response status:', response.status);
      
      if (response.ok) {
        const data = await response.json()
        console.log('🔍 [useAdminAuth] JWT validation data:', data);
        
        if (data.valid && data.admin) {
          console.log('🔍 [useAdminAuth] JWT valid, setting admin data');
          setAdmin(data.admin)
          localStorage.setItem('admin_data', JSON.stringify(data.admin))
          setLoading(false)
          return
        } else {
          console.warn('🔍 [useAdminAuth] JWT invalid or no admin data');
        }
      } else {
        console.warn('🔍 [useAdminAuth] JWT validation request failed');
      }
    } catch (err) {
      console.error('🔍 [useAdminAuth] JWT validation exception:', err)
    }
    
    // If JWT validation fails, redirect to login
    console.log('🔍 [useAdminAuth] JWT validation failed, redirecting to login...');
    setLoading(false)
    router.push('/admin/login')
  }

  return { admin, loading, error }
}

