import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import CalculateIcon from '@mui/icons-material/Calculate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportIcon from '@mui/icons-material/Support';
import CountUp from 'react-countup';

const PricingCalculator = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [projectComplexity, setProjectComplexity] = useState('medium');
  const [timeline, setTimeline] = useState('3-6');
  const [supportLevel, setSupportLevel] = useState('standard');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showEstimate, setShowEstimate] = useState(false);

  const services = [
    {
      id: 'cloud-migration',
      name: 'Cloud Migration',
      description: 'Migrate your infrastructure to AWS, Azure, or GCP',
      basePrice: 5000,
      icon: '☁️',
      complexity: { simple: 0.8, medium: 1.0, complex: 1.5 },
      features: ['Infrastructure Assessment', 'Data Migration', 'Security Setup', '24/7 Monitoring']
    },
    {
      id: 'web-development',
      name: 'Web Development',
      description: 'Custom websites and web applications',
      basePrice: 3000,
      icon: '💻',
      complexity: { simple: 0.7, medium: 1.0, complex: 1.8 },
      features: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'CMS Integration']
    },
    {
      id: 'mobile-app',
      name: 'Mobile App Development',
      description: 'iOS and Android applications',
      basePrice: 8000,
      icon: '📱',
      complexity: { simple: 0.9, medium: 1.0, complex: 1.6 },
      features: ['Native Development', 'Cross-Platform', 'App Store Submission', 'Push Notifications']
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics',
      description: 'Business intelligence and analytics platforms',
      basePrice: 6000,
      icon: '📊',
      complexity: { simple: 0.8, medium: 1.0, complex: 2.0 },
      features: ['Real-time Dashboards', 'Predictive Analytics', 'Data Warehousing', 'Custom Reports']
    },
    {
      id: 'devops',
      name: 'DevOps & Automation',
      description: 'CI/CD pipelines and infrastructure automation',
      basePrice: 4000,
      icon: '⚙️',
      complexity: { simple: 0.9, medium: 1.0, complex: 1.4 },
      features: ['CI/CD Setup', 'Infrastructure as Code', 'Monitoring', 'Automated Testing']
    },
    {
      id: 'security',
      name: 'Security & Compliance',
      description: 'Cybersecurity assessments and implementations',
      basePrice: 7000,
      icon: '🔒',
      complexity: { simple: 1.0, medium: 1.0, complex: 1.3 },
      features: ['Security Audits', 'Penetration Testing', 'Compliance Setup', 'Threat Monitoring']
    }
  ];

  const complexityMultipliers = {
    simple: { multiplier: 0.8, label: 'Simple Project', description: 'Basic requirements, standard features' },
    medium: { multiplier: 1.0, label: 'Medium Complexity', description: 'Moderate requirements, some custom features' },
    complex: { multiplier: 1.5, label: 'Complex Project', description: 'Advanced requirements, extensive customization' }
  };

  const timelineMultipliers = {
    '1-3': { multiplier: 1.3, label: '1-3 months', description: 'Rush delivery' },
    '3-6': { multiplier: 1.0, label: '3-6 months', description: 'Standard timeline' },
    '6-12': { multiplier: 0.9, label: '6-12 months', description: 'Extended timeline' },
    '12+': { multiplier: 0.8, label: '12+ months', description: 'Long-term project' }
  };

  const supportLevels = {
    basic: { multiplier: 1.0, price: 500, label: 'Basic Support', description: 'Email support, monthly reports' },
    standard: { multiplier: 1.1, price: 1200, label: 'Standard Support', description: '24/7 support, weekly reports' },
    premium: { multiplier: 1.2, price: 2000, label: 'Premium Support', description: 'Dedicated manager, real-time monitoring' }
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedServices, projectComplexity, timeline, supportLevel]);

  const calculatePrice = () => {
    let baseTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service.basePrice * service.complexity[projectComplexity]);
    }, 0);

    const complexityMultiplier = complexityMultipliers[projectComplexity].multiplier;
    const timelineMultiplier = timelineMultipliers[timeline].multiplier;
    const supportMultiplier = supportLevels[supportLevel].multiplier;

    const finalPrice = baseTotal * timelineMultiplier * supportMultiplier + supportLevels[supportLevel].price;
    setTotalPrice(finalPrice);
    setShowEstimate(selectedServices.length > 0);
  };

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getSelectedServicesFeatures = () => {
    return selectedServices.flatMap(serviceId => {
      const service = services.find(s => s.id === serviceId);
      return service ? service.features : [];
    });
  };

  const pageSchema = getWebPageSchema(
    "Pricing Calculator - Get Instant Project Estimates",
    "Calculate the cost of your technology project with our interactive pricing tool. Get instant estimates for cloud migration, web development, and more.",
    "https://proximacloud.com/pricing-calculator"
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      <SEO 
        title="Pricing Calculator - Get Instant Project Estimates"
        description="Calculate the cost of your technology project with our interactive pricing tool. Get instant estimates for cloud migration, web development, and more."
        keywords="pricing calculator, project cost estimate, cloud migration cost, web development pricing, mobile app cost"
        structuredData={pageSchema}
      />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <CalculateIcon className="text-4xl text-teal-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Pricing <span className="gradient-text">Calculator</span>
              </h1>
            </motion.div>
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-3xl mx-auto">
              Get an instant estimate for your project. Select the services you need and customize based on your requirements.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Services Selection */}
              <motion.div 
                className="card p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Select Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedServices.includes(service.id)
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => toggleService(service.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                          <p className="text-slate-400 text-sm mb-3">{service.description}</p>
                          <div className="text-teal-400 font-semibold">
                            Starting from ${service.basePrice.toLocaleString()}
                          </div>
                        </div>
                        {selectedServices.includes(service.id) && (
                          <CheckCircleIcon className="text-teal-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Project Configuration */}
              {selectedServices.length > 0 && (
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Complexity */}
                  <div className="card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Project Complexity</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(complexityMultipliers).map(([key, config]) => (
                        <button
                          key={key}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                            projectComplexity === key
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setProjectComplexity(key)}
                        >
                          <div className="text-white font-semibold mb-2">{config.label}</div>
                          <div className="text-slate-400 text-sm">{config.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Project Timeline</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      {Object.entries(timelineMultipliers).map(([key, config]) => (
                        <button
                          key={key}
                          className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                            timeline === key
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setTimeline(key)}
                        >
                          <div className="text-white font-semibold mb-2">{config.label}</div>
                          <div className="text-slate-400 text-sm">{config.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Support Level */}
                  <div className="card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Support Level</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(supportLevels).map(([key, config]) => (
                        <button
                          key={key}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                            supportLevel === key
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setSupportLevel(key)}
                        >
                          <div className="text-white font-semibold mb-2">{config.label}</div>
                          <div className="text-slate-400 text-sm mb-2">{config.description}</div>
                          <div className="text-teal-400 font-semibold">${config.price}/month</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Price Estimate Panel */}
            <div className="space-y-6">
              {showEstimate ? (
                <motion.div 
                  className="card p-8 sticky top-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Project Estimate</h3>
                  
                  {/* Price Display */}
                  <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">
                        $<CountUp end={totalPrice} duration={1} separator="," />
                      </div>
                      <div className="text-slate-400">Total Project Cost</div>
                    </div>
                  </div>

                  {/* Selected Services */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Selected Services</h4>
                    <div className="space-y-2">
                      {selectedServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        return (
                          <div key={serviceId} className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{service.name}</span>
                            <span className="text-teal-400">
                              ${(service.basePrice * service.complexity[projectComplexity]).toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Features Included */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">What's Included</h4>
                    <div className="space-y-2">
                      {getSelectedServicesFeatures().slice(0, 6).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircleIcon className="text-teal-400" fontSize="small" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <SpeedIcon className="text-teal-400 mb-1" />
                      <div className="text-white font-semibold text-sm">{timelineMultipliers[timeline].label}</div>
                    </div>
                    <div className="text-center">
                      <SecurityIcon className="text-teal-400 mb-1" />
                      <div className="text-white font-semibold text-sm">Secure</div>
                    </div>
                    <div className="text-center">
                      <SupportIcon className="text-teal-400 mb-1" />
                      <div className="text-white font-semibold text-sm">{supportLevels[supportLevel].label}</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link 
                      to="/contact"
                      className="btn-primary w-full text-center block"
                      state={{ services: selectedServices, estimate: totalPrice }}
                    >
                      Get Detailed Quote
                    </Link>
                    <button 
                      className="secondary-btn w-full"
                      onClick={() => window.print()}
                    >
                      Download Estimate
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="card p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center text-slate-400">
                    <CalculateIcon className="text-6xl mb-4 text-slate-600" />
                    <h3 className="text-lg font-semibold mb-2">Select Services</h3>
                    <p>Choose the services you need to see your project estimate.</p>
                  </div>
                </motion.div>
              )}

              {/* Why Choose Us */}
              <motion.div 
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Why Choose Us?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <StarIcon className="text-yellow-500" fontSize="small" />
                    <span className="text-slate-300 text-sm">4.9/5 Client Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="text-teal-400" fontSize="small" />
                    <span className="text-slate-300 text-sm">50+ Successful Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="text-green-500" fontSize="small" />
                    <span className="text-slate-300 text-sm">100% On-Time Delivery</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <motion.div 
            className="mt-16 card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Pricing FAQs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How accurate are these estimates?</h3>
                <p className="text-slate-400 text-sm">Our estimates are based on industry standards and our experience. Final pricing may vary based on specific requirements.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Do you offer payment plans?</h3>
                <p className="text-slate-400 text-sm">Yes, we offer flexible payment plans including milestone-based payments and monthly installments.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What's included in the support?</h3>
                <p className="text-slate-400 text-sm">Support includes bug fixes, performance monitoring, security updates, and technical assistance based on your plan.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I customize my package?</h3>
                <p className="text-slate-400 text-sm">Absolutely! We create custom packages tailored to your specific needs and budget requirements.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PricingCalculator;
