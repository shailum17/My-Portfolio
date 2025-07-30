// Enhanced Performance monitoring utilities
interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  domLoad: number;
  windowLoad: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initObservers();
    this.measurePageLoad();
  }

  private initObservers() {
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('🚀 LCP:', Math.round(lastEntry.startTime), 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (error) {
      console.warn('LCP observer failed:', error);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          this.metrics.fid = fid;
          console.log('⚡ FID:', Math.round(fid), 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (error) {
      console.warn('FID observer failed:', error);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });
        this.metrics.cls = clsValue;
        console.log('📐 CLS:', clsValue.toFixed(3));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('CLS observer failed:', error);
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        this.metrics.fcp = firstEntry.startTime;
        console.log('🎨 FCP:', Math.round(firstEntry.startTime), 'ms');
      });
      fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });
      this.observers.push(fcpObserver);
    } catch (error) {
      console.warn('FCP observer failed:', error);
    }
  }

  private measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.domLoad = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        this.metrics.windowLoad = navigation.loadEventEnd - navigation.loadEventStart;

        console.log('📊 Page Load Metrics:');
        console.log('  TTFB:', Math.round(this.metrics.ttfb), 'ms');
        console.log('  DOM Load:', Math.round(this.metrics.domLoad), 'ms');
        console.log('  Window Load:', Math.round(this.metrics.windowLoad), 'ms');
      }
    });
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Resource timing analysis
export const analyzeResourceTiming = () => {
  const resources = performance.getEntriesByType('resource');
  const slowResources = resources.filter((resource) => resource.duration > 1000);
  const largeResources = resources.filter((resource) => {
    const transferSize = (resource as any).transferSize || 0;
    return transferSize > 500 * 1024; // 500KB
  });
  
  if (slowResources.length > 0) {
    console.warn('🐌 Slow resources detected:', slowResources.map(r => ({
      name: r.name,
      duration: Math.round(r.duration),
      size: Math.round((r as any).transferSize / 1024) + 'KB'
    })));
  }

  if (largeResources.length > 0) {
    console.warn('📦 Large resources detected:', largeResources.map(r => ({
      name: r.name,
      size: Math.round((r as any).transferSize / 1024) + 'KB'
    })));
  }

  return { slowResources, largeResources };
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    const usage = {
      used: Math.round(memory.usedJSHeapSize / 1048576),
      total: Math.round(memory.totalJSHeapSize / 1048576),
      limit: Math.round(memory.jsHeapSizeLimit / 1048576)
    };
    
    console.log('🧠 Memory Usage:', {
      used: usage.used + ' MB',
      total: usage.total + ' MB',
      limit: usage.limit + ' MB',
      percentage: Math.round((usage.used / usage.limit) * 100) + '%'
    });

    return usage;
  }
  return null;
};

// Network information
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    console.log('🌐 Network Info:', {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink + ' Mbps',
      rtt: connection.rtt + ' ms',
      saveData: connection.saveData
    });
    return connection;
  }
  return null;
};

// Core Web Vitals assessment
export const assessCoreWebVitals = (metrics: Partial<PerformanceMetrics>) => {
  const assessment = {
    lcp: 'good',
    fid: 'good',
    cls: 'good'
  };

  if (metrics.lcp) {
    if (metrics.lcp > 4000) assessment.lcp = 'poor';
    else if (metrics.lcp > 2500) assessment.lcp = 'needs-improvement';
  }

  if (metrics.fid) {
    if (metrics.fid > 300) assessment.fid = 'poor';
    else if (metrics.fid > 100) assessment.fid = 'needs-improvement';
  }

  if (metrics.cls) {
    if (metrics.cls > 0.25) assessment.cls = 'poor';
    else if (metrics.cls > 0.1) assessment.cls = 'needs-improvement';
  }

  console.log('📈 Core Web Vitals Assessment:', assessment);
  return assessment;
};

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    performanceMonitor = new PerformanceMonitor();
    
    // Measure resource timing after page load
    setTimeout(() => {
      analyzeResourceTiming();
      getMemoryUsage();
      getNetworkInfo();
      
      // Assess Core Web Vitals after a delay
      setTimeout(() => {
        const metrics = performanceMonitor?.getMetrics();
        if (metrics) {
          assessCoreWebVitals(metrics);
        }
      }, 3000);
    }, 2000);
  }
};

export const cleanupPerformanceMonitoring = () => {
  if (performanceMonitor) {
    performanceMonitor.disconnect();
    performanceMonitor = null;
  }
};

// Legacy exports for backward compatibility
export const measurePerformance = initPerformanceMonitoring;
export const measureResourceTiming = analyzeResourceTiming;
export const measureMemoryUsage = getMemoryUsage; 