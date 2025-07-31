import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FloatingElement, GradientText, MagneticElement } from "../ui/ScrollAnimations";
import { analytics } from "../../utils/analytics";

const typingPhrases = [
  "Cybersecurity Enthusiast ",
  "Web Developer",
  "Programmer"
];

function useTypingEffect(phrases: string[], speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (display.length < phrases[index].length) {
        timeout = setTimeout(() => {
          setDisplay(phrases[index].slice(0, display.length + 1));
        }, speed);
      } else {
        setTyping(false);
        timeout = setTimeout(() => setTyping(true), pause);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(phrases[index].slice(0, display.length - 1));
        }, speed / 2);
      } else {
        setTyping(true);
        setIndex((index + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, index, phrases, speed, pause]);

  return display;
}

export default function HeroSection() {
  const typedSubtitle = useTypingEffect(typingPhrases);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden font-sans">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/video.mp4"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[60vh] w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 gap-6 sm:gap-8 md:gap-12 lg:gap-20">
        {/* Landing Page Image Left */}
        <FloatingElement duration={4}>
          <motion.div 
            className="flex-shrink-0 flex flex-col items-center mb-6 sm:mb-8 md:mb-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src="/assets/Landing_page.png"
              alt="Portfolio Landing Page"
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain rounded-lg shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                backdropFilter: 'blur(10px)'
              }}
            />
          </motion.div>
        </FloatingElement>
        
        {/* Info Right */}
        <motion.div 
          className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 font-heading drop-shadow-lg font-sans break-words"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <GradientText>Shailendra Mourya</GradientText>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 max-w-2xl font-medium drop-shadow h-8 sm:h-10 md:h-12 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="text-secondary">{typedSubtitle}</span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.p>
          
          <motion.p 
            className="mb-2 text-base sm:text-lg text-gray-200 font-medium font-sans leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Passionate about defending digital frontiers and building secure, modern web applications.<br className="hidden sm:block" />
            Experienced in penetration testing, full-stack development, and cloud deployment.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z" /></svg>
              India
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H9m3 0h3" /></svg>
              <span className="hidden sm:inline">shailendramourya17@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <MagneticElement>
              <a 
                href="#projects" 
                className="btn-primary text-base sm:text-lg shadow-lg w-full sm:w-auto text-center"
                onClick={() => analytics.trackEngagement('view_projects_click')}
              >
                View Projects
              </a>
            </MagneticElement>
            <MagneticElement>
              <a 
                href="/assets/Resume.pdf" 
                className="btn-secondary text-base sm:text-lg shadow-lg w-full sm:w-auto text-center" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => analytics.trackResumeDownload()}
              >
                Download Resume
              </a>
            </MagneticElement>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
