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
    
    console.log('Email configuration check:');
    console.log('EMAIL_USER exists:', !!emailUser);
    console.log('EMAIL_PASS exists:', !!emailPass);
    console.log('EMAIL_USER length:', emailUser ? emailUser.length : 0);
    console.log('EMAIL_PASS length:', emailPass ? emailPass.length : 0);

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
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    // Test connection
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
      
      return res.status(200).json({
        success: true,
        message: 'Email configuration is working!',
        details: {
          emailUser: emailUser,
          emailPassLength: emailPass.length,
          transporterVerified: true
        }
      });
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      
      return res.status(200).json({
        success: false,
        message: 'Email configuration error',
        details: {
          error: verifyError.message,
          code: verifyError.code
        }
      });
    }

  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
}; 