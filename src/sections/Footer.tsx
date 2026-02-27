import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Facial Aesthetics',
    'Body Contouring',
    'Skin Rejuvenation',
    'Wellness Therapy',
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black py-16 lg:py-24 overflow-hidden z-[0]"
    >
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Column 1 - Logo & Tagline */}
          <div
            className={`transition-all duration-500 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <a href="#hero" className="inline-block mb-4">
              <div className="font-display text-3xl text-white">
                Aesthetic<span className="text-pink">.</span>
              </div>
            </a>
            <p className="font-body text-white/60 mb-6 leading-relaxed">
              Enhancing your natural beauty with personalized care and
              cutting-edge treatments.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: <Instagram className="h-4 w-4" />, href: '#' },
                { icon: <Facebook className="h-4 w-4" />, href: '#' },
                { icon: <Twitter className="h-4 w-4" />, href: '#' },
                { icon: <Youtube className="h-4 w-4" />, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink hover:text-dark transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div
            className={`transition-all duration-500 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h4 className="font-display text-xl text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-body text-white/60 hover:text-pink hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div
            className={`transition-all duration-500 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h4 className="font-display text-xl text-white mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#services');
                    }}
                    className="font-body text-white/60 hover:text-pink hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div
            className={`transition-all duration-500 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h4 className="font-display text-xl text-white mb-6">
              Newsletter
            </h4>
            <p className="font-body text-white/60 mb-4">
              Subscribe for exclusive offers and beauty tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-pink focus:ring-pink/20"
                required
              />
              <Button
                type="submit"
                className="bg-pink text-dark hover:bg-white hover:rotate-12 transition-all duration-300 px-4"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px bg-white/10 mb-8 transition-all duration-800 ease-expo-out origin-left ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        />

        {/* Bottom Bar */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500 ease-smooth ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="font-body text-sm text-white/40 text-center md:text-left">
            © 2024 Aesthetic Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-body text-sm text-white/40 hover:text-pink transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-sm text-white/40 hover:text-pink transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
