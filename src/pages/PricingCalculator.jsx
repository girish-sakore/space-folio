import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SEO from '../components/SEO';
import SimplePDFEstimate from '../components/SimplePDFEstimate';
import PDFDownloadModal from '../components/PDFDownloadModal';
import { getWebPageSchema } from '../utils/structuredData';

// Define simple icons as text to avoid Material UI issues
const CalculateIcon = () => <span style={{ fontSize: '2rem' }}>🧮</span>;
const CheckCircleIcon = () => <span style={{ fontSize: '1rem' }}>✓</span>;
const StarIcon = () => <span style={{ fontSize: '1rem' }}>⭐</span>;
const TrendingUpIcon = () => <span style={{ fontSize: '1rem' }}>📈</span>;
const SpeedIcon = () => <span style={{ fontSize: '1rem' }}>⚡</span>;
const SecurityIcon = () => <span style={{ fontSize: '1rem' }}>🔒</span>;
const SupportIcon = () => <span style={{ fontSize: '1rem' }}>🛠️</span>;

// Simple CountUp replacement
const CountUp = ({ end }) => <span>{end.toLocaleString()}</span>;

const PricingCalculator = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [projectComplexity, setProjectComplexity] = useState('medium');
  const [timeline, setTimeline] = useState('3-6');
  const [supportLevel, setSupportLevel] = useState('standard');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const printRef = useRef();

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

  // Generate estimate ID once when estimate is created
  const [estimateId, setEstimateId] = useState('');
  
  useEffect(() => {
    if (showEstimate && estimateId === '') {
      setEstimateId(`EST-${Math.floor(Math.random() * 900000) + 100000}`);
    }
  }, [showEstimate, estimateId]);

  const handleDownloadPDF = async () => {
    if (!showEstimate) {
      alert('Please select services first!');
      return;
    }

    if (!printRef.current) {
      alert('PDF component not ready. Please try again.');
      return;
    }

    // Reset states and show modal
    setDownloadProgress(0);
    setShowDownloadModal(true);
    setIsGeneratingPDF(true);
    
    try {
      const element = printRef.current;
      const filename = `Project_Estimate_${estimateId}.pdf`;
      
      // Stage 1: Preparing (0-20%)
      setDownloadProgress(10);
      await new Promise(resolve => setTimeout(resolve, 300));
      setDownloadProgress(20);
      
      // Stage 2: Rendering Content (20-40%)
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: 800,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('pdf-estimate');
          if (clonedElement) {
            clonedElement.style.fontFamily = 'Arial, sans-serif';
          }
        },
        onrendered: () => {
          setDownloadProgress(35);
        }
      });
      
      setDownloadProgress(40);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Stage 3: Optimizing Quality (40-60%)
      setDownloadProgress(50);
      await new Promise(resolve => setTimeout(resolve, 300));
      setDownloadProgress(60);
      
      // Stage 4: Generating PDF (60-90%)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      setDownloadProgress(70);
      
      // Calculate dimensions to fit A4 (210 x 297 mm)
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10;
      const availableWidth = pdfWidth - (margin * 2);
      const availableHeight = pdfHeight - (margin * 2);
      
      const canvasAspectRatio = canvas.height / canvas.width;
      let finalWidth = availableWidth;
      let finalHeight = availableWidth * canvasAspectRatio;
      
      if (finalHeight > availableHeight) {
        finalHeight = availableHeight;
        finalWidth = finalHeight / canvasAspectRatio;
      }
      
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = margin;
      
      setDownloadProgress(80);
      
      const imgData = canvas.toDataURL('image/png', 0.95);
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      
      setDownloadProgress(90);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Stage 5: Complete (90-100%)
      pdf.save(filename);
      setDownloadProgress(100);
      
      console.log(`PDF downloaded successfully: ${filename}`);
      
    } catch (err) {
      console.error('PDF generation failed:', err);
      setShowDownloadModal(false);
      alert(`PDF generation failed: ${err.message}. Please try again.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadComplete = () => {
    setShowDownloadModal(false);
    setDownloadProgress(0);
  };

  const pageSchema = getWebPageSchema(
    "Pricing Calculator - Get Instant Project Estimates",
    "Calculate the cost of your technology project with our interactive pricing tool. Get instant estimates for cloud migration, web development, and more.",
    "https://proximacloud.in/pricing-calculator"
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
              <div className="text-4xl text-teal-400"><CalculateIcon /></div>
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
                          <CheckCircleIcon />
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
                        $<CountUp end={totalPrice} />
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
                          <CheckCircleIcon />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <SpeedIcon />
                      <div className="text-white font-semibold text-sm">{timelineMultipliers[timeline].label}</div>
                    </div>
                    <div className="text-center">
                      <SecurityIcon />
                      <div className="text-white font-semibold text-sm">Secure</div>
                    </div>
                    <div className="text-center">
                      <SupportIcon />
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
                    <div className="flex gap-2">
                      <button 
                        className="secondary-btn flex-1"
                        onClick={() => setShowPDFPreview(!showPDFPreview)}
                        disabled={!showEstimate}
                      >
                        {showPDFPreview ? '✖ Hide' : '👁️ Preview'} PDF
                      </button>
                      <button 
                        className="secondary-btn flex-1"
                        onClick={handleDownloadPDF}
                        disabled={!showEstimate || isGeneratingPDF}
                      >
                        {isGeneratingPDF ? '⏳ Generating...' : '📄 Download PDF'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="card p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center text-slate-400">
                    <div className="text-6xl mb-4 text-slate-600"><CalculateIcon /></div>
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
                    <StarIcon />
                    <span className="text-slate-300 text-sm">4.9/5 Client Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon />
                    <span className="text-slate-300 text-sm">50+ Successful Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon />
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
        
        {/* PDF Preview Modal */}
        {showPDFPreview && showEstimate && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPDFPreview(false)}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">PDF Estimate Preview</h3>
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? '⏳ Generating...' : '📄 Download PDF'}
                  </button>
                  <button 
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    onClick={() => setShowPDFPreview(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="p-6">
                <SimplePDFEstimate
                  selectedServices={selectedServices}
                  services={services}
                  projectComplexity={projectComplexity}
                  timeline={timeline}
                  supportLevel={supportLevel}
                  totalPrice={totalPrice}
                  complexityMultipliers={complexityMultipliers}
                  timelineMultipliers={timelineMultipliers}
                  supportLevels={supportLevels}
                  getSelectedServicesFeatures={getSelectedServicesFeatures}
                  estimateId={estimateId}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Hidden PDF component for generation - positioned off-screen */}
        <div style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: 0,
          width: '800px',
          backgroundColor: 'white',
          zIndex: -1
        }}>
          <SimplePDFEstimate
            ref={printRef}
            id="pdf-estimate"
            selectedServices={selectedServices}
            services={services}
            projectComplexity={projectComplexity}
            timeline={timeline}
            supportLevel={supportLevel}
            totalPrice={totalPrice}
            complexityMultipliers={complexityMultipliers}
            timelineMultipliers={timelineMultipliers}
            supportLevels={supportLevels}
            getSelectedServicesFeatures={getSelectedServicesFeatures}
            estimateId={estimateId}
          />
        </div>
        
        {/* PDF Download Progress Modal */}
        <PDFDownloadModal
          isVisible={showDownloadModal}
          progress={downloadProgress}
          onComplete={handleDownloadComplete}
          filename={`Project_Estimate_${estimateId}.pdf`}
        />
      </div>
    </>
  );
};

export default PricingCalculator;
