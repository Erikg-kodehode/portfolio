import * as React from 'react';

interface CVRequestEmailProps {
  name: string;
  email: string;
  company: string;
  purpose: string;
}

export default function CVRequestEmail({ name, email, company, purpose }: CVRequestEmailProps) {
  return (
    <div>
      <h2>New CV Access Request</h2>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>From:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Company:</strong> {company || 'Not specified'}</p>
      </div>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>Purpose of Request:</strong></p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{purpose}</p>
      </div>
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <div style={{ fontSize: '12px', color: '#666' }}>
        <p>This is an automated notification from your portfolio website.</p>
      </div>
    </div>
  );
}

