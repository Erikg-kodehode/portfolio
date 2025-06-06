'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import SystemLogs from '@/components/admin/SystemLogs'
import { toast, Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

type CVRequest = {
  requestId: string
  name: string
  email: string
  company?: string
  purpose: string
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'EXPIRED'
  createdAt: string
  accessCount: number
}

type AdminData = {
  id: string
  username: string
  role: string
}

export default function AdminPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<CVRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [admin, setAdmin] = useState<AdminData | null>(null)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Get admin data from localStorage
      const storedAdmin = localStorage.getItem('admin_data')
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin))
          fetchRequests()
        } catch (err) {
          console.error('Failed to parse admin data:', err)
          // If admin data is invalid, redirect to login
          router.push('/admin/login')
        }
      } else {
        // No admin data found, redirect to login
        router.push('/admin/login')
      }
    }
  }, [])

  async function fetchRequests() {
    try {
      const response = await fetch('/api/cv-request/list')
      if (!response.ok) throw new Error('Failed to fetch requests')
      const data = await response.json()
      setRequests(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(requestId: string, status: 'APPROVED' | 'DENIED') {
    try {
      const response = await fetch(`/api/cv-request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to update request: ${error}`)
      }
      
      // Show success message with toast
      toast.success(`Request ${status.toLowerCase()} successfully`, {
        duration: 3000,
        position: 'bottom-right',
      })
      
      // Refresh the requests list
      fetchRequests()
    } catch (err) {
      console.error('Failed to update request:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to update request', {
        duration: 4000,
        position: 'bottom-right',
      })
    }
  }

  async function handleResetRateLimit(email: string) {
    const confirmed = await new Promise((resolve) => {
      // Create a custom toast for confirmation
      toast(
        (t) => (
          <div className="flex flex-col gap-2 p-2">
            <p>Are you sure you want to reset rate limit for {email}?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  resolve(false)
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  resolve(true)
                }}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: 'top-center',
        }
      )
    })

    if (!confirmed) return

    try {
      const response = await fetch('/api/cv-request/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resetRateLimits', email })
      })

      if (!response.ok) {
        throw new Error('Failed to reset rate limit')
      }

      const result = await response.json()
      toast.success(result.message, {
        duration: 3000,
        position: 'bottom-right',
      })
      
      // Refresh the requests list
      fetchRequests()
    } catch (err) {
      console.error('Failed to reset rate limit:', err)
      toast.error('Failed to reset rate limit', {
        duration: 4000,
        position: 'bottom-right',
      })
    }
  }

  async function handleAdminAction(action: 'clearRequests' | 'resetRateLimits' | 'resetAll') {
    const actionText = action.replace(/([A-Z])/g, ' $1').toLowerCase()
    const confirmed = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-2 p-2">
            <p>Are you sure you want to {actionText}?</p>
            <p className="text-sm text-red-500">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  resolve(false)
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  resolve(true)
                }}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: 'top-center',
        }
      )
    })

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
      toast.success(result.message, {
        duration: 3000,
        position: 'bottom-right',
      })
      
      // Refresh the requests list
      fetchRequests()
    } catch (err) {
      console.error('Failed to perform action:', err)
      toast.error('Failed to perform action', {
        duration: 4000,
        position: 'bottom-right',
      })
    }
  }

  async function handleBulkApprove() {
    const confirmed = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-2 p-2">
            <p>Are you sure you want to approve all pending requests?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  resolve(false)
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  resolve(true)
                }}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve All
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: 'top-center',
        }
      )
    })

    if (!confirmed) return;

    try {
      const response = await fetch('/api/cv-request/approve-all', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to approve requests');
      }

      const result = await response.json();
      toast.success(
        `${result.succeeded} requests approved successfully${result.failed > 0 ? `, ${result.failed} failed` : ''}`,
        {
          duration: 3000,
          position: 'bottom-right',
        }
      )
      
      // Refresh the requests list
      fetchRequests();
    } catch (err) {
      console.error('Failed to approve requests:', err);
      toast.error('Failed to approve requests', {
        duration: 4000,
        position: 'bottom-right',
      });
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
      <div className="text-blue-900 dark:text-blue-100">Loading...</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-red-600 dark:text-red-400">Error: {error}</div>
    </div>
  )

  if (!admin) return null // Wait for admin data before rendering

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90 transition-colors duration-500">
      <Toaster />
      <nav className="bg-white/50 dark:bg-gray-800/50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">CV Request Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">{admin.username}</span>
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">CV Requests</h1>
          <button
            onClick={() => fetchRequests()}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            title="Refresh list"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Actions Bar */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleBulkApprove()}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <span>✓</span>
              <span>Approve All Pending</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Requests Table */}
          <div className="lg:col-span-2 overflow-x-auto bg-white/50 dark:bg-gray-800/50 shadow-md rounded-lg backdrop-blur-sm">
            <table className="min-w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((request) => (
                  <tr key={request.requestId} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(request.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        {
                          PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100',
                          APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100',
                          DENIED: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100',
                          EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }[request.status]
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        {request.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleAction(request.requestId, 'APPROVED')}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(request.requestId, 'DENIED')}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            >
                              Deny
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* System Logs Panel */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm">
            <SystemLogs />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 mt-8">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleAdminAction('resetRateLimits')}
              className="px-4 py-2 border-2 border-yellow-500 text-yellow-700 dark:text-yellow-400 rounded hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
            >
              Reset All Rate Limits
            </button>
            <button
              onClick={() => handleAdminAction('clearRequests')}
              className="px-4 py-2 border-2 border-red-500 text-red-700 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear All Requests
            </button>
            <button
              onClick={() => handleAdminAction('resetAll')}
              className="px-4 py-2 border-2 border-red-600 text-red-700 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Reset Everything
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

