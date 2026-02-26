import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Regular Client',
    content:
      'The team made me feel so comfortable from the moment I walked in. My results are natural and beautiful - exactly what I was hoping for! The attention to detail and personalized care exceeded all my expectations.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'Jennifer Lopez',
    role: 'First-time Client',
    content:
      'Professional, caring, and incredibly skilled. This was the best decision I ever made for myself. The staff took time to understand my goals and delivered results that look completely natural.',
    rating: 5,
    avatar: 'JL',
  },
  {
    name: 'Amanda Chen',
    role: 'VIP Member',
    content:
      'They really listen to what you want and work with you to achieve your goals. I could not be happier with my experience. The facility is beautiful and the treatments are world-class.',
    rating: 5,
    avatar: 'AC',
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      diff > testimonials.length / 2
        ? diff - testimonials.length
        : diff < -testimonials.length / 2
        ? diff + testimonials.length
        : diff;

    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1.1) rotateY(0deg)',
        opacity: 1,
        zIndex: 3,
      };
    } else if (normalizedDiff === -1 || (normalizedDiff === testimonials.length - 1)) {
      return {
        transform: 'translateX(-80%) scale(0.9) rotateY(25deg)',
        opacity: 0.7,
        zIndex: 2,
      };
    } else if (normalizedDiff === 1 || (normalizedDiff === -(testimonials.length - 1))) {
      return {
        transform: 'translateX(80%) scale(0.9) rotateY(-25deg)',
        opacity: 0.7,
        zIndex: 2,
      };
    }
    return {
      transform: 'translateX(0) scale(0.8)',
      opacity: 0,
      zIndex: 1,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-white py-24 lg:py-36 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-pink/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-pink-light/50 blur-3xl" />

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
            What Our Clients Say
          </h2>
          <p
            className={`font-body text-lg text-gray-text max-w-xl mx-auto transition-all duration-500 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Real stories from our valued clients
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          className={`relative h-[400px] lg:h-[450px] transition-all duration-800 ease-expo-out ${
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-80'
          }`}
          style={{ transitionDelay: '300ms', perspective: '1200px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="absolute w-full max-w-xl transition-all duration-800 ease-expo-out cursor-pointer"
                style={{
                  ...getCardStyle(index),
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="h-10 w-10 text-pink" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'fill-pink text-pink'
                            : 'text-gray-border'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="font-body text-lg text-dark mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-pink flex items-center justify-center">
                      <span className="font-display text-dark">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-lg text-dark">
                        {testimonial.name}
                      </div>
                      <div className="font-body text-sm text-gray-text">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-pink-light transition-colors duration-300 z-10"
          >
            <ChevronLeft className="h-6 w-6 text-dark" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-pink-light transition-colors duration-300 z-10"
          >
            <ChevronRight className="h-6 w-6 text-dark" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div
          className={`flex justify-center gap-3 mt-8 transition-all duration-500 ease-smooth ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-pink scale-125'
                  : 'bg-gray-border hover:bg-pink/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
