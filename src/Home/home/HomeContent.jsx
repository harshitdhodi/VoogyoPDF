import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FreeDemo from './components/FreeDemo';
import CTA from './components/CTA';
import Footer from './components/Footer';
import HowItWorks from './How-it-work';

const VoogyoLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white text-gray-800 h-screen">
      {/* Header */}
    

      <div className="flex flex-col min-h-screen">
        <main>
          <Hero className="hero" />
          <HowItWorks />
          <Features />
          <Testimonials />
          <FreeDemo />
          {/* <CTA /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default VoogyoLandingPage;