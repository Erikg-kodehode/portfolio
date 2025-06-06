'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Input, Card, Button } from '@/components/ui';
import { FaUser, FaEnvelope, FaHeading, FaComments, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { sendContactEmail } from '@/app/lib/services/email';
import { useTranslations } from '@/i18n';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationState {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';


export default function ContactForm() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const t = useTranslations();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const statusTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Clear status message after 5 seconds
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusTimeoutRef.current = setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, [status]);

  const [touched, setTouched] = useState<ValidationState>({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [isValid, setIsValid] = useState<ValidationState>({
    name: true,
    email: true,
    subject: true,
    message: true
  });

  const validateField = (name: keyof FormData, value: string): boolean => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'name':
      case 'subject':
        return value.length >= 2;
      case 'message':
        return value.length >= 10;
      default:
        return true;
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setIsValid(prev => ({
      ...prev,
      [field]: validateField(field, formData[field])
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      // Reset all form states
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({ name: false, email: false, subject: false, message: false });
      setIsValid({ name: true, email: true, subject: true, message: true });
      setStatus('success');
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };
  const getValidationMessage = (field: keyof FormData): string => {
    if (!touched[field] || isValid[field]) return '';
    
    switch (field) {
      case 'email':
        return isEnglish ? 'Please enter a valid email address' : 'Vennligst skriv inn en gyldig e-postadresse';
      case 'name':
        return isEnglish ? 'Name must be at least 2 characters' : 'Navnet må være minst 2 tegn';
      case 'subject':
        return isEnglish ? 'Subject must be at least 2 characters' : 'Emnet må være minst 2 tegn';
      case 'message':
        return isEnglish ? 'Message must be at least 10 characters' : 'Meldingen må være minst 10 tegn';
      default:
        return '';
    }
  };

  return (
    <Card 
      variant="elevated" 
      padding="lg" 
      className="backdrop-blur-sm bg-gradient-to-br from-slate-100/5 to-blue-50/5 dark:from-slate-900/95 dark:to-slate-800/90 shadow-xl dark:shadow-2xl dark:shadow-blue-500/5"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          name="name"
          label={t.contact.form.name}
          value={formData.name}
          icon={<FaUser />}
          error={touched.name && !isValid.name ? getValidationMessage('name') : undefined}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, name: value }));
            if (touched.name) {
              setIsValid(prev => ({
                ...prev,
                name: validateField('name', value)
              }));
            }
          }}
          onBlur={() => handleBlur('name')}
          required
          disabled={status === 'submitting'}
        />

        <Input
          type="email"
          name="email"
          label={t.contact.form.email}
          value={formData.email}
          icon={<FaEnvelope />}
          error={touched.email && !isValid.email ? getValidationMessage('email') : undefined}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, email: value }));
            if (touched.email) {
              setIsValid(prev => ({
                ...prev,
                email: validateField('email', value)
              }));
            }
          }}
          onBlur={() => handleBlur('email')}
          required
          disabled={status === 'submitting'}
        />

        <Input
          type="text"
          name="subject"
          label={t.contact.form.subject}
          value={formData.subject}
          icon={<FaHeading />}
          error={touched.subject && !isValid.subject ? getValidationMessage('subject') : undefined}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, subject: value }));
            if (touched.subject) {
              setIsValid(prev => ({
                ...prev,
                subject: validateField('subject', value)
              }));
            }
          }}
          onBlur={() => handleBlur('subject')}
          required
          disabled={status === 'submitting'}
        />

        <Input
          type="textarea"
          name="message"
          label={t.contact.form.message}
          value={formData.message}
          icon={<FaComments />}
          error={touched.message && !isValid.message ? getValidationMessage('message') : undefined}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, message: value }));
            if (touched.message) {
              setIsValid(prev => ({
                ...prev,
                message: validateField('message', value)
              }));
            }
          }}
          onBlur={() => handleBlur('message')}
          rows={6}
          required
          disabled={status === 'submitting'}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          className="w-full"
        >
          <span className="flex items-center justify-center">
            {status === 'submitting' ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaPaperPlane className="mr-2" />
            )}
            {status === 'submitting' ? t.contact.form.submit.submitting : t.contact.form.submit.idle}
          </span>
        </Button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-100 rounded-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t.contact.form.success}
            </motion.div>
          )}
          
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {t.contact.form.error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Card>
  );
}
