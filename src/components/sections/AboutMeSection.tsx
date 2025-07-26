import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Cybersecurity Enthusiast Awareness',
    desc: 'Familiar with core Cybersecurity Enthusiast concepts like network security, ethical hacking, and vulnerability analysis using tools such as OWASP ZAP and Burp Suite.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Full-Stack Development',
    desc: 'Hands-on experience in building responsive web applications using technologies like React, Node.js, MongoDB, HTML/CSS, and JavaScript with a focus on user experience.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M5 7a2 2 0 012-2h1.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V16a2 2 0 01-2 2h-2" />
      </svg>
    ),
    title: 'Creative Design',
    desc: 'Skilled in crafting clean and appealing visuals using Figma, Canva, and Adobe Photoshop. Adept at designing UI components and brand-aligned digital assets.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-500 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Research & Innovation',
    desc: 'Published works in image processing and mobile security. Continuously exploring emerging tech like blockchain, AI, and biometric systems to build meaningful solutions.'
  },
];

const badges = [
  'Cybersecurity Fundamentals',
  'Full-Stack Development',
  'UI/UX Design',
  'Research & Publications',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  }
};

export default function AboutMeSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-5xl font-extrabold text-gray-900 mb-2"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Passionate about building systems that scale and solve real-world problems
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Bio */}
          <motion.div 
            className="flex-1 space-y-6"
            variants={containerVariants}
          >
            <motion.p 
              className="text-base md:text-[17px] text-gray-700 font-sans"
              variants={itemVariants}
            >
              I'm Shailendra Mourya, a versatile and driven Computer Science undergraduate with hands-on experience in Cybersecurity Enthusiast, full-stack web development, and graphic design. My passion lies in leveraging technology to create secure, user-friendly, and visually engaging digital solutions. I've contributed to projects ranging from a blockchain-based voting platform with biometric authentication to AI-powered travel planning websites and creative design galleries. With a solid grasp of programming languages (C, C++, Python, Java, JavaScript), I enjoy solving complex problems and staying updated with emerging tech trends.
            </motion.p>
            <motion.p 
              className="text-base md:text-[17px] text-gray-700 font-sans"
              variants={itemVariants}
            >
              Beyond development, I hold certifications in Cybersecurity Enthusiast fundamentals and have explored tools like Burp Suite, OWASP ZAP, and Kali Linux. My design background includes internships and creative work using Figma, Canva, and Adobe Photoshop. Whether it's safeguarding systems or building beautiful, functional interfaces, I approach every project with creativity, curiosity, and a learner's mindset. I'm always excited to collaborate, grow, and make an impact through technology.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3 mt-4"
              variants={containerVariants}
            >
              {badges.map((badge, index) => (
                <motion.span 
                  key={badge} 
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer"
                  variants={badgeVariants}
                  whileHover="hover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right: Feature Cards */}
          <motion.div 
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                className="bg-white rounded-xl shadow p-4 text-center flex flex-col items-center justify-center cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 