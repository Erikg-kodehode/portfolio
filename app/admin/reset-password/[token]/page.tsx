'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResetPasswordForm } from '@/components/admin/ResetPasswordForm';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function validateToken() {
      try {
        const response = await fetch('/api/admin/validate-reset-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        const data = await response.json();
        
        if (response.ok && data.valid) {
          setIsValid(true);
        } else {
          router.push('/admin/login?error=invalid_token');
        }
      } catch (error) {
        console.error('Token validation error:', error);
        router.push('/admin/login?error=validation_failed');
      } finally {
        setIsValidating(false);
      }
    }
    
    if (token) {
      validateToken();
    }
  }, [token, router]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
        <div className="text-blue-900 dark:text-blue-100">Validating reset link...</div>
      </div>
    );
  }

  if (!isValid) {
    return null; // Will redirect
  }

  return <ResetPasswordForm token={token} />;
}
