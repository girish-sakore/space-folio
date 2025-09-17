import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const ProximaShareHero = () => {
  const handleTryNowClick = () => {
    window.open('https://share.proximacloud.in/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-teal-900/20 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400/10 to-blue-400/10 border border-teal-400/20 rounded-full px-4 py-2 text-teal-300 text-sm font-medium">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              🚀 Now Available: ProximaShare - Our New File Sharing Tool
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Introducing{' '}
                <span className="gradient-text">ProximaShare</span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                Simple & secure file sharing in seconds. Upload files, get shareable links instantly, 
                with automatic expiry for enhanced security.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <CloudUploadIcon className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">Drag & Drop</span>
                </div>
                <div className="flex items-center gap-3">
                  <SecurityIcon className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">Auto-Expiry</span>
                </div>
                <div className="flex items-center gap-3">
                  <SpeedIcon className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">Lightning Fast</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 text-lg">✨</span>
                  <span className="text-slate-300">No Registration</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleTryNowClick}
                  className="btn-primary text-lg px-6 py-3 flex items-center justify-center gap-2 group"
                >
                  <LaunchIcon className="group-hover:rotate-45 transition-transform duration-300" />
                  Try ProximaShare Free
                </button>
                
                <Link
                  to="/proximashare"
                  className="border border-slate-600 hover:border-teal-400 text-slate-300 hover:text-teal-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6 text-sm text-slate-400">
                <span>2MB file limit</span>
                <span>•</span>
                <span>3-day expiry</span>
                <span>•</span>
                <span>100% Free</span>
              </div>
            </motion.div>

            {/* Right Content - Demo Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Preview Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-slate-900 border-2 border-dashed border-slate-600 hover:border-teal-400/50 rounded-xl p-8 text-center transition-colors duration-300 group">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      <CloudUploadIcon className="h-12 w-12 text-teal-400 mx-auto mb-4 group-hover:text-teal-300 transition-colors" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Drop files here
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Get shareable links instantly
                    </p>
                    
                    {/* Progress bar animation */}
                    <div className="mt-4 bg-slate-700 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-400 to-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="absolute -top-4 -left-4 bg-teal-400 text-slate-900 px-3 py-2 rounded-lg text-sm font-bold shadow-lg"
                >
                  ✓ Secure
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                  className="absolute -bottom-4 -right-4 bg-blue-400 text-slate-900 px-3 py-2 rounded-lg text-sm font-bold shadow-lg"
                >
                  ⚡ Fast
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProximaShareHero;
