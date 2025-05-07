
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center grid-lines-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-cyberpunk-cyan text-xl md:text-2xl font-medium mb-4">IMMERSIVE EXPERIENCES</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="neon-text-magenta">NEXT GEN</span> <br />
            <span className="neon-text-cyan">PHARMA SOLUTIONS</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
            Supporting pharmaceutical innovations with cutting-edge AI technology 
            and immersive design solutions that transform education and training.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-cyberpunk-magenta hover:bg-cyberpunk-magenta/80 text-white px-8 py-6 text-lg"
            >
              View Our Work
            </Button>
            <Button 
              variant="outline" 
              className="border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan/20 px-8 py-6 text-lg"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#services" className="text-gray-400 hover:text-white">
          <div className="border-2 border-gray-400 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
