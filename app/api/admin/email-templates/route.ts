import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Language-specific templates
const defaultTemplates = {
  // English templates
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

  // Norwegian templates
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
  },

  // Legacy templates (for backward compatibility)
  cv_request: {
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
  cv_approval: {
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
  cv_denial: {
    subject: 'Update on Your CV Access Request',
    content: `
Dear {{name}},

Thank you for your interest in viewing my CV. After reviewing your request, I regret to inform you that I cannot grant access at this time.

Best regards,
Erik
    `.trim()
  },
  contact: {
    subject: 'New Contact Form Message',
    content: `
Name: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}
    `.trim()
  }
};

// Get email template
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Template type is required' },
        { status: 400 }
      );
    }

    // Get templates from database or use defaults
    const settings = await prisma.systemSettings.findFirst();
    const templates = settings?.emailTemplates as Record<string, any> || {};
    const template = templates[type] || defaultTemplates[type as keyof typeof defaultTemplates];

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching email template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// Update email template
export async function PUT(request: Request) {
  try {
    const { type, subject, content } = await request.json();

    if (!type || !subject || !content) {
      return NextResponse.json(
        { error: 'Type, subject, and content are required' },
        { status: 400 }
      );
    }

    // Get or create settings
    const settings = await prisma.systemSettings.findFirst() || 
      await prisma.systemSettings.create({ data: {} });

    // Update templates
    const templates = (settings.emailTemplates as Record<string, any>) || {};
    templates[type] = { subject, content };

    // Save updated templates
    await prisma.systemSettings.update({
      where: { id: settings.id },
      data: { emailTemplates: templates }
    });

    return NextResponse.json(templates[type]);
  } catch (error) {
    console.error('Error updating email template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

