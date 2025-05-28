
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ServiceDetail } from '@/types/service';

interface ServiceDetailHeroProps {
  service: ServiceDetail;
}

const ServiceDetailHero = ({ service }: ServiceDetailHeroProps) => {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 55, 187, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 56, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            
            {/* Left Content */}
            <div 
              ref={elementRef}
              className={`transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="text-white">{service.title}</span>
              </h1>
              
              <div className="mb-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-blue-400">Harnessing the</span><br />
                  <span className="gradient-text">virtual world</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-black/40 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-3">A bit about {service.title}...</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {service.overview}
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-3">{service.title} are great for...</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className={`transition-all duration-1000 transform delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-gradient-to-r from-cyberpunk-magenta to-cyberpunk-cyan shadow-2xl">
                  <img 
                    src={service.hero_image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyberpunk-magenta rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyberpunk-cyan rounded-full animate-pulse delay-1000"></div>
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
