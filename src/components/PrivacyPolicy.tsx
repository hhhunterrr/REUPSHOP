import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface PrivacyPolicyProps {
  handleTransition: (to: string) => void;
}

export function PrivacyPolicy({ handleTransition }: PrivacyPolicyProps) {
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
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <p className="text-lg">
              At REUPSHOP, protecting your privacy is our top priority. We want you to understand how we collect, use, and safeguard your personal information.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Data Collection</h2>
            <p>We only collect information that you voluntarily provide to us through:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Contact forms</li>
              <li>Account registration</li>
              <li>Transaction processes</li>
              <li>Customer support interactions</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
            <p>Your information helps us:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Process your transactions securely</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Send important updates about your account</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your data. Your information is encrypted and stored securely, and we never share it with third parties without your explicit consent.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <p className="mt-8 text-sm">
              We comply with all applicable data protection laws and regulations to ensure your information is handled responsibly and securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}