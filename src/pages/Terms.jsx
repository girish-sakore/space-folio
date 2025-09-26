import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import GavelIcon from '@mui/icons-material/Gavel';

const Terms = () => {
  const termsSchema = getWebPageSchema(
    "Terms of Service",
    "Please read these terms and conditions carefully before using our services.",
    "https://proximacloud.in/terms"
  );

  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Please read these terms and conditions carefully before using our services."
        keywords="terms of service, service agreement, legal terms, conditions"
        structuredData={termsSchema}
      />
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">
            <GavelIcon className="mr-3 text-teal-400" />
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
          <p className="text-sm text-slate-500 mt-4">Last updated: January 1, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-invert max-w-none">
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-slate-400">
                By accessing and using our website and services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
              <p className="text-slate-400 mb-4">
                Proxima Cloud provides cloud solutions, web development, mobile development, and related technology services. 
                Our services include but are not limited to:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>Cloud migration and management</li>
                <li>Web application development</li>
                <li>Mobile application development</li>
                <li>Database design and optimization</li>
                <li>Security assessments and implementation</li>
                <li>Technical consulting and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Client Responsibilities</h2>
              <p className="text-slate-400 mb-4">
                Clients are responsible for:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>Providing accurate and complete project requirements</li>
                <li>Timely feedback and approvals during project development</li>
                <li>Payment of invoices according to agreed terms</li>
                <li>Maintaining confidentiality of access credentials</li>
                <li>Compliance with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
              <p className="text-slate-400 mb-4">
                Payment terms are established in individual service agreements. Generally:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>Invoices are due within 30 days of receipt</li>
                <li>Late payments may incur additional fees</li>
                <li>Services may be suspended for non-payment</li>
                <li>Disputed charges must be raised within 30 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p className="text-slate-400">
                Upon full payment, clients receive ownership of custom code and designs created specifically for their project. 
                However, Proxima Cloud retains rights to general methodologies, frameworks, and pre-existing intellectual property. 
                We reserve the right to use project experience for case studies and marketing purposes unless otherwise agreed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Confidentiality</h2>
              <p className="text-slate-400">
                We maintain strict confidentiality regarding all client information and projects. Non-disclosure agreements 
                can be executed upon request. We will not share client information with third parties except as required by law 
                or with explicit client consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Warranties and Disclaimers</h2>
              <p className="text-slate-400 mb-4">
                We provide our services "as is" and make no warranties except those expressly stated in individual service agreements. 
                We disclaim all implied warranties including merchantability and fitness for a particular purpose.
              </p>
              <p className="text-slate-400">
                We warrant that services will be performed in a professional manner consistent with industry standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-slate-400">
                Our liability is limited to the amount paid for services. We are not liable for indirect, incidental, 
                special, or consequential damages. This limitation applies regardless of the legal theory under which damages are claimed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-slate-400 mb-4">
                Either party may terminate services with written notice:
              </p>
              <ul className="text-slate-400 space-y-2 ml-6">
                <li>30 days notice for ongoing services</li>
                <li>Immediate termination for breach of contract</li>
                <li>All outstanding invoices become due immediately upon termination</li>
                <li>Client data will be provided upon request and payment of final invoices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-slate-400">
                These terms are governed by the laws of Karnataka, India. Any disputes will be resolved through binding 
                arbitration in Bangalore, Karnataka.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-slate-400">
                We reserve the right to modify these terms at any time. Changes will be posted on our website and take effect 
                immediately. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-slate-400">
                For questions about these terms, please contact us:
              </p>
              <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                <p className="text-white font-semibold">Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.</p>
                <p className="text-slate-300">Email: legal@proximacloud.in</p>
                <p className="text-slate-300">Phone: +91-77987-29845</p>
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

export default Terms;
