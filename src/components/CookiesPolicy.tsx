import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface CookiesPolicyProps {
  handleTransition: (to: string) => void;
}

export function CookiesPolicy({ handleTransition }: CookiesPolicyProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogoClick = () => {
    handleTransition('/');
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    handleTransition(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center hover:text-[#00BFA6] transition-all duration-300 rounded-xl px-3 py-2 shadow-[0_0_20px_rgba(0,191,166,0.15)] hover:shadow-[0_0_30px_rgba(0,191,166,0.4)]"
                aria-label="Return to homepage"
              >
                <ShoppingCart className="text-[#00BFA6] mr-2" />
                <span className="font-bold text-xl">REUPSHOP</span>
              </button>
            </div>

            {/* Menu button with dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      {/* Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-[inset_0_0_0_3px_rgba(229,231,235,0.8)]">
          <h1 className="text-3xl font-bold mb-8">Cookies Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <p className="text-lg">
              At REUPSHOP, we use cookies to enhance your browsing experience and improve our services. This policy explains how we use cookies and how they benefit you.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Understanding Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website. They're completely safe and don't contain any personal information. We use them to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Remember your preferences and settings</li>
              <li>Keep you signed in to your account</li>
              <li>Understand how you use our website</li>
              <li>Make our website faster and more secure</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Our Cookie Usage</h2>
            <p>
              We only use essential cookies that are necessary for our website to function properly. These cookies don't track your browsing history on other sites or collect any personal information without your consent.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Your Control Over Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience using our website.
            </p>

            <p className="mt-8 text-sm">
              By continuing to use our website, you consent to our use of cookies as described in this policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}