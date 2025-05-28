
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import type { ServiceDetail } from '@/types/service';

interface ServiceDetailContentProps {
  service: ServiceDetail;
}

const ServiceDetailContent = ({ service }: ServiceDetailContentProps) => {
  const { isVisible: isFeaturesVisible, elementRef: featuresRef } = useScrollAnimation();
  const { isVisible: isTechVisible, elementRef: techRef } = useScrollAnimation();
  const { isVisible: isCaseStudiesVisible, elementRef: caseStudiesRef } = useScrollAnimation();
  const { isVisible: isGalleryVisible, elementRef: galleryRef } = useScrollAnimation();
  const { isVisible: isPricingVisible, elementRef: pricingRef } = useScrollAnimation();

  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Features Section */}
        <section className="mb-20">
          <div 
            ref={featuresRef}
            className={`transition-all duration-1000 transform ${
              isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-white">Key</span>{' '}
              <span className="gradient-text">Features</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan transition-all duration-500 p-6 group">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="text-cyberpunk-magenta w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-cyan transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="mb-20">
          <div 
            ref={techRef}
            className={`transition-all duration-1000 transform ${
              isTechVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-white">Technologies</span>{' '}
              <span className="gradient-text">We Use</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {service.technologies.map((tech, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-magenta transition-all duration-500 p-6 text-center group">
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-16 h-16 mx-auto mb-4 custom-icon group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyberpunk-magenta transition-colors">
                    {tech.name}
                  </h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="mb-20">
          <div 
            ref={caseStudiesRef}
            className={`transition-all duration-1000 transform ${
              isCaseStudiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-white">Success</span>{' '}
              <span className="gradient-text">Stories</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.case_studies.map((study, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan transition-all duration-500 p-8 group">
                  <div className="flex items-center mb-4">
                    <Star className="text-cyberpunk-magenta w-5 h-5 mr-2" />
                    <Badge variant="secondary" className="bg-cyberpunk-magenta/20 text-cyberpunk-magenta border-cyberpunk-magenta/30">
                      Case Study
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyberpunk-cyan transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {study.description}
                  </p>
                  <div className="text-sm text-cyberpunk-magenta font-medium">
                    {study.metrics}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-20">
          <div 
            ref={galleryRef}
            className={`transition-all duration-1000 transform ${
              isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-white">Project</span>{' '}
              <span className="gradient-text">Gallery</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.gallery_images.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg aspect-video">
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section>
          <div 
            ref={pricingRef}
            className={`transition-all duration-1000 transform ${
              isPricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-white">Get</span>{' '}
              <span className="gradient-text">Started</span>
            </h2>
            <Card className="bg-black/60 backdrop-blur-sm border border-cyberpunk-magenta/30 hover:border-cyberpunk-magenta transition-all duration-500 p-8 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-cyberpunk-magenta mb-2">
                  {service.pricing_info.starting_price}
                </div>
                <div className="text-gray-400">Starting price</div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {service.pricing_info.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="text-cyberpunk-magenta w-5 h-5 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8 p-4 bg-cyberpunk-magenta/10 rounded-lg border border-cyberpunk-magenta/20">
                <div className="text-sm text-gray-300">
                  <strong className="text-cyberpunk-magenta">Development Timeline:</strong> {service.pricing_info.duration}
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Get Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetailContent;
