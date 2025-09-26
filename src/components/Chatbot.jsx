/**
 * Intelligent Chatbot Component
 * 
 * Features:
 * - AI-powered responses based on comprehensive knowledge base
 * - Interactive UI with smooth animations
 * - Global availability across all pages
 * - Contextual suggestions and quick replies
 * - Professional design matching website theme
 * - Unread message notifications
 * - Auto-scroll and focus management
 * 
 * @component
 * @author Proxima Cloud Development Team
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { knowledgeBase, findServiceInfo, getRandomFAQ } from '../utils/chatbotKnowledgeBase';

const Chatbot = () => {
  // State management for chat functionality
  const [isOpen, setIsOpen] = useState(false);                    // Controls chat window visibility
  const [messages, setMessages] = useState([                      // Stores conversation history
    {
      id: 1,
      type: 'bot',
      text: 'Hi there! 👋 I\'m your Proxima Cloud assistant.\n\n🚀 **Ready to grow your business?** We help companies build amazing websites, mobile apps, and migrate to the cloud.\n\n💡 Most projects start with a FREE 15-minute consultation. What can we help you with?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');              // Current user input
  const [isTyping, setIsTyping] = useState(false);               // Bot typing indicator
  const [unreadCount, setUnreadCount] = useState(0);             // Unread message counter
  const [hasShownProactiveMessage, setHasShownProactiveMessage] = useState(false); // Proactive engagement tracker

  // Refs for DOM manipulation
  const messagesEndRef = useRef(null);                           // Auto-scroll target
  const inputRef = useRef(null);                                 // Input focus management

  const quickReplies = [
    { id: 1, text: '📞 Schedule a Free Call', icon: '📞' },
    { id: 2, text: '💰 Get Instant Quote', icon: '💰' },
    { id: 3, text: '🚀 Browse Our Services', icon: '🚀' },
    { id: 4, text: '💬 I Have a Project Idea', icon: '💬' }
  ];

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Proactive engagement - show helpful message after 45 seconds of inactivity
  useEffect(() => {
    let proactiveTimer;

    if (!hasShownProactiveMessage && messages.length === 1) {
      proactiveTimer = setTimeout(() => {
        const proactiveMessage = {
          id: Date.now(),
          type: 'bot',
          text: '🚀 **Still there?** I noticed you might be exploring our services!\n\n💡 **Quick question:** Are you looking to build something new or improve something existing?\n\n🎯 Most successful projects start with a simple conversation. Want to chat?',
          suggestions: ['📞 Quick 15-Min Call', '📧 Email My Idea', '🚀 Browse Services', '💬 Yes, Let\'s Chat'],
          timestamp: new Date()
        };

        setMessages(prev => [...prev, proactiveMessage]);
        setHasShownProactiveMessage(true);

        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }, 45000); // 45 seconds
    }

    return () => {
      if (proactiveTimer) clearTimeout(proactiveTimer);
    };
  }, [messages.length, hasShownProactiveMessage, isOpen]);

  /**
   * Lead-Generation Focused Response System
   * Designed to capture leads and convert visitors into customers
   * Every response includes a strong CTA and path to contact
   * 
   * @param {string} userMessage - The user's input message
   * @returns {object} Response object with text and lead-focused suggestions
   */
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Lead capture - first priority
    if (message.includes('interested') || message.includes('quote') || message.includes('price') || message.includes('cost')) {
      return {
        text: '🚀 Awesome! I\'d love to help you get started.\n\nFor accurate pricing, I\'ll need to understand your project better. Our team offers a FREE consultation to discuss your needs and provide a detailed quote.\n\n💡 Most projects start at $3,000 and we typically respond within 2 hours.',
        suggestions: ['📞 Schedule Free Call', '✉️ Get Quote via Email', '📊 Use Pricing Calculator', '💬 Tell Me More'],
        isLeadCapture: true
      };
    }

    // Service inquiries - focus on benefits and CTA
    if (message.includes('service') || message.includes('what do you do') || message.includes('help')) {
      return {
        text: '🎯 We help businesses grow with:\n\n• ☁️ **Cloud Migration** - Save 30-50% on infrastructure\n• 💻 **Web Development** - Modern, mobile-first websites\n• 📱 **Mobile Apps** - iOS & Android applications\n• 📊 **Data Analytics** - Turn data into insights\n\n✨ **50+ successful projects, 4.9/5 rating**\n\nWhich area interests you most?',
        suggestions: ['💰 Get Pricing', '📞 Book Free Call', '📋 See Our Work', '💬 Tell Me About Your Project']
      };
    }

    // Specific service interest - immediate lead capture focus
    if (message.includes('web') || message.includes('website') || message.includes('development')) {
      return {
        text: '💻 Perfect! Web development is our specialty.\n\n✅ **What we deliver:**\n• Modern, responsive websites\n• Fast loading & SEO optimized\n• Mobile-first design\n• Starting from $3,000\n\n🎯 **Next step:** Let\'s discuss your vision! Book a free call and get a custom quote within 24 hours.',
        suggestions: ['📞 Book Free Consultation', '✉️ Email Your Requirements', '📊 Quick Price Estimate', '👀 See Examples']
      };
    }

    if (message.includes('mobile') || message.includes('app') || message.includes('ios') || message.includes('android')) {
      return {
        text: '📱 Mobile apps can transform your business!\n\n✅ **Our expertise:**\n• Native iOS & Android\n• Cross-platform solutions\n• App Store optimization\n• Starting from $8,000\n\n🚀 **Ready to start?** Most successful apps begin with a strategy session.',
        suggestions: ['📞 Strategy Call', '✉️ Share Your App Idea', '💰 Get App Quote', '📱 See App Examples']
      };
    }

    if (message.includes('cloud') || message.includes('aws') || message.includes('azure') || message.includes('migration')) {
      return {
        text: '☁️ Smart choice! Cloud migration can cut costs by 40%.\n\n✅ **Our track record:**\n• 30+ successful migrations\n• AWS & Azure certified\n• Zero downtime migrations\n• Starting from $5,000\n\n🎯 **Free cloud assessment available!** Let\'s analyze your current setup.',
        suggestions: ['📊 Free Cloud Assessment', '📞 Migration Strategy Call', '💰 Get Migration Quote', '📈 ROI Calculator']
      };
    }

    // Contact intent - immediate connection
    if (message.includes('contact') || message.includes('call') || message.includes('email') || message.includes('reach')) {
      return {
        text: '📞 **Ready to connect? Here are the fastest ways:**\n\n🚀 **Immediate:** Call +91-77987-29845\n📧 **24-hour response:** info@proximacloud.in\n📅 **Book directly:** Schedule a free consultation\n\n⏰ **We\'re online:** Mon-Fri, 9 AM - 6 PM IST\n\n💡 **Pro tip:** Calls get faster responses!',
        suggestions: ['📞 Call Now', '📧 Send Email', '📅 Schedule Meeting', '💬 Continue Chat']
      };
    }

    // About/company - build trust quickly
    if (message.includes('about') || message.includes('company') || message.includes('who')) {
      return {
        text: '🏢 **Proxima Cloud - Your Growth Partner**\n\n✨ **Founded 2019** | **50+ Projects** | **4.9⭐ Rating**\n\n🎯 We\'re a focused team that helps businesses scale with modern technology. No corporate overhead = better value for you.\n\n🚀 **Ready to grow together?**',
        suggestions: ['🤝 Let\'s Partner Up', '📞 Meet Our Team', '📊 See Our Results', '💬 Discuss Your Goals']
      };
    }

    // Pricing focus - always lead to consultation
    if (message.includes('pricing') || message.includes('cost') || message.includes('budget')) {
      return {
        text: '💰 **Smart question! Here\'s our honest pricing:**\n\n💻 **Websites:** $3K - $8K+\n📱 **Apps:** $8K - $15K+\n☁️ **Cloud:** $5K+\n\n🎯 **But here\'s the thing:** Every project is unique. Let\'s chat for 15 minutes and I\'ll give you an exact quote.\n\n✨ **Free consultation, no pressure!**',
        suggestions: ['📞 15-Min Pricing Call', '📧 Email Requirements', '📊 Pricing Calculator', '💡 Budget-Friendly Options']
      };
    }

    // Greeting - immediate engagement
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: '👋 **Hey there! Welcome to Proxima Cloud!**\n\nI\'m here to help you discover how we can boost your business with modern technology.\n\n🚀 **Quick question:** What\'s your biggest tech challenge right now?',
        suggestions: ['💻 Need a Website', '📱 Want an App', '☁️ Move to Cloud', '📊 Data Analytics']
      };
    }

    // Support/questions - guide to consultation
    if (message.includes('help') || message.includes('support') || message.includes('question')) {
      return {
        text: '💪 **I\'m here to help!** What\'s on your mind?\n\nWhether it\'s technical questions, project planning, or just exploring options - I\'ve got you covered.\n\n🎯 **For complex questions:** Our team offers free 15-minute consultations where we can dive deep into your specific needs.',
        suggestions: ['📞 Quick Consultation', '💬 Ask Your Question', '📧 Email Details', '🚀 Explore Solutions']
      };
    }

    // Thank you - reinforce next steps
    if (message.includes('thank') || message.includes('thanks')) {
      return {
        text: '🙏 **You\'re very welcome!**\n\nI love helping businesses grow. If you\'re ready to take the next step, our team is standing by to turn your ideas into reality.\n\n🚀 **Don\'t let great ideas wait - let\'s make them happen!**',
        suggestions: ['📞 Let\'s Start Today', '💬 I Have More Questions', '📧 Send Requirements', '📊 Get Quick Quote']
      };
    }

    // Default - always guide toward contact
    return {
      text: '🤔 **I want to give you the best answer!**\n\nTell me more about what you\'re working on, or let\'s jump on a quick call where I can understand your needs better.\n\n💡 **Most clients find a 15-minute chat more valuable than hours of reading.**',
      suggestions: ['📞 Quick Call', '💬 Describe My Project', '📧 Email My Needs', '🚀 Browse Solutions']
    };
  };

  // Handle special lead generation actions
  const handleLeadAction = (actionText) => {
    if (actionText.includes('📞') && (actionText.includes('Call') || actionText.includes('Schedule'))) {
      // Phone call action
      window.open('tel:+917798729845', '_self');
      return true;
    }

    if (actionText.includes('✉️') || actionText.includes('Email')) {
      // Email action
      window.open('mailto:info@proximacloud.in?subject=Project Inquiry from Website', '_blank');
      return true;
    }

    if (actionText.includes('Calculator') || actionText.includes('📊')) {
      // Pricing calculator
      window.open('/pricing-calculator', '_blank');
      return true;
    }

    if (actionText.includes('Quote') && !actionText.includes('Email')) {
      // Direct to contact page for quote
      window.open('/contact', '_blank');
      return true;
    }

    return false;
  };

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    // Check if this is a lead action first
    if (handleLeadAction(text)) {
      // Add a bot response confirming the action
      const confirmMessage = {
        id: Date.now(),
        type: 'bot',
        text: '✨ **Great choice!** I\'ve opened that for you. If you need any help while you\'re there, just come back and chat with me!\n\n📞 **Quick tip:** For immediate assistance, call +91-77987-29845',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmMessage]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse.text,
        suggestions: botResponse.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const chatbotVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                className="text-white text-xl"
              >
                ✕
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                className="text-white text-xl"
              >
                💬
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread Badge */}
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {unreadCount}
            </motion.div>
          )}

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-teal-400"
            animate={{
              scale: [1, 1.4],
              opacity: [0.7, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[32rem] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-40"
            variants={chatbotVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Proxima Assistant</h3>
                  <p className="text-teal-100 text-sm">Online • Typically replies in minutes</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.type === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                    }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-teal-100' : 'text-slate-400'
                      }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-slate-700 text-slate-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-teal-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Reply Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].suggestions && (
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-slate-200 text-sm rounded-full transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies (when no suggestions) */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-slate-700">
                <p className="text-slate-400 text-xs mb-2">Quick options:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.id}
                      onClick={() => handleSendMessage(reply.text)}
                      className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{reply.icon}</span>
                        <span className="text-slate-200 text-sm">{reply.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 text-slate-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm">Send</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;