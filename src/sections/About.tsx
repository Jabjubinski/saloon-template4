import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, ClipboardCheck, Shield } from 'lucide-react';

interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    value: '15+',
    numericValue: 15,
    suffix: '+',
    label: 'Years Experience',
    icon: <Award className="h-5 w-5" />,
  },
  {
    value: '10K+',
    numericValue: 10,
    suffix: 'K+',
    label: 'Happy Clients',
    icon: <Users className="h-5 w-5" />,
  },
  {
    value: '50+',
    numericValue: 50,
    suffix: '+',
    label: 'Treatments',
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    value: '100%',
    numericValue: 100,
    suffix: '%',
    label: 'Safety Record',
    icon: <Shield className="h-5 w-5" />,
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters(
        stats.map((stat) => Math.floor(stat.numericValue * easeOut))
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(stats.map((stat) => stat.numericValue));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white py-24 lg:py-36 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-pink/10 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full bg-pink-light/50 blur-3xl" />

      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src="/about-image.jpg"
                alt="About Our Clinic"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-pink flex items-center justify-center">
                    <Award className="h-6 w-6 text-dark" />
                  </div>
                  <div>
                    <div className="font-display text-lg text-dark">
                      Certified
                    </div>
                    <div className="font-body text-sm text-gray-text">
                      Expert Team
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-pink rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h2
              className={`font-display text-h2 text-dark mb-6 transition-all duration-600 ease-expo-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              About Our Clinic
            </h2>

            <div
              className={`space-y-4 mb-8 transition-all duration-500 ease-smooth ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <p className="font-body text-lg text-gray-text leading-relaxed">
                With over 15 years of experience, our team of board-certified
                specialists combines artistry with medical expertise to deliver
                natural-looking results.
              </p>
              <p className="font-body text-base text-gray-text leading-relaxed">
                We believe in enhancing your unique beauty, not changing who you
                are. Our state-of-the-art facility offers a luxurious, comfortable
                environment where your safety and satisfaction are our top
                priorities.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group bg-gray-light rounded-xl p-5 transition-all duration-700 ease-expo-out hover:bg-pink-light hover:shadow-card cursor-default ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-2 text-pink group-hover:text-dark transition-colors duration-300">
                    {stat.icon}
                  </div>
                  <div className="font-display text-3xl lg:text-4xl text-dark mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <div className="font-body text-sm text-gray-text">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              onClick={scrollToContact}
              className={`group bg-dark text-white px-8 py-6 text-base font-body hover:bg-black hover:scale-105 transition-all duration-500 ease-expo-out ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '1100ms' }}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
