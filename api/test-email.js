const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Check environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev) {
      console.log('Email configuration check (dev only):', {
        hasUser: !!emailUser,
        hasPass: !!emailPass
      });
    }

    if (!emailUser || !emailPass) {
      return res.status(200).json({
        success: false,
        message: 'Email credentials not configured',
        details: {
          hasEmailUser: !!emailUser,
          hasEmailPass: !!emailPass
        }
      });
    }

    // Test transporter creation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    // Test connection
    try {
      await transporter.verify();
      if (isDev) {
        console.log('Email transporter verified successfully');
      }
      
      return res.status(200).json({
        success: true,
        message: 'Email configuration is working!',
        details: {
          emailUser: isDev ? emailUser : undefined,
          emailPassLength: isDev ? emailPass.length : undefined,
          transporterVerified: true
        }
      });
    } catch (verifyError) {
      if (isDev) {
        console.error('Transporter verification failed:', verifyError.message);
      }
      
      return res.status(200).json({
        success: false,
        message: 'Email configuration error',
        details: {
          error: isDev ? verifyError.message : 'Verification failed',
          code: isDev ? verifyError.code : undefined
        }
      });
    }

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Test email error:', error.message);
    }
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
}; 