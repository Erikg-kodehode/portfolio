import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface SystemLog {
  id: string;
  level: string;
  message: string;
  details?: string;
  source: string;
  createdAt: string;
  resolvedAt?: string;
}

export default function SystemLogs() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      const response = await fetch('/api/admin/logs');
      if (!response.ok) throw new Error('Failed to fetch logs');
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="p-4">
      <div className="text-blue-900 dark:text-blue-100 text-sm">Loading logs...</div>
    </div>
  );

  if (error) return (
    <div className="p-4">
      <div className="text-red-600 dark:text-red-400 text-sm">Error loading logs</div>
    </div>
  );

  const recentLogs = logs.slice(0, 10); // Only show 10 most recent logs

  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 px-6 pt-6">
        Recent System Logs
      </h3>
      <div className="px-6 pb-6">
        <div className="space-y-3">
          {recentLogs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
              No recent logs found.
            </p>
          ) : (
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        {
                          error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
                          warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
                          info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }[log.level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(log.createdAt), 'MMM d HH:mm')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-medium">{log.source}:</span> {log.message}
                  </p>
                  {log.resolvedAt && (
                    <span className="text-xs text-green-600 dark:text-green-400">✓ Resolved</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <a 
            href="/admin/logs" 
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            View all logs →
          </a>
        </div>
      </div>
    </div>
  );
}

