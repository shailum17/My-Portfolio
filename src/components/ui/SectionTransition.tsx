import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function SectionTransition({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.8 
}: SectionTransitionProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
export const StaggeredItem = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number; 
}) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Fade in animation
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.8 
}: { 
  children: ReactNode; 
  delay?: number; 
  duration?: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// Slide in from left
export const SlideInLeft = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// Slide in from right
export const SlideInRight = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// Scale in animation
export const ScaleIn = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}; 