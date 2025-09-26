/**
 * Proxima Cloud Chatbot Knowledge Base
 * 
 * Comprehensive knowledge base containing:
 * - Detailed service information with pricing and timelines
 * - Company information and statistics
 * - Contact details and business hours
 * - Development process and methodology
 * - Technology stack and tools
 * - Pricing structure and payment terms
 * - Frequently asked questions
 * 
 * This data powers the intelligent chatbot responses and ensures
 * accurate, up-to-date information is provided to website visitors.
 * 
 * @author Proxima Cloud Development Team
 * @version 1.0.0
 * @last-updated 2025-01-20
 */

export const knowledgeBase = {
  // Service Details
  services: {
    'cloud migration': {
      description: 'Complete cloud transformation services for AWS, Azure, and Google Cloud Platform',
      pricing: 'Starting from $5,000 - varies by infrastructure complexity',
      timeline: '2-8 weeks depending on application size and complexity',
      benefits: ['Reduced operational costs', '99.9% uptime SLA', 'Automatic scaling', 'Enhanced security'],
      process: ['Infrastructure Assessment', 'Migration Planning', 'Data Transfer', 'Testing & Validation', 'Go-Live Support']
    },

    'web development': {
      description: 'Modern, responsive web applications using cutting-edge technologies',
      pricing: 'Starting from $3,000 for basic websites, $8,000+ for complex applications',
      timeline: '3-12 weeks based on complexity and features',
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'],
      features: ['Mobile-first design', 'SEO optimization', 'Performance optimization', 'CMS integration', 'E-commerce capability']
    },

    'mobile apps': {
      description: 'Native iOS and Android applications plus cross-platform solutions',
      pricing: 'Starting from $8,000 for basic apps, $15,000+ for complex applications',
      timeline: '6-16 weeks depending on features and platforms',
      platforms: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter'],
      services: ['UI/UX Design', 'Development', 'App Store Submission', 'Maintenance & Updates']
    },

    'data analytics': {
      description: 'Business intelligence solutions and data-driven insights',
      pricing: 'Starting from $6,000 - custom pricing for enterprise solutions',
      timeline: '4-12 weeks based on data complexity',
      capabilities: ['Real-time dashboards', 'Predictive analytics', 'Data warehousing', 'Custom reports', 'ML integration'],
      tools: ['Power BI', 'Tableau', 'Apache Spark', 'Python', 'R', 'SQL']
    },

    'devops': {
      description: 'DevOps automation and infrastructure management',
      pricing: 'Starting from $4,000 for basic setups',
      services: ['CI/CD Pipeline Setup', 'Infrastructure as Code', 'Container Orchestration', 'Monitoring & Logging'],
      tools: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'Terraform', 'Ansible']
    },

    'security': {
      description: 'Comprehensive cybersecurity assessments and implementations',
      pricing: 'Starting from $7,000 for security audits',
      services: ['Security Audits', 'Penetration Testing', 'Compliance (SOC2, GDPR)', 'Incident Response'],
      certifications: ['ISO 27001 compliant processes', 'OWASP security standards']
    }
  },

  // Company Information
  company: {
    name: 'Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.',
    founded: '2019',
    location: 'Ramtek, Nagpur, India',
    employees: '10-50 employees',
    specialization: 'Cloud computing, modern web development, and digital transformation',
    stats: {
      projects: '50+ successful projects',
      clients: '30+ satisfied clients',
      rating: '4.9/5 client satisfaction',
      response_time: '2-4 hours during business hours'
    },
    values: ['Innovation', 'Quality', 'Client Success', 'Continuous Learning']
  },

  // Contact Information
  contact: {
    email: 'info@proximacloud.in',
    phone: '+91-77987-29845',
    website: 'proximacloud.in',
    business_hours: 'Monday-Friday, 9:00 AM - 6:00 PM IST',
    timezone: 'India Standard Time (IST)',
    response_time: 'Within 2-4 hours during business days'
  },

  // Process Information
  process: {
    consultation: 'Free 30-minute consultation call to understand your needs',
    proposal: 'Detailed proposal within 24-48 hours',
    contract: 'Flexible contract terms with milestone-based payments',
    development: 'Agile development with weekly progress updates',
    delivery: 'Thorough testing and deployment with documentation',
    support: '3-month warranty with ongoing support options'
  },

  // Technology Stack
  technologies: {
    frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
    backend: ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'ElasticSearch'],
    cloud: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'DigitalOcean'],
    devops: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'Terraform', 'Ansible'],
    mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin']
  },

  // Pricing Information
  pricing: {
    web_basic: '$3,000 - $8,000',
    web_enterprise: '$10,000+',
    mobile_basic: '$8,000 - $15,000',
    mobile_enterprise: '$20,000+',
    cloud_migration: '$5,000+',
    data_analytics: '$6,000+',
    devops_setup: '$4,000+',
    security_audit: '$7,000+',
    payment_terms: '50% upfront, milestone-based payments, 20% on completion',
    payment_methods: 'Bank transfer, international wire transfer'
  },

  // FAQ
  faq: [
    {
      question: 'Do you work with international clients?',
      answer: 'Yes! We work with clients globally. We have experience with US, European, and Asia-Pacific clients.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary: Web projects: 3-12 weeks, Mobile apps: 6-16 weeks, Cloud migration: 2-8 weeks.'
    },
    {
      question: 'Do you provide ongoing maintenance?',
      answer: 'Yes, we offer maintenance packages starting from $500/month including updates, monitoring, and support.'
    },
    {
      question: 'Can you work with existing development teams?',
      answer: 'Absolutely! We can integrate with your existing team or provide dedicated developers.'
    },
    {
      question: 'Do you sign NDAs?',
      answer: 'Yes, we routinely sign NDAs and maintain strict confidentiality for all client projects.'
    }
  ]
};

// Utility functions for the chatbot
export const findServiceInfo = (serviceName) => {
  const service = serviceName.toLowerCase();

  for (const [key, value] of Object.entries(knowledgeBase.services)) {
    if (service.includes(key) || key.includes(service)) {
      return value;
    }
  }

  return null;
};

export const getRandomFAQ = () => {
  const faqs = knowledgeBase.faq;
  return faqs[Math.floor(Math.random() * faqs.length)];
};

export const searchKnowledge = (query) => {
  const lowQuery = query.toLowerCase();
  const results = [];

  // Search in services
  Object.entries(knowledgeBase.services).forEach(([key, service]) => {
    if (key.includes(lowQuery) || service.description.toLowerCase().includes(lowQuery)) {
      results.push({ type: 'service', key, data: service });
    }
  });

  // Search in FAQ
  knowledgeBase.faq.forEach(faq => {
    if (faq.question.toLowerCase().includes(lowQuery) || faq.answer.toLowerCase().includes(lowQuery)) {
      results.push({ type: 'faq', data: faq });
    }
  });

  return results;
};