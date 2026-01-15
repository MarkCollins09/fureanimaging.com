# Deployment Guide - Going Live with Your Website

## Overview

Since your website uses Node.js for the contact form functionality, you'll need **Node.js hosting** (not just basic web hosting). Here are your options:

## 🚀 Recommended Hosting Options

### Option 1: Render (Easiest & Free Tier Available) ⭐ RECOMMENDED
- **Free tier:** Free SSL, custom domains, 750 hours/month
- **Pros:** Easy setup, automatic SSL, free tier is generous
- **Cons:** Spins down after inactivity on free tier (takes ~30 seconds to wake up)
- **Cost:** Free tier available, paid plans start at $7/month

### Option 2: Railway
- **Pros:** Very easy setup, good free tier credits, fast
- **Cons:** Uses credits on free tier (limited)
- **Cost:** Free $5 credit/month, then pay-as-you-go

### Option 3: Vercel (Best for Static + API Routes)
- **Pros:** Excellent performance, great free tier
- **Cons:** Requires slight code restructuring for serverless
- **Cost:** Free tier available

### Option 4: GoDaddy Web Hosting (If You Already Have It)
- **Pros:** You may already have hosting with GoDaddy
- **Cons:** Requires Linux hosting (cPanel or similar) with Node.js support
- **Cost:** Varies based on your plan

### Option 5: DigitalOcean App Platform
- **Pros:** Simple deployment, reliable
- **Cons:** No free tier
- **Cost:** Starts at $5/month

---

## 📋 Step-by-Step Deployment (Using Render - Recommended)

### Step 1: Prepare Your Code

1. **Create a GitHub repository** (or GitLab/Bitbucket)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Create a `.env.example` file** (template for environment variables):
   ```
   EMAIL_USER=mark@fureanimaging.com
   EMAIL_PASSWORD=your_app_password_here
   PORT=10000
   NODE_ENV=production
   ```

### Step 2: Sign Up for Render

1. Go to https://render.com
2. Sign up with GitHub (easiest)
3. Connect your GitHub account

### Step 3: Create a Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `furean-website` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if you prefer)

4. **Add Environment Variables:**
   - Click "Environment" tab
   - Add these variables:
     - `EMAIL_USER` = `mark@fureanimaging.com`
     - `EMAIL_PASSWORD` = `your_outlook_app_password`
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (Render sets PORT automatically, but 10000 is their default)

5. **Update server.js** to use environment variables:
   - Render uses environment variables directly (not email.env file)
   - Your server.js already supports this via `process.env.EMAIL_USER` and `process.env.EMAIL_PASSWORD`

6. Click **"Create Web Service"**

### Step 4: Configure Your Domain on Render

1. In your Render service dashboard, go to **"Settings"** → **"Custom Domains"**
2. Add your domain: `fureanimaging.com` (or `www.fureanimaging.com`)
3. Render will provide DNS records to add to GoDaddy

### Step 5: Update DNS Records in GoDaddy

1. Log into GoDaddy Domain Manager
2. Go to **DNS Management** for your domain
3. Add/Update DNS records as provided by Render:

   **Option A: Root Domain (fureanimaging.com)**
   - Type: `A`
   - Name: `@`
   - Value: Render's IP address (they'll provide this)
   
   **Option B: WWW Subdomain (www.fureanimaging.com)**
   - Type: `CNAME`
   - Name: `www`
   - Value: Your Render service URL (e.g., `your-service.onrender.com`)

4. **Wait 24-48 hours** for DNS propagation (usually faster, but can take time)

### Step 6: Enable SSL

- Render automatically provisions SSL certificates via Let's Encrypt
- SSL will activate once DNS is properly configured
- Your site will be accessible via HTTPS automatically

---

## 🔧 Alternative: Using GoDaddy Web Hosting

If you already have GoDaddy Linux hosting with Node.js support:

### Requirements:
- Linux hosting (cPanel)
- Node.js support enabled
- SSH access

### Steps:

1. **Upload files via FTP/SFTP:**
   - Upload all files except `node_modules`, `.git`, `.env`, `email.env`
   - Create `node_modules` folder (it will be populated when you install)

2. **SSH into your server:**
   ```bash
   ssh your-username@your-server-ip
   cd public_html
   ```

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Set up environment variables:**
   - Create `.env` file with your credentials
   - Or set them in your hosting control panel

5. **Set up process manager (PM2):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name furean-website
   pm2 save
   pm2 startup  # Follow instructions to auto-start on reboot
   ```

6. **Configure domain:**
   - Point your domain to your GoDaddy hosting (usually already done)
   - Enable SSL via Let's Encrypt in cPanel

---

## 📝 Important: Update server.js for Production

Before deploying, you'll want to update `server.js` to use environment variables properly. Currently it uses `email.env`, but most hosting platforms use environment variables directly.

**Current code:**
```javascript
require('dotenv').config({ path: './email.env' });
```

**For production hosting platforms, change to:**
```javascript
require('dotenv').config(); // Uses .env file or environment variables
```

This way it will work with both local development (with email.env) and production (with environment variables).

---

## ✅ Pre-Deployment Checklist

- [ ] Code is committed to Git repository
- [ ] Environment variables are documented (don't commit actual values)
- [ ] Test the contact form locally one more time
- [ ] Verify email credentials work
- [ ] Choose hosting platform
- [ ] Set up hosting account
- [ ] Configure environment variables on hosting platform
- [ ] Deploy code
- [ ] Configure domain DNS
- [ ] Wait for DNS propagation
- [ ] Test website on production domain
- [ ] Test contact form submission
- [ ] Verify emails are received
- [ ] Test SSL/HTTPS is working

---

## 🧪 Testing After Deployment

1. **Visit your domain:** `https://fureanimaging.com`
2. **Test contact form:**
   - Fill out and submit the form
   - Check your email at `mark@fureanimaging.com`
   - Verify you received the submission
3. **Test all pages:**
   - Homepage (index.html)
   - Platform page
   - Investors page
4. **Test on mobile devices**
5. **Verify HTTPS/SSL is working** (lock icon in browser)

---

## 🔒 Security Recommendations

1. **Add rate limiting** (prevent spam):
   ```bash
   npm install express-rate-limit
   ```
   Then add to server.js (see PRODUCTION_CHECKLIST.md)

2. **Consider adding CAPTCHA** (reCAPTCHA or hCaptcha) to the contact form

3. **Keep environment variables secure** - never commit them to Git

---

## 🆘 Troubleshooting

### Contact form not working:
- Check environment variables are set correctly on hosting platform
- Check server logs for errors
- Verify email credentials are correct
- Test SMTP connection

### Domain not resolving:
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Use `dig yourdomain.com` or `nslookup yourdomain.com` to check

### SSL not working:
- Wait for DNS to fully propagate first
- Check that your hosting platform supports SSL
- Verify DNS is pointing to correct server

### 500 errors:
- Check server logs
- Verify environment variables are set
- Check that all dependencies are installed

---

## 📞 Next Steps

1. Choose your hosting platform
2. Set up your account
3. Follow the deployment steps for your chosen platform
4. Test thoroughly
5. Share your live website! 🎉

Need help with any specific step? Let me know!
