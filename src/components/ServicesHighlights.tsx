
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

  const { isVisible: isHeaderVisible, elementRef: headerRef } = useScrollAnimation();
  const { isVisible: isCardsVisible, elementRef: cardsRef } = useScrollAnimation({
    threshold: 0.2
  });

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Pink perspective grid */}
      <div className="absolute inset-0 w-full h-full" style={{ 
        perspective: '800px',
        transformStyle: 'preserve-3d'
      }}>
        <div className="absolute inset-0 w-full h-full" style={{
          backgroundImage: 'linear-gradient(#FF37BB 1px, transparent 1px), linear-gradient(90deg, #FF37BB 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: '0.5',
          transform: 'rotateX(60deg)',
          transformOrigin: 'bottom',
          backgroundPosition: 'center',
          zIndex: '1'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={headerRef}
          className={`text-left mb-12 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white text-left">Ways to connect</h2>
        </div>
        
        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 transform ${
            isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-gray-700 group"
              style={{
                background: 'transparent',
                transitionDelay: `${200 + (index * 150)}ms`,
                opacity: isCardsVisible ? 1 : 0,
                transform: isCardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease, transform 700ms ease'
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
    </section>
  );
};

export default ServicesHighlights;
