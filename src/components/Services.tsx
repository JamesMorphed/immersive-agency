
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Services = () => {
  const serviceItems = [
    {
      id: 1,
      title: 'Digital Strategy',
      description: 'We craft comprehensive digital strategies tailored to your business goals, helping you navigate the digital landscape with confidence.',
      image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
    },
    {
      id: 2,
      title: 'App Development',
      description: 'Our expert team creates intuitive, high-performance applications that deliver seamless user experiences across all platforms.',
      image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
    },
    {
      id: 3,
      title: 'Experience Design',
      description: 'We design immersive digital experiences that captivate your audience and strengthen your brand connection through innovative interfaces.',
      image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
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
            <span className="text-cyberpunk-magenta">Services</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of digital services designed to elevate your brand and drive meaningful engagement.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {serviceItems.map((service, index) => (
            <Card 
              key={service.id} 
              className="bg-black border border-cyberpunk-magenta/20 overflow-hidden"
              style={{ 
                transitionDelay: `${200 + (index * 150)}ms`,
                opacity: isCardsVisible ? 1 : 0,
                transform: isCardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease, transform 700ms ease'
              }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-50">{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="border border-cyberpunk-magenta bg-transparent text-cyberpunk-magenta hover:bg-cyberpunk-magenta/10">
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
