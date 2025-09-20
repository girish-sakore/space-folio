import React from 'react';
import InteractiveContactForm from '../components/InteractiveContactForm';
import SEO from '../components/SEO';
import { getContactPageSchema } from "../utils/structuredData";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

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
      <div>
        {/* Interactive Contact Form */}
        <InteractiveContactForm />

        {/* Contact Information Section */}
        <div className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Prefer to reach out directly? Here are our contact details.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Contact Info Cards */}
              <div className="card p-6 text-center">
                <PlaceIcon className="text-teal-400 text-4xl mx-auto mb-4" />
                <div className="font-semibold text-white mb-2">Head Office</div>
                <div className="text-slate-300 text-sm">
                  <div>Proxima Centauri Cloud Solutions (OPC) Pvt. Ltd.</div>
                  <div>Ramtek, Nagpur, India</div>
                </div>
              </div>

              <div className="card p-6 text-center">
                <PhoneIcon className="text-teal-400 text-4xl mx-auto mb-4" />
                <div className="font-semibold text-white mb-2">Phone</div>
                <div className="text-slate-300">
                  <a
                    href="tel:+917798729845"
                    className="hover:text-teal-400 transition-colors"
                  >
                    +91-77987-29845
                  </a>
                </div>
              </div>

              <div className="card p-6 text-center">
                <EmailIcon className="text-teal-400 text-4xl mx-auto mb-4" />
                <div className="font-semibold text-white mb-2">Email</div>
                <div className="text-slate-300">
                  <a
                    href="mailto:connect.proximacloud@gmail.com"
                    className="hover:text-teal-400 transition-colors"
                  >
                    connect.proximacloud@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
