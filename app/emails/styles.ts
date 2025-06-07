export const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#333',
  },
  header: {
    background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
    color: 'white',
    padding: '32px',
    borderRadius: '8px 8px 0 0',
    textAlign: 'center' as const,
  },
  title: {
    margin: '0',
    fontSize: '24px',
    fontWeight: '600',
  },
  content: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  field: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    border: '1px solid #eef0f2',
    marginBottom: '16px',
  },
  label: {
    fontWeight: '600',
    marginBottom: '8px',
    display: 'block',
  },
  text: {
    margin: '0',
    lineHeight: '1.5',
  },
  footer: {
    marginTop: '24px',
    padding: '16px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
  button: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '6px',
    display: 'inline-block',
    fontWeight: '500',
    textAlign: 'center' as const,
    margin: '16px 0',
  },
};

