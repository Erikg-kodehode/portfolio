'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { sendEmail, EmailTemplateParams } from '@/lib/services/emailjs';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: {
      idle: string;
      submitting: string;
    };
    success: string;
    error: string;
  };
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputBaseClasses = "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm transition-colors duration-200";
const inputClasses = `${inputBaseClasses} bg-white/90 dark:bg-slate-800/90 text-content focus:outline-none focus:ring-2 focus:ring-blue-500`;
const labelClasses = "block text-sm font-medium text-content-secondary mb-1";

export default function ContactForm({ labels }: ContactFormProps) {
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
        email: formData.email,
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
        <label htmlFor="name" className={labelClasses}>
          {labels.name}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={inputClasses}
          required
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <label htmlFor="email" className={labelClasses}>
          {labels.email}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={inputClasses}
          required
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <label htmlFor="subject" className={labelClasses}>
          {labels.subject}
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className={inputClasses}
          required
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <label htmlFor="message" className={labelClasses}>
          {labels.message}
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={4}
          className={inputClasses}
          required
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-700 text-slate-50 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
        >
          {status === 'submitting' ? labels.submit.submitting : labels.submit.idle}
        </button>
      </div>

      {status === 'success' && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-100 rounded">
          {labels.success}
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded">
          {labels.error}
        </div>
      )}
    </form>
  );
}

