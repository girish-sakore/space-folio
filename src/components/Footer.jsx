import React from "react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import { slideUpVariants } from '../utils/animationVariants';

const Footer = () => {
  const { ref: footerRef, controls } = useScrollAnimation({ threshold: 0.2 });
  const { ref: linksRef, controls: linksControls, containerVariants, itemVariants } = useStaggerAnimation(0.05);

  const footerLinks = [
    { path: '/tools', label: 'Tools', highlight: true },
    { path: '/faq', label: 'FAQ' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/pricing-calculator', label: 'Pricing' },
    { path: '/process', label: 'Process' },
    { path: '/blog', label: 'Blog' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <motion.footer 
      ref={footerRef}
      className="py-8 bg-slate-900 border-t border-slate-800 relative overflow-hidden"
      variants={slideUpVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-blue-500/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
          {/* Company Info */}
          <motion.div 
            className="mb-4 md:mb-0 text-center md:text-left"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <motion.p 
              className="font-medium"
              whileHover={{ scale: 1.02, color: '#14b8a6' }}
              transition={{ duration: 0.2 }}
            >
              © 2025 Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd. All rights reserved.
            </motion.p>
            <motion.p 
              className="text-sm mt-1 text-slate-500"
              animate={{
                color: ['#64748b', '#14b8a6', '#64748b']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              Architecting the Future of Cloud.
            </motion.p>
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            ref={linksRef}
            className="flex flex-wrap justify-center md:justify-end gap-4 text-sm"
            variants={containerVariants}
            initial="hidden"
            animate={linksControls}
          >
            {footerLinks.map((link) => (
              <motion.div
                key={link.path}
                variants={itemVariants}
              >
                <Link 
                  to={link.path} 
                  className="relative group"
                >
                  <motion.span
                    className={`hover:text-teal-400 transition-colors duration-300 ${
                      link.highlight ? 'text-teal-300 font-semibold' : ''
                    }`}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: '0 0 8px rgba(20, 184, 166, 0.5)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    {link.highlight && <span className="ml-1 text-xs">🔥</span>}
                  </motion.span>
                  
                  {/* Underline effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-teal-400 w-0 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                  
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-teal-400/10 rounded-lg scale-0 group-hover:scale-110"
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
