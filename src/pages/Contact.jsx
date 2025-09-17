import React from 'react';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';
import { getContactPageSchema } from '../utils/structuredData';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  const contactSchema = getContactPageSchema();

  return (
    <>
      <SEO 
        title="Contact Us - Get In Touch"
        description="Have a question or project in mind? Contact Proxima Cloud for expert cloud solutions and web development services. Get in touch today."
        keywords="contact proxima cloud, get quote, cloud consulting, web development inquiry, tech support"
        structuredData={contactSchema}
      />
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Have a question or project in mind? We'd love to hear from you. Fill out the form and we'll get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-6 text-slate-300">
              <div className="flex items-start gap-3">
                <PlaceIcon className="text-teal-400 mt-1" />
                <div>
                  <div className="font-semibold text-white">Head Office</div>
                  <div>Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.</div>
                  <div>Ramtek, Nagpur, India</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="text-teal-400 mt-1" />
                <div>
                  <div className="font-semibold text-white">Phone</div>
                  <div>+91-77987-29845</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <EmailIcon className="text-teal-400 mt-1" />
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <div>connect.proximacloud@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
