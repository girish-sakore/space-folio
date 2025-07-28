import React from "react";
import proximaLogo from '../assets/Proxima_Cloud-removebg-preview.png';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed w-full z-50 p-4 header">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-white">
          <>
            <img
              alt="Proxima Cloud Logo"
              className="logo-primary h-10"
              src={proximaLogo}
            />
            <span className="text-2xl font-bold text-white">ProximaCloud</span>
          </>




        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-slate-300 font-medium">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/portfolio" className="nav-link">
            Projects
          </Link>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
        <button className="md:hidden text-white">
          <span className="material-icons">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;