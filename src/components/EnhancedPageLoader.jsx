/**
 * Enhanced Page Loader Component
 * 
 * A sophisticated loading screen with:
 * - Company branding using favicon logo
 * - Subtle, elegant animations matching website design
 * - Floating particles and ambient background effects
 * - Progress indicators and loading tips
 * - Professional appearance for corporate clients
 * 
 * Design Philosophy:
 * - Uses website's color palette (slate/teal)
 * - Incorporates stardust texture for consistency
 * - Sophisticated animations without being distracting
 * - Glass morphism effects for modern feel
 * 
 * @component
 * @param {boolean} isLoading - Controls loader visibility
 * @param {string} loadingText - Custom loading text
 * @author Proxima Cloud Development Team
 * @version 2.0.0 (Enhanced from simple spinner)
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProximaCloud from "../assets/Proxima_Cloud-preview.png";

const EnhancedPageLoader = ({
  isLoading = true,
  loadingText = "Loading...",
}) => {
  // Animation state management
  const [dots, setDots] = useState("");                          // Animated dots for loading text
  const [currentTip, setCurrentTip] = useState(0);              // Current loading tip index

  // Loading tips that cycle during the loading process
  const loadingTips = [
    { icon: "🚀", text: "Preparing your experience..." },
    { icon: "⚡", text: "Loading components..." },
    { icon: "🎨", text: "Applying modern design..." },
    { icon: "🔧", text: "Optimizing performance..." },
    { icon: "✨", text: "Almost ready!" },
  ];

  // Animate loading dots (...) effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Cycle through loading tips every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants for smooth transitions
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const logoVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const particleVariants = {
    animate: {
      y: [-20, 20],
      x: [-10, 10],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const tipVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(168, 219, 217, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(100, 197, 194, 0.04) 0%, transparent 50%),
              url('https://www.transparenttextures.com/patterns/stardust.png')
            `,
          }}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Subtle Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-slate-600 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
                animate="animate"
                transition={{
                  delay: Math.random() * 6,
                  duration: 4 + Math.random() * 3,
                }}
              />
            ))}

            {/* Subtle Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-teal-600/10 to-transparent rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-slate-700/8 to-transparent rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col items-center space-y-8 z-10">
            {/* Logo/Brand Section */}
            <div className="relative">
              {/* Subtle Pulse Background */}
              <motion.div
                className="absolute inset-0 rounded-full bg-slate-800/40 backdrop-blur-sm"
                variants={pulseVariants}
                animate="animate"
              />

              {/* Orbiting Elements */}
              <motion.div
                className="relative w-32 h-32 rounded-full border-2 border-slate-600/40"
                variants={orbitVariants}
                animate="animate"
              >
                {/* Orbit Dots - More Subtle */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-teal-500/60 to-slate-400/60 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      transform: `rotate(${rotation}deg) translateY(-64px) translateX(-4px)`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </motion.div>

              {/* Central Logo using Favicon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                variants={logoVariants}
                animate="animate"
              >
                <div className="relative w-20 h-20 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm">
                  {/* Favicon SVG Replica */}
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 bg-gradient-to-br"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={ProximaCloud}
                        alt="Proxima Cloud"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>

                  {/* Subtle Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-600/20 blur-md"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Progress Bars - More Elegant */}
            <div className="w-64 space-y-3">
              {/* Main Progress Bar */}
              <div className="relative">
                <div className="w-full h-1.5 bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500/80 to-teal-400/80 rounded-full"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Subtle Progress Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-400/20 opacity-60 blur-sm"
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>

              {/* Secondary Bars - More Refined */}
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-0.5 bg-gradient-to-r from-slate-600/60 to-teal-500/60 rounded-full"
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scaleY: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center space-y-4">
              <motion.h2
                className="text-3xl font-bold text-white"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Proxima Cloud
              </motion.h2>

              <motion.p
                className="text-lg text-slate-300"
                key={loadingText + dots}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {loadingText}
                {dots}
              </motion.p>

              {/* Loading Tips */}
              <div className="h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTip}
                    className="flex items-center space-x-2 text-slate-300"
                    variants={tipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <motion.span
                      className="text-2xl"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      {loadingTips[currentTip].icon}
                    </motion.span>
                    <span className="text-sm">
                      {loadingTips[currentTip].text}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Loading Percentage Display */}
            <motion.div
              className="absolute bottom-8 right-8 text-right text-sm text-slate-400"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            ></motion.div>
          </div>

          {/* Elegant Corner Decorations */}
          <div className="absolute top-6 left-6">
            <motion.div
              className="w-8 h-8 border border-slate-600/40 rounded-full backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="w-2 h-2 bg-teal-500/60 rounded-full m-auto mt-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <div className="absolute bottom-6 right-6">
            <motion.div
              className="w-6 h-6 bg-gradient-to-br from-slate-700/30 to-teal-600/30 rounded-full backdrop-blur-sm border border-slate-600/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          {/* Additional Subtle Elements */}
          <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
            <motion.div
              className="w-1 h-12 bg-gradient-to-b from-transparent via-slate-600/20 to-transparent rounded-full"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
            <motion.div
              className="w-1 h-8 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent rounded-full"
              animate={{
                scaleY: [1.5, 1, 1.5],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedPageLoader;
