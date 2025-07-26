import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/ui/PageTransition';
import { measurePerformance, measureResourceTiming, measureMemoryUsage } from './utils/performance';

export default function App() {
  useEffect(() => {
    // Initialize performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      measurePerformance();
      
      // Measure resource timing after page load
      setTimeout(() => {
        measureResourceTiming();
        measureMemoryUsage();
      }, 2000);
    }
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
