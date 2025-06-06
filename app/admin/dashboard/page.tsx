'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type AdminData = {
  id: string
  username: string
  role: string
}

type AdminStats = {
  pendingRequests: number
  totalRequests: number
  approvedRequests: number
  deniedRequests: number
  expiredRequests: number
  lastRequestDate?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminData | null>(null)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Get admin data from localStorage
      const storedAdmin = localStorage.getItem('admin_data')
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin))
          fetchStats()
        } catch (err) {
          console.error('Failed to parse admin data:', err)
          router.push('/admin')
        }
      } else {
        router.push('/admin')
      }
    }
  }, [])

  async function fetchStats() {
    try {
      const response = await fetch('/api/cv-request/list')
      if (!response.ok) throw new Error('Failed to fetch requests')
      const requests = await response.json()
      
      // Calculate stats
      const stats = {
        pendingRequests: requests.filter((r: any) => r.status === 'PENDING').length,
        totalRequests: requests.length,
        approvedRequests: requests.filter((r: any) => r.status === 'APPROVED').length,
        deniedRequests: requests.filter((r: any) => r.status === 'DENIED').length,
        expiredRequests: requests.filter((r: any) => r.status === 'EXPIRED').length,
        lastRequestDate: requests.length > 0 ? requests.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt : undefined
      }
      
      setStats(stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      localStorage.removeItem('admin_data')
      router.push('/admin')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-blue-900 dark:text-blue-100">Loading...</div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href="/admin/cv-requests"
                  className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg
                    hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300
                    border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-2xl">📝</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Review Requests</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stats?.pendingRequests} pending reviews</p>
                  </div>
                </Link>

                {admin.role === 'ADMIN' && (
                  <Link 
                    href="/admin/users"
                    className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg
                      hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300
                      border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-2xl">👥</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Manage Users</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Admin user control</p>
                    </div>
                  </Link>
                )}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Documentation</h2>
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
                className="block p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg
                  hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all duration-300
                  border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure system settings</p>
              </Link>

              <Link 
                href="/admin/logs"
                className="block p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg
                  hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all duration-300
                  border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">System Logs</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View system activity logs</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

