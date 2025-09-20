import React from 'react';
import { motion } from 'framer-motion';

const SectionLoader = ({ 
  text = "Loading...", 
  size = "medium", 
  showBackground = false,
  className = "" 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  const containerClasses = {
    small: "p-4",
    medium: "p-8",
    large: "p-12"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]} ${className}`}>
      {showBackground && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl" />
      )}
      
      <div className="relative flex flex-col items-center space-y-4">
        {/* Animated Loader */}
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            className={`${sizeClasses[size]} border-2 border-teal-500/30 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Ring */}
          <motion.div
            className={`absolute inset-1 border-2 border-purple-500/50 rounded-full border-t-transparent`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Dot */}
          <motion.div
            className="absolute inset-1/2 w-2 h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Loading Text */}
        {text && (
          <motion.p
            className={`text-slate-300 font-medium ${
              size === 'small' ? 'text-sm' : 
              size === 'medium' ? 'text-base' : 'text-lg'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}

        {/* Pulse Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 opacity-10`}
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.1, 0, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default SectionLoader;