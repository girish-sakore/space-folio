import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EnhancedPageLoader from './EnhancedPageLoader';
import SectionLoader from './SectionLoader';

const LoaderDemo = () => {
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [showSectionLoader, setShowSectionLoader] = useState(false);

  const triggerPageLoader = () => {
    setShowPageLoader(true);
    setTimeout(() => setShowPageLoader(false), 5000); // Show for 5 seconds
  };

  const triggerSectionLoader = () => {
    setShowSectionLoader(true);
    setTimeout(() => setShowSectionLoader(false), 3000); // Show for 3 seconds
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Enhanced Loader Demo
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Page Loader Demo */}
          <motion.div 
            className="card p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Full Page Loader</h2>
            <p className="text-slate-400 mb-6 text-sm">
              Professional loading screen with animated elements, progress indicators, 
              and cycling tips. Perfect for page transitions.
            </p>
            
            <div className="space-y-4">
              <div className="text-sm text-slate-300">
                <strong>Features:</strong>
                <ul className="mt-2 space-y-1 text-slate-400">
                  <li>• Animated orbiting elements</li>
                  <li>• Gradient progress bars</li>
                  <li>• Cycling loading tips</li>
                  <li>• Floating particles</li>
                  <li>• Brand integration</li>
                </ul>
              </div>
              
              <button
                onClick={triggerPageLoader}
                className="btn-primary w-full"
                disabled={showPageLoader}
              >
                {showPageLoader ? '⏳ Loading...' : '🚀 Demo Page Loader'}
              </button>
            </div>
          </motion.div>

          {/* Section Loader Demo */}
          <motion.div 
            className="card p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Section Loader</h2>
            <p className="text-slate-400 mb-6 text-sm">
              Compact loader for specific sections or components. 
              Customizable size and styling.
            </p>
            
            <div className="space-y-4">
              <div className="text-sm text-slate-300">
                <strong>Sizes Available:</strong>
                <div className="mt-2 flex items-center gap-4">
                  <SectionLoader size="small" text="" />
                  <SectionLoader size="medium" text="" />
                  <SectionLoader size="large" text="" />
                </div>
              </div>
              
              <button
                onClick={triggerSectionLoader}
                className="secondary-btn w-full"
                disabled={showSectionLoader}
              >
                {showSectionLoader ? '⏳ Loading...' : '⚡ Demo Section Loader'}
              </button>
              
              {showSectionLoader && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SectionLoader 
                    text="Loading content..." 
                    size="medium" 
                    showBackground={true}
                    className="rounded-xl bg-slate-800/50"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <motion.div 
          className="mt-8 card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Usage Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Page Loader</h3>
              <div className="bg-slate-800 rounded p-4 text-sm font-mono text-slate-300">
                <div className="text-green-400">// App.jsx</div>
                <div>&lt;EnhancedPageLoader /&gt;</div>
                <br />
                <div className="text-green-400">// With custom text</div>
                <div>&lt;EnhancedPageLoader</div>
                <div>&nbsp;&nbsp;loadingText="Initializing..."</div>
                <div>/&gt;</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Section Loader</h3>
              <div className="bg-slate-800 rounded p-4 text-sm font-mono text-slate-300">
                <div className="text-green-400">// Component.jsx</div>
                <div>&lt;SectionLoader</div>
                <div>&nbsp;&nbsp;text="Loading data..."</div>
                <div>&nbsp;&nbsp;size="medium"</div>
                <div>&nbsp;&nbsp;showBackground={`{true}`}</div>
                <div>/&gt;</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Navigation */}
        <div className="mt-8 text-center">
          <motion.button
            onClick={() => window.history.back()}
            className="text-slate-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to App
          </motion.button>
        </div>
      </div>

      {/* Full Page Loader Overlay */}
      <EnhancedPageLoader 
        isLoading={showPageLoader}
        loadingText="Demo in Progress"
      />
    </div>
  );
};

export default LoaderDemo;