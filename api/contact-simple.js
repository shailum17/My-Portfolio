const { contactFormLimiter } = require('./middleware/rateLimit');

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

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please fill in all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Contact form error');
    }
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your message. Please try again later.'
    });
  }
}; 