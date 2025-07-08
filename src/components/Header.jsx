import React from 'react';
import proximaLogo from '../assets/Proxima_Cloud-removebg-preview.png'; 

const Header = () => {
  return (
    <header className="fixed w-full z-50 p-4 header">
      <div className="container mx-auto flex justify-between items-center">
        <a className="flex items-center space-x-3" href="#">
          <img
            alt="Proxima Cloud Logo"
            className="logo-primary h-10"
            src={proximaLogo}
          />
          <span className="text-2xl font-bold text-white">ProximaCloud</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8 text-slate-300 font-medium">
          <a className="nav-link active" href="#services">Services</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <button className="md:hidden text-white">
          <span className="material-icons">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;