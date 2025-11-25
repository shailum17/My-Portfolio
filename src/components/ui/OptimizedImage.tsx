import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 * 
 * Enhanced image component with responsive loading capabilities.
 * 
 * Current Features:
 * - Lazy loading with Intersection Observer
 * - Blur placeholder while loading
 * - Explicit width/height to prevent CLS
 * - Support for priority (above-the-fold) images
 * - Error handling with fallback UI
 * 
 * Future Enhancement (after Task 1 - Image Optimization Pipeline):
 * - Automatic WebP/AVIF format generation
 * - Multiple responsive image sizes (srcset)
 * - Optimized compression
 * 
 * Currently uses original image formats until the build-time optimization
 * pipeline is configured in Task 1.
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholder?: string;
  fallback?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Check if modern image formats should be used
 * For now, we'll only use the original format until the image optimization pipeline is set up
 */
function shouldUseModernFormats(src: string): boolean {
  // Check if the source already includes modern format indicators
  // This will be true once Task 1 (image optimization pipeline) is implemented
  return src.includes('.webp') || src.includes('.avif');
}

/**
 * Generate srcset for responsive images
 * Currently uses original format, will support WebP/AVIF after Task 1
 */
function generateSrcSet(src: string): string {
  // For now, just return the original source
  // Once image optimization pipeline is set up, this will generate multiple sizes
  return src;
}

/**
 * Generate WebP and AVIF source elements
 * Will be fully utilized after Task 1 (image optimization pipeline) is implemented
 */
function getModernImageSources(src: string) {
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  
  // Only generate modern sources if they're likely to exist
  if (shouldUseModernFormats(src)) {
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      hasModernFormats: true
    };
  }
  
  return {
    avif: '',
    webp: '',
    hasModernFormats: false
  };
}

/**
 * Generate blur placeholder as base64 SVG
 */
function generateBlurPlaceholder(width: number, height: number): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+',
  priority = false,
  sizes = '100vw',
  onLoad,
  onError
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Generate blur placeholder if not provided
  const blurPlaceholder = placeholder || generateBlurPlaceholder(width, height);
  
  // Generate responsive image sources
  const srcSet = generateSrcSet(src);
  const modernSources = getModernImageSources(src);
  const useModernFormats = modernSources.hasModernFormats;

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images
    
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before entering viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    onError?.();
  };

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Blur placeholder - shown while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
          style={{
            backgroundImage: `url(${blurPlaceholder})`,
            filter: 'blur(20px)'
          }}
        />
      )}
      
      {/* Loading spinner */}
      {!isLoaded && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Responsive picture element with modern formats */}
      {(isVisible || priority) && !hasError && (
        <picture>
          {/* AVIF format - best compression (only if available) */}
          {useModernFormats && modernSources.avif && (
            <source
              type="image/avif"
              srcSet={modernSources.avif}
              sizes={sizes}
            />
          )}
          
          {/* WebP format - good compression, wide support (only if available) */}
          {useModernFormats && modernSources.webp && (
            <source
              type="image/webp"
              srcSet={modernSources.webp}
              sizes={sizes}
            />
          )}
          
          {/* Fallback to original format */}
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </motion.div>
  );
} 