// Loading optimization utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/assets/video.mp4',
    '/assets/Landing_page.png',
    '/assets/education/bg.png'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.endsWith('.mp4')) {
      link.as = 'video';
      link.type = 'video/mp4';
    } else if (resource.endsWith('.png')) {
      link.as = 'image';
      link.type = 'image/png';
    }
    
    document.head.appendChild(link);
  });
};

// Add resource hints for external domains
export const addResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'preconnect', href: 'https://api.iconify.design' },
    { rel: 'preconnect', href: 'https://www.svgrepo.com' },
    { rel: 'preconnect', href: 'https://img.icons8.com' },
    { rel: 'preconnect', href: 'https://va.vercel-scripts.com' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Add font-display: swap to Google Fonts
  const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
  if (fontLink) {
    fontLink.setAttribute('media', 'print');
    fontLink.setAttribute('onload', "this.media='all'");
  }
};

// Initialize loading optimizations
export const initLoadingOptimizations = () => {
  // Add resource hints
  addResourceHints();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Optimize font loading
  optimizeFontLoading();
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Loading optimizations initialized');
  }
}; 