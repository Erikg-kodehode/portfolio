'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import SystemLogs from '@/components/admin/SystemLogs'
import { toast, Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminHeader } from '@/components/admin'

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

  // Function to reliably detect the language of a request
  function detectRequestLanguage(request: CVRequest): 'en' | 'no' {
    // Check the purpose field first as it's most reliable
    if (request.purpose) {
      const purposeLower = request.purpose.toLowerCase();
      if (purposeLower.includes('purpose') || purposeLower.includes('why do you need')) return 'en';
      if (purposeLower.includes('formål') || purposeLower.includes('hvorfor trenger')) return 'no';
    }

    // Check company field if available
    if (request.company) {
      const companyLower = request.company.toLowerCase();
      if (companyLower.includes('company') || companyLower.includes('organization')) return 'en';
      if (companyLower.includes('firma') || companyLower.includes('organisasjon')) return 'no';
    }

    // Fallback to checking for Norwegian characters in all text fields
    const allText = `${request.name} ${request.purpose || ''} ${request.company || ''}`;
    return allText.match(/[æøåÆØÅ]/) ? 'no' : 'en';
  }

  async function handleLanguageToggle(requestId: string) {
    const request = requests.find(r => r.requestId === requestId);
    if (!request) return;

    // Detect current language and toggle it
    const currentLanguage = detectRequestLanguage(request);
    const isCurrentlyEnglish = currentLanguage === 'en';
    
    try {
      const response = await fetch(`/api/cv-request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          toggleLanguage: true,
          isEnglish: !isCurrentlyEnglish
        })
      });

      if (!response.ok) throw new Error('Failed to toggle language');
      
      toast.success('Language updated successfully');
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Failed to toggle language:', error);
      toast.error('Failed to update language');
    }
  }

  async function handleAction(requestId: string, status: 'APPROVED' | 'DENIED') {
    try {
      const request = requests.find(r => r.requestId === requestId);
      if (!request) throw new Error('Request not found');

      const response = await fetch(`/api/cv-request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status,
          isEnglish: detectRequestLanguage(request) === 'en'
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update request: ${error}`);
      }
      
      // Show success message with toast
      toast.success(`Request ${status.toLowerCase()} successfully`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#1F2937',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(209, 213, 219, 0.3)',
          zIndex: 9999
        },
        className: 'dark:!bg-gray-800/90 dark:!text-gray-100 dark:!border-gray-700/30'
      });
      
      // Refresh the requests list
      await fetchRequests();
    } catch (err) {
      console.error('Failed to update request:', err);
      toast.error(
        err instanceof Error ? err.message : 'Failed to update request',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
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
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#1F2937',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(209, 213, 219, 0.3)',
            zIndex: 9999,
          },
          className: 'dark:!bg-gray-800/90 dark:!text-gray-100 dark:!border-gray-700/30',
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
      <Toaster
          toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#1F2937',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(209, 213, 219, 0.3)',
            marginTop: '5rem', // Add margin to account for navbar height
          },
          position: 'top-right',
          className: '!z-[9999] relative dark:!bg-gray-800/90 dark:!text-gray-100 dark:!border-gray-700/30',
        }}
      />
      <AdminHeader title="CV Requests" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => handleBulkApprove()}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2"
                title="Approve all pending CV requests"
              >
                <span>✓</span>
                <span>Approve All Pending</span>
              </button>
            </div>
            <button
              onClick={() => fetchRequests()}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
              title="Refresh list"
            >
              <span className="text-lg">↻</span> Refresh
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          {/* Requests Table */}
          <div className="xl:col-span-9 bg-white/50 dark:bg-gray-800/50 shadow-md rounded-lg backdrop-blur-sm overflow-hidden">
            <div 
              className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-20rem)] relative"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
              }}
            >
              <table className="w-full min-w-[800px] border-separate border-spacing-0">
                <thead className="bg-gray-50/50 dark:bg-gray-900/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Language</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((request) => (
                  <tr key={request.requestId} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 w-[120px] sticky left-0 bg-white/50 dark:bg-gray-800/50">
                      <div>{format(new Date(request.createdAt), 'MMM d, yyyy')}</div>
                      <div className="text-xs opacity-75">{format(new Date(request.createdAt), 'HH:mm:ss')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[150px]">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 min-w-[200px]">
                      <div className="truncate max-w-[250px]">{request.email}</div>
                      {request.company && (
                        <div className="text-xs opacity-75 truncate max-w-[250px]">{request.company}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[100px]">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          detectRequestLanguage(request) === 'en'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {detectRequestLanguage(request) === 'en' ? 'EN' : 'NO'}
                        </span>
                        {request.status === 'PENDING' && (
                          <button
                            onClick={() => handleLanguageToggle(request.requestId)}
                            className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded transition-colors"
                            title="Toggle language"
                          >
                            Switch to {detectRequestLanguage(request) === 'en' ? 'NO' : 'EN'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[100px]">
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
                      <div className="flex gap-3 justify-start">
                        {request.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleAction(request.requestId, 'APPROVED')}
                              className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(request.requestId, 'DENIED')}
                              className="px-3 py-1 text-sm bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
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
          </div>

          {/* System Logs Panel */}
          <div className="xl:col-span-3 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm max-h-[calc(100vh-20rem)] overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
            }}
          >
            <SystemLogs />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50/50 dark:bg-red-900/10 rounded-lg shadow-md backdrop-blur-sm p-6 mt-8 border border-red-200 dark:border-red-900/20">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
          <div className="flex flex-wrap gap-4">
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

