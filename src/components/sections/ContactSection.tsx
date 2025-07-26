import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
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

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/shailum17',
      color: 'hover:bg-[#181717]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-.89-.609.068-.597.068-.597 1.004.07 1.532 1.032 1.532 1.032.875 1.5 2.294 1.067 2.855.816.089-.634.342-1.067.622-1.313-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shailum17/',
      color: 'hover:bg-[#0077B5]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595zm-7.5-10h-3v-10h3v10z" />
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://x.com/shailum_17',
      color: 'hover:bg-[#1DA1F2]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.162c-.417.722-.656 1.561-.656 2.475 0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/shailu_m17',
      color: 'hover:bg-[#E4405F]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/message/PHLWVAD672GSJ1',
      color: 'hover:bg-[#25D366]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.363.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.768.464 3.484 1.347 4.997l-1.429 5.221 5.352-1.406c1.463.801 3.125 1.264 4.727 1.264h.001c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.182-2.929-7.071-1.889-1.889-4.401-2.929-7.07-2.929zm0 18.13c-1.504 0-2.977-.401-4.253-1.158l-.305-.18-3.176.836.847-3.104-.198-.319c-.822-1.319-1.257-2.839-1.257-4.405 0-4.411 3.588-7.999 7.999-7.999 2.137 0 4.146.832 5.656 2.344 1.511 1.511 2.344 3.52 2.344 5.656 0 4.411-3.588 7.999-7.999 7.999z" />
        </svg>
      )
    },
    {
      name: 'Discord',
      url: 'https://discord.com/users/shailu_m17',
      color: 'hover:bg-[#5865F2]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.163-.385-.405-.874-.617-1.249a.07.07 0 00-.073-.035c-1.67.285-3.282.822-4.885 1.515a.064.064 0 00-.03.027C.533 7.045-.32 9.58.099 12.057c.002.014.01.028.021.037a19.935 19.935 0 005.993 3.058.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098 13.087 13.087 0 01-1.872-.893.07.07 0 01-.007-.117c.126-.094.252-.192.371-.291a.07.07 0 01.073-.01c3.927 1.793 8.18 1.793 12.062 0a.07.07 0 01.074.009c.12.099.245.198.372.291a.07.07 0 01-.006.117 12.64 12.64 0 01-1.873.893.07.07 0 00-.037.098c.36.699.772 1.364 1.225 1.994a.07.07 0 00.076.028 19.888 19.888 0 005.994-3.058.07.07 0 00.021-.037c.5-3.177-.838-5.682-2.548-7.661a.061.061 0 00-.03-.027zM8.02 13.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
        </svg>
      )
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/user/Dry-Health-1080/',
      color: 'hover:bg-[#FF4500]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12zm-6.406-2.845c.457 0 .828.371.828.828 0 .457-.371.828-.828.828-.457 0-.828-.371-.828-.828 0-.457.371-.828.828-.828zm-11.188 0c.457 0 .828.371.828.828 0 .457-.371.828-.828.828-.457 0-.828-.371-.828-.828 0-.457.371-.828.828-.828zm11.406 4.845c0 2.485-2.686 4.5-6 4.5s-6-2.015-6-4.5c0-.293.035-.573.102-.845.13.053.263.098.398.134.293.08.6.145.917.192.317.047.646.08.983.098.337.018.684.027 1.04.027.356 0 .703-.009 1.04-.027.337-.018.666-.051.983-.098.317-.047.624-.112.917-.192.135-.036.268-.081.398-.134.067.272.102.552.102.845zm-6.5-2.5c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm7 0c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm-3.5-7c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5z" />
        </svg>
      )
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

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Main Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Me</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project or just say hello!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact Form - Smaller */}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's Chat, Contact with Me</h2>
              <p className="text-gray-600 text-sm">
                Have any questions or feedback? We're here to help. Send us a message, We'll get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                className="text-purple-600 text-center text-base font-semibold py-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Thank you for reaching out! I'll get back to you soon.
              </motion.div>
            ) : (
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
                    placeholder="+1 (555) 444-0000"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: Profile and Contact Details - Smaller */}
          <div className="space-y-6">
            {/* Profile Image - Matching Form Card Size */}
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

            {/* Contact Details Card - Matching Form Card Size */}
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
                      <p className="text-sm text-gray-500 font-medium">{detail.label}</p>
                      <p className="text-sm text-gray-900 truncate">{detail.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex space-x-3 justify-center pt-2">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gray-100 ${link.color} transition-all duration-300 p-2 rounded-lg text-gray-700 backdrop-blur-sm hover:scale-110`}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
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