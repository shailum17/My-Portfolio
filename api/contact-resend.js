const { Resend } = require('resend');
const { contactFormLimiter } = require('./middleware/rateLimit');

// Simple sanitization function to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim()
    .slice(0, 1000); // Limit length
};

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
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    try {
      await contactFormLimiter(req, res);
    } catch (e) {
      if ((e && e.message) === 'RATE_LIMITED') return;
    }

    const { firstName, lastName, email, phone, message } = req.body;

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      message: sanitizeInput(message)
    };

    // Basic validation
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

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email to portfolio owner
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with your email
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
    });

    // Confirmation email to sender
    await resend.emails.send({
      from: 'Shailendra Mourya <onboarding@resend.dev>',
      to: [sanitizedData.email],
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
    });

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
      endpoint: 'contact-resend',
      method: req.method,
      timestamp: new Date().toISOString(),
      error: _error.message || 'Unknown error',
      resendConfigured: !!process.env.RESEND_API_KEY,
      stack: process.env.NODE_ENV !== 'production' ? _error.stack : undefined
    };
    
    if (process.env.NODE_ENV !== 'production') {
      console.error('Contact form error:', errorContext);
    } else {
      // In production, log only essential info without stack trace
      console.error('Contact form error:', {
        endpoint: errorContext.endpoint,
        timestamp: errorContext.timestamp,
        error: errorContext.error,
        resendConfigured: errorContext.resendConfigured
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
}; 