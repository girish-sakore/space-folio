/**
 * PDF Download Progress Modal Component
 * 
 * Features:
 * - Animated progress tracking with 5 distinct stages
 * - Professional UI with gradient backgrounds
 * - Stage indicators with visual feedback
 * - Filename display and success celebrations
 * - Auto-dismiss on completion
 * 
 * Stages:
 * 1. Preparing PDF (0-20%)
 * 2. Rendering Content (20-40%)
 * 3. Optimizing Quality (40-60%)
 * 4. Generating PDF (60-90%)
 * 5. Download Complete (100%)
 * 
 * @component
 * @param {boolean} isVisible - Controls modal visibility
 * @param {number} progress - Current progress percentage (0-100)
 * @param {function} onComplete - Callback when download completes
 * @param {string} filename - Name of the file being downloaded
 * @author Proxima Cloud Development Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PDFDownloadModal = ({ isVisible, progress, onComplete, filename }) => {
  // State for tracking current stage based on progress
  const [currentStage, setCurrentStage] = useState(0);
  
  // PDF generation stages with descriptive information
  const stages = [
    { id: 0, title: 'Preparing PDF...', description: 'Setting up document structure', icon: '📄' },
    { id: 1, title: 'Rendering Content...', description: 'Converting estimate to canvas', icon: '🖼️' },
    { id: 2, title: 'Optimizing Quality...', description: 'Enhancing resolution and layout', icon: '✨' },
    { id: 3, title: 'Generating PDF...', description: 'Creating downloadable document', icon: '⚙️' },
    { id: 4, title: 'Download Complete!', description: 'PDF saved to your Downloads folder', icon: '✅' }
  ];

  useEffect(() => {
    if (progress <= 20) setCurrentStage(0);
    else if (progress <= 40) setCurrentStage(1);
    else if (progress <= 60) setCurrentStage(2);
    else if (progress <= 90) setCurrentStage(3);
    else if (progress >= 100) setCurrentStage(4);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100 && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // Show success for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-purple-600 p-6 text-center">
              <motion.div
                className="text-4xl mb-2"
                variants={currentStage === 4 ? pulseVariants : iconVariants}
                key={stages[currentStage].icon}
                initial="initial"
                animate="animate"
              >
                {stages[currentStage].icon}
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-white"
                key={stages[currentStage].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {stages[currentStage].title}
              </motion.h3>
              <motion.p 
                className="text-teal-100 text-sm mt-1"
                key={stages[currentStage].description}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {stages[currentStage].description}
              </motion.p>
            </div>

            {/* Progress Section */}
            <div className="p-6 space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Progress</span>
                  <span className="text-teal-400 font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"
                    variants={progressBarVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>

              {/* Stage Indicators */}
              <div className="flex justify-between items-center">
                {stages.slice(0, -1).map((stage, index) => (
                  <div key={stage.id} className="flex flex-col items-center space-y-1">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        index <= currentStage 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-slate-700 text-slate-400'
                      }`}
                      animate={{
                        scale: index === currentStage ? [1, 1.1, 1] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: index === currentStage && currentStage < 4 ? Infinity : 0
                      }}
                    >
                      {index < currentStage ? '✓' : index + 1}
                    </motion.div>
                    <div className={`text-xs text-center transition-colors duration-300 ${
                      index <= currentStage ? 'text-teal-400' : 'text-slate-500'
                    }`}>
                      {stage.title.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filename Display */}
              {filename && currentStage >= 3 && (
                <motion.div
                  className="bg-slate-700 rounded-lg p-3 border border-slate-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-xs text-slate-400 mb-1">Downloading as:</div>
                  <div className="text-sm text-teal-400 font-mono break-all">{filename}</div>
                </motion.div>
              )}

              {/* Success Message */}
              {currentStage === 4 && (
                <motion.div
                  className="text-center p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-teal-400 font-semibold">🎉 Success!</div>
                  <div className="text-sm text-slate-300 mt-1">
                    Your PDF has been downloaded successfully
                  </div>
                </motion.div>
              )}

              {/* Loading Spinner for Active Stages */}
              {currentStage < 4 && (
                <div className="flex justify-center">
                  <motion.div
                    className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFDownloadModal;