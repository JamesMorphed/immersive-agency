import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Play, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ServiceDetail } from '@/types/service';
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQuery as useQueryServices } from '@tanstack/react-query';

interface ServiceDetailContentProps {
  service: ServiceDetail;
}

interface ServiceProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url: string | null;
  category: string | null;
  is_featured: boolean;
  display_order: number;
  metrics: string | null;
  tags: string[] | null;
  project_url?: string;
  created_at?: string;
  updated_at?: string;
}

const ServiceDetailContent = ({
  service
}: ServiceDetailContentProps) => {
  const {
    isVisible,
    elementRef
  } = useScrollAnimation();
  
  const [videoOverlay, setVideoOverlay] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const isMobile = useIsMobile();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Fetch projects for this service
  const {
    data: projects,
    isLoading
  } = useQuery({
    queryKey: ['service-projects', service.id],
    queryFn: async () => {
      console.log('Fetching projects for service:', service.id);
      const {
        data,
        error
      } = await supabase.from('service_projects').select('*').eq('service_id', service.id).order('display_order');
      if (error) {
        console.error('Error fetching service projects:', error);
        throw error;
      }
      console.log('Projects fetched:', data);
      return data as ServiceProject[];
    }
  });

  // Fetch all services for the Discover More carousel
  const { data: allServices, isLoading: isLoadingServices } = useQueryServices({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_details')
        .select('id, title, slug, hero_image, thumbnail_image, description');
      if (error) throw error;
      return data || [];
    },
  });

  // Sample projects data for demonstration
  const sampleProjects = [{
    id: 'ai-digital-people',
    title: 'AI Digital People',
    subtitle: 'Transform your communications with AI Digital People',
    description: 'Enhance interactions, deliver highly personalised information or simply add a touch of innovation to your project with custom AI Digital People.',
    image_url: '/lovable-uploads/107de9c5-2e62-4764-93a6-be70a5a2d19f.png',
    video_url: 'https://example.com/video1.mp4',
    category: 'AI Digital People'
  }, {
    id: 'teams-digital-people',
    title: 'Teams Digital People',
    subtitle: 'Collaborative digital workforce solutions',
    description: 'Create teams of digital people that work together seamlessly to provide comprehensive customer service and support experiences.',
    image_url: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png',
    video_url: 'https://example.com/video2.mp4',
    category: 'Teams Digital People'
  }, {
    id: 'video-integration',
    title: 'Video Integration',
    subtitle: 'Seamless video communication platform',
    description: 'Integrate digital people into your existing video platforms for enhanced communication and engagement.',
    image_url: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png',
    video_url: 'https://example.com/video3.mp4',
    category: 'Video'
  }, {
    id: 'digital-panel',
    title: 'Digital Panel',
    subtitle: 'Interactive discussion platform',
    description: 'Host panel discussions with digital people for events, webinars, and educational content.',
    image_url: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png',
    video_url: 'https://example.com/video4.mp4',
    category: 'Digital Panel'
  }];
  const displayProjects = projects && projects.length > 0 ? projects : sampleProjects;

  // Initialize active tab
  useEffect(() => {
    if (!activeTab && displayProjects.length > 0) {
      setActiveTab(displayProjects[0]?.category || displayProjects[0]?.id);
    }
  }, [displayProjects, activeTab]);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      const currentIndex = displayProjects.findIndex(
        project => (project.category || project.id) === activeTab
      );
      
      if (swipeDistance > 0 && currentIndex < displayProjects.length - 1) {
        // Swipe left - next tab
        const nextProject = displayProjects[currentIndex + 1];
        setActiveTab(nextProject.category || nextProject.id);
      } else if (swipeDistance < 0 && currentIndex > 0) {
        // Swipe right - previous tab
        const prevProject = displayProjects[currentIndex - 1];
        setActiveTab(prevProject.category || prevProject.id);
      }
    }
  };

  if (isLoading) {
    return <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>;
  }
  return <div className="bg-black text-white">
      {/* Video Overlay */}
      {videoOverlay && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-4">
            <button onClick={() => setVideoOverlay(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe src={videoOverlay} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>}

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              <span className="text-white">Our previous {service.title} projects</span>
            </h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent p-0 h-auto mb-12 flex justify-start gap-8">
                {displayProjects.map((project, index) => <TabsTrigger 
                  key={project.id} 
                  value={project.category || project.id} 
                  className="px-0 py-3 text-lg font-medium bg-transparent text-gray-300 border-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-cyberpunk-magenta hover:text-white transition-colors"
                >
                    {project.category || project.title}
                  </TabsTrigger>)}
              </TabsList>

              {displayProjects.map((project, index) => <TabsContent 
                key={project.id} 
                value={project.category || project.id} 
                className="mt-0"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 lg:order-1">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800">
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }} />
                        {project.video_url && <div className="absolute inset-0 flex items-center justify-center">
                            <button onClick={() => setVideoOverlay(project.video_url)} className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                              <Play className="w-6 h-6 text-white ml-1" />
                            </button>
                          </div>}
                      </div>
                    </div>
                    
                    <div className="space-y-6 order-1 lg:order-2">
                      <div className="text-sm text-cyberpunk-cyan font-medium uppercase flex items-center gap-2">
                        {project.category || 'Digital People'}
                        {project.is_featured && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-cyberpunk-magenta text-white text-xs font-semibold">Featured</span>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                      {project.metrics && (
                        <div className="text-cyberpunk-cyan font-semibold text-base mt-2">{project.metrics}</div>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="inline-block px-2 py-0.5 rounded bg-cyberpunk-cyan/10 text-cyberpunk-cyan text-xs font-medium border border-cyberpunk-cyan/30">{tag}</span>
                          ))}
                        </div>
                      )}
                      {project.project_url && (
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                          <Button variant="secondary" className="text-white bg-cyberpunk-cyan hover:bg-cyberpunk-magenta">
                            View Project
                          </Button>
                        </a>
                      )}
                      <Button variant="ghost" className="text-cyberpunk-cyan hover:text-white p-0 h-auto mt-2" onClick={() => project.video_url && setVideoOverlay(project.video_url)}>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Watch the video
                      </Button>
                    </div>
                  </div>
                </TabsContent>)}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Discover More Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-bold italic">
              <span className="text-white">Discover more...</span>
            </h2>
          </div>
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full relative">
            {/* Position carousel controls in the header area */}
            <div className="absolute -top-20 right-0 flex gap-4 z-10">
              <CarouselPrevious className="relative bg-transparent border-none hover:bg-transparent text-white left-0 top-0 translate-y-0 p-0 h-auto w-auto focus:outline-none focus:ring-0" />
              <CarouselNext className="relative bg-transparent border-none hover:bg-transparent text-white right-0 top-0 translate-y-0 p-0 h-auto w-auto focus:outline-none focus:ring-0" />
            </div>
            <CarouselContent className="-ml-2 md:-ml-4">
              {(isLoadingServices ? [] : allServices || []).map((service, index) => (
                <CarouselItem key={service.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  {service.slug ? (
                    <a href={`/services/${service.slug}`} className="block group cursor-pointer">
                      <div className="aspect-square rounded-2xl overflow-hidden mb-6 border border-gray-800 group-hover:border-cyberpunk-magenta/50 transition-all">
                        <img src={service.thumbnail_image || service.hero_image || '/placeholder.svg'} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { const target = e.target as HTMLImageElement; target.src = '/placeholder.svg'; }} />
                      </div>
                      <h3 className="text-xl font-bold group-hover:gradient-text transition-all">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">
                        {service.description || 'Discover our service'}
                      </p>
                    </a>
                  ) : (
                    <div className="group cursor-pointer">
                      <div className="aspect-square rounded-2xl overflow-hidden mb-6 border border-gray-800 group-hover:border-cyberpunk-magenta/50 transition-all">
                        <img src={service.thumbnail_image || service.hero_image || '/placeholder.svg'} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { const target = e.target as HTMLImageElement; target.src = '/placeholder.svg'; }} />
                      </div>
                      <h3 className="text-xl font-bold group-hover:gradient-text transition-all">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">
                        {service.description || 'Discover our service'}
                      </p>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      
    </div>;
};

export default ServiceDetailContent;
