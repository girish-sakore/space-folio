import React from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Hero = () => {
  return (
    <section className="mx-auto my-auto md:py-32 text-center relative" id="hero">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          alt="Planet"
          className="planet-slow absolute -top-1/30 -right-1/4 w-1/2 opacity-70"
          src="https://static.vecteezy.com/system/resources/previews/036/261/359/non_2x/ai-generated-mercury-planet-isolated-on-transparent-background-free-png.png"
        />
        <img
          alt="Spaceship"
          className="absolute bottom-0 w-1/5 opacity-75 hovering-spaceship"
          // src="https://static.vecteezy.com/system/resources/previews/045/800/108/non_2x/spaceship-isolated-on-transparent-background-free-png.png"
          src="https://static.vecteezy.com/system/resources/previews/045/800/111/non_2x/spaceship-isolated-on-transparent-background-free-png.png"
          
        />
        
      </div>
      <div className="container mx-auto py-40">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
          Cloud Solutions for the&nbsp;
          <span className="gradient-text">Next Frontier</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          We architect and manage robust, scalable, and secure cloud infrastructures to power your business's growth and innovation.
        </p>
        <a className="btn-primary inline-flex items-center space-x-2" href="#services">
          <span>Get Started</span>
          <RocketLaunchIcon />
        </a>
      </div>
    </section>
  );
};

export default Hero;