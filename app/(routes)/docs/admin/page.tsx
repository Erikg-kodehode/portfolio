'use client';

import { AdminHeader } from '@/components/admin'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import Link from 'next/link'

export default function AdminGuide() {
  const { admin, loading, error } = useAdminAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-blue-900 dark:text-blue-100">Loading documentation...</div>
    </div>
  )

  if (error || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">Access Denied</div>
          <Link href="/admin/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Return to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <AdminHeader title="Admin Guide" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Admin Guide</h1>
        
        <div className="space-y-8">
          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Dashboard Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The admin dashboard provides a comprehensive view of the CV request system and various administrative tools.
            </p>
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Statistics Cards</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Quick overview of pending, approved, denied, and total requests. These cards update in real-time as you manage requests.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">System Status</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Monitor key metrics like approval rate, last request timestamp, and expired requests count.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Administrative Features</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">User Management</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Admin users can manage other administrators, including setting roles and permissions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Email Notifications</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The system automatically sends emails to users when their CV requests are approved or denied.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">User Interface Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Theme Configuration</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Customize the dashboard appearance with light, dark, or system theme options.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Display Preferences</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Adjust items per page, enable compact view, and configure notification preferences.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Security Best Practices</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Regularly review admin access and permissions</li>
              <li>Never share admin credentials</li>
              <li>Log out when leaving the dashboard unattended</li>
              <li>Monitor system logs for unusual activity</li>
              <li>Keep the admin interface URL confidential</li>
            </ul>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Common Issues</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Session timeout - Re-login required</li>
                  <li>Email notification delays - Check system status</li>
                  <li>Dashboard statistics not updating - Use refresh button</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        </div>
      </main>
    </div>
  );
}

