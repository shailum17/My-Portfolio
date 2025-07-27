module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    status: 'success',
    message: 'Portfolio API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    availableEndpoints: [
      '/api/status',
      '/api/hello',
      '/api/test',
      '/api/contact-simple',
      '/api/contact'
    ],
    deployment: {
      platform: 'Vercel',
      framework: 'Vite + React',
      runtime: 'Node.js'
    }
  });
}; 