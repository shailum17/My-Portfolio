import { useEffect } from 'react';
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
  const startTime = Date.now();

  useEffect(() => {
    // Initialize enhanced performance monitoring
    initPerformanceMonitoring();

    // Track scroll depth
    const handleScroll = () => {
      trackScrollDepth();
    };

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      trackTimeOnPage(startTime);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup on unmount
    return () => {
      cleanupPerformanceMonitoring();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackTimeOnPage(startTime);
    };
  }, [trackScrollDepth, trackTimeOnPage, startTime]);

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
