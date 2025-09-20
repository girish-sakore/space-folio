// Animation variants for consistent micro-interactions across the site

// Basic entrance animations
export const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  export const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  export const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  export const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  export const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  export const rotateInVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  
  // Interactive element variants
  export const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };
  
  export const cardHoverVariants = {
    rest: { 
      y: 0,
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };
  
  export const iconHoverVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };
  
  // Loading and feedback animations
  export const loadingVariants = {
    loading: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };
  
  export const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };
  
  export const bounceVariants = {
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeOut'
      }
    }
  };
  
  // Form interaction variants
  export const inputFocusVariants = {
    rest: { 
      scale: 1,
      boxShadow: '0 0 0 0 rgba(20, 184, 166, 0)'
    },
    focus: {
      scale: 1.02,
      boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1)',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };
  
  export const submitSuccessVariants = {
    initial: { scale: 1, backgroundColor: '#14b8a6' },
    success: {
      scale: [1, 1.05, 1],
      backgroundColor: '#10b981',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };
  
  // Navigation animations
  export const navLinkVariants = {
    rest: { 
      color: '#94a3b8',
      textDecoration: 'none'
    },
    hover: {
      color: '#14b8a6',
      textDecoration: 'underline',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    active: {
      color: '#14b8a6',
      fontWeight: 600
    }
  };
  
  export const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };
  
  // Page transition variants
  export const pageTransitionVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };
  
  // Stagger container variants
  export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  export const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  // Modal and overlay variants
  export const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };
  
  export const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };
  
  // Progress and loading bars
  export const progressBarVariants = {
    initial: { width: '0%' },
    animate: (progress) => ({
      width: `${progress}%`,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };
  
  // Notification animations
  export const notificationVariants = {
    initial: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };
  
  // Floating elements
  export const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };
  
  export const gentleFloatVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };
  