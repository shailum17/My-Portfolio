import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'light' | 'dark' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  animate?: boolean;
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  light: 'bg-light',
  dark: 'bg-gray-900 text-white',
  gradient: 'bg-gradient-to-br from-blue-50 via-purple-50 to-white'
};

const paddingClasses = {
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24'
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '',
  background = 'white',
  padding = 'lg',
  container = true,
  animate = true 
}: SectionProps) {
  const SectionWrapper = animate ? motion.section : 'section';
  const ContentWrapper = animate ? motion.div : 'div';

  const sectionContent = (
    <>
      {(title || subtitle) && (
        <ContentWrapper
          className="text-center mb-12"
          variants={animate ? itemVariants : undefined}
          initial={animate ? "hidden" : undefined}
          whileInView={animate ? "visible" : undefined}
          viewport={animate ? { once: true, amount: 0.3 } : undefined}
        >
          {title && (
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </ContentWrapper>
      )}
      
      <ContentWrapper
        variants={animate ? itemVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={animate ? { once: true, amount: 0.3 } : undefined}
      >
        {children}
      </ContentWrapper>
    </>
  );

  return (
    <SectionWrapper
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
      variants={animate ? containerVariants : undefined}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? { once: true, amount: 0.3 } : undefined}
    >
      {container ? (
        <div className="container mx-auto px-4">
          {sectionContent}
        </div>
      ) : (
        sectionContent
      )}
    </SectionWrapper>
  );
} 