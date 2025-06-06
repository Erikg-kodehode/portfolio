import * as React from 'react';
import { styles } from './styles';

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({ name, email, subject, message }: ContactEmailProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>New Contact Form Message</h2>
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
          <div style={styles.label}>Subject</div>
          <p style={styles.text}>{subject}</p>
        </div>
        <div style={styles.field}>
          <div style={styles.label}>Message</div>
          <p style={{ ...styles.text, whiteSpace: 'pre-wrap' }}>{message}</p>
        </div>
        <div style={styles.footer}>
          <p style={styles.text}>This is an automated message from your portfolio website contact form.</p>
        </div>
      </div>
    </div>
  );
}

