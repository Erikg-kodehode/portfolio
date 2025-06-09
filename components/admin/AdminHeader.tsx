import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type AdminData = {
  id: string;
  username: string;
  role: string;
};

type AdminHeaderProps = {
  title: string;
  showBackButton?: boolean;
  showUserStatus?: boolean;
};

export default function AdminHeader({ 
  title, 
  showBackButton = true,
  showUserStatus = true 
}: AdminHeaderProps) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Get admin data from localStorage
      const storedAdmin = localStorage.getItem('admin_data');
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin));
        } catch (err) {
          console.error('Failed to parse admin data:', err);
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    }
  }, [router]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      localStorage.removeItem('admin_data');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <nav className="bg-white/50 dark:bg-gray-800/50 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={() => router.push('/admin')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to Dashboard
              </button>
            )}
            <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">{title}</span>
          </div>
          {showUserStatus && admin && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} 
                  title={isOnline ? 'Online' : 'Offline'}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">{admin.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

