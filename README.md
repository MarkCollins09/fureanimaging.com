# Furean Advanced Imaging Website

## Quick Start

### For Development (Static Files Only)
```bash
python3 -m http.server 8000
```
Visit: http://localhost:8000

**Note:** The contact form will not work with this method. Use the Node.js server below for full functionality.

### For Full Functionality (With Contact Form)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up email (see EMAIL_SETUP.md):**
   ```bash
   # Create .env file
   cp .env.example .env
   # Edit .env with your email credentials
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   Visit: http://localhost:3000

## Features

- Modern sci-fi themed website
- Contact form with email integration
- Responsive design
- 3D particle background

## File Structure

- `index.html` - Main website file
- `server.js` - Node.js backend for contact form
- `package.json` - Dependencies
- `EMAIL_SETUP.md` - Detailed email configuration guide

## Contact Form

The contact form sends emails to `mark@fureanimaging.com`. See `EMAIL_SETUP.md` for configuration instructions.

