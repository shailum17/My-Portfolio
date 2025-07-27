# Portfolio API Endpoints

This document describes the available API endpoints for the portfolio website.

## Base URL
- **Production**: `https://your-domain.vercel.app/api/`
- **Development**: `http://localhost:5000/api/`

## Available Endpoints

### 1. Status Check
- **URL**: `/api/status`
- **Method**: GET
- **Description**: Check if the API is working
- **Response**: JSON with API status and available endpoints

### 2. Hello World
- **URL**: `/api/hello`
- **Method**: GET
- **Description**: Simple hello world endpoint
- **Response**: JSON with greeting message

### 3. Test Endpoint
- **URL**: `/api/test`
- **Method**: GET
- **Description**: Test endpoint for debugging
- **Response**: JSON with request details

### 4. Contact Form (Simple)
- **URL**: `/api/contact-simple`
- **Method**: POST
- **Description**: Handle contact form submissions (logs only)
- **Body**: 
  ```json
  {
    "firstName": "string",
    "lastName": "string", 
    "email": "string",
    "phone": "string (optional)",
    "message": "string"
  }
  ```
- **Response**: JSON with success/error message

### 5. Contact Form (Full)
- **URL**: `/api/contact`
- **Method**: POST
- **Description**: Handle contact form with email sending
- **Body**: Same as contact-simple
- **Response**: JSON with success/error message
- **Requirements**: EMAIL_USER and EMAIL_PASS environment variables

## Testing the API

### Using Browser
1. Visit `https://your-domain.vercel.app/api/status`
2. Should see JSON response with API information

### Using Contact Form
1. Fill out the contact form on the website
2. Check browser console for detailed logs
3. Check Vercel function logs for server-side information

### Using curl
```bash
# Test status endpoint
curl https://your-domain.vercel.app/api/status

# Test contact form
curl -X POST https://your-domain.vercel.app/api/contact-simple \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Hello"}'
```

## Environment Variables

For full email functionality, set these in Vercel:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password

## Troubleshooting

1. **Network Error**: Check if API endpoints are accessible
2. **404 Error**: Verify endpoint URL is correct
3. **500 Error**: Check Vercel function logs
4. **CORS Error**: API includes CORS headers for all origins

## Deployment

The API endpoints are automatically deployed with the main application on Vercel. No additional configuration is required. 