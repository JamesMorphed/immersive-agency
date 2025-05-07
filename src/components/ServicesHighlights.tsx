
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const ServicesHighlights = () => {
  const services = [{
    title: "Reach out to us directly",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.",
    bgImage: "/lovable-uploads/327266b3-5b53-410c-a2bc-07c8212d93ee.png"
  }, {
    title: "Project briefing form",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.",
    bgImage: "/lovable-uploads/25052a8d-9aa8-4923-8e7d-e35ff888af78.png"
  }];

  return <section className="py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white text-left">Ways to connect</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-gray-700 group"
              style={{
                background: 'transparent'
              }}
            >
              <div 
                className="absolute inset-0 z-0" 
                style={{
                  backgroundImage: `url(${service.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10 bg-black/30 group-hover:bg-transparent transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-white">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-200">{service.description}</CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>;
};

export default ServicesHighlights;
