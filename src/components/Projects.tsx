
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play } from 'lucide-react';

// Project data structure
const projectsData = [
  {
    id: 1,
    title: "Virtual Reality Medical Training",
    description: "Immersive VR solution for medical professionals to practice surgical procedures in a risk-free virtual environment.",
    image: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Interactive Patient Education App",
    description: "Mobile application that educates patients about their conditions and treatments using interactive 3D visualizations.",
    image: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3, 
    title: "Pharmaceutical Research Dashboard",
    description: "Data visualization platform for pharmaceutical researchers to track clinical trials and analyze results in real-time.",
    image: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Healthcare Professional Training Portal",
    description: "Comprehensive online platform for continuous education and certification for healthcare professionals.",
    image: "/lovable-uploads/51402e45-82fe-473e-9b47-d98d4c45bd2f.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Medical Device Instruction System",
    description: "Interactive tutorials and guides for medical device operation, improving safety and efficiency in clinical settings.",
    image: "/lovable-uploads/cdfd6c76-4c8c-4f11-a613-e12558868db7.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "AR-Powered Anatomy Learning Tool",
    description: "Augmented reality application that helps medical students visualize and understand human anatomy in 3D space.",
    image: "/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  }
];

const Projects = () => {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">OUR WORK</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Featured </span>
              <span className="gradient-text">Projects</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of innovative digital solutions designed to transform 
              pharmaceutical education and patient engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    videoUrl: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { isVisible, elementRef } = useScrollAnimation();
  
  return (
    <Card 
      ref={elementRef}
      className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group"
      style={{ 
        transitionDelay: `${index * 150}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 700ms ease, transform 700ms ease'
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
          {project.title}
        </h4>
        <p className="text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full border border-cyberpunk-magenta bg-transparent text-cyberpunk-magenta hover:bg-cyberpunk-magenta/10">
              <Play className="mr-2 h-4 w-4" />
              Watch Project Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <div className="mt-2">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={project.videoUrl}
                  className="rounded-md w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Video for ${project.title}`}
                />
              </AspectRatio>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Projects;
