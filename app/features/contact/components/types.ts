export interface ContactFormLabels {
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
}

export interface ContactFormProps {
  labels: ContactFormLabels;
}

export interface ValidationState {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

