
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServiceHeader = () => {
  const { isVisible: isHeaderVisible, elementRef: headerRef } = useScrollAnimation();

  return (
    <section className="relative w-full bg-gradient-to-r from-cyberpunk-magenta to-cyberpunk-cyan overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 z-0">
        {/* Grid overlay lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`vertical-${i}`} className="absolute left-0 right-0 h-px bg-white/20" 
               style={{ top: `${(i * 100) / 6}%` }} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`horizontal-${i}`} className="absolute top-0 bottom-0 w-px bg-white/20" 
               style={{ left: `${(i * 100) / 6}%` }} />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`py-24 sm:py-32 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter">
            Transcend physical<br />boundaries
          </h1>
          <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 px-6 py-3">
              <span className="text-white font-medium">EXTEND YOUR REALITY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default ServiceHeader;
