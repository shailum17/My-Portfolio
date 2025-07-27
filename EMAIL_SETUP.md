# 📧 Email Setup Guide for Portfolio Contact Form

## 🎯 **Current Status**
Your contact form is working but emails are not being sent because email credentials are not configured.

## 🔧 **Setup Options**

### **Option 1: Gmail Setup (Recommended)**

#### **Step 1: Create App Password**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Name it "Portfolio Contact Form"
6. Copy the generated 16-character password

#### **Step 2: Set Environment Variables in Vercel**
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-16-character-app-password
   ```
5. Click **Save**

#### **Step 3: Redeploy**
- Vercel will automatically redeploy with the new environment variables

### **Option 2: Use Email Service (Alternative)**

#### **Resend.com (Free tier available)**
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Set environment variable:
   ```
   RESEND_API_KEY = your-api-key
   ```

#### **SendGrid (Free tier available)**
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Set environment variable:
   ```
   SENDGRID_API_KEY = your-api-key
   ```

## 🧪 **Testing**

### **Test the Contact Form**
1. Visit your portfolio: https://my-portfolio-seven-phi-92.vercel.app/
2. Fill out the contact form
3. Submit the form
4. Check your email for:
   - **Confirmation email** (sent to the person who submitted)
   - **Notification email** (sent to your email)

### **Check Console Logs**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Submit the form
4. Look for logs like:
   ```
   Email sent successfully: {success: true, message: "..."}
   ```

## 🔍 **Troubleshooting**

### **If emails are not sending:**
1. **Check Vercel logs:**
   - Go to Vercel dashboard
   - Check function logs for errors
2. **Verify environment variables:**
   - Ensure they're set correctly in Vercel
   - Check for typos
3. **Test API endpoint directly:**
   - Visit: `https://my-portfolio-seven-phi-92.vercel.app/api/contact`
   - Should show method not allowed (expected for GET)

### **Common Issues:**
- **"Invalid credentials"**: Check your app password
- **"2FA required"**: Enable 2FA and use app password
- **"Quota exceeded"**: Gmail has daily sending limits

## 📋 **Current API Endpoints**

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `/api/status` | Health check | ✅ Working |
| `/api/hello` | Test endpoint | ✅ Working |
| `/api/test` | Debug endpoint | ✅ Working |
| `/api/contact-simple` | Log only | ✅ Working |
| `/api/contact` | Send emails | ⚠️ Needs email setup |

## 🎉 **After Setup**

Once email is configured:
- ✅ Contact form will send real emails
- ✅ You'll receive notifications
- ✅ Visitors get confirmation emails
- ✅ Professional contact system

## 📞 **Need Help?**

If you need assistance with email setup:
1. Check the troubleshooting section above
2. Verify your Gmail app password
3. Ensure environment variables are set correctly
4. Check Vercel function logs for specific errors

---

**Note**: The contact form currently shows success messages even without email setup (demo mode). Once you configure email credentials, it will send actual emails while maintaining the same user experience. 