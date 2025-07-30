import { motion, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Optimized spring configurations for smooth animations
const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5
};

const gentleSpring = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  mass: 1
};

const quickSpring = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.3
};

// Enhanced Floating Element with smoother animation
export const SmoothFloatingElement = ({ 
  children, 
  duration = 4,
  amplitude = 8,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  amplitude?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useAnimationFrame((time) => {
    if (ref.current) {
      const yOffset = Math.sin(time * 0.001) * amplitude;
      y.set(yOffset);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
      transition={smoothSpring}
    >
      {children}
    </motion.div>
  );
};

// Smooth Parallax with optimized performance
export const SmoothParallaxSection = ({ 
  children, 
  speed = 0.3,
  className = '' 
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      y.set(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
      transition={smoothSpring}
    >
      {children}
    </motion.div>
  );
};

// Smooth Pulse with easing
export const SmoothPulseElement = ({ 
  children, 
  duration = 2,
  scale = 1.03,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  scale?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Magnetic Element with improved performance
export const SmoothMagneticElement = ({ 
  children, 
  strength = 0.3,
  className = '' 
}: { 
  children: React.ReactNode; 
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`smooth-magnetic ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={gentleSpring}
    >
      {children}
    </motion.div>
  );
};

// Smooth Gradient Text with optimized animation
export const SmoothGradientText = ({ 
  children, 
  className = '',
  duration = 3
}: { 
  children: React.ReactNode; 
  className?: string;
  duration?: number;
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Fade In with staggered children
export const SmoothFadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = '',
  stagger = 0.1
}: { 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ...smoothSpring
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Stagger Container
export const SmoothStaggerContainer = ({ 
  children, 
  className = '',
  stagger = 0.1
}: { 
  children: React.ReactNode; 
  className?: string;
  stagger?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Stagger Item
export const SmoothStaggerItem = ({ 
  children, 
  className = ''
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: smoothSpring
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Scroll Progress Indicator
export const SmoothScrollProgress = ({ className = '' }: { className?: string }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 ${className}`}
      style={{ scaleX: scrollProgress / 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    />
  );
};

// Smooth Loading Spinner
export const SmoothLoadingSpinner = ({ 
  size = 40,
  className = '' 
}: { 
  size?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
    </motion.div>
  );
};

// Smooth Hover Effect
export const SmoothHoverEffect = ({ 
  children, 
  scale = 1.05,
  className = '' 
}: { 
  children: React.ReactNode; 
  scale?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={gentleSpring}
    >
      {children}
    </motion.div>
  );
};

// Smooth Page Transition
export const SmoothPageTransition = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}; 