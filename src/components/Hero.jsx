import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Next Frontier";
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="mx-auto my-auto md:py-32 text-center relative min-h-screen flex items-center" id="hero">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Parallax Planet */}
        <motion.img
          alt="Planet"
          className="planet-slow absolute -top-1/30 -right-1/4 w-1/2 opacity-70"
          src="https://static.vecteezy.com/system/resources/previews/036/261/359/non_2x/ai-generated-mercury-planet-isolated-on-transparent-background-free-png.png"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            rotate: [0, 360]
          }}
          transition={{
            rotate: { duration: 100, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 100 },
            y: { type: "spring", stiffness: 100 }
          }}
        />
        
        {/* Floating Spaceship */}
        <motion.img
          alt="Spaceship"
          className="absolute bottom-0 w-1/5 opacity-75 hovering-spaceship"
          src="https://static.vecteezy.com/system/resources/previews/045/800/111/non_2x/spaceship-isolated-on-transparent-background-free-png.png"
          animate={{
            y: [0, -20, 0],
            x: mousePosition.x * 0.01,
            rotate: [-2, 2, -2]
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            x: { type: "spring", stiffness: 50 },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Hero Content */}
      <motion.div 
        className="container mx-auto py-40 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter"
          variants={itemVariants}
        >
          Cloud Solutions for the&nbsp;
          <span className="gradient-text">
            {typedText}
            <motion.span
              className="inline-block w-1 h-8 bg-teal-400 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10"
          variants={itemVariants}
        >
          We architect and manage robust, scalable, and secure cloud infrastructures to power your business's growth and innovation.
        </motion.p>
        
        {/* Stats Counter */}
        <motion.div 
          className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-10 p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-400">
              <CountUp end={50} duration={2.5} />+
            </div>
            <div className="text-sm text-slate-400">Projects</div>
          </div>
          <div className="text-center border-x border-slate-600">
            <div className="text-2xl font-bold text-teal-400">
              <CountUp end={99.9} duration={2.5} decimals={1} />%
            </div>
            <div className="text-sm text-slate-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-400">
              <CountUp end={25} duration={2.5} />+
            </div>
            <div className="text-sm text-slate-400">Clients</div>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.a 
            className="btn-primary inline-flex items-center space-x-2"
            href="#services"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Started</span>
            <RocketLaunchIcon />
          </motion.a>
          
          <button
            onClick={() => window.open('https://share.proximacloud.in/', '_blank', 'noopener,noreferrer')}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-all duration-300 hover:transform hover:scale-105"
          >
            <LaunchIcon />
            <span>Try ProximaShare</span>
          </button>
          
          <Link 
            to="/pricing-calculator"
            className="secondary-btn inline-flex items-center space-x-2"
          >
            <span>Calculate Pricing</span>
          </Link>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-teal-400 rounded-full mt-2"
              animate={{
                y: [0, 12, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;