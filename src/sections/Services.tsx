import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: 'Facial Aesthetics',
    description: 'Rejuvenating treatments for radiant skin that enhance your natural glow.',
    image: '/service-facial.jpg',
  },
  {
    title: 'Body Contouring',
    description: 'Sculpt your silhouette with advanced technology and expert care.',
    image: '/service-body.jpg',
  },
  {
    title: 'Skin Rejuvenation',
    description: 'Turn back time with our anti-aging solutions and premium skincare.',
    image: '/service-skin.jpg',
  },
  {
    title: 'Wellness Therapy',
    description: 'Holistic treatments for inner and outer beauty balance.',
    image: '/service-wellness.jpg',
  },
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-pink-light py-24 lg:py-36 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-pink/30 blur-3xl" />

      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className={`font-display text-h2 text-dark mb-4 transition-all duration-600 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            Our Premium Services
          </h2>
          <p
            className={`font-body text-lg text-gray-text max-w-xl mx-auto transition-all duration-500 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Discover treatments designed to enhance your natural beauty
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-700 ease-expo-out cursor-pointer ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
                transform: isVisible
                  ? `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`
                  : 'rotate(0deg) translateY(80px)',
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-115"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-expo-out">
                  <ArrowUpRight className="h-5 w-5 text-dark" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-h5 text-dark mb-2 group-hover:text-pink transition-colors duration-300 relative inline-block">
                  {service.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink transition-all duration-400 ease-expo-out group-hover:w-full" />
                </h3>
                <p className="font-body text-gray-text text-base">
                  {service.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink/30 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
