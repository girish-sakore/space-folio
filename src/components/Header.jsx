import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BuildIcon from '@mui/icons-material/Build';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LaunchIcon from '@mui/icons-material/Launch';
import proximaLogo from '../assets/Proxima_Cloud-removebg-preview.png';
import { Link, useLocation } from "react-router-dom";
import { useMagneticHover } from '../hooks/useScrollAnimation';
import { buttonHoverVariants, mobileMenuVariants } from '../utils/animationVariants';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const logoMagnetic = useMagneticHover(0.1);
  
  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/pricing-calculator', label: 'Pricing' },
    { path: '/process', label: 'Process' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' }
  ];

  const toolsDropdownItems = [
    {
      path: '/tools',
      label: 'All Tools',
      description: 'View all available tools',
      icon: <BuildIcon fontSize="small" />
    },
    {
      path: '/proximashare', 
      label: 'ProximaShare',
      description: 'Secure file sharing',
      icon: <CloudUploadIcon fontSize="small" />,
      isNew: true,
      external: 'https://share.proximacloud.in/'
    }
  ];

  return (
    <>
      <motion.header 
        className={`fixed w-full z-50 p-4 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with magnetic effect */}
          <motion.div
            ref={logoMagnetic.ref}
            style={{ x: logoMagnetic.x, y: logoMagnetic.y }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-2xl font-bold text-white group"
            >
              <motion.img
                alt="Proxima Cloud Logo"
                className="logo-primary h-10 transition-transform duration-300 group-hover:scale-110"
                src={proximaLogo}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                ProximaCloud
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-slate-300 font-medium">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link 
                  to={link.path} 
                  className={`
                    relative font-bold transition-all duration-300 hover:text-teal-400
                    ${isActive(link.path) ? 'text-teal-400' : 'text-slate-300'}
                  `}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive(link.path) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400"
                      layoutId="activeNav"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-teal-400/10 rounded-lg scale-0"
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Tools Dropdown */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
              onMouseEnter={() => setIsToolsDropdownOpen(true)}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <button className={`
                relative font-bold transition-all duration-300 hover:text-teal-400 flex items-center gap-1
                ${location.pathname.includes('/tools') || location.pathname.includes('/proximashare') ? 'text-teal-400' : 'text-slate-300'}
                text-teal-400 bg-teal-400/10 px-3 py-2 rounded-lg border border-teal-400/20
              `}>
                Tools
                <motion.div
                  animate={{ rotate: isToolsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExpandMoreIcon fontSize="small" />
                </motion.div>
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isToolsDropdownOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      {toolsDropdownItems.map((tool, index) => (
                        <motion.div
                          key={tool.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          {tool.external ? (
                            <div className="flex">
                              <Link
                                to={tool.path}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors duration-300 flex-1 mr-2"
                              >
                                <div className="text-teal-400">{tool.icon}</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-medium text-sm">{tool.label}</span>
                                    {tool.isNew && (
                                      <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">NEW</span>
                                    )}
                                  </div>
                                  <p className="text-slate-400 text-xs mt-0.5">{tool.description}</p>
                                </div>
                              </Link>
                              <button
                                onClick={() => window.open(tool.external, '_blank', 'noopener,noreferrer')}
                                className="px-3 py-3 text-teal-400 hover:text-teal-300 hover:bg-slate-700 rounded-lg transition-colors duration-300"
                                title="Launch Tool"
                              >
                                <LaunchIcon fontSize="small" />
                              </button>
                            </div>
                          ) : (
                            <Link
                              to={tool.path}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors duration-300 w-full"
                            >
                              <div className="text-teal-400">{tool.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-medium text-sm">{tool.label}</span>
                                  {tool.isNew && (
                                    <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">NEW</span>
                                  )}
                                </div>
                                <p className="text-slate-400 text-xs mt-0.5">{tool.description}</p>
                              </div>
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="lg:hidden text-white hover:text-teal-400 transition-colors p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            style={{ zIndex: 60 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloseIcon />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.nav
              className="fixed top-0 right-0 h-full w-80 bg-slate-900 z-40 lg:hidden overflow-y-auto"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Close button inside menu */}
              <div className="absolute top-4 right-4 z-50">
                <motion.button 
                  className="text-white hover:text-teal-400 transition-colors p-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <CloseIcon />
                </motion.button>
              </div>
              <div className="p-6 pt-20">
                <div className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={`
                          block py-3 px-4 rounded-lg font-medium transition-all duration-300
                          ${isActive(link.path) 
                            ? 'text-teal-400 bg-teal-400/10' 
                            : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800'
                          }
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Tools Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                  >
                    <div className="py-3 px-4">
                      <h3 className="text-teal-400 font-semibold mb-3 flex items-center gap-2">
                        <BuildIcon fontSize="small" />
                        Tools
                      </h3>
                      <div className="space-y-2 ml-4">
                        {toolsDropdownItems.map((tool, toolIndex) => (
                          <div key={tool.path} className="flex items-center justify-between">
                            <Link
                              to={tool.path}
                              className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-300 hover:text-teal-400 hover:bg-slate-800 transition-colors duration-300 flex-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="text-teal-400">{tool.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{tool.label}</span>
                                  {tool.isNew && (
                                    <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">NEW</span>
                                  )}
                                </div>
                                <p className="text-slate-500 text-xs mt-0.5">{tool.description}</p>
                              </div>
                            </Link>
                            {tool.external && (
                              <button
                                onClick={() => {
                                  window.open(tool.external, '_blank', 'noopener,noreferrer');
                                  setIsMobileMenuOpen(false);
                                }}
                                className="p-2 text-teal-400 hover:text-teal-300 hover:bg-slate-700 rounded-lg transition-colors duration-300"
                                title="Launch Tool"
                              >
                                <LaunchIcon fontSize="small" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;