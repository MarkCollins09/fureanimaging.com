const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './email.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Debug: Check if env vars are loaded (only in development)
if (process.env.NODE_ENV !== 'production') {
    console.log('Email config check:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Missing');
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set (' + process.env.EMAIL_PASSWORD.length + ' chars)' : '✗ Missing');
}

// Email configuration for Outlook/Office 365
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email (mark@fureanimaging.com)
        pass: process.env.EMAIL_PASSWORD // Your Outlook password or App Password
    },
    tls: {
        minVersion: 'TLSv1.2',
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    requireTLS: true
});

// Verify connection on startup
transporter.verify(function (error, success) {
    if (error) {
        console.log('✗ Email configuration error:', error.message);
        console.log('Error code:', error.code);
        console.log('Make sure:');
        console.log('1. EMAIL_USER and EMAIL_PASSWORD are set in email.env');
        console.log('2. If 2FA is enabled, use an App Password instead of regular password');
        console.log('3. Check that mark@fureanimaging.com is a valid Outlook/Office 365 account');
        console.log('4. Verify the App Password was copied correctly (no extra spaces)');
    } else {
        console.log('✓ Email server is ready to send messages');
        console.log('✓ Connected to:', process.env.EMAIL_USER);
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, company, role, email, message, type } = req.body;

        // Validate required fields
        if (!name || !company || !role || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Determine if this is an investor inquiry
        const isInvestor = type === 'investor';
        const formType = isInvestor ? 'INVESTOR INQUIRY' : 'CONTACT FORM';
        const subjectPrefix = isInvestor ? '🚀 INVESTOR INQUIRY' : 'New Contact Form Submission';

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'mark@fureanimaging.com',
            replyTo: email, // Use submitter's email for easy replies
            subject: `${subjectPrefix} from ${name} - ${company}`,
            html: `
                <div style="font-family: monospace; color: #94a3b8; background: #020617; padding: 20px; border: 1px solid #1e293b;">
                    <h2 style="color: #06b6d4; font-size: 18px; margin-bottom: 20px;">NEW INQUIRY // FUREAN ${formType}</h2>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #06b6d4;">NAME:</strong>
                        <span style="color: #e2e8f0; margin-left: 10px;">${name}</span>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #06b6d4;">COMPANY:</strong>
                        <span style="color: #e2e8f0; margin-left: 10px;">${company}</span>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #06b6d4;">ROLE:</strong>
                        <span style="color: #e2e8f0; margin-left: 10px;">${role}</span>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #06b6d4;">EMAIL:</strong>
                        <span style="color: #e2e8f0; margin-left: 10px;">${email}</span>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #06b6d4;">MESSAGE:</strong>
                        <div style="color: #e2e8f0; margin-top: 10px; padding: 15px; background: #0f172a; border-left: 2px solid #06b6d4;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
                        Received via Furean Advanced Imaging Contact Form
                    </div>
                </div>
            `,
            text: `
NEW INQUIRY // FUREAN ${formType}

NAME: ${name}
COMPANY: ${company}
ROLE: ${role}
EMAIL: ${email}

MESSAGE:
${message}

---
Received via Furean Advanced Imaging ${isInvestor ? 'Investor' : 'Contact'} Form
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('✓ Email sent successfully to', mailOptions.to);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('✗ Error sending email:', error.message);
        console.error('Full error:', error);
        
        // Provide more helpful error messages
        let errorMessage = 'Failed to send message. Please try again later.';
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check your email credentials. If 2FA is enabled, use an App Password.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Connection failed. Please check your internet connection.';
        } else if (error.responseCode) {
            errorMessage = `Email server error: ${error.response} (Code: ${error.responseCode})`;
        }
        
        res.status(500).json({ 
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

