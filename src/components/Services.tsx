
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Services = () => {
  const serviceItems = [
    {
      id: 1,
      title: 'Congress',
      description: 'Comprehensive congress solutions designed to create memorable and engaging experiences for attendees.',
      image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
    },
    {
      id: 2,
      title: 'Digital People',
      description: 'Cutting-edge digital human technology bringing lifelike digital characters to your brand interactions.',
      image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
    },
    {
      id: 3,
      title: '3D Models',
      description: 'High-fidelity 3D modeling and design services creating immersive digital assets for multiple platforms.',
      image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
    },
    {
      id: 4,
      title: 'Infographics',
      description: 'Visually compelling infographics that transform complex data into clear, engaging visual narratives.',
      image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
    },
    {
      id: 5,
      title: '360 Experiences',
      description: 'Immersive 360° environments that create interactive experiences for your audience.',
      image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
    },
    {
      id: 6,
      title: 'XR - Mixed Reality',
      description: 'Blending digital and physical worlds through advanced extended reality technologies.',
      image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
    },
    {
      id: 7,
      title: 'Video & Animation',
      description: 'Professional video production and animation services that bring your brand stories to life.',
      image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
    },
    {
      id: 8,
      title: 'Interactive Data',
      description: 'Dynamic data visualization solutions that transform complex information into interactive experiences.',
      image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
    },
    {
      id: 9,
      title: 'Books & Comics',
      description: 'Digital publishing services for interactive books, comics, and other engaging content formats.',
      image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
    },
    {
      id: 10,
      title: 'Games',
      description: 'Custom game development creating engaging interactive experiences for your brand and audience.',
      image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
    }
  ];

  const { isVisible: isHeaderVisible, elementRef: headerRef } = useScrollAnimation();
  const { isVisible: isCardsVisible, elementRef: cardsRef } = useScrollAnimation();

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-50">Our</span>{' '}
            <span className="text-cyberpunk-magenta">Portfolio</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of digital services designed to elevate your brand and drive meaningful engagement.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-1000 transform ${
            isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {serviceItems.map((service, index) => (
            <Card 
              key={service.id} 
              className="bg-black border border-cyberpunk-magenta/20 overflow-hidden group"
              style={{ 
                transitionDelay: `${200 + (index * 100)}ms`,
                opacity: isCardsVisible ? 1 : 0,
                transform: isCardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease, transform 700ms ease'
              }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold text-slate-50">{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="border border-cyberpunk-magenta bg-transparent text-cyberpunk-magenta hover:bg-cyberpunk-magenta/10 w-full justify-between">
                  Read more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
