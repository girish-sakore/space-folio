import {React, useEffect, useState} from "react";
import { motion } from 'framer-motion';
import Hero from "../components/Hero";
import ProximaShareHero from "../components/ProximaShareHero";
import Services from "../components/Services";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import SEO from "../components/SEO";
import TeamShowcase from "../components/TeamShowcase";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import { getWebSiteSchema, getOrganizationSchema } from "../utils/structuredData";
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInVariants, slideUpVariants } from '../utils/animationVariants';
import QrLandingPopup from "../components/QrLandingPopup";
import trackQrVisit from "../services/trackQrVisit";

const Home = () => {
  const [isQrPopupOpen, setIsQrPopupOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isQrRef = urlParams.get("ref") === "qr";
    const hasSeenPopup = localStorage.getItem("qrPopupShown");

    if (isQrRef && !hasSeenPopup) {
      const data = {
        source: "qr",
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        pagePath: window.location.pathname,
      };

      trackQrVisit(data);
      setIsQrPopupOpen(true);
    }
  }, []);

  const handleClosePopup = () => {
    setIsQrPopupOpen(false);
    localStorage.setItem("qrPopupShown", "true");
  };

  const { ref: proximaShareRef, controls: proximaShareControls } = useScrollAnimation({ delay: 100 });
  const { ref: servicesRef, controls: servicesControls } = useScrollAnimation({ delay: 200 });
  const { ref: projectsRef, controls: projectsControls } = useScrollAnimation({ delay: 300 });
  const { ref: testimonialsRef, controls: testimonialsControls } = useScrollAnimation({ delay: 200 });
  const { ref: teamRef, controls: teamControls } = useScrollAnimation({ delay: 400 });
  const { ref: aboutRef, controls: aboutControls } = useScrollAnimation({ delay: 300 });
  const { ref: contactRef, controls: contactControls } = useScrollAnimation({ delay: 200 });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getWebSiteSchema(),
      getOrganizationSchema()
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <QrLandingPopup isOpen={isQrPopupOpen} onClose={handleClosePopup} />
      <SEO 
        title=""
        description="Professional cloud migration, web development, mobile apps, and digital transformation services. Expert technology solutions for modern businesses."
        keywords="cloud migration, web development, mobile apps, cloud solutions, digital transformation, AWS, Azure, React, Node.js, technology consulting"
        structuredData={combinedSchema}
      />
      
      <Hero />
      
      <motion.div
        ref={proximaShareRef}
        variants={slideUpVariants}
        initial="hidden"
        animate={proximaShareControls}
      >
        <ProximaShareHero />
      </motion.div>
      
      <motion.div
        ref={servicesRef}
        variants={fadeInVariants}
        initial="hidden"
        animate={servicesControls}
      >
        <Services />
      </motion.div>
      
      <motion.div
        ref={projectsRef}
        variants={slideUpVariants}
        initial="hidden"
        animate={projectsControls}
      >
        <FeaturedProjects />
      </motion.div>
      
      <motion.div
        ref={testimonialsRef}
        variants={fadeInVariants}
        initial="hidden"
        animate={testimonialsControls}
      >
        <TestimonialsCarousel />
      </motion.div>
      
      <motion.div
        ref={teamRef}
        variants={slideUpVariants}
        initial="hidden"
        animate={teamControls}
      >
        <TeamShowcase />
      </motion.div>
      
      <motion.div
        ref={aboutRef}
        variants={fadeInVariants}
        initial="hidden"
        animate={aboutControls}
      >
        <AboutSection />
      </motion.div>
      
      <motion.div
        ref={contactRef}
        variants={slideUpVariants}
        initial="hidden"
        animate={contactControls}
      >
        <ContactSection />
      </motion.div>
    </motion.div>
  );
};

export default Home;