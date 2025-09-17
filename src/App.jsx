import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrbitingSatellites from "./components/OrbitingSatellites";
import InteractiveBackground, { FloatingShapes, AnimatedGrid } from "./components/InteractiveBackground";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CaseStudies from "./pages/CaseStudies";
import PricingCalculator from "./pages/PricingCalculator";
import FAQ from './pages/FAQ';
import Process from './pages/Process';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ProximaShare from './pages/ProximaShare';
import Tools from './pages/Tools';
import ScrollToTop from './components/ScrollToTop';

const Layout = () => (
  <>
    <ScrollToTop />
    <InteractiveBackground particleCount={40} opacity={0.08} speed={0.8} />
    <FloatingShapes />
    <AnimatedGrid />
    <OrbitingSatellites />
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="tools" element={<Tools />} />
            <Route path="proximashare" element={<ProximaShare />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<ProjectDetail />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="pricing-calculator" element={<PricingCalculator />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/process" element={<Process />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
