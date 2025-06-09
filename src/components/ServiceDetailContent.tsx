
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Play, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ServiceDetail } from '@/types/service';
import { useState } from 'react';

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
}

const ServiceDetailContent = ({ service }: ServiceDetailContentProps) => {
  const { isVisible, elementRef } = useScrollAnimation();
  const [videoOverlay, setVideoOverlay] = useState<string | null>(null);

  // Fetch projects for this service
  const { data: projects, isLoading } = useQuery({
    queryKey: ['service-projects', service.id],
    queryFn: async () => {
      console.log('Fetching projects for service:', service.id);
      
      const { data, error } = await supabase
        .from('service_projects')
        .select('*')
        .eq('service_id', service.id)
        .order('display_order');

      if (error) {
        console.error('Error fetching service projects:', error);
        throw error;
      }
      
      console.log('Projects fetched:', data);
      return data as ServiceProject[];
    },
  });

  // Sample projects data for demonstration
  const sampleProjects = [
    {
      id: 'ai-digital-people',
      title: 'AI Digital People',
      subtitle: 'Transform your communications with AI Digital People',
      description: 'Enhance interactions, deliver highly personalised information or simply add a touch of innovation to your project with custom AI Digital People.',
      image_url: '/lovable-uploads/fea9bd6d-520b-4876-8837-51cfff8d38f1.png',
      video_url: 'https://example.com/video1.mp4',
      category: 'AI Digital People'
    },
    {
      id: 'teams-digital-people',
      title: 'Teams Digital People',
      subtitle: 'Collaborative digital workforce solutions',
      description: 'Create teams of digital people that work together seamlessly to provide comprehensive customer service and support experiences.',
      image_url: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png',
      video_url: 'https://example.com/video2.mp4',
      category: 'Teams Digital People'
    },
    {
      id: 'video-integration',
      title: 'Video Integration',
      subtitle: 'Seamless video communication platform',
      description: 'Integrate digital people into your existing video platforms for enhanced communication and engagement.',
      image_url: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png',
      video_url: 'https://example.com/video3.mp4',
      category: 'Video'
    },
    {
      id: 'digital-panel',
      title: 'Digital Panel',
      subtitle: 'Interactive discussion platform',
      description: 'Host panel discussions with digital people for events, webinars, and educational content.',
      image_url: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png',
      video_url: 'https://example.com/video4.mp4',
      category: 'Digital Panel'
    }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : sampleProjects;

  const discoverItems = [
    { title: 'Congress', image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png' },
    { title: 'Digital People', image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png' },
    { title: 'Infographics', image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png' },
    { title: '3D Models', image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png' },
    { title: '360° Experiences', image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png' },
    { title: 'XR - Mixed Reality', image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png' }
  ];

  if (isLoading) {
    return (
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* Video Overlay */}
      {videoOverlay && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-4">
            <button 
              onClick={() => setVideoOverlay(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={videoOverlay}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              <span className="text-white">Our previous {service.title} projects</span>
            </h2>
            
            <Tabs defaultValue={displayProjects[0]?.category || displayProjects[0]?.id} className="w-full">
              <TabsList className="bg-transparent p-0 h-auto mb-12 flex flex-wrap gap-4">
                {displayProjects.map((project, index) => (
                  <TabsTrigger 
                    key={project.id}
                    value={project.category || project.id}
                    className="px-6 py-3 text-sm font-medium rounded-full border data-[state=active]:bg-cyberpunk-magenta data-[state=active]:text-white data-[state=active]:border-cyberpunk-magenta bg-transparent text-gray-300 border-gray-600 hover:border-cyberpunk-magenta/50"
                  >
                    {project.category || project.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {displayProjects.map((project, index) => (
                <TabsContent 
                  key={project.id} 
                  value={project.category || project.id}
                  className="mt-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 lg:order-1">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800">
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                        {project.video_url && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button 
                              onClick={() => setVideoOverlay(project.video_url)}
                              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                            >
                              <Play className="w-6 h-6 text-white ml-1" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-6 order-1 lg:order-2">
                      <div className="text-sm text-cyberpunk-cyan font-medium uppercase">
                        {project.category || 'Digital People'}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="text-cyberpunk-cyan hover:text-white p-0 h-auto"
                        onClick={() => project.video_url && setVideoOverlay(project.video_url)}
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Watch the video
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
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
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            {/* Position carousel controls in the header area */}
            <div className="absolute -top-20 right-0 flex gap-4 z-10">
              <CarouselPrevious className="relative rounded-full border-gray-600 bg-black/50 hover:bg-black text-white left-0 top-0 translate-y-0" />
              <CarouselNext className="relative rounded-full border-gray-600 bg-black/50 hover:bg-black text-white right-0 top-0 translate-y-0" />
            </div>
            
            <CarouselContent className="-ml-2 md:-ml-4">
              {discoverItems.map((item, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group cursor-pointer">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-6 border border-gray-800 group-hover:border-cyberpunk-magenta/50 transition-all">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-xl font-bold group-hover:gradient-text transition-all">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      {service.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/f4bc9b96-6730-4e04-bc00-e8158cc6ba3b.png" 
                alt="Get in touch"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold italic">
                <span className="text-white">Don't be a stranger...</span>
              </h2>
              <p className="text-xl text-gray-300">
                Share your idea or existing project and we can explore how immersive content experiences can help bring your project to new life and audience.
              </p>
              <Button variant="default" size="lg" className="text-lg px-8 py-4">
                GET IN TOUCH
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailContent;
