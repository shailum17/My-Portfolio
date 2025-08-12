// Lightweight serverless-friendly rate limit using in-memory map per lambda runtime
// Note: This resets when the function instance is recycled. For stronger limits, use a KV/DB store.
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;
const ipToTimestamps = new Map();

async function contactFormLimiter(req, res) {
  const now = Date.now();
  const ip =
    (req.headers['x-forwarded-for'] || '')
      .toString()
      .split(',')[0]
      .trim() || req.connection?.remoteAddress || 'unknown';

  const entry = ipToTimestamps.get(ip) || [];
  const recent = entry.filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  ipToTimestamps.set(ip, recent);

  if (recent.length > MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too many contact form submissions',
      message: 'Please wait 15 minutes before trying again.'
    });
    // Throw to stop handler execution in serverless envs that ignore early return
    throw new Error('RATE_LIMITED');
  }
}

module.exports = { contactFormLimiter };