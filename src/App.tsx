import React, { useState, useCallback } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package2, CircleDollarSign, Menu, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from './components/ContactForm';
import { CookiesPolicy } from './components/CookiesPolicy';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTransition = useCallback((to: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(to);
      if (to.includes('#')) {
        setTimeout(() => {
          const sectionId = to.split('#')[1];
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 64;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition });
          }
        }, 0);
      } else {
        window.scrollTo(0, 0);
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }, 150);
  }, [navigate]);

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      handleTransition('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePolicyClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    handleTransition(path);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      handleTransition(`/#${sectionId}`);
    } else {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MainContent = () => (
    <>
      {/* Hero Section */}
      <section className="pt-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto py-12 sm:py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Unlock the Value of{' '}
            <span className="text-[#00BFA6] block">Your Items</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg sm:text-xl max-w-2xl mx-auto">
            Effortlessly sell your goods at top prices. We handle everything
            from listing to negotiation, ensuring you get the best value for
            your items.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-block bg-[#00BFA6] text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#00A693] shadow-[0_0_25px_rgba(0,191,166,0.3)] hover:shadow-[0_0_35px_rgba(0,191,166,0.5)]"
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8" id="services">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#00BFA6] mb-4 text-lg">HOW IT WORKS AND WHAT YOU GET</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16">
            A better way to sell your items
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* First service - Professional Listings */}
              <div className="text-center p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,191,166,0.25)] shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)] hover:shadow-[inset_0_0_0_3px_rgba(0,191,166,0.4),0_0_20px_rgba(0,191,166,0.25)]">
                <div className="bg-[#00BFA6] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)]">
                  <Package2 className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Professional Listings</h3>
                <p className="text-gray-600">
                  We create optimized listings with professional photos and descriptions to
                  attract serious buyers.
                </p>
              </div>

              {/* Second service - Secure Transactions */}
              <div className="text-center p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,191,166,0.25)] shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)] hover:shadow-[inset_0_0_0_3px_rgba(0,191,166,0.4),0_0_20px_rgba(0,191,166,0.25)]">
                <div className="bg-[#00BFA6] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)]">
                  <ShoppingCart className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Transactions</h3>
                <p className="text-gray-600">
                  We handle all negotiations and ensure secure problem-free transactions for both
                  parties.
                </p>
              </div>
            </div>

            {/* Third service - Maximum Value */}
            <div className="text-center p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,191,166,0.25)] shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)] hover:shadow-[inset_0_0_0_3px_rgba(0,191,166,0.4),0_0_20px_rgba(0,191,166,0.25)] md:max-w-md md:mx-auto">
              <div className="bg-[#00BFA6] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)]">
                <CircleDollarSign className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Maximum Value</h3>
              <p className="text-gray-600">
                Our expertise ensures you get the best possible price for your items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8" id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <ContactForm />
        </div>
      </section>
    </>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center hover:text-[#00BFA6] transition-all duration-300 rounded-xl px-3 py-2 shadow-[0_0_20px_rgba(0,191,166,0.15)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4)]"
                aria-label="Return to top"
              >
                <ShoppingCart className="text-[#00BFA6] mr-2" />
                <span className="font-bold text-xl">REUPSHOP</span>
              </button>
            </div>

            {/* Menu button with dropdown */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-[#00BFA6] focus:outline-none transition-all duration-300 rounded-xl p-2 shadow-[0_0_20px_rgba(0,191,166,0.15)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4)]"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Dropdown menu */}
              <div 
                className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg transform transition-all duration-200 origin-top ${
                  isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`}
              >
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-[#00BFA6] transition-colors"
                  >
                    How it Works and What You Get
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-[#00BFA6] transition-colors"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/cookies" element={<CookiesPolicy handleTransition={handleTransition} />} />
        <Route path="/privacy" element={<PrivacyPolicy handleTransition={handleTransition} />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-sm text-gray-500 space-x-2">
              <a href="/cookies" onClick={handlePolicyClick('/cookies')} className="hover:text-[#00BFA6] transition-colors">Cookies</a>
              <span>•</span>
              <a href="/privacy" onClick={handlePolicyClick('/privacy')} className="hover:text-[#00BFA6] transition-colors">Privacy</a>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 REUPSHOP. All rights reserved.™
            </div>
            <button
              onClick={handleLogoClick}
              className="flex items-center justify-center hover:text-[#00BFA6] transition-all duration-300 rounded-xl px-4 py-3 mt-4 shadow-[0_0_20px_rgba(0,191,166,0.15)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4)]"
              aria-label="Return to homepage"
            >
              <ShoppingCart className="text-[#00BFA6] w-12 h-12 mr-3" />
              <span className="font-bold text-3xl">REUPSHOP</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;