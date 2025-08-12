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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}; 