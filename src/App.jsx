import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import OrbitingSatellites from './components/OrbitingSatellites'
import Services from './components/Services'
import FeaturedProjects from './components/FeaturedProjects'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

function App() {
  return (
    <>
      <OrbitingSatellites />
      <Header />
      <Hero />
      <Services />
      <FeaturedProjects />
      <AboutSection />
      <ContactSection />
    </>
  )
}

export default App
