# fjordev.org Setup Checklist

## ✅ **COMPLETED:**
- [x] Domain purchased: fjordev.org
- [x] Code updated to use erik@fjordev.org

## 🎯 **STEP 1: Cloudflare DNS for Email (DO THIS FIRST)**

### Go to Cloudflare Dashboard:
1. Open browser → https://dash.cloudflare.com
2. Login with your Cloudflare account
3. Click on "fjordev.org" domain
4. Click "DNS" in left sidebar
5. Click "Records" tab

### Add 4 DNS Records (Click "Add record" for each):

#### Record 1: MX Record
- **Type**: MX (select from dropdown)
- **Name**: `send`
- **Mail server**: `feedback-smtp.eu-west-1.amazonaws.com`
- **Priority**: `10`
- **Proxy status**: GRAY cloud ☁️ (NOT orange)
- Click "Save"

#### Record 2: SPF Record  
- **Type**: TXT (select from dropdown)
- **Name**: `send`
- **Content**: `v=spf1 include:amazonses.com ~all`
- **Proxy status**: GRAY cloud ☁️ (NOT orange)
- Click "Save"

#### Record 3: DKIM Record
- **Type**: TXT (select from dropdown)
- **Name**: `resend._domainkey`
- **Content**: `p=MIGfMA0GCSqGSIb3DQEB...` (copy the FULL long string from Resend)
- **Proxy status**: GRAY cloud ☁️ (NOT orange)
- Click "Save"

#### Record 4: DMARC Record
- **Type**: TXT (select from dropdown)
- **Name**: `_dmarc`
- **Content**: `v=DMARC1; p=none;`
- **Proxy status**: GRAY cloud ☁️ (NOT orange)
- Click "Save"

## 🌐 **STEP 2: Vercel Website Setup**

### Add Domain to Vercel:
1. Open browser → https://vercel.com/dashboard
2. Click on your portfolio project
3. Click "Settings" tab (top navigation)
4. Click "Domains" in left sidebar
5. Type: `fjordev.org` in input field
6. Click "Add"

### Vercel will show you records like:
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www  
Value: cname.vercel-dns.com
```

### Add Vercel Records to Cloudflare:
1. Go back to Cloudflare DNS Records
2. Click "Add record"

#### Website Record 1:
- **Type**: A
- **Name**: `@` (this means root domain)
- **IPv4 address**: (whatever Vercel shows, probably `76.76.19.61`)
- **Proxy status**: ORANGE cloud 🟠 (proxied) 
- Click "Save"

#### Website Record 2:
- **Type**: CNAME
- **Name**: `www`
- **Target**: `cname.vercel-dns.com`
- **Proxy status**: ORANGE cloud 🟠 (proxied)
- Click "Save"

## ⏰ **STEP 3: Wait for Verification**

### Timing:
- **Website**: Should work in 5-60 minutes
- **Email**: Can take up to 72 hours to verify

### Check Email Verification:
1. Go to https://resend.com/domains
2. Look for fjordev.org
3. Wait for "Verified" status

## 🧪 **STEP 4: Test Everything**

### Test Website:
1. Go to http://fjordev.org
2. Should redirect to your portfolio
3. Check https://fjordev.org
4. Check https://www.fjordev.org

### Test Email (after verification):
1. Submit a CV request from your portfolio
2. Check if emails are sent without errors
3. Verify emails arrive in inbox (not spam)

## 🚨 **IMPORTANT NOTES:**

### Email Records = GRAY Cloud ☁️
- MX, TXT records for email MUST be gray cloud
- If orange, emails won't work

### Website Records = ORANGE Cloud 🟠  
- A, CNAME records for website should be orange cloud
- This gives you Cloudflare protection

### If Something Doesn't Work:
1. Check proxy status (gray vs orange)
2. Wait longer (DNS can take time)
3. Check spelling of all records
4. Verify you copied DKIM key exactly

## 📞 **Need Help?**
If you get stuck on any step, describe exactly what you see and I'll help troubleshoot!

