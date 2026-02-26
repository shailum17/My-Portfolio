import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analytics } from '../../utils/analytics';
import { logger } from '../../utils/logger';
import { contactFormSchema } from '../../utils/validation';
import { z } from 'zod';
import { config } from '../../config/env';
import { defaultSocialLinks } from '../ui/constants/socialLinks';

export default function ContactSection() {
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    logger.info('Contact form submitted');
    // Don't log sensitive form data

    try {
      // Normalize phone to digits/+ only to satisfy validation
      const normalizedForm = {
        ...form,
        phone: form.phone ? form.phone.replace(/[^\d+]/g, '') : ''
      };

      // Ensure phone starts with + or 1-9 if provided
      if (normalizedForm.phone && !/^[+]?[1-9]/.test(normalizedForm.phone)) {
        // If it doesn't start with + or 1-9, add + prefix
        if (!normalizedForm.phone.startsWith('+')) {
          normalizedForm.phone = '+' + normalizedForm.phone;
        }
      }

      // Validate form data
      const validatedData = contactFormSchema.parse(normalizedForm);

      // Choose API URL: same-origin in prod; configurable in dev
      const apiUrl = `${config.apiUrl}/api/contact`;
      logger.info('Attempting to send email to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });
      
      logger.info('Email API response status:', response.status);
      
      if (response.ok) {
        await response.json();
        logger.info('Email sent successfully');
        
        // Only show success if email was actually sent
        setSubmitted(true);
        setShowSuccessPopup(true);
        setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        
        // Track successful contact form submission
        analytics.trackContactSubmit('email');
        
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
        
        logger.info('Success message shown - email was sent');
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        logger.error('Email API error:', errorData);
        
        // Show error message to user
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors.map((err: { msg: string }) => err.msg).join(', ');
          setError(`Validation error: ${errorMessages}`);
        } else {
          setError(errorData.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (validationError: unknown) {
      if (validationError instanceof z.ZodError) {
        setError('Please check your input and try again');
      } else {
        logger.error('Email sending failed:', validationError);
        
        // Show more specific error messages
        if (validationError instanceof Error && validationError.name === 'TypeError' && validationError.message.includes('fetch')) {
          setError('Network error: Unable to reach the server. Please check your internet connection and try again.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const contactDetails = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'shailendramourya17@gmail.com'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 62600 42814'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Address',
      value: 'Gwalior, Madhya Pradesh, India'
    }
  ];

  return (
    <section id="contact" className="relative py-16 overflow-hidden bg-gray-50">
      {/* Blue-to-Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white pointer-events-none" />
      <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 60%)'}} />
      <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 20% 80%, rgba(147,51,234,0.07) 0%, transparent 60%)'}} />
      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle 1px at 1px 1px, rgba(59,130,246,0.10) 99%, transparent 0%)', backgroundSize: '24px 24px'}} />
      </div>

      {/* Success Popup Overlay */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSuccessPopup}
            {...({} as React.HTMLAttributes<HTMLDivElement>)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              {...({} as React.HTMLAttributes<HTMLDivElement>)}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out! I&apos;ll get back to you soon.</p>
                <button
                  onClick={closeSuccessPopup}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Main Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Me</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to collaborate? Let&apos;s discuss your next project or just say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact Form */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl p-6 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
            }}
          >
            <div className="mb-6">
              <p className="text-blue-600 font-semibold text-sm mb-2">Get in Touch</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Let&apos;s Chat, Contact with Me</h2>
              <p className="text-gray-600 text-sm">
                Have any questions or feedback? We&apos;re here to help. Send us a message, We&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {error && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 backdrop-blur-sm text-sm"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 backdrop-blur-sm text-sm"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 backdrop-blur-sm text-sm"
                    placeholder="yourname@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 backdrop-blur-sm text-sm"
                    placeholder="+15554440000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 backdrop-blur-sm resize-none text-sm"
                    placeholder="Type your message"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
          </motion.div>

          {/* Right: Profile and Contact Details */}
          <div className="space-y-6">
            {/* Profile Image */}
            <motion.div 
              className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl p-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
              }}
            >
              <div className="text-center py-2">
                <img
                  src="/assets/education/bg.png"
                  alt="Shailendra Mourya"
                  className="w-20 h-20 rounded-full mx-auto mb-5 object-cover border-2 border-gray-200 shadow-md"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Shailendra Mourya</h3>
                <p className="text-gray-600 text-sm">Cybersecurity Enthusiast & Full-Stack Developer</p>
              </div>
            </motion.div>

            {/* Contact Details Card */}
            <motion.div
              className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl p-8 text-gray-900 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
              }}
            >
              <h4 className="text-lg font-semibold mb-5 text-gray-900">Contact Information</h4>
              <div className="space-y-5 mb-8">
                {contactDetails.map((detail, index) => (
                  <motion.div
                    key={detail.label}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="text-blue-600 flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 font-medium">{detail.label}:</p>
                      <p className="text-sm text-gray-900 truncate">{detail.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">Follow Me</h5>
                <div className="flex space-x-3 justify-center pt-2">
                  {defaultSocialLinks.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 transition-all duration-300 p-2 rounded-lg text-gray-700 backdrop-blur-sm hover:scale-110"
                      aria-label={link.name}
                    >
                      <div className="w-5 h-5">
                        {link.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </section>
  );
} 