
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
import type { ServiceDetail } from '@/types/service';

interface ServiceDetailContentProps {
  service: ServiceDetail;
}

const ServiceDetailContent = ({ service }: ServiceDetailContentProps) => {
  const { isVisible, elementRef } = useScrollAnimation();

  // Mock project data based on the design
  const projectCategories = [
    { name: 'AI Digital People', active: true },
    { name: 'Teams Digital People', active: false },
    { name: 'Video', active: false },
    { name: 'Digital Panel', active: false }
  ];

  const projects = [
    {
      title: 'Transform your communications with AI Digital People',
      description: 'Streamline your workflow and deliver personalized information or simply add a touch of innovation to your project with custom AI Digital People.',
      image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png',
      hasVideo: true
    }
  ];

  const discoverItems = [
    { title: 'Congress', image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png' },
    { title: 'Digital People', image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png' },
    { title: 'Infographics', image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png' },
    { title: '3D Models', image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png' },
    { title: '360° Experiences', image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png' },
    { title: 'XR - Mixed Reality', image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png' }
  ];

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

            {/* Featured Project */}
            {projects.map((project, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.hasVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="text-sm text-cyberpunk-cyan font-medium">
                    AI DIGITAL PEOPLE
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  <Button variant="ghost" className="text-cyberpunk-cyan hover:text-white p-0 h-auto">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Watch the video
                  </Button>
                </div>
              </div>
            ))}
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
              <CarouselPrevious className="relative border-gray-600 bg-black/50 hover:bg-black text-white left-0 top-0 translate-y-0" />
              <CarouselNext className="relative border-gray-600 bg-black/50 hover:bg-black text-white right-0 top-0 translate-y-0" />
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
