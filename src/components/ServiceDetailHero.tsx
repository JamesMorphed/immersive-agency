
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceDetailHeroProps {
  service: {
    title: string;
    description: string;
    hero_image: string;
    overview: string;
  };
}

const ServiceDetailHero = ({ service }: ServiceDetailHeroProps) => {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={service.hero_image} 
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-magenta/20 to-cyberpunk-cyan/20 z-10"></div>
      </div>

      {/* Dynamic grid overlay */}
      <div className="absolute inset-0 z-10 opacity-15">
        <div className="w-full h-full dynamic-perspective-grid"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div 
            ref={elementRef}
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {service.description}
              </p>
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
                <p className="text-lg text-gray-200 leading-relaxed">
                  {service.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailHero;
