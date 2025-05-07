
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedProject = () => {
  return (
    <section className="relative bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/b18971a1-8da3-4e08-9765-335dda7922c3.png" 
              alt="Project Showcase" 
              className="w-full rounded-md shadow-lg border border-cyberpunk-magenta/20"
            />
            <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
              SUPERBOWL PROJECT 2024
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-6">
            <p className="text-cyberpunk-cyan text-lg mb-2">FEATURED INNOVATION</p>
            
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="text-cyberpunk-cyan">Big </span>
              <span className="text-cyberpunk-magenta">header</span>
            </h2>
            
            <h3 className="text-xl text-white mt-4">Headline goes here</h3>
            
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
    </section>
  );
};

export default FeaturedProject;
