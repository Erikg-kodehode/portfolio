# EmailJS Setup Guide

This guide will help you set up EmailJS to work with your portfolio contact form.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to "Email Services" in the left sidebar
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps to connect your email account

## Step 3: Create an Email Template

1. In the EmailJS dashboard, go to "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Fill in the template details:
   - **Template Name**: Portfolio Contact Form
   - **Subject**: Portfolio Contact: {{subject}}
   - **Content**: Use the template below

```
New message from your portfolio contact form:

Name: {{from_name}}
Email: {{reply_to}}

Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Click "Save" to create your template

## Step 4: Get Your Credentials

1. Email Service ID:
   - Go to "Email Services" in the left sidebar
   - Copy the "Service ID" for your connected email service

2. Email Template ID:
   - Go to "Email Templates" in the left sidebar
   - Copy the "Template ID" for your contact form template

3. Public Key:
   - Go to "Account" in the left sidebar
   - Click on "API Keys"
   - Copy your "Public Key"

## Step 5: Update Your .env.local File

Open the `.env.local` file in your project root and update it with your credentials:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Step 6: Test Your Contact Form

1. Start your development server (`npm run dev`)
2. Navigate to your contact form page (/contact/form)
3. Fill out the form and submit it
4. Check your email to verify the message was sent correctly

## Troubleshooting

- If emails aren't sending, check your EmailJS dashboard for logs
- Verify that your credentials in `.env.local` match those in your EmailJS dashboard
- Make sure your email service is properly connected in EmailJS
- Check that your template variables match those in your ContactForm component

