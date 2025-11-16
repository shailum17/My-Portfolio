import { useEffect, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import HomePage from './pages/HomePage';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/ui/PageTransition';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { initPerformanceMonitoring, cleanupPerformanceMonitoring } from './utils/performance';
import { useScrollTracking, useTimeTracking } from './utils/analytics';

export default function App() {
  const { trackScrollDepth } = useScrollTracking();
  const { trackTimeOnPage } = useTimeTracking();
  const startTimeRef = useRef<number>(Date.now());

  // Memoize scroll handler to prevent recreation on every render
  const handleScroll = useCallback(() => {
    trackScrollDepth();
  }, [trackScrollDepth]);

  // Memoize beforeunload handler
  const handleBeforeUnload = useCallback(() => {
    trackTimeOnPage(startTimeRef.current);
  }, [trackTimeOnPage]);

  useEffect(() => {
    // Initialize enhanced performance monitoring
    initPerformanceMonitoring();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup on unmount
    return () => {
      cleanupPerformanceMonitoring();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackTimeOnPage(startTimeRef.current);
    };
  }, []); // Remove dependencies to prevent re-running

  return (
    <ErrorBoundary>
      <PageTransition>
        <CustomCursor />
        <Header />
        <HomePage />
        <Footer />
      </PageTransition>
      <Analytics />
    </ErrorBoundary>
  );
}
