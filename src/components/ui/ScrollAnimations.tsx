import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Parallax scroll effect
export const ParallaxSection = ({ 
  children, 
  speed = 0.5,
  className = '' 
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating animation
export const FloatingElement = ({ 
  children, 
  duration = 3,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation
export const PulseElement = ({ 
  children, 
  duration = 2,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Rotate animation
export const RotateElement = ({ 
  children, 
  duration = 20,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

// Bounce animation
export const BounceElement = ({ 
  children, 
  duration = 1,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Shake animation
export const ShakeElement = ({ 
  children, 
  duration = 0.5,
  className = '' 
}: { 
  children: React.ReactNode; 
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, -5, 5, -5, 5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Gradient text animation
export const GradientText = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
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

// Typewriter effect
export const TypewriterText = ({ 
  text, 
  speed = 50,
  className = '' 
}: { 
  text: string; 
  speed?: number;
  className?: string;
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * (speed / 1000),
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Magnetic effect
export const MagneticElement = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) / 15;
    const y = (clientY - top - height / 2) / 15;
    
    // Use CSS custom properties instead of inline transform
    ref.current.style.setProperty('--magnetic-x', `${x}px`);
    ref.current.style.setProperty('--magnetic-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--magnetic-x', '0px');
    ref.current.style.setProperty('--magnetic-y', '0px');
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-element ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--magnetic-x': '0px',
        '--magnetic-y': '0px',
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}; 