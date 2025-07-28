import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
	<>
	  <Hero />
	  <Services />
	  <FeaturedProjects />
	  <AboutSection />
	  <ContactSection />
	</>
  );
};

export default Home;