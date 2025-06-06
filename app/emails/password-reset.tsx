import * as React from 'react';
import { styles } from './styles';

interface PasswordResetEmailProps {
  username: string;
  resetLink: string;
}

export default function PasswordResetEmail({ username, resetLink }: PasswordResetEmailProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Password Reset Request</h2>
      </div>
      <div style={styles.content}>
        <div style={styles.field}>
          <p style={styles.text}>
            Hello {username},
          </p>
          <p style={{...styles.text, marginTop: '16px'}}>
            We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
          </p>
          <p style={{...styles.text, marginTop: '16px'}}>
            To reset your password, click the button below:
          </p>
          <div style={{textAlign: 'center', margin: '24px 0'}}>
            <a
              href={resetLink}
              style={styles.button}
            >
              Reset Password
            </a>
          </div>
          <p style={{...styles.text, marginTop: '16px'}}>
            This link will expire in 1 hour for security reasons.
          </p>
        </div>
        <div style={styles.footer}>
          <p style={styles.text}>If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
          <p style={{...styles.text, marginTop: '8px', wordBreak: 'break-all'}}>{resetLink}</p>
        </div>
      </div>
    </div>
  );
}

