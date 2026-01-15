# Production Deployment Checklist

## ✅ Current Status
- Contact form working
- Email delivery confirmed
- Reply functionality working

## Before Going Live

### 1. Environment Variables
- [ ] Ensure `email.env` is NOT committed to version control (already in `.gitignore`)
- [ ] Set up environment variables on your hosting platform
- [ ] Use secure methods to store credentials (not in code)

### 2. Server Configuration
- [ ] Remove or disable debug console logs for production
- [ ] Set `NODE_ENV=production` in your hosting environment
- [ ] Configure proper error logging (not just console.log)

### 3. Security
- [ ] Add rate limiting to prevent spam/abuse
- [ ] Consider adding CAPTCHA (reCAPTCHA or hCaptcha)
- [ ] Validate all form inputs server-side (already done)
- [ ] Use HTTPS for all connections
- [ ] Set up CORS properly for your domain

### 4. Email Service
- [ ] Verify SMTP AUTH is enabled in production Office 365 tenant
- [ ] Test email delivery from production server
- [ ] Set up email monitoring/alerts for failures
- [ ] Consider email service backup (SendGrid/Mailgun) if Outlook has issues

### 5. Hosting Considerations
- [ ] Choose a reliable hosting platform (Heroku, Railway, Render, AWS, etc.)
- [ ] Set up process manager (PM2) for Node.js
- [ ] Configure auto-restart on crashes
- [ ] Set up monitoring/uptime checks
- [ ] Configure domain name and SSL certificate

### 6. Testing
- [ ] Test form submission from production URL
- [ ] Test email delivery
- [ ] Test reply functionality
- [ ] Test on mobile devices
- [ ] Test with different email providers

### 7. Performance
- [ ] Optimize images (already using optimized formats)
- [ ] Consider CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up caching headers

### 8. Backup Plan
- [ ] Document how to switch to SendGrid/Mailgun if needed
- [ ] Keep email.env backup (securely stored)
- [ ] Document server restart procedures

## Quick Production Improvements

### Add Rate Limiting (Recommended)
Install: `npm install express-rate-limit`

Add to server.js:
```javascript
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  // ... existing code
});
```

### Add Basic Error Monitoring
Consider services like:
- Sentry (error tracking)
- LogRocket (session replay)
- Or simple logging to file/database

## Notes
- The current setup should work in production as-is
- Main concern: SMTP AUTH settings in production Office 365 tenant
- Consider adding rate limiting before going live to prevent abuse

