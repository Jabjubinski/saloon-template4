import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-all duration-[1500ms] ease-expo-out ${
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        >
          <img
            src="/hero-image.jpg"
            alt="Natural Beauty"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
      </div>

      {/* Floating Decorative Elements */}
      <div
        className={`absolute left-[10%] top-[20%] transition-all duration-1000 delay-700 ease-expo-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="animate-float-slow">
          <Sparkles className="h-8 w-8 text-pink" />
        </div>
      </div>
      <div
        className={`absolute right-[15%] bottom-[25%] transition-all duration-1000 delay-1000 ease-expo-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="animate-float" style={{ animationDelay: '1s' }}>
          <div className="h-16 w-16 rounded-full bg-pink/30 blur-xl" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl pt-20 lg:pt-0">
              {/* Title */}
              <h1 className="font-display text-h1 text-dark mb-6">
                {['Elevate', 'Your', 'Natural', 'Beauty'].map((word, index) => (
                  <span
                    key={word}
                    className={`inline-block mr-4 transition-all duration-800 ease-expo-out ${
                      isVisible
                        ? 'translate-y-0 opacity-100 rotate-0'
                        : 'translate-y-full opacity-0 rotate-x-45'
                    }`}
                    style={{
                      transitionDelay: `${500 + index * 100}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                className={`font-body text-lg text-gray-text mb-8 max-w-lg transition-all duration-600 ease-smooth ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                Experience luxury aesthetic treatments tailored to enhance your
                unique features. Our expert team combines artistry with medical
                expertise for natural-looking results.
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-700 ease-elastic ${
                  isVisible
                    ? 'scale-100 opacity-100'
                    : 'scale-0 opacity-0'
                }`}
                style={{ transitionDelay: '1200ms' }}
              >
                <Button
                  onClick={scrollToContact}
                  className="group bg-dark text-white px-8 py-6 text-base font-body hover:bg-black hover:scale-105 transition-all duration-300 ease-smooth"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  onClick={scrollToServices}
                  variant="outline"
                  className="group border-dark text-dark px-8 py-6 text-base font-body hover:bg-dark hover:text-white transition-all duration-300 ease-smooth"
                >
                  Explore Services
                </Button>
              </div>

              {/* Stats */}
              <div
                className={`mt-12 grid grid-cols-3 gap-8 transition-all duration-600 ease-smooth ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '1400ms' }}
              >
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '10K+', label: 'Happy Clients' },
                  { value: '50+', label: 'Treatments' },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="font-display text-3xl lg:text-4xl text-dark mb-1">
                      {stat.value}
                    </div>
                    <div className="font-body text-sm text-gray-text">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Empty for image visibility */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
