import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLazyImage } from '../../hooks/useLazyLoad';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+',
  priority = false,
  sizes = '100vw',
  onLoad,
  onError
}: OptimizedImageProps) {
  // Use the custom lazy loading hook for better performance
  const { ref: imgRef, imageSrc, isLoading, hasError, isVisible } = useLazyImage(
    priority ? src : '', // Load immediately if priority
    { threshold: 0.1, rootMargin: '100px' }
  );
  
  const [currentSrc, setCurrentSrc] = useState<string>(priority ? src : placeholder);
  const [isImageLoading, setIsImageLoading] = useState(!priority);

  useEffect(() => {
    if (priority || isVisible) {
      setCurrentSrc(src);
      setIsImageLoading(true);
    }
  }, [src, priority, isVisible]);

  useEffect(() => {
    if (imageSrc && !isLoading) {
      setCurrentSrc(imageSrc);
      setIsImageLoading(false);
      onLoad?.();
    }
  }, [imageSrc, isLoading, onLoad]);

  useEffect(() => {
    if (hasError) {
      setCurrentSrc(fallback);
      setIsImageLoading(false);
      onError?.();
    }
  }, [hasError, fallback, onError]);

  const handleError = () => {
    setCurrentSrc(fallback);
    setIsImageLoading(false);
    onError?.();
  };

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0.7 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {isImageLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        className="w-full h-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onError={handleError}
        onLoad={() => {
          setIsImageLoading(false);
          onLoad?.();
        }}
      />
      
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