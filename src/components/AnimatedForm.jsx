import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inputFocusVariants, submitSuccessVariants, buttonHoverVariants } from '../utils/animationVariants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const AnimatedInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false,
  multiline = false,
  rows = 4,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <motion.div 
      className="relative mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        variants={inputFocusVariants}
        initial="rest"
        animate={isFocused || value ? "focus" : "rest"}
      >
        <InputComponent
          type={multiline ? undefined : type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={multiline ? rows : undefined}
          className={`
            w-full px-4 py-3 bg-slate-800 border-2 rounded-lg text-white placeholder-transparent
            transition-all duration-300 focus:outline-none resize-none
            ${error 
              ? 'border-red-500 focus:border-red-400' 
              : 'border-slate-700 focus:border-teal-400'
            }
            ${multiline ? 'min-h-[120px]' : ''}
          `}
          placeholder={label}
          required={required}
          {...props}
        />
        
        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 pointer-events-none transition-all duration-300
            ${isFocused || value
              ? 'top-2 text-xs text-teal-400 font-medium'
              : `${multiline ? 'top-4' : 'top-3'} text-slate-400`
            }
          `}
          animate={{
            y: isFocused || value ? -8 : 0,
            scale: isFocused || value ? 0.85 : 1,
            color: error ? '#ef4444' : (isFocused ? '#14b8a6' : '#94a3b8')
          }}
          transition={{ duration: 0.2 }}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </motion.label>

        {/* Focus Ring Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: isFocused 
              ? '0 0 0 3px rgba(20, 184, 166, 0.1)' 
              : '0 0 0 0px rgba(20, 184, 166, 0)'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <ErrorIcon fontSize="small" />
            </motion.div>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Indicator */}
      <AnimatePresence>
        {value && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400"
          >
            <CheckCircleIcon fontSize="small" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatedSubmitButton = ({ 
  children, 
  isLoading = false, 
  isSuccess = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      className={`
        relative w-full py-4 px-6 rounded-lg font-medium text-white overflow-hidden
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${isSuccess 
          ? 'bg-green-500' 
          : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
        }
      `}
      variants={buttonHoverVariants}
      whileHover={!disabled && !isLoading ? "hover" : "rest"}
      whileTap={!disabled && !isLoading ? "tap" : "rest"}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-teal-500"
          >
            <motion.div
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Checkmark */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CheckCircleIcon className="text-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Text */}
      <motion.span
        animate={{
          opacity: isLoading || isSuccess ? 0 : 1,
          y: isLoading || isSuccess ? 10 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-lg scale-0"
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

// Progress Indicator for Multi-step Forms
export const FormProgress = ({ currentStep, totalSteps, labels = [] }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-medium
                ${index < currentStep 
                  ? 'bg-teal-500 text-white' 
                  : index === currentStep 
                    ? 'bg-teal-400 text-white' 
                    : 'bg-slate-700 text-slate-400'
                }
              `}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
            >
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircleIcon fontSize="small" />
                </motion.div>
              ) : (
                index + 1
              )}
            </motion.div>
            
            {labels[index] && (
              <motion.span
                className={`
                  ml-3 text-sm font-medium
                  ${index <= currentStep ? 'text-teal-400' : 'text-slate-500'}
                `}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {labels[index]}
              </motion.span>
            )}
            
            {index < totalSteps - 1 && (
              <motion.div
                className={`
                  flex-1 h-0.5 mx-4
                  ${index < currentStep ? 'bg-teal-500' : 'bg-slate-700'}
                `}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { AnimatedInput, AnimatedSubmitButton };
export default AnimatedInput;
