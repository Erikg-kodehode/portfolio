// Basic request types
export interface CVAccessRequest {
  requestId?: string;  // Will be generated on the backend
  email: string;
  name: string;
  company?: string;
  purpose: string;
  timestamp?: Date;    // Will be set on the backend
  status?: RequestStatus;
}

// Request status enum
export type RequestStatus = 'pending' | 'approved' | 'denied' | 'expired';

// Form state management
export interface CVRequestFormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  error?: string;
  data?: CVAccessRequest;
}

// API response types
export interface CVRequestResponse {
  success: boolean;
  requestId?: string;
  message: string;
  error?: string;
}

