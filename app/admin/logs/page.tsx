'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

type LogType = 'all' | 'error' | 'warning' | 'info' | 'security' | 'performance';
type TimeRange = '1h' | '24h' | '7d' | '30d' | 'all';

interface SystemLog {
  id: string;
  level: string;
  message: string;
  details?: string;
  source: string;
  createdAt: string;
  resolvedAt?: string;
  type?: string;
  metadata?: Record<string, any>;
}

type AdminData = {
  id: string;
  username: string;
  role: string;
};

export default function SystemLogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminData | null>(null);
  
  // Filters
  const [selectedType, setSelectedType] = useState<LogType>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAdmin = localStorage.getItem('admin_data');
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin));
          fetchLogs();
        } catch (err) {
          console.error('Failed to parse admin data:', err);
          router.push('/admin');
        }
      } else {
        router.push('/admin');
      }
    }
  }, []);

  const fetchLogs = async () => {
    try {
      const params = new URLSearchParams({
        type: selectedType,
        timeRange,
        search: searchQuery,
        showResolved: showResolved.toString()
      });

      const response = await fetch(`/api/admin/logs?${params}`);
      if (!response.ok) throw new Error('Failed to fetch logs');
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const handleLogAction = async (logId: string, action: 'resolve' | 'unresolve') => {
    try {
      const response = await fetch(`/api/admin/logs/${logId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (!response.ok) throw new Error('Failed to update log');
      await fetchLogs();
    } catch (err) {
      console.error('Failed to update log:', err);
      alert('Failed to update log status');
    }
  };

  const handleClearLogs = async () => {
    if (!confirm('Are you sure you want to clear all resolved logs? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/logs', {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to clear logs');
      await fetchLogs();
      alert('Resolved logs cleared successfully');
    } catch (err) {
      console.error('Failed to clear logs:', err);
      alert('Failed to clear logs');
    }
  };

  const getLevelStyle = (level: string) => {
    const styles = {
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      security: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      performance: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    };
    return styles[level as keyof typeof styles] || styles.info;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-blue-900 dark:text-blue-100">Loading logs...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <div className="text-red-600 dark:text-red-400">Error: {error}</div>
    </div>
  );

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      {/* Navigation */}
      <nav className="bg-white/50 dark:bg-gray-800/50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <span className="text-xl font-semibold text-blue-900 dark:text-blue-100">System Logs</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">{admin.username}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as LogType)}
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="all">All Types</option>
                <option value="error">Errors</option>
                <option value="warning">Warnings</option>
                <option value="info">Info</option>
                <option value="security">Security</option>
                <option value="performance">Performance</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showResolved}
                  onChange={(e) => setShowResolved(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Show Resolved</span>
              </label>
              <button
                onClick={fetchLogs}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700
                  dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Logs Display */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              System Logs {logs.length > 0 && `(${logs.length})`}
            </h2>
            {logs.some(log => log.resolvedAt) && (
              <button
                onClick={handleClearLogs}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                Clear Resolved Logs
              </button>
            )}
          </div>

          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No logs found matching the current filters.
              </p>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`py-4 ${log.resolvedAt ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelStyle(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {log.source}
                        </span>
                        {log.type && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {log.type}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm:ss')}
                        </span>
                        {log.resolvedAt ? (
                          <button
                            onClick={() => handleLogAction(log.id, 'unresolve')}
                            className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                          >
                            Resolved ✓
                          </button>
                        ) : (
                          <button
                            onClick={() => handleLogAction(log.id, 'resolve')}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            Mark as Resolved
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{log.message}</p>
                    {log.details && (
                      <pre className="mt-2 text-xs bg-gray-50 dark:bg-gray-900/50 p-2 rounded overflow-x-auto">
                        {log.details}
                      </pre>
                    )}
                    {log.metadata && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {Object.entries(log.metadata).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="text-gray-500 dark:text-gray-400">{key}: </span>
                            <span className="text-gray-700 dark:text-gray-300">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

