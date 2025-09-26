import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getServiceSchema, getWebPageSchema } from '../utils/structuredData';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import { fadeInVariants, slideUpVariants, cardHoverVariants } from '../utils/animationVariants';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Services = () => {
  // Animation hooks
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: servicesRef, controls: servicesControls, containerVariants, itemVariants } = useStaggerAnimation(0.2);
  const { ref: supportRef, controls: supportControls } = useScrollAnimation();

  // Create service schemas for structured data
  const serviceSchemas = [
    getServiceSchema("Cloud Migration", "Seamlessly transition your infrastructure to the cloud with our expert guidance and zero downtime."),
    getServiceSchema("Web Development", "Crafting stunning, high-performance websites and web applications tailored to your vision."),
    getServiceSchema("Data Solutions", "Unlock the power of your data with our advanced analytics and database management services."),
    getServiceSchema("Security & Compliance", "Protect your digital assets with comprehensive security solutions and compliance frameworks."),
    getServiceSchema("Mobile Development", "Build powerful mobile applications that engage users across iOS and Android platforms."),
    getServiceSchema("DevOps & Automation", "Streamline your development process with automated CI/CD pipelines and infrastructure management.")
  ];

  const pageSchema = getWebPageSchema(
    "Our Services - Cloud & Web Development Solutions",
    "Comprehensive cloud and development solutions including migration, web apps, mobile development, security, and DevOps automation.",
    "https://proximacloud.in/services"
  );

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [pageSchema, ...serviceSchemas]
  };

  const services = [
    {
      icon: <CloudQueueIcon className="text-4xl text-teal-400" />,
      title: "Cloud Migration",
      description: "Seamlessly transition your infrastructure to the cloud with our expert guidance and zero downtime.",
      features: [
        "Assessment & Planning",
        "Data Migration",
        "Infrastructure Setup",
        "Performance Optimization",
        "Security Implementation"
      ],
      pricing: "Starting from $2,500"
    },
    {
      icon: <DeveloperModeIcon className="text-4xl text-teal-400" />,
      title: "Web Development",
      description: "Crafting stunning, high-performance websites and web applications tailored to your vision.",
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "API Development",
        "Database Design",
        "Responsive Design"
      ],
      pricing: "Starting from $1,200"
    },
    {
      icon: <StorageIcon className="text-4xl text-teal-400" />,
      title: "Data Solutions",
      description: "Unlock the power of your data with our advanced analytics and database management services.",
      features: [
        "Database Optimization",
        "Data Analytics",
        "Business Intelligence",
        "Data Migration",
        "Real-time Processing"
      ],
      pricing: "Starting from $1,800"
    },
    {
      icon: <SecurityIcon className="text-4xl text-teal-400" />,
      title: "Security & Compliance",
      description: "Protect your digital assets with comprehensive security solutions and compliance frameworks.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance Implementation",
        "Access Management",
        "Threat Monitoring"
      ],
      pricing: "Starting from $2,000"
    },
    {
      icon: <DevicesIcon className="text-4xl text-teal-400" />,
      title: "Mobile Development",
      description: "Build powerful mobile applications that engage users across iOS and Android platforms.",
      features: [
        "Native iOS & Android Apps",
        "Cross-platform Solutions",
        "UI/UX Design",
        "App Store Optimization",
        "Maintenance & Updates"
      ],
      pricing: "Starting from $3,500"
    },
    {
      icon: <AnalyticsIcon className="text-4xl text-teal-400" />,
      title: "DevOps & Automation",
      description: "Streamline your development process with automated CI/CD pipelines and infrastructure management.",
      features: [
        "CI/CD Pipeline Setup",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Container Orchestration",
        "Automated Testing"
      ],
      pricing: "Starting from $2,200"
    }
  ];

  const supportPackages = [
    {
      name: "Basic Support",
      price: "$500/month",
      features: [
        "Email Support (48h response)",
        "Basic Monitoring",
        "Monthly Health Reports",
        "Standard Updates"
      ]
    },
    {
      name: "Premium Support",
      price: "$1,200/month",
      features: [
        "24/7 Phone & Email Support",
        "Advanced Monitoring",
        "Weekly Reports",
        "Priority Updates",
        "Performance Optimization"
      ],
      popular: true
    },
    {
      name: "Enterprise Support",
      price: "Custom Pricing",
      features: [
        "Dedicated Account Manager",
        "Custom SLA",
        "On-site Support",
        "Strategic Consulting",
        "Emergency Response"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Our Services - Cloud & Web Development Solutions"
        description="Comprehensive cloud and development solutions including migration, web apps, mobile development, security, and DevOps automation."
        keywords="cloud services, web development services, mobile app development, DevOps, cloud migration, security services"
        structuredData={combinedSchema}
      />
    <motion.div 
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          className="text-center mb-16"
          variants={fadeInVariants}
          initial="hidden"
          animate={heroControls}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We provide comprehensive cloud and development solutions to help your business reach new heights. 
            From strategy to implementation, we're your trusted technology partner.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          ref={servicesRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={servicesControls}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="card p-8"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-teal-500/10 mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-6">{service.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircleIcon className="text-teal-400" fontSize="small" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-slate-600 pt-4">
                <p className="text-teal-400 font-semibold text-lg">{service.pricing}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Packages */}
        <motion.div 
          ref={supportRef}
          className="mb-16"
          variants={fadeInVariants}
          initial="hidden"
          animate={supportControls}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <SupportAgentIcon className="mr-3" />
              Support & Maintenance
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Keep your systems running smoothly with our comprehensive support packages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportPackages.map((pkg, index) => (
              <motion.div 
                key={index} 
                className={`card p-8 text-center relative ${pkg.popular ? 'border-2 border-teal-500' : ''}`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'visible' }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                <p className="text-3xl font-bold text-teal-400 mb-6">{pkg.price}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircleIcon className="text-teal-400" fontSize="small" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/contact" 
                  className={`btn-primary w-full inline-block text-center ${
                    pkg.popular ? 'bg-teal-500 hover:bg-teal-600' : ''
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful project delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your needs and challenges" },
              { step: "02", title: "Planning", desc: "Creating detailed project roadmap" },
              { step: "03", title: "Development", desc: "Building solutions with regular updates" },
              { step: "04", title: "Launch", desc: "Deployment and ongoing support" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-teal-400 mb-4">{phase.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                <p className="text-slate-400">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that drives results. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              <span>Get Free Consultation</span>
              <RocketLaunchIcon />
            </Link>
            <Link to="/portfolio" className="secondary-btn">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Services;
