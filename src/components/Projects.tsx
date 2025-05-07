
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    eyebrow: "IMMERSIVE TRAINING",
    title: "NeuroCHEM VR",
    description: "An interactive VR experience that allows HCPs to visualize and understand complex neurochemical interactions in a revolutionary way.",
    image: "https://images.unsplash.com/photo-1633876561041-667744bc7f1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    eyebrow: "AI EDUCATION",
    title: "PharmaTutor AI",
    description: "AI-driven education platform that adapts to individual learning patterns to optimize training efficiency for pharmaceutical sales teams.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    eyebrow: "DIGITAL EXPERIENCE",
    title: "MoleculeX",
    description: "Interactive 3D visualization tool that brings molecular structures to life, allowing HCPs to explore drug interactions at a granular level.",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black to-cyberpunk-dark-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyberpunk-cyan text-xl font-medium mb-3">OUR WORK</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured</span> 
            <span className="neon-text-magenta"> Projects</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how we've helped pharmaceutical companies revolutionize their educational approach and product launches
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-cyberpunk-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`absolute inset-0 border-2 ${
                  index % 2 === 0 ? 'border-cyberpunk-magenta' : 'border-cyberpunk-cyan'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-95`}></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <p className={`text-sm font-bold ${
                  index % 2 === 0 ? 'text-cyberpunk-magenta' : 'text-cyberpunk-cyan'
                }`}>
                  {project.eyebrow}
                </p>
                <h4 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h4>
                <p className="text-gray-400">{project.description}</p>
                <Button 
                  variant="ghost" 
                  className={`pl-0 hover:bg-transparent ${
                    index % 2 === 0 ? 'text-cyberpunk-magenta hover:text-cyberpunk-magenta/80' : 'text-cyberpunk-cyan hover:text-cyberpunk-cyan/80'
                  }`}
                >
                  View Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            className="bg-cyberpunk-cyan hover:bg-cyberpunk-cyan/80 text-black font-bold px-8 py-6"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
