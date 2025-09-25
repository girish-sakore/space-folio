import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from './components/ScrollToTop';

// Lazy load heavy components
const OrbitingSatellites = lazy(() => import("./components/OrbitingSatellites"));
const InteractiveBackground = lazy(() => import("./components/InteractiveBackground"));
const FloatingShapes = lazy(() => import("./components/InteractiveBackground").then(module => ({ default: module.FloatingShapes })));
const AnimatedGrid = lazy(() => import("./components/InteractiveBackground").then(module => ({ default: module.AnimatedGrid })));

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const PricingCalculator = lazy(() => import("./pages/PricingCalculator"));
const FAQ = lazy(() => import('./pages/FAQ'));
const Process = lazy(() => import('./pages/Process'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ProximaShare = lazy(() => import('./pages/ProximaShare'));
const Tools = lazy(() => import('./pages/Tools'));
const LoaderDemo = lazy(() => import('./components/LoaderDemo'));

// Enhanced Loading component
import EnhancedPageLoader from './components/EnhancedPageLoader';
import Chatbot from './components/Chatbot';

const PageLoader = () => <EnhancedPageLoader />;

const Layout = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={null}>
      <InteractiveBackground particleCount={40} opacity={0.08} speed={0.8} />
      <FloatingShapes />
      <AnimatedGrid />
      <OrbitingSatellites />
    </Suspense>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
    <Footer />
    <Chatbot />
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
          <Route path="/loader-demo" element={<LoaderDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
