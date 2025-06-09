
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ServiceDetail } from '@/types/service';

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

  // Get unique categories from projects for filtering
  const projectCategories = projects 
    ? Array.from(new Set(projects.map(p => p.category).filter(Boolean)))
        .map(category => ({ name: category, active: category === projects[0]?.category }))
    : [];

  // Get featured projects
  const featuredProjects = projects?.filter(p => p.is_featured) || [];

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
      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">Our previous {service.title} projects</span>
            </h2>
            
            {/* Category Pills */}
            {projectCategories.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-12">
                {projectCategories.map((category, index) => (
                  <Badge 
                    key={index}
                    variant={category.active ? "default" : "secondary"}
                    className={`px-6 py-2 text-sm font-medium rounded-full border ${
                      category.active 
                        ? 'bg-cyberpunk-magenta text-white border-cyberpunk-magenta' 
                        : 'bg-transparent text-gray-300 border-gray-600 hover:border-cyberpunk-magenta/50'
                    }`}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Featured Projects */}
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="relative">
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
                          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {project.category && (
                      <div className="text-sm text-cyberpunk-cyan font-medium uppercase">
                        {project.category}
                      </div>
                    )}
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                    {project.metrics && (
                      <div className="text-cyberpunk-magenta font-semibold">
                        {project.metrics}
                      </div>
                    )}
                    {project.video_url && (
                      <Button variant="ghost" className="text-cyberpunk-cyan hover:text-white p-0 h-auto">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Watch the video
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No featured projects available for this service yet.</p>
              </div>
            )}
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
