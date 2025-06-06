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

  if (loading) return <div className="text-center py-4">Loading logs...</div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md backdrop-blur-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">System Logs</h2>
      <div className="space-y-4">
        {logs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No system logs found.
          </p>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map((log) => (
              <div key={log.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        {
                          error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
                          warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
                          info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }[log.level]
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {log.source}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm:ss')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{log.message}</p>
                {log.details && (
                  <pre className="mt-2 text-xs bg-gray-50 dark:bg-gray-900/50 p-2 rounded overflow-x-auto">
                    {log.details}
                  </pre>
                )}
                {log.resolvedAt && (
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      ✓ Resolved at {format(new Date(log.resolvedAt), 'MMM d, yyyy HH:mm:ss')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

