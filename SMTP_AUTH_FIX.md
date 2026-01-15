# Fixing SMTP Authentication Error

## The Problem
Error: `535 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant`

This means SMTP AUTH is disabled at the tenant level in Office 365.

## Solution 1: Enable SMTP AUTH (If you have admin access)

If you have Office 365 admin access:

1. **Go to Microsoft 365 Admin Center:**
   - Visit: https://admin.microsoft.com
   - Sign in with an admin account

2. **Navigate to Exchange Admin Center:**
   - Go to **Settings** > **Mail** > **Exchange Admin Center**
   - Or go directly to: https://admin.exchange.microsoft.com

3. **Enable SMTP AUTH:**
   - Go to **Settings** > **Mail flow** > **Settings**
   - Find **SMTP AUTH** settings
   - Enable it for your organization or specific users

4. **Alternative: Enable via PowerShell:**
   ```powershell
   Connect-ExchangeOnline
   Set-TransportConfig -SmtpClientAuthenticationDisabled $false
   ```

5. **Wait 15-30 minutes** for changes to propagate

## Solution 2: Use SendGrid (Recommended - No Admin Access Needed)

SendGrid is a professional email service that works great for contact forms:

1. **Sign up for SendGrid:**
   - Go to: https://sendgrid.com
   - Free tier: 100 emails/day

2. **Create API Key:**
   - Dashboard > Settings > API Keys
   - Create API Key with "Mail Send" permission
   - Copy the API key

3. **Update server.js** (I can do this for you)
   - Replace Outlook SMTP with SendGrid
   - Uses API key instead of password

4. **Update email.env:**
   ```
   SENDGRID_API_KEY=your_api_key_here
   EMAIL_USER=mark@fureanimaging.com
   ```

## Solution 3: Use Mailgun (Alternative)

Similar to SendGrid:
- Free tier: 5,000 emails/month
- Requires domain verification
- More setup but higher limits

## Solution 4: Use Microsoft Graph API (Advanced)

Uses OAuth2 instead of SMTP:
- More secure
- More complex setup
- Requires app registration in Azure AD

## Recommendation

**If you have admin access:** Enable SMTP AUTH (Solution 1) - easiest fix

**If you don't have admin access:** Use SendGrid (Solution 2) - quick setup, reliable, free tier is generous for contact forms

Let me know which solution you'd like to proceed with!

