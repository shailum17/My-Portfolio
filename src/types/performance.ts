/**
 * Type definitions for performance monitoring utilities
 */

/**
 * Core Web Vitals metrics
 */
export interface PerformanceMetrics {
  lcp: number;  // Largest Contentful Paint
  fid: number;  // First Input Delay
  cls: number;  // Cumulative Layout Shift
  fcp: number;  // First Contentful Paint
  ttfb: number; // Time to First Byte
  domLoad: number;
  windowLoad: number;
}

/**
 * Performance entry types from the Performance API
 */
export interface PerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
}

/**
 * Extended performance entry for navigation timing
 */
export interface PerformanceNavigationEntry extends PerformanceEntry {
  requestStart: number;
  responseStart: number;
  domContentLoadedEventStart: number;
  domContentLoadedEventEnd: number;
  loadEventStart: number;
  loadEventEnd: number;
}

/**
 * Extended performance entry for resource timing
 */
export interface PerformanceResourceEntry extends PerformanceEntry {
  transferSize?: number;
  encodedBodySize?: number;
  decodedBodySize?: number;
  initiatorType: string;
}

/**
 * Performance event timing for FID measurement
 */
export interface PerformanceEventEntry extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
}

/**
 * Layout shift entry for CLS measurement
 */
export interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

/**
 * Resource timing analysis result
 */
export interface ResourceTimingAnalysis {
  slowResources: PerformanceEntry[];
  largeResources: PerformanceEntry[];
}

/**
 * Resource info for logging
 */
export interface ResourceInfo {
  name: string;
  duration: number;
  size: string;
}

/**
 * Memory usage information
 */
export interface MemoryUsage {
  used: number;  // MB
  total: number; // MB
  limit: number; // MB
}

/**
 * Memory usage with percentage
 */
export interface MemoryUsageInfo extends MemoryUsage {
  percentage: number;
}

/**
 * Network connection information
 */
export interface NetworkInfo {
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
  downlink: number; // Mbps
  rtt: number;      // ms
  saveData: boolean;
}

/**
 * Core Web Vitals assessment result
 */
export interface WebVitalsAssessment {
  lcp: 'good' | 'needs-improvement' | 'poor';
  fid: 'good' | 'needs-improvement' | 'poor';
  cls: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Performance metric thresholds
 */
export interface PerformanceThresholds {
  lcp: {
    good: number;
    needsImprovement: number;
  };
  fid: {
    good: number;
    needsImprovement: number;
  };
  cls: {
    good: number;
    needsImprovement: number;
  };
}

/**
 * Performance observer callback entry
 */
export interface PerformanceObserverEntry {
  getEntries(): PerformanceEntry[];
  getEntriesByType(type: string): PerformanceEntry[];
  getEntriesByName(name: string, type?: string): PerformanceEntry[];
}

/**
 * Performance monitor interface
 */
export interface PerformanceMonitorInterface {
  getMetrics(): Partial<PerformanceMetrics>;
  dispose(): void;
  disconnect(): void;
}
