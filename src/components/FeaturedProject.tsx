
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FeaturedProject = () => {
  const { isVisible: isImageVisible, elementRef: imageRef } = useScrollAnimation();
  const { isVisible: isContentVisible, elementRef: contentRef } = useScrollAnimation();

  return <section className="relative bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div 
            ref={imageRef} 
            className={`relative transition-all duration-1000 transform ${
              isImageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <img alt="Project Showcase" className="w-full rounded-md shadow-lg border border-cyberpunk-magenta/20" src="/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png" />
            <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
              SUPERBOWL PROJECT 2024
            </div>
          </div>
          
          {/* Right side - Content */}
          <div 
            ref={contentRef}
            className={`space-y-6 transition-all duration-1000 transform ${
              isContentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-lg mb-2 text-cyberpunk-magenta">FEATURED INNOVATION</p>
            
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="text-slate-50">Headline here</span>
              
            </h2>
            
            <h3 className="text-xl text-white mt-4 my-[17px]">Headline goes here</h3>
            
            <p className="text-gray-300">
              Put some body copy in here that goes over a few lines to show that there 
              is loads of copy in it. Our innovative solutions blend cutting-edge technology 
              with immersive design to create unforgettable experiences.
            </p>
            
            <Button className="mt-4 border border-cyberpunk-magenta bg-transparent text-cyberpunk-magenta hover:bg-cyberpunk-magenta/10">
              SEE PROJECT
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>;
};
export default FeaturedProject;
