
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useNavigate } from 'react-router-dom';

const FeaturedProjects = () => {
  const navigate = useNavigate();
  const { isVisible, elementRef } = useScrollAnimation();
  
  const projects = [
    {
      id: 1,
      title: "VR Medical Training Platform",
      description: "Immersive surgical training environment for healthcare professionals",
      image: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
      category: "Healthcare Innovation"
    },
    {
      id: 2,
      title: "AI-Powered Patient Education",
      description: "Interactive learning modules that adapt to individual patient needs",
      image: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
      category: "Digital Health"
    },
    {
      id: 3,
      title: "Pharmaceutical Data Visualization",
      description: "Real-time analytics dashboard for clinical trial management",
      image: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
      category: "Data Analytics"
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
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Showcasing our latest innovations in healthcare technology and digital experiences
              </p>
            </div>
            <Button 
              onClick={() => navigate('/projects')}
              variant="ghost" 
              className="hidden md:flex items-center text-white border border-cyberpunk-magenta hover:bg-cyberpunk-magenta hover:text-black"
            >
              See All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyberpunk-magenta/20"
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
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-cyberpunk-magenta text-sm font-medium mb-2 uppercase tracking-wider">
                    {project.category}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-xl border border-cyberpunk-magenta/0 group-hover:border-cyberpunk-magenta/30 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Mobile See All Button */}
          <div className="flex justify-center mt-12 md:hidden">
            <Button 
              onClick={() => navigate('/projects')}
              variant="ghost" 
              className="text-white border border-cyberpunk-magenta hover:bg-cyberpunk-magenta hover:text-black"
            >
              See All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
