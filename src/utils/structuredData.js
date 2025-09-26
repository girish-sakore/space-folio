// Structured Data Schema Utilities

// Base Organization Schema
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.",
    "alternateName": "Proxima Cloud",
    "url": "https://proximacloud.in",
    "logo": "https://proximacloud.in/images/logo.png",
    "image": "https://proximacloud.in/images/og-image.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-77987-29845",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://linkedin.com/company/proxima-cloud",
      "https://twitter.com/proximacloud"
    ],
    "foundingDate": "2019",
    "founders": [
      {
        "@type": "Person",
        "name": "Proxima Cloud Founders"
      }
    ],
    "knowsAbout": [
      "Cloud Computing",
      "Web Development",
      "Mobile App Development",
      "Digital Transformation",
      "AWS",
      "Azure",
      "Google Cloud",
      "React",
      "Node.js"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      "geoRadius": "50000"
    }
  });
  
  // WebSite Schema
  export const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Proxima Cloud",
    "alternateName": "Proxima Centauri Cloud Solutions",
    "url": "https://proximacloud.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://proximacloud.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Proxima Cloud",
      "logo": "https://proximacloud.in/images/logo.png"
    }
  });
  
  // Service Schema
  export const getServiceSchema = (serviceName, description, serviceType = "Service") => ({
    "@context": "https://schema.org",
    "@type": serviceType,
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Proxima Cloud",
      "url": "https://proximacloud.in"
    },
    "serviceType": serviceName,
    "areaServed": "IN",
    "availableLanguage": "en"
  });
  
  // Breadcrumb Schema
  export const getBreadcrumbSchema = (breadcrumbs) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  });
  
  // WebPage Schema
  export const getWebPageSchema = (title, description, url, pageType = "WebPage") => ({
    "@context": "https://schema.org",
    "@type": pageType,
    "name": title,
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "Organization",
      "name": "Proxima Cloud"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Proxima Cloud",
      "logo": "https://proximacloud.in/images/logo.png"
    },
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US"
  });
  
  // FAQ Schema
  export const getFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
  
  // Article Schema
  export const getArticleSchema = (title, description, author, datePublished, dateModified, image, url) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Proxima Cloud",
      "logo": "https://proximacloud.in/images/logo.png"
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "image": image,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  });
  
  // Local Business Schema
  export const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.",
    "image": "https://proximacloud.in/images/logo.png",
    "telephone": "+91-77987-29845",
    "email": "info@proximacloud.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tech Park, Whitefield",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560066",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "url": "https://proximacloud.in",
    "sameAs": [
      "https://linkedin.com/company/proxima-cloud",
      "https://twitter.com/proximacloud"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  });
  
  // Product/Service Portfolio Schema
  export const getPortfolioSchema = (projects) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Proxima Cloud Portfolio",
    "description": "Showcase of our cloud solutions and web development projects",
    "creator": {
      "@type": "Organization",
      "name": "Proxima Cloud"
    },
    "hasPart": projects.map(project => ({
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "image": project.image,
      "url": project.url
    }))
  });
  
  // Contact Page Schema
  export const getContactPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Proxima Cloud",
    "description": "Get in touch with Proxima Cloud for your technology needs",
    "url": "https://proximacloud.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Proxima Cloud",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-77987-29845",
        "contactType": "customer service",
        "email": "info@proximacloud.in"
      }
    }
  });
  
  // About Page Schema
  export const getAboutPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Proxima Cloud",
    "description": "Learn about Proxima Cloud's mission, vision, and expertise in cloud solutions",
    "url": "https://proximacloud.in/about",
    "mainEntity": getOrganizationSchema()
  });
  