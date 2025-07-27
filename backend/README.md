# Portfolio Backend

A Node.js/Express backend for handling contact form submissions from the portfolio website.

## Features

- ✅ **Contact Form API** - Handles form submissions with validation
- ✅ **Email Notifications** - Sends emails to both owner and sender
- ✅ **Rate Limiting** - Prevents spam and abuse
- ✅ **Input Validation** - Comprehensive form validation
- ✅ **Security** - CORS, Helmet, and other security measures
- ✅ **Error Handling** - Proper error responses and logging

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Gmail App Password Setup

For Gmail, you need to use an App Password instead of your regular password:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Enable **2-Factor Authentication** if not already enabled
3. Go to **Security** > **App passwords**
4. Generate a new app password for "Mail"
5. Use that password in your `.env` file

### 4. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST `/api/contact`

Handles contact form submissions.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "phone": "+1234567890", // optional
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "msg": "Please provide a valid email address"
    }
  ]
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Portfolio backend is running"
}
```

## Validation Rules

- **First Name**: 2-50 characters, letters and spaces only
- **Last Name**: 2-50 characters, letters and spaces only  
- **Email**: Valid email format
- **Phone**: Optional, valid phone number format
- **Message**: 10-1000 characters

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers
- **Input Sanitization**: XSS protection
- **Request Size Limits**: 10MB max

## Email Templates

The backend sends two emails:

1. **Notification to Owner**: Contains all form details
2. **Confirmation to Sender**: Thank you message with their original message

Both emails use HTML templates with professional styling.

## Error Handling

- **Validation Errors**: Returns specific field errors
- **Network Errors**: Proper error messages for connection issues
- **Server Errors**: Generic error messages for security
- **Rate Limit Errors**: Clear messaging about limits

## Development

### File Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── env.example        # Environment template
└── README.md         # This file
```

### Dependencies
- **express**: Web framework
- **nodemailer**: Email sending
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **express-rate-limit**: Rate limiting
- **express-validator**: Input validation
- **dotenv**: Environment variables

## Deployment

### Environment Variables for Production
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Recommended Hosting
- **Vercel**: Easy deployment with environment variables
- **Railway**: Simple Node.js hosting
- **Heroku**: Traditional hosting option
- **DigitalOcean**: VPS hosting

## Troubleshooting

### Common Issues

1. **Email not sending**: Check Gmail app password setup
2. **CORS errors**: Verify FRONTEND_URL in environment
3. **Rate limiting**: Wait 15 minutes or check IP
4. **Validation errors**: Check input format requirements

### Logs
The server logs all contact submissions and errors to the console.

## License

MIT License - feel free to use this for your own portfolio! 