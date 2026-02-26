import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Search, Palette, Sparkles, Heart } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We listen to your goals and concerns',
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    number: '02',
    title: 'Analysis',
    description: 'Expert assessment of your needs',
    icon: <Search className="h-6 w-6" />,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Customized treatment plan creation',
    icon: <Palette className="h-6 w-6" />,
  },
  {
    number: '04',
    title: 'Treatment',
    description: 'Professional care in luxury setting',
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    number: '05',
    title: 'Follow-up',
    description: 'Ongoing support and maintenance',
    icon: <Heart className="h-6 w-6" />,
  },
];

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  // Auto-advance steps
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full bg-gray-light py-24 lg:py-36 overflow-hidden"
    >
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
            Our Process
          </h2>
          <p
            className={`font-body text-lg text-gray-text max-w-xl mx-auto transition-all duration-500 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            A personalized journey to your best self
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-border -translate-y-1/2 z-0">
            <div
              className="h-full bg-pink transition-all duration-1000 ease-expo-out"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative z-10 transition-all duration-700 ease-expo-out ${
                  isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-0'
                }`}
                style={{ transitionDelay: `${500 + index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Circle */}
                <div
                  className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ease-expo-out cursor-pointer ${
                    activeStep >= index
                      ? 'bg-dark text-white'
                      : 'bg-white text-gray-text border-2 border-gray-border'
                  } ${activeStep === index ? 'scale-110 shadow-glow' : ''}`}
                >
                  <div
                    className={`transition-all duration-300 ${
                      activeStep === index ? 'animate-pulse' : ''
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`mt-6 text-center transition-all duration-500 ease-smooth ${
                    activeStep === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-60 translate-y-2'
                  }`}
                >
                  <div className="font-display text-sm text-pink mb-1">
                    {step.number}
                  </div>
                  <h3 className="font-display text-h6 text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-gray-text">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Progress Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-10 left-[60%] w-full h-0.5 bg-gray-border">
                    <div
                      className={`h-full bg-pink transition-all duration-500 ${
                        activeStep > index ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Detail */}
        <div
          className={`mt-16 lg:mt-20 text-center transition-all duration-600 ease-expo-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1500ms' }}
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-card max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-pink">{steps[activeStep].icon}</span>
              <span className="font-display text-2xl text-dark">
                {steps[activeStep].title}
              </span>
            </div>
            <p className="font-body text-lg text-gray-text">
              {steps[activeStep].description}. Our expert team ensures every step
              of your journey is comfortable, safe, and tailored to your unique
              needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
