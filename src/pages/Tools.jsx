import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LaunchIcon from '@mui/icons-material/Launch';
import BuildIcon from '@mui/icons-material/Build';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { motion } from 'framer-motion';

const Tools = () => {
  const pageSchema = getWebPageSchema(
    "ProximaCloud Tools - Free Productivity Tools & Utilities",
    "Discover our collection of free, powerful tools designed to boost your productivity. From file sharing to development utilities, all tools are free to use.",
    "https://proximacloud.com/tools"
  );

  const tools = [
    {
      id: 'proximashare',
      name: 'ProximaShare',
      tagline: 'Simple & Secure File Sharing',
      description: 'Upload and share files easily with secure, auto-expiring links. No registration required.',
      icon: <CloudUploadIcon className="h-12 w-12 text-teal-400" />,
      features: ['2MB file limit', '3-day expiry', 'No registration', 'Secure links'],
      status: 'Available',
      isNew: true,
      url: 'https://share.proximacloud.in/',
      internalLink: '/proximashare',
      category: 'File Management'
    },
    // Placeholder for future tools
    {
      id: 'coming-soon-1',
      name: 'ProximaCode',
      tagline: 'Code Snippet Sharing',
      description: 'Share code snippets with syntax highlighting and collaborative features.',
      icon: <BuildIcon className="h-12 w-12 text-slate-500" />,
      features: ['Syntax highlighting', 'Multiple languages', 'Collaborative editing', 'Private/Public'],
      status: 'Coming Soon',
      isNew: false,
      category: 'Development'
    },
    {
      id: 'coming-soon-2',
      name: 'ProximaLink',
      tagline: 'Smart URL Shortener',
      description: 'Shorten links with analytics, custom domains, and advanced tracking.',
      icon: <BuildIcon className="h-12 w-12 text-slate-500" />,
      features: ['Custom domains', 'Click analytics', 'QR codes', 'Bulk operations'],
      status: 'Coming Soon',
      isNew: false,
      category: 'Productivity'
    }
  ];

  const handleToolClick = (tool) => {
    if (tool.status === 'Available' && tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <SEO 
        title="ProximaCloud Tools - Free Productivity Tools & Utilities"
        description="Discover our collection of free, powerful tools designed to boost your productivity. From file sharing to development utilities, all tools are free to use."
        keywords="ProximaCloud tools, free tools, productivity tools, file sharing, developer tools, utilities, ProximaShare"
        structuredData={pageSchema}
      />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                ProximaCloud Tools
              </h1>
              <p className="text-xl md:text-2xl text-white mb-4">
                Free, Powerful Tools for Everyone
              </p>
              <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
                Discover our growing collection of productivity tools designed to make your work easier. 
                All tools are completely free to use, with no hidden costs or registration requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                className={`card p-8 relative transition-all duration-300 hover:transform hover:scale-105 ${
                  tool.status === 'Available' ? 'cursor-pointer' : 'opacity-75'
                }`}
                onClick={() => handleToolClick(tool)}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {tool.isNew && (
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <NewReleasesIcon fontSize="small" />
                      NEW
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    tool.status === 'Available' 
                      ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                      : 'bg-slate-600/20 text-slate-400 border border-slate-400/30'
                  }`}>
                    {tool.status}
                  </span>
                </div>

                {/* Category */}
                <div className="text-xs text-teal-400 font-semibold mb-4 uppercase tracking-wider">
                  {tool.category}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  {tool.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  {tool.name}
                </h3>
                <p className="text-lg text-teal-300 font-medium mb-4 text-center">
                  {tool.tagline}
                </p>
                <p className="text-slate-400 mb-6 text-center leading-relaxed">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  {tool.status === 'Available' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(tool.url, '_blank', 'noopener,noreferrer');
                        }}
                        className="btn-primary flex items-center justify-center gap-2 w-full"
                      >
                        <LaunchIcon />
                        Launch Tool
                      </button>
                      {tool.internalLink && (
                        <Link
                          to={tool.internalLink}
                          onClick={(e) => e.stopPropagation()}
                          className="text-center text-teal-400 hover:text-teal-300 transition-colors text-sm"
                        >
                          Learn More →
                        </Link>
                      )}
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="bg-slate-700 text-slate-400 px-4 py-2 rounded-lg text-sm">
                        Coming Soon
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Stay tuned for updates
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              More Tools Coming Soon
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              We're constantly working on new tools to boost your productivity. 
              Have an idea for a tool you'd like to see? Let us know!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary flex items-center justify-center gap-2"
              >
                Suggest a Tool
              </Link>
              <Link
                to="/blog"
                className="border border-slate-600 hover:border-teal-400 text-slate-300 hover:text-teal-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Stay Updated
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tools;
