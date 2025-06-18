'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { RecentActivityFeed } from '@/components/admin'

type AdminStats = {
  pendingRequests: number
  totalRequests: number
  approvedRequests: number
  deniedRequests: number
  expiredRequests: number
  lastRequestDate?: string
}

export default function AdminPage() {
  const router = useRouter()
  const { admin, loading, error } = useAdminAuth()
  const [stats, setStats] = useState<AdminStats | null>(null)

  // Load stats when admin is available
  useEffect(() => {
    if (admin) {
      console.log('🏠 [DASHBOARD] Admin loaded, fetching stats...');
      fetchStats();
    }
  }, [admin])

  async function fetchStats() {
    try {
      const response = await fetch('/api/cv-request/list')
      if (!response.ok) throw new Error('Failed to fetch requests')
      const requests = await response.json()
      
      // Sort requests by date first
      const sortedRequests = [...requests].sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Calculate stats
      const stats = {
        pendingRequests: requests.filter((r: any) => r.status === 'PENDING').length,
        totalRequests: requests.length,
        approvedRequests: requests.filter((r: any) => r.status === 'APPROVED').length,
        deniedRequests: requests.filter((r: any) => r.status === 'DENIED').length,
        expiredRequests: requests.filter((r: any) => r.status === 'EXPIRED').length,
        lastRequestDate: sortedRequests.length > 0 ? sortedRequests[0].createdAt : undefined
      }
      
      setStats(stats)
    } catch (err) {
      console.error('Stats fetch error:', err)
      // Don't set error for stats - the dashboard should still work without stats
      setStats({
        pendingRequests: 0,
        totalRequests: 0,
        approvedRequests: 0,
        deniedRequests: 0,
        expiredRequests: 0
      })
    }
    // Note: Don't call setLoading(false) here - it's handled in the main flow
  }

  async function handleAdminAction(action: 'clearRequests' | 'resetRateLimits' | 'resetAll') {
    const actionText = action.replace(/([A-Z])/g, ' $1').toLowerCase()
    const confirmed = window.confirm(`Are you sure you want to ${actionText}? This action cannot be undone.`)

    if (!confirmed) return

    try {
      const response = await fetch('/api/cv-request/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (!response.ok) {
        throw new Error('Failed to perform action')
      }

      const result = await response.json()
      alert(result.message)
      
      // Refresh the stats
      fetchStats()
    } catch (err) {
      console.error('Failed to perform action:', err)
      alert('Failed to perform action')
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      localStorage.removeItem('admin_data')
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-center">
        <div className="text-blue-900 dark:text-blue-100 text-lg mb-2">Loading Admin Dashboard...</div>
        <div className="text-blue-600 dark:text-blue-400 text-sm">Verifying authentication...</div>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-red-600 dark:text-red-400">Error: {error}</div>
    </div>
  )

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90 transition-colors duration-500">
      <nav className="bg-white/50 dark:bg-gray-800/50 shadow-sm backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-100">Admin Dashboard</span>
              <button
                onClick={fetchStats}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                title="Refresh stats"
              >
                ↻ Refresh
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{admin.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && (
            <>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg shadow-md p-6 backdrop-blur-sm border border-blue-100 dark:border-blue-900">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Pending</h3>
                  <span className="text-blue-600 dark:text-blue-400">⏳</span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-blue-600 dark:text-blue-400">{stats.pendingRequests}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Awaiting review</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 rounded-lg shadow-md p-6 backdrop-blur-sm border border-green-100 dark:border-green-900">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Approved</h3>
                  <span className="text-green-600 dark:text-green-400">✓</span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-green-600 dark:text-green-400">{stats.approvedRequests}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Access granted</p>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 dark:from-red-500/20 dark:to-red-600/20 rounded-lg shadow-md p-6 backdrop-blur-sm border border-red-100 dark:border-red-900">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Denied</h3>
                  <span className="text-red-600 dark:text-red-400">✕</span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-red-600 dark:text-red-400">{stats.deniedRequests}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Access denied</p>
              </div>

              <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 dark:from-gray-500/20 dark:to-gray-600/20 rounded-lg shadow-md p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total</h3>
                  <span className="text-gray-600 dark:text-gray-400">Σ</span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-600 dark:text-gray-400">{stats.totalRequests}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">All time requests</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link 
                  href="/admin/cv-requests"
                  className="group flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg
                    hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300
                    border border-blue-200 dark:border-blue-800 relative"
                >
                  {stats?.pendingRequests && stats.pendingRequests > 0 && (
                    <span className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                      {stats.pendingRequests}
                    </span>
                  )}
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-2xl group-hover:scale-110 transition-transform">📝</div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Review Requests</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stats?.pendingRequests 
                        ? `${stats.pendingRequests} pending review${stats.pendingRequests > 1 ? 's' : ''}` 
                        : 'No pending reviews'}
                    </p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
                
                <Link 
                  href="/admin/analytics"
                  className="group flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg
                    hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300
                    border border-purple-200 dark:border-purple-800"
                >
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-2xl group-hover:scale-110 transition-transform">📊</div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View detailed insights & metrics
                    </p>
                  </div>
                  <span className="text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
                
                <Link 
                  href="/admin/email-templates"
                  className="group flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg
                    hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300
                    border border-emerald-200 dark:border-emerald-800"
                >
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-2xl group-hover:scale-110 transition-transform">📧</div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email Templates</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage email templates
                    </p>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">System Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Approval Rate</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {stats ? Math.round((stats.approvedRequests / (stats.totalRequests || 1)) * 100) : 0}%
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${stats ? (stats.approvedRequests / (stats.totalRequests || 1)) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Request</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {stats?.lastRequestDate ? new Date(stats.lastRequestDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expired Requests</span>
                  <span className="text-gray-900 dark:text-gray-100">{stats?.expiredRequests || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity Feed */}
          <RecentActivityFeed className="lg:col-span-1" limit={8} />
          
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Documentation</h2>
            </div>
            <div className="space-y-4">
              <Link 
                href="/docs/cv-requests"
                className="block p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg
                  hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all duration-300
                  border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">CV Request Guide</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn about the CV request workflow</p>
              </Link>

              <Link 
                href="/docs/admin"
                className="block p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg
                  hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all duration-300
                  border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Admin Guide</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Administrative documentation</p>
              </Link>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Admin Tools</h2>
            <div className="space-y-4">
              <Link 
                href="/admin/settings"
                className="block p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700
                  hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">System Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Configure system settings</p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400">→</span>
                </div>
              </Link>

              <Link 
                href="/admin/logs"
                className="block p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700
                  hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">System Logs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View system activity logs</p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400">→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

