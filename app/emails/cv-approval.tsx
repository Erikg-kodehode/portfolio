import * as React from 'react';
import { styles } from './styles';

interface CVApprovalEmailProps {
  name: string;
  cvUrl: string;
  isEnglish: boolean;
}

export default function CVApprovalEmail({ name, cvUrl, isEnglish }: CVApprovalEmailProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{isEnglish ? 'CV Access Approved' : 'CV-tilgang Godkjent'}</h2>
      </div>
      <div style={styles.content}>
        <div style={styles.field}>
          <p style={styles.text}>
            {isEnglish
              ? `Dear ${name},\n\nYour request to access my CV has been approved. You can view my CV using the link below. Please note that this is a view-only link.`
              : `Kjære ${name},\n\nDin forespørsel om tilgang til min CV har blitt godkjent. Du kan se min CV ved å bruke lenken nedenfor. Vær oppmerksom på at dette er en skrivebeskyttet lenke.`}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <a
            href={cvUrl}
            style={styles.button}
          >
            {isEnglish ? 'View CV' : 'Se CV'}
          </a>
        </div>
        <div style={styles.footer}>
          <p style={styles.text}>{isEnglish ? 'Thank you for your interest!' : 'Takk for din interesse!'}</p>
        </div>
      </div>
    </div>
  );
}

