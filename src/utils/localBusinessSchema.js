/**
 * Local Business Structured Data for Proxima Cloud
 * Enhances local SEO visibility and Google Business Profile integration
 */

export const getLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://proximacloud.com/#localbusiness",
    "name": "Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.",
    "alternateName": "Proxima Cloud",
    "description": "Professional cloud migration, web development, mobile apps, and digital transformation services. Expert technology solutions for modern businesses.",
    "url": "https://proximacloud.com",
    "logo": "https://proximacloud.com/images/logo.png",
    "image": [
      "https://proximacloud.com/images/og-image.png",
      "https://proximacloud.com/images/screenshot-wide.png"
    ],
    "telephone": "+91-98765-43210",
    "email": "info@proximacloud.com",
    "priceRange": "₹₹₹",
    "currenciesAccepted": "INR, USD, EUR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, Online Payment",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Electronic City",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560100",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "State",
        "name": "Karnataka"
      },
      {
        "@type": "City",
        "name": "Bangalore"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      "geoRadius": "50000"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ],
    "foundingDate": "2019",
    "founders": [
      {
        "@type": "Person",
        "name": "Proxima Cloud Team"
      }
    ],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 5,
      "maxValue": 25
    },
    "knowsAbout": [
      "Cloud Computing",
      "Web Development", 
      "Mobile App Development",
      "Digital Transformation",
      "AWS",
      "Microsoft Azure",
      "Google Cloud Platform",
      "React",
      "Node.js",
      "Database Management",
      "DevOps",
      "Cloud Migration",
      "Software Consulting"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cloud Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Migration",
            "description": "Seamlessly transition your infrastructure to the cloud with zero downtime",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Proxima Cloud"
            }
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom web applications and websites using modern technologies",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Proxima Cloud"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Mobile App Development",
            "description": "Native and cross-platform mobile applications",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Proxima Cloud"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Transformation",
            "description": "Complete digital transformation consulting and implementation",
            "provider": {
              "@type": "LocalBusiness", 
              "name": "Proxima Cloud"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Satisfied Client"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excellent cloud migration services. Professional team with deep technical expertise."
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/proxima-cloud",
      "https://twitter.com/proximacloud",
      "https://github.com/proximacloud"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://proximacloud.com/"
    },
    "potentialAction": [
      {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://proximacloud.com/contact",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Consultation Booking"
        }
      }
    ]
  };
};

/**
 * Professional Service Organization Schema
 * For B2B service providers
 */
export const getProfessionalServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://proximacloud.com/#professionalservice",
    "name": "Proxima Cloud - Cloud Solutions & Web Development",
    "description": "Professional cloud computing and web development services for businesses",
    "provider": {
      "@type": "Organization",
      "name": "Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd."
    },
    "areaServed": "IN",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://proximacloud.com",
      "serviceSmsNumber": "+91-98765-43210",
      "servicePhone": "+91-98765-43210"
    },
    "category": [
      "Cloud Computing",
      "Web Development",
      "Software Development",
      "IT Consulting"
    ],
    "termsOfService": "https://proximacloud.com/terms",
    "hasCertification": [
      {
        "@type": "Certification",
        "name": "AWS Certified Solutions Architect"
      },
      {
        "@type": "Certification", 
        "name": "Microsoft Azure Certified"
      }
    ]
  };
};

/**
 * Software Application Schema for ProximaShare tool
 */
export const getProximaShareSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProximaShare",
    "description": "Secure file sharing tool with automatic expiry and easy link generation",
    "url": "https://share.proximacloud.in",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "File Sharing",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "Proxima Cloud"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Proxima Cloud"
    },
    "featureList": [
      "Secure file sharing",
      "Automatic link expiry",
      "Easy upload interface",
      "Privacy focused",
      "No registration required"
    ],
    "screenshot": "https://proximacloud.com/images/proximashare-screenshot.png"
  };
};