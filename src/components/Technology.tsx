import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
const technologies = [{
  title: "Artificial Intelligence",
  description: "Our AI systems adapt and learn from user interactions to create increasingly effective educational experiences.",
  icon: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png" // AI icon
}, {
  title: "Virtual Reality",
  description: "Create immersive, hands-on training environments that simulate real-world scenarios for enhanced learning retention.",
  icon: "/lovable-uploads/8e0b70f4-ab04-4e04-907b-1471d03875ba.png" // VR icon
}, {
  title: "Augmented Reality",
  description: "Overlay digital information onto physical materials to enhance understanding of product features and benefits.",
  icon: "/lovable-uploads/cdfd6c76-4c8c-4f11-a613-e12558868db7.png" // AR icon
}, {
  title: "Interactive 3D",
  description: "Dynamic 3D models that can be manipulated to explore pharmaceutical compounds from every possible angle.",
  icon: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png" // 3D icon
}];
const Technology = () => {
  const {
    isVisible: isTextVisible,
    elementRef: textRef
  } = useScrollAnimation();
  const {
    isVisible: isSliderVisible,
    elementRef: sliderRef
  } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  return <section id="technology" className="py-20 bg-gradient-to-b from-cyberpunk-dark-blue to-black relative overflow-hidden">
      {/* Dynamic animated grid background with pulsing effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full dynamic-perspective-grid"></div>
      </div>
      
      {/* Additional floating particles for more dynamism */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="floating-particles"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={textRef} className={`text-center mb-16 transition-all duration-1000 transform ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">WHAT WE DO</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Cutting-Edge</span>{' '}
            <span className="gradient-text">Technology</span>
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We leverage the latest advancements in immersive technology and artificial intelligence to 
            create memorable educational experiences that drive understanding and retention.
          </p>
        </div>

        <div ref={sliderRef} className={`transition-all duration-1000 transform ${isSliderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel className="w-full" opts={{
          align: "start",
          loop: true
        }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {technologies.map((tech, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className={cn("bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan transition-all duration-500 p-6 h-full group relative overflow-hidden", current === index ? "border-cyberpunk-magenta shadow-lg shadow-cyberpunk-magenta/20" : "")}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyberpunk-cyan/5 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="mb-6 flex justify-center">
                        <img src={tech.icon} alt={tech.title} className="custom-icon w-20 h-20 group-hover:filter group-hover:brightness-110" />
                      </div>
                      <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                        {tech.title}
                      </h4>
                      <p className="text-gray-400">
                        {tech.description}
                      </p>
                    </Card>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            
          </Carousel>
        </div>
      </div>
    </section>;
};
export default Technology;