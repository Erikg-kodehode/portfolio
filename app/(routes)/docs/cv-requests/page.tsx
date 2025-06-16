'use client';

import { AdminHeader } from '@/components/admin'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import Link from 'next/link'

export default function CVRequestGuide() {
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
      <AdminHeader title="CV Request Guide" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">CV Request Guide</h1>
        
        <div className="space-y-8">
          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The CV request system allows users to request access to your CV. This guide explains the workflow and how to manage these requests.
            </p>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Request Workflow</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">1. Submission</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Users submit a request through the CV request form, providing their details and reason for access.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">2. Review</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Admins review the request in the dashboard, checking the provided information and reason.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">3. Decision</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Requests can be approved or denied. Upon decision, the user receives an email notification.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Request States</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Pending</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Awaiting admin review</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Approved</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Access granted to CV</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Denied</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Access denied</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Expired</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Request has timed out</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Best Practices</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Review requests promptly to maintain good user experience</li>
              <li>Check the provided email and reason carefully</li>
              <li>Use the dashboard statistics to monitor request patterns</li>
              <li>Keep track of approved requests for future reference</li>
            </ul>
          </section>
        </div>
        </div>
      </main>
    </div>
  );
}

