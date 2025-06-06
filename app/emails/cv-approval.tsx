import * as React from 'react';

interface CVApprovalEmailProps {
  name: string;
  cvUrl: string;
  isEnglish: boolean;
}

export default function CVApprovalEmail({ name, cvUrl, isEnglish }: CVApprovalEmailProps) {
  return (
    <div>
      <h2>{isEnglish ? 'CV Access Approved' : 'CV-tilgang Godkjent'}</h2>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <p>
          {isEnglish
            ? `Dear ${name},\n\nYour request to access my CV has been approved. You can view my CV using the link below. Please note that this is a view-only link.`
            : `Kjære ${name},\n\nDin forespørsel om tilgang til min CV har blitt godkjent. Du kan se min CV ved å bruke lenken nedenfor. Vær oppmerksom på at dette er en skrivebeskyttet lenke.`}
        </p>
      </div>
      <div style={{ margin: '30px 0' }}>
        <a
          href={cvUrl}
          style={{
            background: '#0066cc',
            color: 'white',
            padding: '12px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          {isEnglish ? 'View CV' : 'Se CV'}
        </a>
      </div>
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <div style={{ fontSize: '12px', color: '#666' }}>
        <p>{isEnglish ? 'Thank you for your interest!' : 'Takk for din interesse!'}</p>
      </div>
    </div>
  );
}

