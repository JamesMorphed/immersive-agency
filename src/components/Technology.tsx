
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const { isVisible: isTextVisible, elementRef: textRef } = useScrollAnimation();
  const { isVisible: isCardsVisible, elementRef: cardsRef } = useScrollAnimation();

  return <section id="technology" className="py-20 bg-gradient-to-b from-cyberpunk-dark-blue to-black relative">
      {/* White perspective grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full perspective-grid"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          <div 
            ref={textRef}
            className={`w-full md:w-1/3 transition-all duration-1000 transform ${
              isTextVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">WHAT WE DO</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Cutting-Edge</span> <br />
              <span className="gradient-text">Technology</span>
            </h3>
            <p className="text-gray-400 mb-6">
              We leverage the latest advancements in immersive technology and artificial intelligence to 
              create memorable educational experiences that drive understanding and retention.
            </p>
            <p className="text-gray-400">
              Our proprietary platforms combine multiple technologies to deliver seamless, 
              intuitive experiences tailored specifically to the needs of healthcare professionals.
            </p>
          </div>

          <div 
            ref={cardsRef}
            className={`w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 transition-all duration-1000 transform ${
              isCardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {technologies.map((tech, index) => <Card 
                key={index} 
                className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan transition-all duration-300 p-6 group relative overflow-hidden"
                style={{ 
                  transitionDelay: `${200 + (index * 150)}ms`,
                  opacity: isCardsVisible ? 1 : 0,
                  transform: isCardsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 700ms ease, transform 700ms ease'
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyberpunk-cyan/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-5 flex justify-center">
                  <img src={tech.icon} alt={tech.title} className="custom-icon group-hover:filter group-hover:brightness-110" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                  {tech.title}
                </h4>
                <p className="text-gray-400">
                  {tech.description}
                </p>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Technology;
