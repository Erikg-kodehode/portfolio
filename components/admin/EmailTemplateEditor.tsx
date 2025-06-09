'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

const EMAIL_TYPES = [
  {
    id: 'cv_request',
    name: 'CV Request',
    description: 'Sent when someone requests CV access'
  },
  {
    id: 'cv_approved',
    name: 'CV Approval',
    description: 'Sent when a CV request is approved'
  },
  {
    id: 'cv_denied',
    name: 'CV Denial',
    description: 'Sent when a CV request is denied'
  }
];

export default function EmailTemplateEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState('cv_request');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSave() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/email-templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedTemplate,
          subject,
          content
        })
      });

      if (!response.ok) throw new Error('Failed to save template');
      toast.success('Template saved successfully');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadTemplate(type: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/email-templates?type=${type}`);
      if (!response.ok) throw new Error('Failed to load template');
      const data = await response.json();
      setSubject(data.subject || '');
      setContent(data.content || '');
    } catch (error) {
      console.error('Error loading template:', error);
      toast.error('Failed to load template');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <select
          value={selectedTemplate}
          onChange={(e) => {
            setSelectedTemplate(e.target.value);
            loadTemplate(e.target.value);
          }}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
            bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
            text-gray-900 dark:text-gray-100"
        >
          {EMAIL_TYPES.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white
            ${isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}
            transition-colors`}
        >
          {isLoading ? 'Saving...' : 'Save Template'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject Line
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
              bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
              text-gray-900 dark:text-gray-100"
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
              bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
              text-gray-900 dark:text-gray-100"
            placeholder="Enter email content..."
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Available Variables</h4>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li><code>{'{{name}}'}</code> - Recipient's name</li>
            <li><code>{'{{email}}'}</code> - Recipient's email</li>
            <li><code>{'{{company}}'}</code> - Company name (if provided)</li>
            <li><code>{'{{cvUrl}}'}</code> - CV access URL (for approval emails)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

