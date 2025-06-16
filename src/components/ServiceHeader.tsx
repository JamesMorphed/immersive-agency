import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServiceHeader = () => {
  const { isVisible: isHeaderVisible, elementRef: headerRef } = useScrollAnimation();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Gradient background with more gradual blend to black */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyberpunk-magenta/70 via-black/50 to-black z-0"></div>
      
      {/* Horizontal gradient overlay for more cyberpunk feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-cyan/50 to-cyberpunk-magenta/50 opacity-60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`py-24 sm:py-32 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter">
            Transcend physical boundaries
          </h1>
        </div>
      </div>

      {/* Gradient fade to black at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
    </section>
  );
};

export default ServiceHeader;
