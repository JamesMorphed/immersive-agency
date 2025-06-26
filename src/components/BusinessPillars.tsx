
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusinessPillars = () => {
  const navigate = useNavigate();
  const { isVisible, elementRef } = useScrollAnimation();

  const pillars = [
    {
      id: 1,
      title: "Interactive Studio",
      description: "Immersive VR/AR experiences and interactive content that transforms how audiences engage with your brand.",
      image: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
      link: "/services/interactive-studio"
    },
    {
      id: 2,
      title: "Events Studio",
      description: "Dynamic presentations, conferences, and live experiences that captivate and educate your audience.",
      image: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
      link: "/services/events-studio"
    },
    {
      id: 3,
      title: "AI Studio",
      description: "Cutting-edge artificial intelligence solutions that automate and enhance your digital workflows.",
      image: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
      link: "/services/ai-studio"
    },
    {
      id: 4,
      title: "Creative Development Team",
      description: "Expert developers and designers creating scalable digital solutions for your business needs.",
      image: "/lovable-uploads/51402e45-82fe-473e-9b47-d98d4c45bd2f.png",
      link: "/services/creative-development"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Four Pillars of Innovation
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our integrated approach delivers comprehensive digital solutions across every aspect of your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                onClick={() => navigate(pillar.link)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyberpunk-magenta/20"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 700ms ease, transform 700ms ease'
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                    {pillar.description}
                  </p>
                  <div className="flex items-center text-cyberpunk-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border border-cyberpunk-magenta/0 group-hover:border-cyberpunk-magenta/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPillars;
