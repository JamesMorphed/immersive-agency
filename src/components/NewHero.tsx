
import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Add TypeScript declaration for window.UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: any;
  }
}

const NewHero = () => {
  const unicornRef = useRef<HTMLDivElement>(null);
  const { isVisible, elementRef } = useScrollAnimation();
  
  useEffect(() => {
    if (!window.UnicornStudio) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.25/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else if (!window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, []);
  
  return (
    <section className="relative w-screen h-screen min-h-screen flex items-center overflow-hidden p-0 m-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/lovable-uploads/a3a64e57-ed8b-4463-a9ed-43b8158e03e7.png')" }}
      />
      
      {/* WebGL Effect Overlay */}
      <div
        ref={unicornRef}
        data-us-project="lvIYlhQGvzYJSBK1KFx6"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100vw', height: '100vh', zIndex: 5, margin: 0, padding: 0 }}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Profile Image */}
            <div 
              ref={elementRef}
              className={`flex justify-center lg:justify-start transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-cyberpunk-magenta/30 shadow-2xl shadow-cyberpunk-magenta/20">
                  <img 
                    src="/lovable-uploads/faa6ceae-2d1d-4713-9f88-b52c23d0803e.png" 
                    alt="CXI+AI Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Animated ring around image */}
                <div className="absolute inset-0 rounded-full border-2 border-cyberpunk-magenta animate-pulse"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div 
              className={`text-center lg:text-left transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight mb-6">
                CXI+AI
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mb-8">
                For Scalable Digital Delivery
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                Transforming healthcare through immersive technology, artificial intelligence, 
                and innovative digital solutions that scale with your business needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default NewHero;
