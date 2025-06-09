
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const Services = () => {
  const navigate = useNavigate();
  
  // Additional static services to display alongside database services
  const staticServices = [
    {
      id: 'infographics',
      title: 'Infographics',
      slug: 'infographics',
      description: 'Transform complex data into visually compelling and easy-to-understand infographics',
      hero_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop'
    },
    {
      id: '360-experiences',
      title: '360 Experiences',
      slug: '360-experiences',
      description: 'Create immersive 360-degree experiences that transport users to new worlds',
      hero_image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop'
    },
    {
      id: 'xr-mixed-reality',
      title: 'XR - Mixed Reality',
      slug: 'xr-mixed-reality',
      description: 'Blend physical and digital worlds with cutting-edge mixed reality solutions',
      hero_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
    },
    {
      id: 'video-animation',
      title: 'Video & Animation',
      slug: 'video-animation',
      description: 'Bring stories to life with stunning video production and animation',
      hero_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
    },
    {
      id: 'immersive-data',
      title: 'Immersive Data',
      slug: 'immersive-data',
      description: 'Visualize complex datasets through immersive and interactive experiences',
      hero_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
    },
    {
      id: 'books-comics',
      title: 'Books & Comics',
      slug: 'books-comics',
      description: 'Create engaging digital publications and interactive comic experiences',
      hero_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop'
    },
    {
      id: 'games',
      title: 'Games',
      slug: 'games',
      description: 'Develop immersive gaming experiences across multiple platforms',
      hero_image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      thumbnail_image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop'
    }
  ];
  
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
  
  // Combine database services with static services
  const allServices = [...(serviceItems || []), ...staticServices];
  
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What we do
          </h2>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="aspect-[4/3] rounded-xl">
                <Skeleton className="w-full h-full rounded-xl" />
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-10">
              <p className="text-red-400">Error loading services. Please try again later.</p>
            </div>
          ) : allServices && allServices.length > 0 ? (
            // Render all services (database + static)
            allServices.map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.slug)}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyberpunk-magenta/20"
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-gray-300 text-base line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.description}
                    </p>
                  )}
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl border border-cyberpunk-magenta/0 group-hover:border-cyberpunk-magenta/30 transition-all duration-500" />
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
