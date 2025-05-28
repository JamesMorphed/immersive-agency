
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, ArrowRight, Play } from 'lucide-react';
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
        
        {/* Previous Projects Section */}
        <section className="mb-20">
          <div 
            ref={caseStudiesRef}
            className={`transition-all duration-1000 transform ${
              isCaseStudiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              <span className="text-white">Our previous</span>{' '}
              <span className="gradient-text">{service.title} projects</span>
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="bg-cyberpunk-magenta text-white px-4 py-2">
                AI {service.title}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2">
                Teams {service.title}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2">
                Video
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2">
                {service.title} Panel
              </Badge>
            </div>

            {/* Featured project */}
            {service.case_studies.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="relative">
                  <img 
                    src={service.gallery_images[0] || service.hero_image} 
                    alt="Featured project"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                      <Play className="w-5 h-5 mr-2" />
                      Watch the video
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <Badge variant="secondary" className="bg-cyberpunk-magenta/20 text-cyberpunk-magenta border-cyberpunk-magenta/30 w-fit mb-4">
                    AI {service.title.toUpperCase()}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {service.case_studies[0]?.title || `Transform your communications with AI ${service.title}`}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    {service.case_studies[0]?.description || `Enhance interactions, deliver highly personalised information or simply add a touch of innovation to your project with custom AI ${service.title}.`}
                  </p>
                  <div className="flex items-center text-cyberpunk-cyan">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    <span>Watch the video</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

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

        {/* Gallery/Discover More Section */}
        <section className="mb-20">
          <div 
            ref={galleryRef}
            className={`transition-all duration-1000 transform ${
              isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 italic">
              <span className="text-white">Discover more...</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {service.gallery_images.slice(0, 5).map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-bold text-sm">{service.title}</h4>
                    <p className="text-xs text-gray-300">Interactive content</p>
                  </div>
                </div>
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

        {/* CTA Section */}
        <section className="relative">
          <div 
            ref={pricingRef}
            className={`transition-all duration-1000 transform ${
              isPricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyberpunk-magenta rounded-2xl p-12 lg:p-16 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white italic">
                  Don't be a stranger...
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Share your idea or existing project and we can explore how immersive content experiences can be beneficial.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  GET IN TOUCH
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetailContent;
