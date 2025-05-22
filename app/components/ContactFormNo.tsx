'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { sendEmail, EmailTemplateParams } from '../lib/emailjs';

// Define form data interface
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define status types
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const templateParams: EmailTemplateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Erik Gulliksen',
      };

      const result = await sendEmail(templateParams);

      if (result.status === 200) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('success');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Navn
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          E-post
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          required
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Emne
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Melding
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          required
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white dark:text-green-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sender...' : 'Send melding'}
        </button>
      </div>

      {status === 'success' && (
        <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded">
          Melding sendt! Jeg vil svare så snart som mulig.
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
          Beklager, noe gikk galt. Vennligst prøv igjen senere.
        </div>
      )}
    </form>
  );
}

