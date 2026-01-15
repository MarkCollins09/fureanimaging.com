# Email Setup Guide for Furean Contact Form

This guide will help you set up email functionality so that contact form submissions are sent to `mark@fureanimaging.com` and you can reply to them.

## Overview

The contact form uses Node.js with Nodemailer to send emails. You have several options for email services:

### Option 1: Gmail (Easiest for Quick Setup)

**Pros:** Free, easy to set up, reliable
**Cons:** Daily sending limits (500 emails/day), requires App Password

**Setup Steps:**

1. **Enable 2-Factor Authentication** on your Gmail account (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate an App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Configure `.env` file:**
   ```
   EMAIL_USER=mark@fureanimaging.com
   EMAIL_PASSWORD=your_16_character_app_password
   EMAIL_SERVICE=gmail
   ```

### Option 2: Outlook/Office 365

**Pros:** Professional, good for business emails
**Cons:** May require Microsoft 365 subscription

**Setup Steps:**

1. **Enable App Passwords** (if 2FA is enabled)
   - Go to: https://account.microsoft.com/security
   - Security > Advanced security options > App passwords

2. **Configure `.env` file:**
   ```
   EMAIL_USER=mark@fureanimaging.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_SERVICE=outlook
   ```

### Option 3: SendGrid (Recommended for Production)

**Pros:** High deliverability, 100 emails/day free, scalable, professional
**Cons:** Requires account setup

**Setup Steps:**

1. **Sign up for SendGrid:**
   - Go to: https://sendgrid.com
   - Create a free account (100 emails/day free)

2. **Create an API Key:**
   - Dashboard > Settings > API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key

3. **Update `server.js`:**
   Replace the transporter configuration with:
   ```javascript
   const transporter = nodemailer.createTransport({
       host: 'smtp.sendgrid.net',
       port: 587,
       auth: {
           user: 'apikey',
           pass: process.env.SENDGRID_API_KEY
       }
   });
   ```

4. **Configure `.env` file:**
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   EMAIL_USER=mark@fureanimaging.com
   ```

### Option 4: Mailgun

**Pros:** 5,000 emails/month free, excellent deliverability
**Cons:** Requires domain verification

**Setup Steps:**

1. **Sign up for Mailgun:**
   - Go to: https://www.mailgun.com
   - Create account and verify your domain

2. **Get SMTP credentials:**
   - Dashboard > Sending > Domain Settings > SMTP credentials

3. **Update `server.js`:**
   ```javascript
   const transporter = nodemailer.createTransport({
       host: 'smtp.mailgun.org',
       port: 587,
       auth: {
           user: process.env.MAILGUN_SMTP_USER,
           pass: process.env.MAILGUN_SMTP_PASSWORD
       }
   });
   ```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file** with your email credentials

4. **Start the server:**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Update the website URL:**
   - The form currently submits to `/api/contact`
   - If your server runs on a different port, update the fetch URL in `index.html` (line ~XXX)

## Replying to Emails

When someone submits the contact form, you'll receive an email at `mark@fureanimaging.com`. To reply:

1. **Check the "Reply-To" field** - The email will include the sender's information
2. **Reply directly** from your email client (Gmail, Outlook, etc.)
3. The reply will go to the person who submitted the form

**Note:** If you want to capture the submitter's email address for replies, we can add an email field to the contact form.

## Testing

1. Start the server: `npm start`
2. Open the website: `http://localhost:3000`
3. Click "Request Information" button
4. Fill out and submit the form
5. Check your email inbox

## Troubleshooting

### "Invalid login" error
- Check that your email and password are correct
- For Gmail, make sure you're using an App Password, not your regular password
- Ensure 2FA is enabled if using Gmail

### Emails not arriving
- Check spam/junk folder
- Verify email service settings
- Check server logs for errors
- Test with a different email service

### Port already in use
- Change `PORT` in `.env` file
- Or kill the process using the port: `lsof -ti:3000 | xargs kill`

## Production Deployment

For production, consider:
- Using SendGrid or Mailgun for better deliverability
- Setting up environment variables on your hosting platform
- Using HTTPS for secure form submissions
- Adding rate limiting to prevent spam
- Setting up email templates

## Security Notes

- Never commit `.env` file to version control
- Use App Passwords instead of regular passwords
- Consider adding CAPTCHA to prevent spam
- Rate limit form submissions

