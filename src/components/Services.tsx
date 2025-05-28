import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  
  const serviceItems = [{
    id: 1,
    title: 'Congress',
    slug: 'congress',
    image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
  }, {
    id: 2,
    title: 'Digital People',
    slug: 'digital-people',
    image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
  }, {
    id: 3,
    title: '3D Models',
    slug: '3d-models',
    image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
  }, {
    id: 4,
    title: 'Infographics',
    slug: 'infographics',
    image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
  }, {
    id: 5,
    title: '360 Experiences',
    slug: '360-experiences',
    image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
  }, {
    id: 6,
    title: 'XR - Mixed Reality',
    slug: 'xr-mixed-reality',
    image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
  }, {
    id: 7,
    title: 'Video & Animation',
    slug: 'video-animation',
    image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
  }, {
    id: 8,
    title: 'Interactive Data',
    slug: 'interactive-data',
    image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png'
  }, {
    id: 9,
    title: 'Books & Comics',
    slug: 'books-comics',
    image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png'
  }, {
    id: 10,
    title: 'Games',
    slug: 'games',
    image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png'
  }];
  
  const {
    isVisible: isHeaderVisible,
    elementRef: headerRef
  } = useScrollAnimation();
  
  const {
    isVisible: isCardsVisible,
    elementRef: cardsRef
  } = useScrollAnimation();
  
  const handleServiceClick = (slug: string) => {
    navigate(`/services/${slug}`);
  };
  
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef} 
          className={`text-center mb-16 transition-all duration-1000 transform ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-50">Our</span>{' '}
            <span className="text-cyberpunk-magenta">Solutions</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of digital services designed to elevate your brand and drive meaningful engagement.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {serviceItems.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.slug)}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer border border-cyberpunk-magenta/20 hover:border-cyberpunk-magenta transition-all duration-300"
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                opacity: isCardsVisible ? 1 : 0,
                transform: isCardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease, transform 700ms ease'
              }}
            >
              {/* Full cover image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Title with hover effect */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between transition-all duration-300 group-hover:bg-black/50">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <ArrowRight 
                  className="text-cyberpunk-magenta h-0 w-0 opacity-0 ml-2 transition-all duration-300 transform translate-x-[-10px] group-hover:h-5 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
