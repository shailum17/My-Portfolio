// Environment configuration for API endpoints
export const config = {
  // API base URL - defaults to localhost:5000 in development
  apiUrl: (() => {
    if (typeof window !== 'undefined') {
      // Browser environment
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:5000';
      }
    }
    // Production or unknown environment - use same origin
    return '';
  })()
};
