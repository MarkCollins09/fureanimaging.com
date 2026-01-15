# Outlook Email Setup for Furean Contact Form

## Quick Setup

Since you already have Outlook set up, you just need to configure the `.env` file with your credentials.

### Step 1: Create `.env` file

Create a file named `.env` in the project root with the following:

```env
EMAIL_USER=mark@fureanimaging.com
EMAIL_PASSWORD=your_outlook_password
PORT=3000
```

### Step 2: Get Your Outlook Password

**If you have 2-Factor Authentication (2FA) enabled:**
- You'll need to create an **App Password** instead of your regular password
- Go to: https://account.microsoft.com/security
- Click "Advanced security options"
- Under "App passwords", click "Create a new app password"
- Copy the generated password and use it in `.env`

**If you don't have 2FA enabled:**
- You can use your regular Outlook password
- However, Microsoft may require 2FA for security, so App Passwords are recommended

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Server

```bash
npm start
```

The server will run on http://localhost:3000

### Step 5: Test the Contact Form

1. Open http://localhost:3000 in your browser
2. Click "Request Information" button
3. Fill out and submit the form
4. Check your Outlook inbox at mark@fureanimaging.com

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Make sure you're using an **App Password** if 2FA is enabled
- Verify your email address is correct (mark@fureanimaging.com)
- Check that your password doesn't have extra spaces

### "Connection timeout"
- Check your internet connection
- Verify Outlook/Office 365 is accessible
- Try restarting the server

### Emails not arriving
- Check your spam/junk folder
- Verify the email address in server.js matches your Outlook address
- Check server console for error messages

## Replying to Emails

When someone submits the contact form:
1. You'll receive an email at `mark@fureanimaging.com`
2. The email will include the sender's name, company, role, and message
3. You can reply directly from Outlook - the reply will go back to the person who submitted the form

**Note:** Currently, the form doesn't capture the submitter's email address. If you want to add an email field to the form so you can reply directly, let me know!

## Security Notes

- Never commit the `.env` file to version control (it's already in `.gitignore`)
- Use App Passwords instead of your main password when possible
- Keep your credentials secure

