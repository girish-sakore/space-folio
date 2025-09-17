import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import SecurityIcon from '@mui/icons-material/Security';

const Privacy = () => {
  const privacySchema = getWebPageSchema(
    "Privacy Policy",
    "Your privacy is important to us. This policy explains how we collect, use, and protect your information.",
    "https://proximacloud.com/privacy"
  );

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
        keywords="privacy policy, data protection, information security, GDPR compliance"
        structuredData={privacySchema}
      />
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">
            <SecurityIcon className="mr-3 text-teal-400" />
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-slate-500 mt-4">Last updated: January 1, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-invert max-w-none">
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="text-slate-400 mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>Fill out our contact form</li>
                <li>Request a consultation or quote</li>
                <li>Subscribe to our newsletter</li>
                <li>Interact with our website or services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-slate-400 mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p className="text-slate-400 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>To trusted service providers who assist us in operating our website and conducting business</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-slate-400">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
              <p className="text-slate-400">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-slate-400 mb-4">
                You have the right to:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-slate-400">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                <p className="text-white font-semibold">Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.</p>
                <p className="text-slate-300">Email: privacy@proximacloud.com</p>
                <p className="text-slate-300">Phone: +91-98765-43210</p>
              </div>
            </section>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Privacy;
