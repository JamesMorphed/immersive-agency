
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ServiceDetail } from '@/types/service';

interface ServiceDetailHeroProps {
  service: ServiceDetail;
}

const ServiceDetailHero = ({
  service
}: ServiceDetailHeroProps) => {
  const {
    isVisible,
    elementRef
  } = useScrollAnimation();

  return <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Hero Image Header */}
      <div className="absolute inset-0 z-10">
        <div className="w-full h-full">
          <img src={service.hero_image} alt={service.title} className="w-full h-full object-cover" />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
          {/* Additional black gradient at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 z-15">
        <div className="absolute inset-0" style={{
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
        backgroundSize: '50px 50px'
      }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col min-h-screen">
            
            {/* Centered Title */}
            <div className="flex-1 flex items-center justify-start">
              <div ref={elementRef} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-6xl md:text-8xl font-light text-white">
                  {service.title}
                </h1>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="pb-5">
              <div className={`transition-all duration-1000 transform max-w-4xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Main Headline */}
                <div className="mb-16">
                  
                </div>

                {/* Two Column Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-6">What is {service.title.replace(/s$/, '')}?</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {service.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-6">{service.title} are great for...</h3>
                    <div className="space-y-4">
                      {service.features.slice(0, 3).map((feature, index) => <div key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                            <div className="w-3 h-3 bg-cyberpunk-cyan rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm font-medium mb-1">{feature.title}</p>
                            <p className="text-gray-400 text-xs">{feature.description}</p>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default ServiceDetailHero;
