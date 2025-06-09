
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Play, User, Brain, MessageCircle, Zap } from 'lucide-react';

const DigitalPeopleDetail = () => {
  const { isVisible: isHeroVisible, elementRef: heroRef } = useScrollAnimation();
  const { isVisible: isFeaturesVisible, elementRef: featuresRef } = useScrollAnimation();
  const { isVisible: isProjectsVisible, elementRef: projectsRef } = useScrollAnimation();

  const features = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Photorealistic Avatars",
      description: "Create incredibly lifelike digital humans with advanced facial expressions and natural movements"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Conversations",
      description: "Enable natural language interactions with sophisticated AI that understands context and emotion"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Multi-Language Support",
      description: "Communicate across languages with real-time translation and culturally appropriate responses"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Interaction",
      description: "Experience seamless, low-latency conversations that feel naturally human"
    }
  ];

  const projects = [
    {
      title: "Virtual Customer Service Agent",
      description: "A 24/7 digital representative that handles customer inquiries with human-like empathy and understanding.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      category: "Customer Service",
      metrics: "85% customer satisfaction increase"
    },
    {
      title: "Educational AI Tutor",
      description: "An interactive digital teacher that adapts to individual learning styles and provides personalized instruction.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      category: "Education",
      metrics: "40% improvement in learning outcomes"
    }
  ];

  const discoverItems = [
    { title: 'Infographics', image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png' },
    { title: '360° Experiences', image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png' },
    { title: 'XR - Mixed Reality', image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png' },
    { title: 'Video & Animation', image: '/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png' },
    { title: 'Immersive Data', image: '/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png' },
    { title: 'Games', image: '/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Hero Image Header */}
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop" 
              alt="Digital People"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 z-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 pt-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col justify-center min-h-screen">
              <div 
                ref={heroRef}
                className={`transition-all duration-1000 transform max-w-4xl ${
                  isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Service Title */}
                <h1 className="text-6xl md:text-8xl font-light mb-8 text-white">
                  Digital People
                </h1>
                
                {/* Main Headline */}
                <div className="mb-16">
                  <h2 className="text-4xl md:text-6xl font-light leading-tight">
                    <span className="text-white italic">A new</span><br />
                    <span className="gradient-text font-medium">digital you</span>
                  </h2>
                </div>

                {/* Two Column Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-6">What is a Digital Person?</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Digital People are AI-powered virtual humans that can interact, communicate, and engage with users in incredibly natural ways. They combine photorealistic visuals with advanced artificial intelligence to create authentic human connections in digital spaces.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-6">Digital People are great for...</h3>
                    <div className="space-y-4">
                      {features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                            <div className="w-3 h-3 bg-cyberpunk-cyan rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm font-medium mb-1">{feature.title}</p>
                            <p className="text-gray-400 text-xs">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={featuresRef}
            className={`transition-all duration-1000 transform ${
              isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              <span className="text-white">Capabilities</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-8 rounded-2xl border border-gray-800 bg-gray-900/50">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyberpunk-cyan/20 flex items-center justify-center mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={projectsRef}
            className={`transition-all duration-1000 transform ${
              isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">Our previous Digital People projects</span>
            </h2>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Badge 
                variant="default"
                className="px-6 py-2 text-sm font-medium rounded-full border bg-cyberpunk-magenta text-white border-cyberpunk-magenta"
              >
                All Projects
              </Badge>
              <Badge 
                variant="secondary"
                className="px-6 py-2 text-sm font-medium rounded-full border bg-transparent text-gray-300 border-gray-600 hover:border-cyberpunk-magenta/50"
              >
                Customer Service
              </Badge>
              <Badge 
                variant="secondary"
                className="px-6 py-2 text-sm font-medium rounded-full border bg-transparent text-gray-300 border-gray-600 hover:border-cyberpunk-magenta/50"
              >
                Education
              </Badge>
            </div>

            {projects.map((project, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="text-sm text-cyberpunk-cyan font-medium uppercase">
                    {project.category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="text-cyberpunk-magenta font-semibold">
                    {project.metrics}
                  </div>
                  <Button variant="ghost" className="text-cyberpunk-cyan hover:text-white p-0 h-auto">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Watch the demo
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
                      Explore our {item.title.toLowerCase()} services
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
                Share your idea and we can explore how Digital People can bring your project to new life and create meaningful connections with your audience.
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

export default DigitalPeopleDetail;
