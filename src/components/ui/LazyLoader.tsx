import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazyLoaderProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  className?: string;
  delay?: number;
}

export default function LazyLoader({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = (
    <div className="w-full h-32 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
  className = '',
  delay = 0
}: LazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div ref={containerRef} className={className}>
      {!isLoaded ? (
        fallback
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
} 