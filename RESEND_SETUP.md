# Resend Domain Setup Guide

## Current Status
- ❌ Using testing mode (onboarding@resend.dev)
- ❌ Can only send to erik.gulliksen@gmail.com
- ❌ Fixed critical bug where API errors were logged as success

## Option 1: Domain Verification (Recommended)

### Step 1: Add Domain to Resend
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., gulliksen.dev)

### Step 2: Add DNS Records
Resend will provide these DNS records to add:

```
Type: MX
Name: @
Value: feedback-smtp.resend.com
Priority: 10

Type: TXT
Name: @
Value: "v=spf1 include:_spf.resend.com ~all"

Type: TXT
Name: resend._domainkey
Value: [DKIM key provided by Resend]

Type: TXT
Name: _dmarc
Value: "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"
```

### Step 3: Update Code
Once verified, update the sender email in the code:

```typescript
// In app/lib/services/email.ts
const SENDER_EMAIL = 'erik@yourdomain.com'; // Replace with your verified domain
```

### Step 4: Test
After verification (can take up to 72 hours), test sending to external emails.

## Option 2: Quick Email Verification

### For immediate testing without domain:
1. Go to Resend dashboard → Settings → Verified emails
2. Add: marcusboerresen@gmail.com
3. They'll receive verification email to click
4. Once verified, you can send to that address

## Option 3: Upgrade to Paid Plan

### Benefits of paid plan ($20/month):
- Send to any email without verification
- 50,000 emails/month (vs 3,000 free)
- Better deliverability
- Priority support

## Current Code Status
✅ Fixed critical bug where API errors were logged as success
✅ Now properly handles Resend API errors
✅ Will show actual error messages instead of fake success logs

## Test Commands

```bash
# Test current functionality (will show proper errors now)
node -e "
require('dotenv').config();
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'Erik <onboarding@resend.dev>',
  to: 'marcusboerresen@gmail.com',
  subject: 'Test',
  html: '<p>Test</p>'
}).then(result => {
  if (result.error) {
    console.log('❌ Error (expected):', result.error.message);
  } else {
    console.log('✅ Success:', result.data.id);
  }
});
"
```

## Recommendation

**Start with Option 1 (Domain Verification)** if you have a domain. It's the best long-term solution for:
- Professional appearance
- Better deliverability  
- No restrictions on recipient emails
- Higher sending limits

**Use Option 2 (Email Verification)** for immediate testing if you need to demo the functionality quickly.

