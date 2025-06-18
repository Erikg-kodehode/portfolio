"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Input, Button } from '@/components/ui';
import { FaUser, FaEnvelope, FaBuilding, FaClipboardList, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CVAccessRequest, CVRequestFormState } from "../types";

interface CVRequestFormProps {
  isEnglish: boolean;
}

export default function CVRequestForm({ isEnglish }: CVRequestFormProps) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    purpose: ''
  });

  const [formState, setFormState] = useState<CVRequestFormState>({
    status: 'idle',
    error: undefined,
    data: undefined
  });

  // Handle form abandonment tracking
  const handleFormAbandonment = useCallback(() => {
    if (formData.name || formData.email || formData.company || formData.purpose) {
      navigator.sendBeacon('/api/log-abandonment', JSON.stringify({
        name: formData.name,
        email: formData.email,
        time: new Date().toISOString(),
        page: window.location.pathname
      }));
    }
  }, [formData]);

  // Set up form abandonment tracking (must be before any early returns)
  useEffect(() => {
    if (formState.status === 'idle') {
      window.addEventListener('beforeunload', handleFormAbandonment);
    }
    return () => {
      window.removeEventListener('beforeunload', handleFormAbandonment);
    };
  }, [formState.status, handleFormAbandonment]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ ...formState, status: 'submitting' });

    const formData = new FormData(e.currentTarget);
    const requestData: CVAccessRequest = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      purpose: formData.get('purpose') as string
    };

    try {
      const response = await fetch('/api/cv-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...requestData, isEnglish })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setFormState({
        status: 'success',
        data: requestData
      });
    } catch (error) {
      setFormState({
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  // Early return AFTER all hooks
  if (formState.status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 
        rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
          {isEnglish ? "Request Submitted Successfully!" : "Forespørsel Sendt Vellykket!"}
        </h3>
        <p className="text-green-700 dark:text-green-400">
          {isEnglish 
            ? "Thank you for your interest. I'll review your request and get back to you soon." 
            : "Takk for din interesse. Jeg vil gjennomgå forespørselen din og svare deg snart."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        name="name"
        label={isEnglish ? "Name" : "Navn"}
        value={formData.name}
        icon={<FaUser />}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        required
        disabled={formState.status === 'submitting'}
      />

      <Input
        type="email"
        name="email"
        label={isEnglish ? "Email" : "E-post"}
        value={formData.email}
        icon={<FaEnvelope />}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        required
        disabled={formState.status === 'submitting'}
      />

      <Input
        type="text"
        name="company"
        label={isEnglish ? "Company" : "Bedrift"}
        value={formData.company || ''}
        icon={<FaBuilding />}
        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
        disabled={formState.status === 'submitting'}
      />

      <Input
        type="textarea"
        name="purpose"
        label={isEnglish ? "Purpose of Request" : "Formål med Forespørselen"}
        value={formData.purpose}
        icon={<FaClipboardList />}
        onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
        rows={4}
        required
        disabled={formState.status === 'submitting'}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={formState.status === 'submitting'}
        className="w-full"
      >
        <span className="flex items-center justify-center">
          {formState.status === 'submitting' ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaPaperPlane className="mr-2" />
          )}
          {formState.status === 'submitting'
            ? (isEnglish ? "Submitting..." : "Sender...")
            : (isEnglish ? "Request CV Access" : "Be om CV-tilgang")}
        </span>
      </Button>

      <AnimatePresence>
        {formState.status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {isEnglish 
              ? "Failed to submit request. Please try again."
              : "Kunne ikke sende forespørsel. Vennligst prøv igjen."}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

