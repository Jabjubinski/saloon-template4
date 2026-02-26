import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
          isScrolled
            ? 'glass border-b border-gray-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className={`flex items-center gap-2 transition-all duration-600 ease-expo-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="font-display text-2xl lg:text-3xl text-dark">
                Aesthetic<span className="text-pink">.</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative font-body text-base text-dark hover:text-pink transition-all duration-300 ease-smooth group ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-5'
                  }`}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink transition-all duration-300 ease-smooth group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`hidden lg:block transition-all duration-500 ease-elastic ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <Button
                onClick={() => scrollToSection('#contact')}
                className="group bg-dark text-white px-6 py-5 text-sm font-body hover:bg-black hover:scale-105 transition-all duration-300 ease-smooth"
              >
                <Phone className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-expo-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-xl transition-all duration-500 ease-expo-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col pt-24 px-6">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`py-4 font-body text-lg text-dark hover:text-pink border-b border-gray-border transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="mt-8 bg-dark text-white px-6 py-5 text-base font-body hover:bg-black transition-all duration-300"
            >
              <Phone className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
