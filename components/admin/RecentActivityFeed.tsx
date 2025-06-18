'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface Activity {
  id: string
  type: 'cv_request' | 'cv_approval' | 'cv_denial' | 'admin_login' | 'settings_change' | 'password_change'
  message: string
  timestamp: string
  details?: string
  userId?: string
  userEmail?: string
}

interface ActivityFeedProps {
  limit?: number
  className?: string
}

export function RecentActivityFeed({ limit = 10, className = '' }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRecentActivities()
    
    // Set up polling for real-time updates every 30 seconds
    const interval = setInterval(fetchRecentActivities, 30000)
    
    return () => clearInterval(interval)
  }, [limit])

  const fetchRecentActivities = async () => {
    try {
      const response = await fetch(`/api/admin/recent-activities?limit=${limit}`)
      if (response.ok) {
        const data = await response.json()
        setActivities(data.activities || [])
        setError(null)
      } else {
        throw new Error('Failed to fetch activities')
      }
    } catch (err) {
      console.error('Failed to fetch recent activities:', err)
      setError('Failed to load recent activities')
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'cv_request':
        return '📝'
      case 'cv_approval':
        return '✅'
      case 'cv_denial':
        return '❌'
      case 'admin_login':
        return '🔐'
      case 'settings_change':
        return '⚙️'
      case 'password_change':
        return '🔑'
      default:
        return '📋'
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'cv_request':
        return 'text-blue-600 dark:text-blue-400'
      case 'cv_approval':
        return 'text-green-600 dark:text-green-400'
      case 'cv_denial':
        return 'text-red-600 dark:text-red-400'
      case 'admin_login':
        return 'text-purple-600 dark:text-purple-400'
      case 'settings_change':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'password_change':
        return 'text-indigo-600 dark:text-indigo-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className={`bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
        <div className="text-center py-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchRecentActivities}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
        <button
          onClick={fetchRecentActivities}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          title="Refresh activities"
        >
          ↻ Refresh
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                  {activity.message}
                </p>
                {activity.details && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.details}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {format(new Date(activity.timestamp), 'MMM d, HH:mm')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

