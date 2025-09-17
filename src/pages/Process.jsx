import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import TimelineIcon from '@mui/icons-material/Timeline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import DrawIcon from '@mui/icons-material/Draw';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SupportIcon from '@mui/icons-material/Support';

const Process = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const phases = [
    {
      id: 1,
      title: "Discovery",
      icon: <SearchIcon className="text-4xl" />,
      duration: "1-2 weeks",
      color: "from-blue-500 to-cyan-500",
      description: "Understanding your needs, challenges, and goals",
      activities: [
        "Stakeholder interviews",
        "Requirements gathering", 
        "Technical assessment",
        "Current system analysis",
        "Goal definition"
      ],
      deliverables: [
        "Project brief",
        "Technical requirements document",
        "Risk assessment",
        "Success criteria"
      ]
    },
    {
      id: 2,
      title: "Planning",
      icon: <DrawIcon className="text-4xl" />,
      duration: "1-3 weeks",
      color: "from-purple-500 to-blue-500",
      description: "Creating detailed project roadmap and architecture",
      activities: [
        "Solution architecture design",
        "Technology stack selection",
        "Timeline planning",
        "Resource allocation",
        "Risk mitigation planning"
      ],
      deliverables: [
        "Project roadmap",
        "Architecture diagrams",
        "Technical specifications",
        "Resource plan"
      ]
    },
    {
      id: 3,
      title: "Development", 
      icon: <BuildIcon className="text-4xl" />,
      duration: "4-16 weeks",
      color: "from-teal-500 to-green-500",
      description: "Building solutions with regular updates and feedback",
      activities: [
        "Agile development sprints",
        "Regular client updates",
        "Continuous testing",
        "Code reviews",
        "Progress demonstrations"
      ],
      deliverables: [
        "Working software",
        "Sprint reports",
        "Test results",
        "Documentation"
      ]
    },
    {
      id: 4,
      title: "Launch",
      icon: <RocketLaunchIcon className="text-4xl" />,
      duration: "1-2 weeks",
      color: "from-orange-500 to-red-500",
      description: "Deployment and go-live with comprehensive support",
      activities: [
        "Production deployment",
        "Performance monitoring",
        "User training",
        "Go-live support",
        "Issue resolution"
      ],
      deliverables: [
        "Live system",
        "Training materials",
        "Support documentation",
        "Handover package"
      ]
    },
    {
      id: 5,
      title: "Support",
      icon: <SupportIcon className="text-4xl" />,
      duration: "Ongoing",
      color: "from-green-500 to-teal-500",
      description: "Continuous monitoring, maintenance, and optimization",
      activities: [
        "24/7 monitoring",
        "Regular maintenance",
        "Performance optimization",
        "Security updates",
        "Feature enhancements"
      ],
      deliverables: [
        "Monthly reports",
        "System updates",
        "Performance metrics",
        "Support tickets resolution"
      ]
    }
  ];

  const startAnimation = () => {
    setShowAnimation(true);
    setActivePhase(0);
    
    const interval = setInterval(() => {
      setActivePhase(prev => {
        if (prev >= phases.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowAnimation(false), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const pageSchema = getWebPageSchema(
    "Our Development Process - How We Work",
    "Discover our proven 5-phase development methodology from discovery to ongoing support. Transparent, agile, and results-focused approach.",
    "https://proximacloud.com/process"
  );

  return (
    <>
      <SEO 
        title="Our Development Process - How We Work"
        description="Discover our proven 5-phase development methodology from discovery to ongoing support. Transparent, agile, and results-focused approach."
        keywords="development process, methodology, agile, project management, discovery, planning, development, launch, support"
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
            <TimelineIcon className="text-6xl text-teal-400 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Development <span className="gradient-text">Process</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              We follow a proven 5-phase methodology that ensures transparency, quality, and successful project delivery.
            </p>
            
            <motion.button
              className="btn-primary inline-flex items-center gap-2"
              onClick={startAnimation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={showAnimation}
            >
              <PlayArrowIcon />
              {showAnimation ? 'Animation Running...' : 'Watch Process Animation'}
            </motion.button>
          </motion.div>

          {/* Interactive Timeline */}
          <div className="relative mb-16">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2 hidden lg:block">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500"
                initial={{ width: "0%" }}
                animate={{ 
                  width: showAnimation ? "100%" : `${((activePhase + 1) / phases.length) * 100}%`
                }}
                transition={{ duration: showAnimation ? 10 : 0.5 }}
              />
            </div>

            {/* Phase Nodes */}
            <div className="grid lg:grid-cols-5 gap-8">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  className={`relative cursor-pointer ${
                    index === activePhase ? 'z-10' : 'z-0'
                  }`}
                  onClick={() => !showAnimation && setActivePhase(index)}
                  whileHover={!showAnimation ? { scale: 1.05 } : {}}
                  animate={{
                    scale: activePhase === index ? 1.1 : 1,
                    y: activePhase === index ? -10 : 0
                  }}
                >
                  {/* Phase Node */}
                  <div className={`
                    w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
                    bg-gradient-to-r ${phase.color} 
                    ${activePhase >= index ? 'opacity-100' : 'opacity-50'}
                    transition-all duration-500 relative
                  `}>
                    {phase.icon}
                    
                    {/* Pulse Animation */}
                    {(showAnimation && activePhase === index) && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </div>

                  {/* Phase Title */}
                  <div className="text-center">
                    <h3 className={`
                      text-lg font-bold mb-1 transition-colors
                      ${activePhase >= index ? 'text-white' : 'text-slate-500'}
                    `}>
                      {phase.title}
                    </h3>
                    <p className={`
                      text-sm transition-colors
                      ${activePhase >= index ? 'text-teal-400' : 'text-slate-600'}
                    `}>
                      {phase.duration}
                    </p>
                  </div>

                  {/* Arrow (except last item) */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 text-slate-600">
                      <ArrowForwardIcon />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active Phase Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="card p-8 mb-16"
            >
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Phase Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      bg-gradient-to-r ${phases[activePhase].color}
                    `}>
                      {phases[activePhase].icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {phases[activePhase].title}
                      </h2>
                      <p className="text-teal-400">{phases[activePhase].duration}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-slate-300 mb-6">
                    {phases[activePhase].description}
                  </p>

                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Activities</h4>
                    <ul className="space-y-2">
                      {phases[activePhase].activities.map((activity, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2 text-slate-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <CheckCircleIcon className="text-teal-400" fontSize="small" />
                          {activity}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Deliverables</h4>
                  <div className="space-y-3">
                    {phases[activePhase].deliverables.map((deliverable, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-teal-500"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                      >
                        <div className="text-slate-200">{deliverable}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Phase Navigation */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
                      disabled={activePhase === 0 || showAnimation}
                      className="secondary-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous Phase
                    </button>
                    <button
                      onClick={() => setActivePhase(Math.min(phases.length - 1, activePhase + 1))}
                      disabled={activePhase === phases.length - 1 || showAnimation}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Phase
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Process Benefits */}
          <motion.div 
            className="bg-slate-800 rounded-3xl p-8 md:p-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Why Our Process Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">100%</div>
                <div className="text-white font-semibold mb-2">Transparency</div>
                <div className="text-slate-400 text-sm">
                  Regular updates and clear communication throughout
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">95%</div>
                <div className="text-white font-semibold mb-2">On-Time Delivery</div>
                <div className="text-slate-400 text-sm">
                  Structured approach ensures predictable timelines
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">98%</div>
                <div className="text-white font-semibold mb-2">Client Satisfaction</div>
                <div className="text-slate-400 text-sm">
                  Collaborative process delivers results that exceed expectations
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Experience our proven process firsthand. Let's discuss your project and create a custom roadmap for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Start Discovery Phase
              </a>
              <a href="/case-studies" className="secondary-btn">
                View Success Stories
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Process;
