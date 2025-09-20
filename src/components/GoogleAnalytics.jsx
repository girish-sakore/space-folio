import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

/**
 * Google Analytics 4 Component
 * Handles pageview tracking and custom events
 */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only load in production or when explicitly enabled
    if (import.meta.env.MODE !== 'production' && !import.meta.env.VITE_GA_ENABLED) {
      console.log('📊 Google Analytics disabled in development');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false, // We'll handle this manually
        // Enhanced ecommerce for business tracking
        custom_parameters: {
          business_type: 'cloud_services',
          company: 'proxima_cloud'
        },
        // Performance and user experience
        anonymize_ip: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: false
      });

      // Track Core Web Vitals automatically
      gtag('config', '${GA_MEASUREMENT_ID}', {
        custom_map: {
          'custom_parameter_lcp': 'lcp_score',
          'custom_parameter_fid': 'fid_score', 
          'custom_parameter_cls': 'cls_score'
        }
      });
    `;
    document.head.appendChild(script2);

    // Make gtag available globally for performance monitor
    window.gtag = window.gtag || function() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    };

    console.log('📊 Google Analytics 4 initialized');

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search
      });

      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
};

// Analytics utility functions
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  } else {
    console.log('📊 Track Event:', eventName, parameters);
  }
};

// Business-specific tracking functions
export const trackBusinessEvent = {
  // Lead generation tracking
  leadGenerated: (source, value = 0) => {
    trackEvent('generate_lead', {
      event_category: 'Lead Generation',
      event_label: source,
      value: value,
      currency: 'USD'
    });
  },

  // Contact form submissions
  contactSubmitted: (formType, source) => {
    trackEvent('contact_submit', {
      event_category: 'Contact',
      event_label: formType,
      form_source: source
    });
  },

  // Pricing calculator usage
  pricingCalculated: (serviceType, totalValue) => {
    trackEvent('pricing_calculated', {
      event_category: 'Pricing Calculator',
      event_label: serviceType,
      value: totalValue,
      currency: 'USD'
    });
  },

  // Portfolio interactions
  portfolioViewed: (projectName, category) => {
    trackEvent('portfolio_view', {
      event_category: 'Portfolio',
      event_label: projectName,
      project_category: category
    });
  },

  // Tool usage
  toolUsed: (toolName, action) => {
    trackEvent('tool_usage', {
      event_category: 'Tools',
      event_label: toolName,
      tool_action: action
    });
  },

  // Service interest
  serviceInterest: (serviceName, source) => {
    trackEvent('service_interest', {
      event_category: 'Services',
      event_label: serviceName,
      interest_source: source
    });
  },

  // File downloads
  fileDownloaded: (fileName, fileType) => {
    trackEvent('file_download', {
      event_category: 'Downloads',
      event_label: fileName,
      file_type: fileType
    });
  },

  // Social media clicks
  socialClick: (platform, location) => {
    trackEvent('social_click', {
      event_category: 'Social Media',
      event_label: platform,
      click_location: location
    });
  },

  // Search functionality
  searchPerformed: (query, resultsCount) => {
    trackEvent('search', {
      search_term: query,
      event_category: 'Search',
      results_count: resultsCount
    });
  }
};

// Conversion tracking
export const trackConversion = (conversionName, value = 0) => {
  trackEvent('conversion', {
    event_category: 'Conversions',
    event_label: conversionName,
    value: value,
    currency: 'USD'
  });
};

// E-commerce style tracking for services
export const trackPurchaseIntent = (service, value) => {
  trackEvent('purchase_intent', {
    event_category: 'Purchase Intent',
    items: [{
      item_id: service.id || service,
      item_name: service.name || service,
      item_category: service.category || 'cloud_services',
      quantity: 1,
      price: value || 0
    }],
    currency: 'USD',
    value: value || 0
  });
};

export default GoogleAnalytics;