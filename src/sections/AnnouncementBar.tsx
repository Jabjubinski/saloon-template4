import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] bg-pink h-11 flex items-center overflow-hidden transition-transform duration-600 ease-expo-out ${
        isAnimated ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Scrolling Text Container */}
      <div className="flex-1 overflow-hidden">
        <div className="animate-scroll-text whitespace-nowrap flex items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span className="flex items-center gap-2 font-body text-sm text-dark">
                <Sparkles className="h-4 w-4" />
                Spring Special: 20% Off All Facial Treatments
              </span>
              <span className="text-dark/40">|</span>
              <span className="font-body text-sm text-dark">
                Book Your Consultation Today
              </span>
              <span className="text-dark/40">|</span>
              <span className="flex items-center gap-2 font-body text-sm text-dark">
                <Sparkles className="h-4 w-4" />
                Free Skin Analysis with First Visit
              </span>
              <span className="text-dark/40">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="px-4 h-full flex items-center justify-center text-dark hover:bg-dark/10 transition-colors duration-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
