import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({ name, email, subject, message }: ContactEmailProps) {
  return (
    <div>
      <h2>New Contact Form Message</h2>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>From:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
      </div>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>Message:</strong></p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
      </div>
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <div style={{ fontSize: '12px', color: '#666' }}>
        <p>This is an automated message from your portfolio website contact form.</p>
      </div>
    </div>
  );
}

