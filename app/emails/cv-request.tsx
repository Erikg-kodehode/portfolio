import * as React from 'react';
import { styles } from './styles';

interface CVRequestEmailProps {
  name: string;
  email: string;
  company: string;
  purpose: string;
}

export default function CVRequestEmail({ name, email, company, purpose }: CVRequestEmailProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>New CV Access Request</h2>
      </div>
      <div style={styles.content}>
        <div style={styles.field}>
          <div style={styles.label}>From</div>
          <p style={styles.text}>{name}</p>
        </div>
        <div style={styles.field}>
          <div style={styles.label}>Email</div>
          <p style={styles.text}>{email}</p>
        </div>
        <div style={styles.field}>
          <div style={styles.label}>Company</div>
          <p style={styles.text}>{company || 'Not specified'}</p>
        </div>
        <div style={styles.field}>
          <div style={styles.label}>Purpose of Request</div>
          <p style={{ ...styles.text, whiteSpace: 'pre-wrap' }}>{purpose}</p>
        </div>
        <div style={styles.footer}>
          <p style={styles.text}>This is an automated notification from your portfolio website.</p>
        </div>
      </div>
    </div>
  );
}

