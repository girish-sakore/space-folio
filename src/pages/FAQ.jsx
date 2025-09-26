import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CategoryIcon from '@mui/icons-material/Category';
import ClearIcon from '@mui/icons-material/Clear';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Questions', count: 0 },
    { id: 'general', name: 'General', count: 0 },
    { id: 'pricing', name: 'Pricing', count: 0 },
    { id: 'technical', name: 'Technical', count: 0 },
    { id: 'support', name: 'Support', count: 0 },
    { id: 'security', name: 'Security', count: 0 },
    { id: 'process', name: 'Process', count: 0 }
  ];

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'What services does Proxima Cloud offer?',
      answer: 'We provide comprehensive cloud solutions including cloud migration, web development, mobile app development, data analytics, DevOps automation, and security & compliance services. Our team specializes in helping businesses modernize their technology infrastructure and digital presence.',
      keywords: ['services', 'cloud', 'web development', 'mobile', 'analytics']
    },
    {
      id: 2,
      category: 'pricing',
      question: 'How do you determine project pricing?',
      answer: 'Our pricing is based on project complexity, timeline, technology stack, and required features. We offer transparent pricing with detailed estimates. You can use our pricing calculator for instant estimates, or contact us for a detailed custom quote based on your specific requirements.',
      keywords: ['pricing', 'cost', 'estimate', 'budget', 'calculator']
    },
    {
      id: 3,
      category: 'technical',
      question: 'What technologies do you work with?',
      answer: 'We work with modern technologies including React, Node.js, Python, AWS, Azure, Google Cloud, Docker, Kubernetes, MongoDB, PostgreSQL, and more. Our team stays updated with the latest technology trends to provide cutting-edge solutions.',
      keywords: ['technology', 'react', 'node', 'aws', 'azure', 'cloud', 'database']
    },
    {
      id: 4,
      category: 'process',
      question: 'What is your development process?',
      answer: 'We follow an Agile methodology with four main phases: Discovery (understanding requirements), Planning (creating roadmap), Development (building with regular updates), and Launch (deployment and support). We maintain transparent communication throughout the project.',
      keywords: ['process', 'agile', 'development', 'methodology', 'phases']
    },
    {
      id: 5,
      category: 'support',
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes, we offer comprehensive support packages including Basic (email support, monthly reports), Standard (24/7 support, weekly reports), and Premium (dedicated manager, real-time monitoring). Support includes bug fixes, updates, and performance monitoring.',
      keywords: ['support', 'maintenance', 'ongoing', 'after', 'completion']
    },
    {
      id: 6,
      category: 'security',
      question: 'How do you ensure security and compliance?',
      answer: 'We implement industry-standard security measures including encryption, secure authentication, regular security audits, and compliance with standards like SOC2, HIPAA, and GDPR. Our security expert conducts thorough assessments and monitoring.',
      keywords: ['security', 'compliance', 'encryption', 'soc2', 'hipaa', 'gdpr']
    },
    {
      id: 7,
      category: 'pricing',
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment options including milestone-based payments, monthly installments, and custom payment schedules. We work with you to find a payment plan that fits your budget and cash flow requirements.',
      keywords: ['payment', 'plans', 'installments', 'flexible', 'milestone']
    },
    {
      id: 8,
      category: 'technical',
      question: 'Can you migrate existing applications to the cloud?',
      answer: 'Absolutely! Cloud migration is one of our specialties. We assess your current infrastructure, plan the migration strategy, ensure zero downtime, and optimize performance. We have experience migrating complex enterprise applications to AWS, Azure, and Google Cloud.',
      keywords: ['migration', 'cloud', 'existing', 'applications', 'aws', 'azure']
    },
    {
      id: 9,
      category: 'general',
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity. Simple websites take 4-8 weeks, web applications 3-6 months, mobile apps 4-8 months, and complex enterprise solutions 6-12 months. We provide detailed timelines during the planning phase.',
      keywords: ['timeline', 'duration', 'how long', 'project', 'website', 'application']
    },
    {
      id: 10,
      category: 'support',
      question: 'What happens if there are issues after launch?',
      answer: 'We provide warranty coverage for all projects, typically 3-6 months depending on project scope. Any bugs or issues related to our development work are fixed at no additional cost. We also offer extended support packages for ongoing needs.',
      keywords: ['issues', 'bugs', 'warranty', 'after launch', 'problems']
    },
    {
      id: 11,
      category: 'process',
      question: 'How do you handle project communication?',
      answer: 'We maintain transparent communication through regular meetings, progress reports, and collaborative tools. You\'ll have access to project management dashboards, and we provide weekly updates on progress, milestones, and any challenges.',
      keywords: ['communication', 'updates', 'meetings', 'progress', 'reports']
    },
    {
      id: 12,
      category: 'security',
      question: 'Do you sign NDAs and protect confidential information?',
      answer: 'Yes, we sign Non-Disclosure Agreements (NDAs) and maintain strict confidentiality. We have robust data protection policies and procedures in place to ensure your intellectual property and sensitive information remains secure.',
      keywords: ['nda', 'confidential', 'data protection', 'intellectual property', 'secure']
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Update category counts
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: category.id === 'all' 
      ? faqData.length 
      : faqData.filter(faq => faq.category === category.id).length
  }));

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const pageSchema = getWebPageSchema(
    "FAQ - Frequently Asked Questions",
    "Find answers to common questions about our cloud services, pricing, development process, and support options.",
    "https://proximacloud.in/faq"
  );

  return (
    <>
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about our cloud services, pricing, development process, and support options."
        keywords="faq, questions, answers, pricing, support, cloud services, development process"
        structuredData={pageSchema}
      />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <QuestionAnswerIcon className="text-6xl text-teal-400 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Find answers to common questions about our services, pricing, and processes.
              Can't find what you're looking for? Contact us for personalized assistance.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Search */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <SearchIcon />
                  Search FAQs
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 pr-10 focus:outline-none focus:border-teal-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <ClearIcon fontSize="small" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CategoryIcon />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categoriesWithCounts.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-teal-500/20 text-teal-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Questions</span>
                    <span className="text-teal-400 font-semibold">{faqData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Categories</span>
                    <span className="text-teal-400 font-semibold">{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Showing</span>
                    <span className="text-teal-400 font-semibold">{filteredFAQs.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {/* Results Summary */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-slate-400">
                  Showing {filteredFAQs.length} of {faqData.length} questions
                  {selectedCategory !== 'all' && (
                    <span> in "{categoriesWithCounts.find(c => c.id === selectedCategory)?.name}"</span>
                  )}
                  {searchTerm && (
                    <span> for "{searchTerm}"</span>
                  )}
                </p>
              </motion.div>

              {/* FAQ Items */}
              {filteredFAQs.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      className="card overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExpandMoreIcon className="text-teal-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedItems.has(faq.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 pt-0 border-t border-slate-600">
                              <p className="text-slate-300 leading-relaxed">
                                {faq.answer}
                              </p>
                              <div className="mt-4 flex flex-wrap gap-1">
                                {faq.keywords.slice(0, 5).map((keyword, keyIndex) => (
                                  <span
                                    key={keyIndex}
                                    className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                  <p className="text-slate-400 mb-6">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}

              {/* Contact CTA */}
              <motion.div 
                className="mt-12 card p-8 text-center bg-gradient-to-r from-teal-500/10 to-purple-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Still have questions?
                </h3>
                <p className="text-slate-400 mb-6">
                  Can't find the answer you're looking for? Our team is here to help you with any questions about our services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="btn-primary">
                    Contact Us
                  </a>
                  <a href="/pricing-calculator" className="secondary-btn">
                    Get Pricing Estimate
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
