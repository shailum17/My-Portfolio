# Security Fixes Implementation Guide

## Critical Fixes to Implement

### 1. Fix XSS Vulnerability in Contact Form

**Problem**: User input is directly rendered in email HTML without sanitization.

**Solution**: Install and use DOMPurify for HTML sanitization.

```bash
npm install dompurify @types/dompurify
```

**Update `api/contact.js`**:
```javascript
const nodemailer = require('nodemailer');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

module.exports = async (req, res) => {
  // ... existing CORS headers ...

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

    // ... rest of the email sending logic using sanitizedData ...
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
};
```

### 2. Remove Sensitive Console Logs

**Create a logging utility** (`src/utils/logger.ts`):
```typescript
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  info: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    }
    // In production, send to error tracking service
  },
  
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  }
};
```

**Update `src/components/sections/ContactSection.tsx`**:
```typescript
import { logger } from '../../utils/logger';

// Replace all console.log statements with logger
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  logger.info('Contact form submitted');
  // Don't log sensitive form data

  try {
    const apiUrl = `${window.location.origin}/api/contact`;
    logger.info('Attempting to send email to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    
    logger.info('Email API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      logger.info('Email sent successfully');
      
      setSubmitted(true);
      setShowSuccessPopup(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      
      analytics.trackContactSubmit('email');
      
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
    } else {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      logger.error('Email API error:', errorData);
      
      setError(errorData.message || 'Failed to send message. Please try again.');
    }
  } catch (emailErr) {
    logger.error('Email sending failed:', emailErr);
    
    if (emailErr.name === 'TypeError' && emailErr.message.includes('fetch')) {
      setError('Network error: Unable to reach the server. Please check your internet connection and try again.');
    } else {
      setError('An unexpected error occurred. Please try again later.');
    }
  } finally {
    setLoading(false);
  }
};
```

### 3. Fix CORS Configuration

**Update `api/contact.js`**:
```javascript
module.exports = async (req, res) => {
  // Restrict CORS to specific domains
  const allowedOrigins = [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    'http://localhost:5173', // Development only
    'http://localhost:3000'  // Development only
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
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

  // ... rest of the handler
};
```

### 4. Add Rate Limiting

**Install rate limiting package**:
```bash
npm install express-rate-limit
```

**Create rate limiting middleware** (`api/middleware/rateLimit.js`):
```javascript
const rateLimit = require('express-rate-limit');

const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions',
    message: 'Please wait 15 minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { contactFormLimiter };
```

**Update `api/contact.js`**:
```javascript
const { contactFormLimiter } = require('./middleware/rateLimit');

module.exports = async (req, res) => {
  // Apply rate limiting
  await contactFormLimiter(req, res);
  
  // ... rest of the handler
};
```

### 5. Enable TypeScript Strict Mode Gradually

**Update `tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["node"],
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src", "api", "src/types"]
}
```

### 6. Fix Memory Leaks in Performance Monitoring

**Update `src/utils/performance.ts`**:
```typescript
class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private isDisposed = false;

  constructor() {
    this.initObservers();
    this.measurePageLoad();
  }

  // ... existing observer initialization ...

  public dispose() {
    if (this.isDisposed) return;
    
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });
    
    this.observers = [];
    this.isDisposed = true;
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }
}

// Global instance management
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      cleanupPerformanceMonitoring();
    });
  }
};

export const cleanupPerformanceMonitoring = () => {
  if (performanceMonitor) {
    performanceMonitor.dispose();
    performanceMonitor = null;
  }
};
```

### 7. Improve CSP Configuration

**Update `vercel.json`**:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; worker-src 'self' blob:;"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 8. Add Input Validation Library

**Install validation library**:
```bash
npm install zod
```

**Create validation schema** (`src/utils/validation.ts`):
```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  
  email: z.string()
    .email('Please provide a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), {
      message: 'Please provide a valid phone number'
    }),
  
  message: z.string()
    .min(1, 'Message is required')
    .max(1000, 'Message must be less than 1000 characters')
    .regex(/^[^<>]*$/, 'Message contains invalid characters')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Update contact form to use validation**:
```typescript
import { contactFormSchema, type ContactFormData } from '../../utils/validation';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(form);
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });
    
    // ... rest of the handler
  } catch (validationError) {
    if (validationError instanceof z.ZodError) {
      setError(validationError.errors[0].message);
    } else {
      setError('An unexpected error occurred');
    }
  } finally {
    setLoading(false);
  }
};
```

## Testing the Fixes

1. **Test XSS Protection**: Try submitting forms with HTML/JavaScript in the fields
2. **Test Rate Limiting**: Submit multiple forms quickly to verify rate limiting
3. **Test Input Validation**: Submit invalid data to verify validation
4. **Test CORS**: Try accessing the API from unauthorized domains
5. **Test Memory Leaks**: Monitor memory usage during extended use

## Deployment Checklist

- [ ] Install new dependencies
- [ ] Update environment variables for CORS domains
- [ ] Test all fixes in development
- [ ] Update production environment variables
- [ ] Deploy and monitor for any issues
- [ ] Set up error monitoring for production 