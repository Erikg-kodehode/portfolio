'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
   const [loading, setLoading] = useState(false)

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login')
      }

      // Store admin data in localStorage for initial state
      if (data.admin) {
        localStorage.setItem('admin_data', JSON.stringify(data.admin))
      }

      // Redirect to admin panel on success
      router.push('/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900 dark:text-blue-100">
            Admin Access
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
            <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-blue-900 dark:text-blue-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white/50 dark:bg-gray-800/50"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-blue-900 dark:text-blue-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white/50 dark:bg-gray-800/50"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''} dark:focus:ring-offset-gray-900`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

