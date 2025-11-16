const nodemailer = require('nodemailer');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { contactFormLimiter } = require('./middleware/rateLimit');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

module.exports = async (req, res) => {
  // Restrict CORS to specific domains via env allowlist
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const isDev = process.env.NODE_ENV !== 'production';
  const devDefaults = ['http://localhost:5173', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if ((allowedOrigins.length && allowedOrigins.includes(origin)) || (isDev && devDefaults.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Apply rate limiting AFTER preflight early-return
  try {
    await contactFormLimiter(req, res);
  } catch (e) {
    // limiter already responded 429
    if ((e && e.message) === 'RATE_LIMITED') return;
    // Continue for other errors
  }

  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Sanitize all user inputs
    const sanitizedData = {
      firstName: DOMPurify.sanitize(firstName, { ALLOWED_TAGS: [] }),
      lastName: DOMPurify.sanitize(lastName, { ALLOWED_TAGS: [] }),
      email: DOMPurify.sanitize(email, { ALLOWED_TAGS: [] }),
      phone: phone ? DOMPurify.sanitize(phone, { ALLOWED_TAGS: [] }) : '',
      message: DOMPurify.sanitize(message, { ALLOWED_TAGS: ['br', 'p'] })
    };

    // Validate sanitized data
    if (!sanitizedData.firstName || !sanitizedData.lastName || !sanitizedData.email || !sanitizedData.message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please fill in all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    // Length validation
    if (sanitizedData.message.length > 1000) {
      return res.status(400).json({
        error: 'Message too long',
        message: 'Message must be less than 1000 characters'
      });
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      if (isDev) {
        console.log('Email not configured');
      }
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to portfolio owner
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${sanitizedData.firstName} ${sanitizedData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: sanitizedData.email,
      subject: 'Thank you for contacting Shailendra Mourya',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Thank you for reaching out!</h2>
          <p>Dear ${sanitizedData.firstName},</p>
          <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <div style="background: white; padding: 15px; border-radius: 5px;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>Best regards,<br>Shailendra Mourya</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(confirmationMailOptions);

    if (isDev) {
      console.log('Emails sent successfully');
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });

  } catch (_error) {
    // Enhanced error logging with context
    const errorContext = {
      endpoint: 'contact',
      method: req.method,
      timestamp: new Date().toISOString(),
      error: _error.message || 'Unknown error',
      emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
      stack: isDev ? _error.stack : undefined
    };
    
    if (isDev) {
      console.error('Contact form error:', errorContext);
    } else {
      // In production, log only essential info without stack trace
      console.error('Contact form error:', {
        endpoint: errorContext.endpoint,
        timestamp: errorContext.timestamp,
        error: errorContext.error,
        emailConfigured: errorContext.emailConfigured
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
}; 