import { React, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactsIcon from '@mui/icons-material/Contacts';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { div } from "framer-motion/client";

const QrLandingPopup = ({ isOpen, onClose }) => {
  const [isQPOpen, setQPOpen] = useState(true);
  const downloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Proxima Centauri Cloud Solutions Pvt Ltd
TEL:+917798729845
EMAIL:info@proximacloud.in
END:VCARD
    `;
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ProximaCloud.vcf";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isQPOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40"
          onClick={() => { setQPOpen(false); onClose(); }}
        >
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      p-5 flex flex-col items-center justify-center card z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0, y: 20 }}
          >

            <div className="bg-grey rounded-lg shadow-lg p-3 max-w-sm w-full mx-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to Proxima Cloud!</h2>
              <p className="mb-4">Thank you for scanning our QR code. We're excited to connect with you!</p>
            </div>
            <div className="grid grid-cols-2 w-64 border border-slate-700 rounded-lg">
              {/* WhatsApp Button */}
              <button
                className="bg-green-500 text-white hover:bg-gray-700 hover:text-green-500 rounded-tl-lg px-4 py-6 flex items-center justify-center transition"
                onClick={() => {
                  const phoneNumber = "917798729845";
                  const message = encodeURIComponent("Hello! I would like to connect with you regarding Proxima Cloud.");
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                <WhatsAppIcon fontSize="large" />
              </button>

              {/* LinkedIn Button */}
              <button
                className="bg-blue-500 text-white hover:bg-gray-700 hover:text-blue-500 rounded-tr-lg px-4 py-6 flex items-center justify-center transition"
                onClick={() => {
                  window.open("https://www.linkedin.com/company/proxima-cloud", "_blank");
                }}
              >
                <LinkedInIcon fontSize="large" />
              </button>

              {/* Contact Card Button */}
              <button
                className=" bg-orange-300 text-white hover:bg-gray-700 hover:text-orange rounded-bl-lg px-4 py-6 flex items-center justify-center transition"
                onClick={downloadVCard}
              >
                <ContactsIcon fontSize="large" />
              </button>

              {/* Skip/Continue Button */}
              <button
                className="flex-col bg-gray-800 text-white hover:bg-gray-800 hover:text-gray-800 rounded-br-lg px-4 py-6 flex items-center justify-center transition"
              >
                <CancelPresentationIcon onClick={() => { setQPOpen(false); onClose(); }} />
                  <span className="text-xs">Continue to site</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QrLandingPopup;