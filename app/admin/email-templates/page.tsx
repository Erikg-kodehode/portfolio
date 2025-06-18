'use client'

import { useEffect, useState } from 'react'
import { AdminHeader } from '@/components/admin'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { toast } from 'react-hot-toast'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  type: 'contact-response' | 'cv-request-notification' | 'cv-approval' | 'newsletter' | 'reminder'
  language: 'en' | 'no'
  isActive: boolean
  lastUsed?: string
  usageCount: number
}

export default function EmailTemplatesPage() {
  const { admin, loading: authLoading } = useAdminAuth()
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [previewData, setPreviewData] = useState<any>(null)

  useEffect(() => {
    if (admin) {
      fetchTemplates()
    }
  }, [admin])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/email-templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveTemplate = async (template: EmailTemplate) => {
    try {
      const response = await fetch('/api/admin/email-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template)
      })

      if (response.ok) {
        toast.success('Template saved successfully')
        fetchTemplates()
        setEditingTemplate(null)
      } else {
        toast.error('Failed to save template')
      }
    } catch (error) {
      toast.error('Failed to save template')
    }
  }

  const sendTestEmail = async (template: EmailTemplate) => {
    try {
      const response = await fetch('/api/admin/test-email-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template.id })
      })

      if (response.ok) {
        toast.success('Test email sent successfully')
      } else {
        toast.error('Failed to send test email')
      }
    } catch (error) {
      toast.error('Failed to send test email')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-blue-900 dark:text-blue-100">Loading templates...</div>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90">
      <AdminHeader title="Email Templates" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Template List */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">📧 Email Templates</h2>
            <button
              onClick={() => setEditingTemplate({
                id: '',
                name: '',
                subject: '',
                content: '',
                type: 'contact-response',
                language: 'en',
                isActive: true,
                usageCount: 0
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + New Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <div key={template.id} className="border rounded-lg p-4 bg-white dark:bg-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{template.name}</h3>
                  <div className="flex gap-1">
                    <span className={`px-2 py-1 text-xs rounded ${
                      template.language === 'en' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {template.language.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {template.subject}
                </p>
                
                <div className="text-xs text-gray-500 mb-3">
                  Type: {template.type} • Used: {template.usageCount} times
                  {template.lastUsed && (
                    <div>Last used: {new Date(template.lastUsed).toLocaleDateString()}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTemplate(template)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => sendTestEmail(template)}
                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded"
                  >
                    Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Editor Modal */}
        {editingTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
              <h3 className="text-lg font-semibold mb-4">
                {editingTemplate.id ? 'Edit Template' : 'New Template'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Name</label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={editingTemplate.type}
                    onChange={(e) => setEditingTemplate({...editingTemplate, type: e.target.value as any})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="contact-response">Contact Response</option>
                    <option value="cv-request-notification">CV Request Notification</option>
                    <option value="cv-approval">CV Approval</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    value={editingTemplate.language}
                    onChange={(e) => setEditingTemplate({...editingTemplate, language: e.target.value as any})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="no">Norwegian</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingTemplate.isActive}
                      onChange={(e) => setEditingTemplate({...editingTemplate, isActive: e.target.checked})}
                      className="mr-2"
                    />
                    Active
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                  rows={10}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingTemplate(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveTemplate(editingTemplate)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

