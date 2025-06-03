
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ServiceDetail } from '@/types/service';

interface ServiceDetailHeroProps {
  service: ServiceDetail;
}

const ServiceDetailHero = ({ service }: ServiceDetailHeroProps) => {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-black">
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
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <span className="text-white">{service.title}</span>
              </h1>
              
              <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  <span className="text-cyberpunk-cyan">Harnessing the</span><br />
                  <span className="gradient-text">virtual world</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">A bit about {service.title}...</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {service.overview}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">{service.title} are great for...</h3>
                  <div className="space-y-3">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-cyberpunk-cyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className={`transition-all duration-1000 transform delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="relative">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-cyberpunk-magenta/30 shadow-2xl">
                  <img 
                    src={service.hero_image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailHero;
