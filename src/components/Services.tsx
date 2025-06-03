
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const Services = () => {
  const navigate = useNavigate();
  
  // Fetch services from the database
  const { data: serviceItems, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      console.log('Fetching services from database...');
      
      const { data, error } = await supabase
        .from('service_details')
        .select('id, title, slug, hero_image, thumbnail_image, description')
        .order('title');

      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      
      console.log('Services fetched:', data);
      return data;
    },
  });
  
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
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-[4/3]">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-10">
              <p className="text-red-400">Error loading services. Please try again later.</p>
            </div>
          ) : serviceItems && serviceItems.length > 0 ? (
            // Render actual services
            serviceItems.map((service, index) => (
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
                    src={service.thumbnail_image || service.hero_image || '/placeholder.svg'} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
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
            ))
          ) : (
            // No services found
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">No services available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
