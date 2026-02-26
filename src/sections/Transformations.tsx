import { useEffect, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

const Transformations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative w-full bg-pink-light py-24 lg:py-36 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-pink/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-pink/30 blur-3xl" />

      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`font-display text-h2 text-dark mb-4 transition-all duration-600 ease-expo-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            Transformations
          </h2>
          <p
            className={`font-body text-lg text-gray-text max-w-xl mx-auto transition-all duration-500 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Real results from real clients
          </p>
        </div>

        {/* Before/After Slider */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-800 ease-expo-out ${
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden shadow-card cursor-ew-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            {/* After Image (Full) */}
            <div className="relative aspect-[4/3]">
              <img
                src="/before-after.jpg"
                alt="After treatment"
                className="w-full h-full object-cover"
              />
              
              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="/before-after.jpg"
                  alt="Before treatment"
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              {/* Labels */}
              <div
                className={`absolute top-4 left-4 bg-dark/80 text-white px-4 py-2 rounded-full font-body text-sm transition-opacity duration-300 ${
                  sliderPosition > 15 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Before
              </div>
              <div
                className={`absolute top-4 right-4 bg-pink text-dark px-4 py-2 rounded-full font-body text-sm transition-opacity duration-300 ${
                  sliderPosition < 85 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                After
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-glow cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-card flex items-center justify-center transition-all duration-300 ${
                    isDragging ? 'scale-110 shadow-glow' : ''
                  }`}
                >
                  <MoveHorizontal className="h-5 w-5 text-dark" />
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p
            className={`text-center mt-6 font-body text-sm text-gray-text transition-all duration-500 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            Individual results may vary. Consultation required for personalized treatment plans.
          </p>

          {/* Instructions */}
          <div
            className={`flex items-center justify-center gap-2 mt-4 transition-all duration-500 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <MoveHorizontal className="h-4 w-4 text-pink" />
            <span className="font-body text-sm text-gray-text">
              Drag to compare
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformations;
