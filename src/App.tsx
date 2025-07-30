import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/ui/PageTransition';
import { initPerformanceMonitoring, cleanupPerformanceMonitoring } from './utils/performance';

export default function App() {
  useEffect(() => {
    // Initialize enhanced performance monitoring
    initPerformanceMonitoring();

    // Cleanup on unmount
    return () => {
      cleanupPerformanceMonitoring();
    };
  }, []);

  return (
    <PageTransition>
      <CustomCursor />
      <Header />
      <HomePage />
      <Footer />
    </PageTransition>
  );
}
