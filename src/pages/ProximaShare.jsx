import React from 'react';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import LaunchIcon from '@mui/icons-material/Launch';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import FreeIcon from '@mui/icons-material/MoneyOff';
import TimerIcon from '@mui/icons-material/Timer';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LinkIcon from '@mui/icons-material/Link';
import StorageIcon from '@mui/icons-material/Storage';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const ProximaShare = () => {
  const pageSchema = getWebPageSchema(
    "ProximaShare - Simple & Secure File Sharing Tool",
    "Upload and share files easily with ProximaShare. Get a secure, shareable link in seconds. Fast, simple, and free file sharing with 2MB limit per file.",
    "https://proximacloud.com/proximashare"
  );

  const features = [
    {
      icon: <CloudUploadIcon className="h-8 w-8 text-teal-400" />,
      title: "Easy File Upload",
      description: "Drag & drop files or click to select. Simple and intuitive interface for quick file sharing.",
      details: "Supports multiple file selection with real-time upload progress tracking."
    },
    {
      icon: <SecurityIcon className="h-8 w-8 text-teal-400" />,
      title: "Secure Sharing",
      description: "Your files are encrypted and shared through secure links. Privacy and security are our priorities.",
      details: "HTTPS encryption with secure random link generation and no file indexing."
    },
    {
      icon: <SpeedIcon className="h-8 w-8 text-teal-400" />,
      title: "Lightning Fast",
      description: "Get shareable links in seconds. No account required, no complicated setup process.",
      details: "Powered by Cloudflare CDN for global fast access and instant link generation."
    },
    {
      icon: <FreeIcon className="h-8 w-8 text-teal-400" />,
      title: "Completely Free",
      description: "No hidden costs, no subscriptions. Share files freely with our generous 2MB per file limit.",
      details: "100% free forever with no premium tiers or usage restrictions."
    },
    {
      icon: <TimerIcon className="h-8 w-8 text-teal-400" />,
      title: "Auto Expiry",
      description: "Links automatically expire after 3 days or 3 downloads for enhanced security.",
      details: "Configurable expiry settings with automatic cleanup to protect your privacy."
    },
    {
      icon: <FileCopyIcon className="h-8 w-8 text-teal-400" />,
      title: "Multiple Files",
      description: "Upload and share multiple files at once. Perfect for project files and document packages.",
      details: "Bulk upload support with individual file tracking and management."
    },
    {
      icon: <MobileScreenShareIcon className="h-8 w-8 text-teal-400" />,
      title: "Mobile Optimized",
      description: "Works perfectly on all devices. Responsive design for desktop, tablet, and mobile.",
      details: "PWA-ready with offline capabilities and native app-like experience."
    },
    {
      icon: <DarkModeIcon className="h-8 w-8 text-teal-400" />,
      title: "Dark/Light Theme",
      description: "Choose your preferred theme. Automatic system theme detection included.",
      details: "Intelligent theme switching with user preference memory."
    }
  ];

  const technicalSpecs = [
    { label: "Max File Size", value: "2MB per file", icon: <StorageIcon /> },
    { label: "Link Expiry", value: "3 days or 3 downloads", icon: <TimerIcon /> },
    { label: "Supported Files", value: "All file types", icon: <FileCopyIcon /> },
    { label: "Upload Method", value: "Drag & Drop, Click", icon: <CloudUploadIcon /> },
    { label: "Security", value: "HTTPS + Random Links", icon: <SecurityIcon /> },
    { label: "Registration", value: "None required", icon: <FreeIcon /> }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/upload",
      description: "Upload files and get shareable links",
      example: "curl -X POST -F 'file=@example.pdf' https://share.proximacloud.in/api/upload"
    },
    {
      method: "GET", 
      endpoint: "/api/file/:id",
      description: "Retrieve file information and download",
      example: "curl https://share.proximacloud.in/api/file/abc123xyz"
    },
    {
      method: "DELETE",
      endpoint: "/api/file/:id", 
      description: "Delete uploaded file (if you have the deletion token)",
      example: "curl -X DELETE https://share.proximacloud.in/api/file/abc123xyz"
    }
  ];

  const handleTryNowClick = () => {
    window.open('https://share.proximacloud.in/', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO 
        title="ProximaShare - Simple & Secure File Sharing Tool"
        description="Upload and share files easily with ProximaShare. Get a secure, shareable link in seconds. Fast, simple, and free file sharing with 2MB limit per file."
        keywords="ProximaShare, file sharing, secure file transfer, large file sharing, free file sharing, ProximaCloud, drag drop upload"
        structuredData={pageSchema}
      />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 leading-tight">
              ProximaShare
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-4 font-semibold">
              Simple & Secure File Sharing
            </p>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Upload and share files easily with ProximaShare. Get a secure, shareable link in seconds. 
              Fast, simple, and completely free file sharing solution.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={handleTryNowClick}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
              >
                <LaunchIcon />
                Try ProximaShare Now
              </button>
              <div className="text-sm text-slate-400">
                2MB limit per file • Links expire after 3 days or 3 downloads
              </div>
            </div>

            {/* Preview Image or Demo */}
            <div className="relative mx-auto max-w-3xl">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl">
                <div className="bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg p-12 text-center">
                  <CloudUploadIcon className="h-16 w-16 text-teal-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drag & drop files here or click to select
                  </h3>
                  <p className="text-slate-400">
                    Select one or more files to upload and get instant shareable links
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Why Choose ProximaShare?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built by ProximaCloud with focus on simplicity, security, and speed. 
              No registration required, just upload and share.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm mb-2">
                  {feature.description}
                </p>
                <p className="text-xs text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Three simple steps to share your files securely
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-400 text-slate-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Upload Files</h3>
              <p className="text-slate-400">
                Drag and drop your files or click to select them from your device.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-400 text-slate-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Link</h3>
              <p className="text-slate-400">
                Receive a secure, shareable link instantly after upload completes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-400 text-slate-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Share & Go</h3>
              <p className="text-slate-400">
                Copy the link and share it with anyone. No account needed for recipients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Detailed technical information about ProximaShare capabilities and limitations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center gap-4">
                  <div className="text-teal-400 flex-shrink-0">
                    {spec.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{spec.label}</h4>
                    <p className="text-slate-400 text-sm">{spec.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* URL Structure */}
          <div className="bg-slate-800 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <LinkIcon className="text-teal-400" />
              URL Structure & Access
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-teal-300 mb-4">Main URL</h4>
                <div className="bg-slate-900 p-4 rounded-lg mb-4">
                  <code className="text-green-400">https://share.proximacloud.in/</code>
                </div>
                <p className="text-slate-400 text-sm">
                  The main ProximaShare application where users can upload and manage files.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-teal-300 mb-4">Shared File Links</h4>
                <div className="bg-slate-900 p-4 rounded-lg mb-4">
                  <code className="text-green-400">https://share.proximacloud.in/f/[file-id]</code>
                </div>
                <p className="text-slate-400 text-sm">
                  Direct download links with unique, randomly generated IDs for security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Developer API
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Integrate ProximaShare into your applications with our simple REST API
            </p>
          </div>

          <div className="space-y-8">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                    endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                    endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-teal-300 text-lg font-mono">
                    {endpoint.endpoint}
                  </code>
                </div>
                <p className="text-slate-400 mb-6">{endpoint.description}</p>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Example Request:</span>
                    <CodeIcon className="text-slate-500" fontSize="small" />
                  </div>
                  <code className="text-green-400 text-sm font-mono break-all">
                    {endpoint.example}
                  </code>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="text-blue-300 font-semibold mb-2">API Rate Limiting</h4>
              <p className="text-slate-400 text-sm">
                Current rate limit: 100 requests per hour per IP address. 
                Contact us for higher limits if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Statistics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Usage Analytics
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              See how ProximaShare is performing and being used
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="card p-8 text-center">
              <div className="flex justify-center mb-4">
                <AnalyticsIcon className="h-12 w-12 text-teal-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">1,000+</div>
              <div className="text-slate-400">Files Shared</div>
            </div>
            <div className="card p-8 text-center">
              <div className="flex justify-center mb-4">
                <SpeedIcon className="h-12 w-12 text-teal-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">&lt; 2s</div>
              <div className="text-slate-400">Avg Upload Time</div>
            </div>
            <div className="card p-8 text-center">
              <div className="flex justify-center mb-4">
                <SecurityIcon className="h-12 w-12 text-teal-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
            <div className="card p-8 text-center">
              <div className="flex justify-center mb-4">
                <FreeIcon className="h-12 w-12 text-teal-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$0</div>
              <div className="text-slate-400">Cost to Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Share Files Securely?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust ProximaShare for their file sharing needs. 
            Start sharing files in seconds - no registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleTryNowClick}
              className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center gap-3 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
            >
              <LaunchIcon />
              Launch ProximaShare
            </button>
            <a
              href="https://share.proximacloud.in/about"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center gap-3 transition-all duration-300"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProximaShare;
