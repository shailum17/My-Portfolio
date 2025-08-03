import { useState, useEffect, useRef, RefObject } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useLazyLoad<T extends HTMLElement = HTMLElement>(
  options: UseLazyLoadOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible];
}

export function useLazyImage(src: string, options: UseLazyLoadOptions = {}) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [ref, isVisible] = useLazyLoad<HTMLImageElement>(options);

  useEffect(() => {
    if (!isVisible || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    img.src = src;
  }, [src, isVisible]);

  return {
    ref,
    imageSrc,
    isLoading,
    hasError,
    isVisible
  };
} 