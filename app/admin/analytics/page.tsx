'use client'

import { useEffect, useState } from 'react'
import { AdminHeader } from '@/components/admin'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { format } from 'date-fns'

interface AnalyticsData {
  pageViews: {
    total: number
    english: number
    norwegian: number
    bots: number
    humans: number
  }
  emailMetrics: {
    totalSent: number
    successRate: number
    averageDeliveryTime: number
    contactEmails: number
    cvRequestEmails: number
    cvApprovalEmails: number
  }
  performanceMetrics: {
    slowQueries: number
    averageResponseTime: number
    rateLimitTriggers: number
  }
  userBehavior: {
    formAbandonments: number
    conversionRate: number
    topPages: Array<{ path: string; count: number }>
    topReferrers: Array<{ domain: string; count: number }>
  }
}

export default function AnalyticsPage() {
  const { admin, loading: authLoading } = useAdminAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d') // 24h, 7d, 30d

  useEffect(() => {
    if (admin) {
      fetchAnalytics()
    }
  }, [admin, timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-blue-900 dark:text-blue-100">Loading analytics...</div>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <AdminHeader title="Analytics Dashboard" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-6 flex justify-end">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Page Views Card */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                📊 Page Views
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Views:</span>
                  <span className="font-semibold">{analytics.pageViews.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>🇬🇧 English:</span>
                  <span>{analytics.pageViews.english}</span>
                </div>
                <div className="flex justify-between">
                  <span>🇳🇴 Norwegian:</span>
                  <span>{analytics.pageViews.norwegian}</span>
                </div>
                <div className="flex justify-between">
                  <span>🤖 Bots:</span>
                  <span>{analytics.pageViews.bots}</span>
                </div>
                <div className="flex justify-between">
                  <span>👥 Humans:</span>
                  <span>{analytics.pageViews.humans}</span>
                </div>
              </div>
            </div>

            {/* Email Metrics Card */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                📧 Email Metrics
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Sent:</span>
                  <span className="font-semibold">{analytics.emailMetrics.totalSent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className={`font-semibold ${analytics.emailMetrics.successRate > 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {analytics.emailMetrics.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Delivery:</span>
                  <span>{analytics.emailMetrics.averageDeliveryTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Emails:</span>
                  <span>{analytics.emailMetrics.contactEmails}</span>
                </div>
                <div className="flex justify-between">
                  <span>CV Requests:</span>
                  <span>{analytics.emailMetrics.cvRequestEmails}</span>
                </div>
                <div className="flex justify-between">
                  <span>CV Approvals:</span>
                  <span>{analytics.emailMetrics.cvApprovalEmails}</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics Card */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                ⚡ Performance
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Slow Queries:</span>
                  <span className={`font-semibold ${analytics.performanceMetrics.slowQueries > 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {analytics.performanceMetrics.slowQueries}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response:</span>
                  <span>{analytics.performanceMetrics.averageResponseTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate Limits:</span>
                  <span className={`font-semibold ${analytics.performanceMetrics.rateLimitTriggers > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {analytics.performanceMetrics.rateLimitTriggers}
                  </span>
                </div>
              </div>
            </div>

            {/* User Behavior Card */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                👤 User Behavior
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Form Abandonments:</span>
                  <span className="font-semibold">{analytics.userBehavior.formAbandonments}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-semibold text-green-600">
                    {analytics.userBehavior.conversionRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Top Pages Card */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                🔥 Top Pages
              </h3>
              <div className="space-y-2">
                {analytics.userBehavior.topPages.map((page, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="truncate">{page.path}</span>
                    <span className="font-semibold">{page.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Referrers Card */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                🌐 Top Referrers
              </h3>
              <div className="space-y-2">
                {analytics.userBehavior.topReferrers.map((referrer, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="truncate">{referrer.domain}</span>
                    <span className="font-semibold">{referrer.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

