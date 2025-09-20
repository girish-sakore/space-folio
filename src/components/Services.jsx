import React from 'react';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import StorageIcon from '@mui/icons-material/Storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LaunchIcon from '@mui/icons-material/Launch';

const Services = () => {
  return (
    <section className="py-20 bg-slate-800 rounded-3xl mx-5 my-5 glass-effect relative" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold">Our Core Services</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            We offer a comprehensive suite of cloud services to meet your every need.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ProximaShare - Featured Service */}
          <div className="card p-8 text-left relative border-2 border-teal-400/20 bg-gradient-to-br from-teal-900/20 to-slate-800">
            <div className="absolute top-4 right-4">
              <span className="bg-teal-400 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">NEW</span>
            </div>
            <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-teal-400/20 mb-6">
              <CloudUploadIcon className="text-4xl text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">ProximaShare</h3>
            <p className="text-slate-400 mb-4">
              Simple & secure file sharing tool. Upload files and get shareable links in seconds with automatic expiry.
            </p>
            <button 
              onClick={() => window.open('https://share.proximacloud.in/', '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-semibold group"
            >
              <LaunchIcon className="group-hover:rotate-45 transition-transform duration-300" />
              Try Free
            </button>
          </div>
          
          <div className="card p-8 text-left">
            <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-teal-500/10 mb-6">
              <CloudQueueIcon className="text-4xl text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Cloud Migration</h3>
            <p className="text-slate-400">
              Seamlessly transition your infrastructure to the cloud with our expert guidance and zero downtime.
            </p>
          </div>
          <div className="card p-8 text-left">
            <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-teal-500/10 mb-6">
              <DeveloperModeIcon className="text-4xl text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Web Development</h3>
            <p className="text-slate-400">
              Crafting stunning, high-performance websites and web applications tailored to your vision.
            </p>
          </div>
          <div className="card p-8 text-left">
            <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-teal-500/10 mb-6">
              <StorageIcon className="text-4xl text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Data Solutions</h3>
            <p className="text-slate-400">
              Unlock the power of your data with our advanced analytics and database management services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;