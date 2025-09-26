import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';
import SuccessAnimation from './SuccessAnimation';
import emailService from '../services/emailService';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WebIcon from '@mui/icons-material/Web';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CloudIcon from '@mui/icons-material/Cloud';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function InteractiveContactForm() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: '',
    projectDescription: '',

    // Step 2: Budget & Timeline
    budget: '',
    timeline: '',
    priority: '',

    // Step 3: Technical Requirements
    platforms: [],
    features: [],
    integrations: [],

    // Step 4: Business Details
    businessType: '',
    teamSize: '',
    currentSolution: '',

    // Step 5: Contact Information
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',

    // Technical fields
    honeypot: '',
    captcha: '',
    generatedMessage: '' // Auto-generated from selections
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [useSimpleForm, setUseSimpleForm] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState(generateCaptcha());

  // Services mapping from pricing page
  const servicesMap = {
    'cloud-migration': 'Cloud Migration',
    'web-development': 'Web Development',
    'mobile-app': 'Mobile App Development',
    'data-analytics': 'Data Analytics',
    'devops': 'DevOps & Automation',
    'security': 'Security & Compliance'
  };

  // Handle pricing page integration
  useEffect(() => {
    if (location.state) {
      const { services, estimate } = location.state;

      if (services && services.length > 0) {
        // Auto-switch to simple form for pricing page users
        setUseSimpleForm(true);

        // Generate message from pricing selections
        const selectedServiceNames = services.map(serviceId =>
          servicesMap[serviceId] || serviceId
        );

        const pricingMessage = `Hi, I'm interested in getting a detailed quote for the following services:

💰 Estimated Budget: $${estimate ? estimate.toLocaleString() : 'Custom'}

🛠️ Selected Services:
${selectedServiceNames.map(name => `• ${name}`).join('\n')}

I got this estimate from your pricing calculator and would like to discuss the project details, timeline, and get a comprehensive proposal.

Please provide:
• Detailed project breakdown
• Timeline and milestones
• Payment terms and options
• Next steps to get started

I'm ready to move forward with this project. Looking forward to hearing from you!`;

        // Pre-fill form data
        setFormData(prev => ({
          ...prev,
          projectType: 'Custom Quote Request',
          message: pricingMessage,
          budget: estimate ? '$' + estimate.toLocaleString() : 'Custom',
          platforms: services.includes('web-development') ? ['web'] : [],
          features: services.includes('mobile-app') ? ['Push Notifications'] : []
        }));
      }
    }
  }, [location.state]);

  // Generate simple math captcha
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer;
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2;
    }

    return {
      question: `${num1} ${operator} ${num2} = ?`,
      answer: answer,
    };
  }

  const steps = [
    {
      id: 1,
      title: "Project Type",
      description: "What kind of project do you have in mind?",
      icon: <AutoAwesomeIcon />
    },
    {
      id: 2,
      title: "Budget & Timeline",
      description: "Let's discuss your budget and timeline",
      icon: <BusinessIcon />
    },
    {
      id: 3,
      title: "Technical Requirements",
      description: "What features and platforms do you need?",
      icon: <WebIcon />
    },
    {
      id: 4,
      title: "Business Details",
      description: "Tell us about your business and current situation",
      icon: <BusinessIcon />
    },
    {
      id: 5,
      title: "Contact Information",
      description: "How can we get in touch with you?",
      icon: <PersonIcon />
    }
  ];

  const projectTypes = [
    { id: 'web-app', name: 'Web Application', icon: <WebIcon />, description: 'Custom web applications and platforms' },
    { id: 'mobile-app', name: 'Mobile App', icon: <PhoneAndroidIcon />, description: 'iOS and Android applications' },
    { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCartIcon />, description: 'Online stores and marketplaces' },
    { id: 'cloud-migration', name: 'Cloud Migration', icon: <CloudIcon />, description: 'Move to cloud infrastructure' },
    { id: 'custom', name: 'Custom Solution', icon: <AutoAwesomeIcon />, description: 'Unique business requirements' }
  ];

  const budgetRanges = [
    { id: 'under-10k', name: 'Under $10,000', description: 'Small projects and MVPs' },
    { id: '10k-50k', name: '$10,000 - $50,000', description: 'Medium complexity projects' },
    { id: '50k-100k', name: '$50,000 - $100,000', description: 'Large-scale applications' },
    { id: 'over-100k', name: 'Over $100,000', description: 'Enterprise solutions' },
    { id: 'discuss', name: "Let's Discuss", description: 'Custom pricing based on needs' }
  ];

  const timelineOptions = [
    { id: 'urgent', name: 'ASAP (Rush Project)', description: 'Within 1-2 months' },
    { id: 'normal', name: 'Normal Timeline', description: '3-6 months' },
    { id: 'flexible', name: 'Flexible', description: '6+ months' },
    { id: 'discuss', name: "Let's Plan Together", description: 'Custom timeline' }
  ];

  const priorityLevels = [
    { id: 'low', name: 'Low Priority', description: 'No rush, quality first' },
    { id: 'medium', name: 'Medium Priority', description: 'Balanced approach' },
    { id: 'high', name: 'High Priority', description: 'Fast delivery needed' },
    { id: 'critical', name: 'Critical/Urgent', description: 'Mission critical project' }
  ];

  const platformOptions = [
    { id: 'web', name: 'Web Browser', icon: <WebIcon /> },
    { id: 'ios', name: 'iOS App', icon: <PhoneAndroidIcon /> },
    { id: 'android', name: 'Android App', icon: <PhoneAndroidIcon /> },
    { id: 'desktop', name: 'Desktop Application', icon: <WebIcon /> },
    { id: 'api', name: 'API/Backend', icon: <CloudIcon /> }
  ];

  const featureOptions = [
    'User Authentication & Profiles',
    'Payment Processing',
    'Real-time Chat/Messaging',
    'Push Notifications',
    'Analytics & Reporting',
    'Admin Dashboard',
    'File Upload/Management',
    'Search & Filtering',
    'Social Media Integration',
    'Email Automation',
    'Multi-language Support',
    'Third-party Integrations'
  ];

  const integrationOptions = [
    'Stripe/Payment Gateways',
    'Google/Facebook Login',
    'CRM Systems',
    'Email Marketing Tools',
    'Analytics Tools',
    'Cloud Storage',
    'Shipping APIs',
    'Inventory Management',
    'Accounting Software',
    'Custom APIs'
  ];

  // Generate message from selections
  const generateMessageFromSelections = () => {
    let message = "Hi, I'm interested in your services. Here are the details:\n\n";

    if (formData.projectType) {
      const selectedType = projectTypes.find(type => type.id === formData.projectType);
      message += `Project Type: ${selectedType?.name || formData.projectType}\n`;
    }

    if (formData.projectDescription) {
      message += `Description: ${formData.projectDescription}\n`;
    }

    if (formData.budget) {
      const selectedBudget = budgetRanges.find(range => range.id === formData.budget);
      message += `Budget: ${selectedBudget?.name || formData.budget}\n`;
    }

    if (formData.timeline) {
      const selectedTimeline = timelineOptions.find(option => option.id === formData.timeline);
      message += `Timeline: ${selectedTimeline?.name || formData.timeline}\n`;
    }

    if (formData.priority) {
      const selectedPriority = priorityLevels.find(option => option.id === formData.priority);
      message += `Priority: ${selectedPriority?.name || formData.priority}\n`;
    }

    if (formData.platforms.length > 0) {
      message += `Platforms: ${formData.platforms.join(', ')}\n`;
    }

    if (formData.features.length > 0) {
      message += `Required Features: ${formData.features.join(', ')}\n`;
    }

    if (formData.integrations.length > 0) {
      message += `Integrations Needed: ${formData.integrations.join(', ')}\n`;
    }

    if (formData.businessType) {
      message += `Business Type: ${formData.businessType}\n`;
    }

    if (formData.teamSize) {
      message += `Team Size: ${formData.teamSize}\n`;
    }

    if (formData.currentSolution) {
      message += `Current Solution: ${formData.currentSolution}\n`;
    }

    if (formData.message) {
      message += `\nAdditional Message: ${formData.message}`;
    }

    return message;
  };

  const renderSimpleForm = () => {
    return (
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          {location.state?.services ? (
            <>
              <h3 className="text-2xl font-bold text-white mb-2">📋 Quote Request Form</h3>
              <p className="text-slate-400 mb-2">Your pricing selections have been pre-filled below.</p>
              <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3">
                <p className="text-teal-300 text-sm">
                  💰 Estimated Project Value: <span className="font-bold">${location.state.estimate?.toLocaleString()}</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white mb-2">Quick Contact Form</h3>
              <p className="text-slate-400">Send us a message and we'll get back to you shortly.</p>
            </>
          )}
        </div>

        <div className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => updateFormData('honeypot', e.target.value)}
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${errors.name ? "border-red-500" : "border-slate-600"
                  } focus:outline-none focus:border-teal-500 transition-colors`}
                placeholder="Your Name *"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${errors.email ? "border-red-500" : "border-slate-600"
                  } focus:outline-none focus:border-teal-500 transition-colors`}
                placeholder="Your Email *"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <input
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Subject"
              type="text"
              value={formData.projectType}
              onChange={(e) => updateFormData('projectType', e.target.value)}
            />
          </div>

          <div>
            <textarea
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors resize-none"
              placeholder="Your message... (Tell us about your project, requirements, timeline, etc.)"
              rows="6"
              value={formData.message}
              onChange={(e) => updateFormData('message', e.target.value)}
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message}</p>
            )}
            <p className="text-slate-400 text-sm mt-1">
              {formData.message.length}/1000 characters
            </p>
          </div>

          {/* Math Captcha */}
          <div>
            <label className="block text-white mb-2">
              Security Check: {captchaQuestion.question}
            </label>
            <input
              className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${errors.captcha ? "border-red-500" : "border-slate-600"
                } focus:outline-none focus:border-teal-500 transition-colors`}
              placeholder="Enter your answer"
              type="number"
              value={formData.captcha}
              onChange={(e) => updateFormData('captcha', e.target.value)}
            />
            {errors.captcha && (
              <p className="text-red-400 text-sm mt-1">{errors.captcha}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-400 text-sm">{errors.submit}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              type="button"
              className="flex-1 px-6 py-3 border border-slate-500 text-slate-300 rounded-lg hover:border-slate-400 hover:text-white transition-all"
              onClick={() => setUseSimpleForm(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Back to Detailed Form
            </motion.button>

            <motion.button
              type="button"
              className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-all ${isSubmitting
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              onClick={handleSimpleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      generatedMessage: generateMessageFromSelections()
    }));

    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};

    switch (stepIndex) {
      case 0:
        if (!formData.projectType) {
          newErrors.projectType = 'Please select a project type';
        }
        break;
      case 1:
        if (!formData.budget) {
          newErrors.budget = 'Please select a budget range';
        }
        if (!formData.timeline) {
          newErrors.timeline = 'Please select a timeline';
        }
        break;
      case 2:
        if (formData.platforms.length === 0) {
          newErrors.platforms = 'Please select at least one platform';
        }
        break;
      case 3:
        if (!formData.businessType) {
          newErrors.businessType = 'Please tell us about your business';
        }
        break;
      case 4:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.captcha) {
          newErrors.captcha = 'Please solve the math problem';
        } else if (parseInt(formData.captcha) !== captchaQuestion.answer) {
          newErrors.captcha = 'Incorrect answer';
        }
        break;
      default:
        break;
    }

    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);

    // Prepare final form data for submission
    const finalFormData = {
      name: formData.name,
      email: formData.email,
      subject: `${formData.projectType} Project Inquiry`,
      message: generateMessageFromSelections(),
      honeypot: formData.honeypot,
      captcha: formData.captcha,
    };

    const api_base_url = import.meta.env.VITE_API_URL || "https://proximacloud.in";

    console.log('📝 Submitting form data:', finalFormData);
    console.log('🌐 API URL:', api_base_url);

    try {
      // For development, check if we're in dev mode and API is not available
      const isDevelopment = import.meta.env.DEV;

      const response = await fetch(`${api_base_url}/fast/api/submit-contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();
      console.log('✓ Response received:', { status: response.status, data: result });

      if (response.ok) {
        console.log('🎉 Form submitted successfully!');
        setShowSuccess(true);
      } else {
        console.error('❌ Submission failed:', result);
        setErrors({ submit: result.detail || "Failed to send message" });
      }
    } catch (error) {
      console.error('❌ Network error:', error);

      // Try alternative email service
      try {
        console.log('🔄 Trying alternative email service...');
        const emailResult = await emailService.sendEmail(finalFormData);

        if (emailResult.success) {
          console.log(`✓ Email sent successfully via ${emailResult.method}`);
          if (emailResult.method === 'mailto') {
            alert('Your email client has been opened. Please send the email to complete your submission.');
          }
          setShowSuccess(true);
        } else {
          throw new Error('All email methods failed');
        }
      } catch (emailError) {
        console.error('❌ All email methods failed:', emailError);
        setErrors({
          submit: "Unable to send message. Please contact us directly at info@proximacloud.in"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    // Reset form
    setFormData({
      projectType: '', projectDescription: '', budget: '', timeline: '', priority: '',
      platforms: [], features: [], integrations: [], businessType: '', teamSize: '',
      currentSolution: '', name: '', email: '', phone: '', company: '', message: '',
      honeypot: '', captcha: '', generatedMessage: ''
    });
    setCurrentStep(0);
    setErrors({});
    setCaptchaQuestion(generateCaptcha());
  };

  const validateSimpleForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (at least 10 characters)';
    }
    if (!formData.captcha) {
      newErrors.captcha = 'Please solve the math problem';
    } else if (parseInt(formData.captcha) !== captchaQuestion.answer) {
      newErrors.captcha = 'Incorrect answer';
    }

    return newErrors;
  };

  const handleSimpleSubmit = async () => {
    const simpleErrors = validateSimpleForm();

    if (Object.keys(simpleErrors).length > 0) {
      setErrors(simpleErrors);
      return;
    }

    setIsSubmitting(true);

    // Prepare simple form data for submission
    const finalFormData = {
      name: formData.name,
      email: formData.email,
      subject: formData.projectType || 'General Inquiry',
      message: formData.message,
      honeypot: formData.honeypot,
      captcha: formData.captcha,
      form_type: "simple"
    };

    const api_base_url = import.meta.env.VITE_API_URL || "https://proximacloud.in";

    console.log('📝 Submitting simple form data:', finalFormData);
    console.log('🌐 API URL:', api_base_url);

    try {
      const response = await fetch(`${api_base_url}/fast/api/submit-contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();
      console.log('✓ Response received:', { status: response.status, data: result });

      if (response.ok) {
        console.log('🎉 Simple form submitted successfully!');
        setShowSuccess(true);
      } else {
        console.error('❌ Submission failed:', result);
        setErrors({ submit: result.detail || "Failed to send message" });
      }
    } catch (error) {
      console.error('❌ Network error:', error);

      // Try alternative email service
      try {
        console.log('🔄 Trying alternative email service...');
        const emailResult = await emailService.sendEmail(finalFormData);

        if (emailResult.success) {
          console.log(`✓ Email sent successfully via ${emailResult.method}`);
          if (emailResult.method === 'mailto') {
            alert('Your email client has been opened. Please send the email to complete your submission.');
          }
          setShowSuccess(true);
        } else {
          throw new Error('All email methods failed');
        }
      } catch (emailError) {
        console.error('❌ All email methods failed:', emailError);
        setErrors({
          submit: "Unable to send message. Please contact us directly at info@proximacloud.in"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <motion.button
                  key={type.id}
                  type="button"
                  className={`p-6 rounded-xl border-2 text-left transition-all ${formData.projectType === type.id
                      ? 'border-teal-500 bg-teal-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                    }`}
                  onClick={() => updateFormData('projectType', type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-teal-400 text-2xl">{type.icon}</div>
                    <h3 className="text-white font-semibold">{type.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm">{type.description}</p>
                </motion.button>
              ))}
            </div>
            {errors.projectType && (
              <p className="text-red-400 text-sm">{errors.projectType}</p>
            )}

            <div>
              <label className="block text-white mb-2">Project Description (Optional)</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Briefly describe your project idea..."
                rows="3"
                value={formData.projectDescription}
                onChange={(e) => updateFormData('projectDescription', e.target.value)}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Budget Range</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {budgetRanges.map((budget) => (
                  <motion.button
                    key={budget.id}
                    type="button"
                    className={`p-4 rounded-lg border text-left transition-all ${formData.budget === budget.id
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                      }`}
                    onClick={() => updateFormData('budget', budget.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-white">{budget.name}</div>
                    <div className="text-slate-400 text-sm">{budget.description}</div>
                  </motion.button>
                ))}
              </div>
              {errors.budget && (
                <p className="text-red-400 text-sm mt-2">{errors.budget}</p>
              )}
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Timeline</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {timelineOptions.map((timeline) => (
                  <motion.button
                    key={timeline.id}
                    type="button"
                    className={`p-4 rounded-lg border text-left transition-all ${formData.timeline === timeline.id
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                      }`}
                    onClick={() => updateFormData('timeline', timeline.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-white">{timeline.name}</div>
                    <div className="text-slate-400 text-sm">{timeline.description}</div>
                  </motion.button>
                ))}
              </div>
              {errors.timeline && (
                <p className="text-red-400 text-sm mt-2">{errors.timeline}</p>
              )}
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Priority Level</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {priorityLevels.map((priority) => (
                  <motion.button
                    key={priority.id}
                    type="button"
                    className={`p-4 rounded-lg border text-left transition-all ${formData.priority === priority.id
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                      }`}
                    onClick={() => updateFormData('priority', priority.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-white">{priority.name}</div>
                    <div className="text-slate-400 text-sm">{priority.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Platforms (Select all that apply)</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {platformOptions.map((platform) => (
                  <motion.button
                    key={platform.id}
                    type="button"
                    className={`p-4 rounded-lg border text-left transition-all ${formData.platforms.includes(platform.id)
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                      }`}
                    onClick={() => toggleArrayField('platforms', platform.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-teal-400">{platform.icon}</div>
                      <div className="font-semibold text-white">{platform.name}</div>
                      {formData.platforms.includes(platform.id) && (
                        <CheckCircleIcon className="text-teal-500 ml-auto" fontSize="small" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              {errors.platforms && (
                <p className="text-red-400 text-sm mt-2">{errors.platforms}</p>
              )}
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Key Features (Select all you need)</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {featureOptions.map((feature) => (
                  <motion.button
                    key={feature}
                    type="button"
                    className={`p-3 rounded-lg border text-left transition-all ${formData.features.includes(feature)
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                      }`}
                    onClick={() => toggleArrayField('features', feature)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{feature}</span>
                      {formData.features.includes(feature) && (
                        <CheckCircleIcon className="text-teal-500" fontSize="small" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Integrations (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {integrationOptions.map((integration) => (
                  <motion.button
                    key={integration}
                    type="button"
                    className={`p-3 rounded-lg border text-left transition-all ${formData.integrations.includes(integration)
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                      }`}
                    onClick={() => toggleArrayField('integrations', integration)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{integration}</span>
                      {formData.integrations.includes(integration) && (
                        <CheckCircleIcon className="text-teal-500" fontSize="small" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2">What type of business are you?</label>
              <select
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                value={formData.businessType}
                onChange={(e) => updateFormData('businessType', e.target.value)}
              >
                <option value="">Select business type</option>
                <option value="startup">Startup</option>
                <option value="small-business">Small Business</option>
                <option value="medium-enterprise">Medium Enterprise</option>
                <option value="large-enterprise">Large Enterprise</option>
                <option value="agency">Agency/Consultancy</option>
                <option value="nonprofit">Non-profit</option>
                <option value="individual">Individual/Freelancer</option>
              </select>
              {errors.businessType && (
                <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">Team Size (Optional)</label>
              <select
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                value={formData.teamSize}
                onChange={(e) => updateFormData('teamSize', e.target.value)}
              >
                <option value="">Select team size</option>
                <option value="1-5">1-5 people</option>
                <option value="6-20">6-20 people</option>
                <option value="21-50">21-50 people</option>
                <option value="51-200">51-200 people</option>
                <option value="200+">200+ people</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Current Solution (Optional)</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Do you have any existing systems or solutions that need to be replaced or integrated?"
                rows="3"
                value={formData.currentSolution}
                onChange={(e) => updateFormData('currentSolution', e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => updateFormData('honeypot', e.target.value)}
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${errors.name ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Your Full Name *"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${errors.email ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Your Email Address *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Phone Number (Optional)"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>

              <div>
                <input
                  className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Company Name (Optional)"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                />
              </div>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Any additional information or specific requirements..."
                rows="4"
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
              />
            </div>

            {/* Simple Math Captcha */}
            <div>
              <label className="block text-white mb-2">
                Security Check: {captchaQuestion.question}
              </label>
              <input
                className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${errors.captcha ? "border-red-500" : "border-slate-600"
                  } focus:outline-none focus:border-teal-500 transition-colors`}
                placeholder="Enter your answer"
                type="number"
                value={formData.captcha}
                onChange={(e) => updateFormData('captcha', e.target.value)}
              />
              {errors.captcha && (
                <p className="text-red-400 text-sm mt-1">{errors.captcha}</p>
              )}
            </div>

            {/* Summary of selections */}
            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Project Summary:</h4>
              <div className="text-slate-300 text-sm space-y-1">
                {formData.projectType && <div>• {projectTypes.find(t => t.id === formData.projectType)?.name}</div>}
                {formData.budget && <div>• Budget: {budgetRanges.find(b => b.id === formData.budget)?.name}</div>}
                {formData.timeline && <div>• Timeline: {timelineOptions.find(t => t.id === formData.timeline)?.name}</div>}
                {formData.platforms.length > 0 && <div>• Platforms: {formData.platforms.join(', ')}</div>}
                {formData.features.length > 0 && <div>• {formData.features.length} key features selected</div>}
              </div>
            </div>

            {errors.submit && (
              <p className="text-red-400 text-sm">{errors.submit}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <SuccessAnimation onComplete={handleSuccessComplete} />
        )}
      </AnimatePresence>

      <section className="py-20" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            {location.state?.services ? (
              <>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Get Your <span className="gradient-text">Detailed Quote</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
                  Great! You've selected services worth <span className="text-teal-400 font-semibold">${location.state.estimate?.toLocaleString()}</span>
                </p>
                <p className="text-slate-500 max-w-2xl mx-auto mb-8">
                  We've pre-filled the form with your selections. Just add your contact details and we'll send you a comprehensive proposal within 24 hours.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                  Tell us about your project and we'll provide you with a customized proposal and timeline.
                </p>
              </>
            )}

            {/* Form Choice - Only show when NOT coming from pricing */}
            {!location.state?.services && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-slate-400 text-sm">Choose your preferred way:</div>
                <div className="flex gap-3">
                  <motion.button
                    className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all"
                    onClick={() => setUseSimpleForm(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🧿 Detailed Wizard
                  </motion.button>
                  <motion.button
                    className="px-6 py-2 border border-slate-500 text-slate-300 hover:border-slate-400 hover:text-white rounded-lg font-medium transition-all"
                    onClick={() => setUseSimpleForm(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ⚡ Quick Contact
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Conditional Form Rendering */}
            {useSimpleForm ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {renderSimpleForm()}
              </motion.div>
            ) : (
              <>
                {/* Progress Indicator */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">
                      Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-300 text-xs underline transition-colors"
                        onClick={() => setUseSimpleForm(true)}
                      >
                        Skip to Quick Form
                      </button>
                      <div className="text-slate-400 text-sm">
                        {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Step Indicators */}
                  <div className="hidden md:flex justify-between">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex flex-col items-center ${index <= currentStep ? 'text-teal-400' : 'text-slate-600'
                          }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${index <= currentStep ? 'bg-teal-500' : 'bg-slate-600'
                            }`}
                        >
                          {index < currentStep ? (
                            <CheckCircleIcon fontSize="small" />
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="text-xs text-center max-w-20">
                          {step.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h3>
                    <p className="text-slate-400">{steps[currentStep].description}</p>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-600">
                    <motion.button
                      type="button"
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${currentStep === 0
                          ? 'border-slate-700 text-slate-500 cursor-not-allowed'
                          : 'border-slate-500 text-slate-300 hover:border-slate-400 hover:text-white'
                        }`}
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                      whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                    >
                      <ArrowBackIcon />
                      Previous
                    </motion.button>

                    <div className="text-slate-400 text-sm">
                      {currentStep + 1} / {steps.length}
                    </div>

                    {currentStep === steps.length - 1 ? (
                      <motion.button
                        type="button"
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${isSubmitting
                            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                            : "bg-teal-600 hover:bg-teal-700 text-white"
                          }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      >
                        {isSubmitting ? "Sending..." : "Send Project Details"}
                        <ArrowForwardIcon />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-all"
                        onClick={nextStep}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Next
                        <ArrowForwardIcon />
                      </motion.button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}