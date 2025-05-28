
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import type { ServiceDetail } from '@/types/service';

interface ServiceDetailContentProps {
  service: ServiceDetail;
}

const ServiceDetailContent = ({ service }: ServiceDetailContentProps) => {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <div className="bg-black text-white">
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Key Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the powerful features that make our {service.title.toLowerCase()} solutions stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <Card key={index} className="bg-black/50 border border-gray-800 hover:border-cyberpunk-magenta/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-8 w-8 text-cyberpunk-cyan mr-3" />
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Technologies We Use</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technologies for maximum performance and scalability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {service.technologies.map((tech, index) => (
              <div key={index} className="text-center">
                <div className="bg-black/40 border border-gray-800 rounded-lg p-6 hover:border-cyberpunk-cyan/50 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyberpunk-magenta to-cyberpunk-cyan rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{tech.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">Ready to Get Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's discuss how our {service.title.toLowerCase()} solutions can transform your business and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="default" size="lg" className="text-lg px-8 py-4">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="ghost" size="lg" className="text-lg px-8 py-4">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailContent;
