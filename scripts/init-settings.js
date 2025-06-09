const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultTemplates = {
  en_cv_request: {
    subject: 'New CV Access Request',
    content: `
Dear Admin,

A new CV access request has been submitted:

Name: {{name}}
Email: {{email}}
Company: {{company}}
Purpose: {{purpose}}

Please review this request in the admin dashboard.
    `.trim()
  },
  en_cv_approval: {
    subject: 'Your CV Access Request has been Approved',
    content: `
Dear {{name}},

Your request to access my CV has been approved. You can view the CV using the link below:

{{cvUrl}}

Please note that this link is personal and should not be shared.

Best regards,
Erik
    `.trim()
  },
  en_cv_denial: {
    subject: 'Update on Your CV Access Request',
    content: `
Dear {{name}},

Thank you for your interest in viewing my CV. After reviewing your request, I regret to inform you that I cannot grant access at this time.

Best regards,
Erik
    `.trim()
  },
  en_contact: {
    subject: 'New Contact Form Message',
    content: `
Name: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}
    `.trim()
  },
  no_cv_request: {
    subject: 'Ny CV-tilgangsforespørsel',
    content: `
Hei Admin,

En ny CV-tilgangsforespørsel er mottatt:

Navn: {{name}}
E-post: {{email}}
Selskap: {{company}}
Formål: {{purpose}}

Vennligst gjennomgå denne forespørselen i admin-panelet.
    `.trim()
  },
  no_cv_approval: {
    subject: 'Din CV-tilgangsforespørsel er godkjent',
    content: `
Hei {{name}},

Din forespørsel om tilgang til min CV er godkjent. Du kan se CV-en ved å bruke lenken nedenfor:

{{cvUrl}}

Vær oppmerksom på at denne lenken er personlig og ikke bør deles.

Med vennlig hilsen,
Erik
    `.trim()
  },
  no_cv_denial: {
    subject: 'Oppdatering på din CV-tilgangsforespørsel',
    content: `
Hei {{name}},

Takk for din interesse i å se min CV. Etter å ha gjennomgått forespørselen din, må jeg dessverre informere om at jeg ikke kan gi tilgang på dette tidspunktet.

Med vennlig hilsen,
Erik
    `.trim()
  },
  no_contact: {
    subject: 'Ny melding fra kontaktskjema',
    content: `
Navn: {{name}}
E-post: {{email}}
Emne: {{subject}}

Melding:
{{message}}
    `.trim()
  }
};

async function init() {
  try {
    await prisma.systemSettings.create({
      data: {
        id: 1,
        emailTemplates: defaultTemplates
      }
    });
    console.log('SystemSettings initialized successfully');
  } catch (error) {
    console.error('Error initializing settings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

init();

