/**
 * Performance Monitoring Utility for Space-Folio
 * Tracks Core Web Vitals and sends data to analytics
 */

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (good < 2.5s)
  FID: 100,  // First Input Delay (good < 100ms)
  CLS: 0.1,  // Cumulative Layout Shift (good < 0.1)
  FCP: 1800, // First Contentful Paint (good < 1.8s)
  TTFB: 800  // Time to First Byte (good < 800ms)
};

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isEnabled = typeof window !== 'undefined' && 'performance' in window;
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (!this.isEnabled) {
      console.warn('Performance API not supported');
      return;
    }

    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.measureFCP();
    this.measureTTFB();
    this.measureResourceTiming();
    
    // Report metrics when page is about to unload
    window.addEventListener('beforeunload', () => {
      this.reportMetrics();
    });

    // Also report after 5 seconds for early insights
    setTimeout(() => {
      this.reportMetrics();
    }, 5000);
  }

  /**
   * Observe Largest Contentful Paint
   */
  observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.metrics.LCP = {
        value: Math.round(lastEntry.startTime),
        rating: this.getRating(lastEntry.startTime, THRESHOLDS.LCP),
        entries: entries.length
      };
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(observer);
  }

  /**
   * Observe First Input Delay
   */
  observeFID() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.FID = {
          value: Math.round(entry.processingStart - entry.startTime),
          rating: this.getRating(entry.processingStart - entry.startTime, THRESHOLDS.FID),
          entryType: entry.name
        };
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    this.observers.push(observer);
  }

  /**
   * Observe Cumulative Layout Shift
   */
  observeCLS() {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (sessionValue && 
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            
            this.metrics.CLS = {
              value: Math.round(clsValue * 10000) / 10000,
              rating: this.getRating(clsValue, THRESHOLDS.CLS),
              entries: sessionEntries.length
            };
          }
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  /**
   * Measure First Contentful Paint
   */
  measureFCP() {
    const perfEntries = performance.getEntriesByType('paint');
    const fcpEntry = perfEntries.find(entry => entry.name === 'first-contentful-paint');
    
    if (fcpEntry) {
      this.metrics.FCP = {
        value: Math.round(fcpEntry.startTime),
        rating: this.getRating(fcpEntry.startTime, THRESHOLDS.FCP),
        entryType: 'paint'
      };
    }
  }

  /**
   * Measure Time to First Byte
   */
  measureTTFB() {
    const navEntry = performance.getEntriesByType('navigation')[0];
    if (navEntry) {
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      this.metrics.TTFB = {
        value: Math.round(ttfb),
        rating: this.getRating(ttfb, THRESHOLDS.TTFB),
        entryType: 'navigation'
      };
    }
  }

  /**
   * Measure Resource Timing
   */
  measureResourceTiming() {
    const resources = performance.getEntriesByType('resource');
    const images = resources.filter(r => r.initiatorType === 'img');
    const scripts = resources.filter(r => r.initiatorType === 'script');
    const stylesheets = resources.filter(r => r.initiatorType === 'link');

    this.metrics.resources = {
      total: resources.length,
      images: images.length,
      scripts: scripts.length,
      stylesheets: stylesheets.length,
      averageLoadTime: resources.length > 0 
        ? Math.round(resources.reduce((sum, r) => sum + r.duration, 0) / resources.length)
        : 0
    };
  }

  /**
   * Get performance rating (good/needs-improvement/poor)
   */
  getRating(value, threshold) {
    if (typeof threshold === 'object') {
      if (value <= threshold.good) return 'good';
      if (value <= threshold.poor) return 'needs-improvement';
      return 'poor';
    } else {
      if (value <= threshold) return 'good';
      if (value <= threshold * 1.5) return 'needs-improvement';
      return 'poor';
    }
  }

  /**
   * Report metrics to console and analytics
   */
  reportMetrics() {
    console.group('🚀 Core Web Vitals Report');
    
    Object.entries(this.metrics).forEach(([metric, data]) => {
      if (typeof data === 'object' && data.value !== undefined) {
        const emoji = data.rating === 'good' ? '✅' : 
                     data.rating === 'needs-improvement' ? '⚠️' : '❌';
        console.log(`${emoji} ${metric}: ${data.value}${metric === 'CLS' ? '' : 'ms'} (${data.rating})`);
      } else if (metric === 'resources') {
        console.log('📊 Resources:', data);
      }
    });
    
    console.groupEnd();

    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      Object.entries(this.metrics).forEach(([metric, data]) => {
        if (data.value !== undefined) {
          gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: metric,
            value: Math.round(data.value),
            custom_parameter_rating: data.rating
          });
        }
      });
    }
  }

  /**
   * Cleanup observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Initialize performance monitoring in production
let monitor = null;

if (import.meta.env.MODE === 'production') {
  monitor = new PerformanceMonitor();
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => monitor.init());
  } else {
    monitor.init();
  }
} else {
  console.info('Performance monitoring disabled in development mode');
}

export default monitor;