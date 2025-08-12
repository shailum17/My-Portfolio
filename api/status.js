module.exports = (req, res) => {
  // Restrict CORS to specific domains via env allowlist
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const isDev = process.env.NODE_ENV !== 'production';
  const devDefaults = ['http://localhost:5173', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if ((allowedOrigins.length && allowedOrigins.includes(origin)) || (isDev && devDefaults.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
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