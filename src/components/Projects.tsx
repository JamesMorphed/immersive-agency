import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Project data structure
const projectsData = [
  {
    id: 1,
    title: "Virtual Reality Medical Training",
    description: "Immersive VR solution for medical professionals to practice surgical procedures in a risk-free virtual environment.",
    image: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "3D",
    size: "large",
  },
  {
    id: 2,
    title: "Interactive Patient Education App",
    description: "Mobile application that educates patients about their conditions and treatments using interactive 3D visualizations.",
    image: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "App",
    size: "medium",
  },
  {
    id: 3, 
    title: "Pharmaceutical Research Dashboard",
    description: "Data visualization platform for pharmaceutical researchers to track clinical trials and analyze results in real-time.",
    image: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "Design",
    size: "medium",
  },
  {
    id: 4,
    title: "Healthcare Professional Training Portal",
    description: "Comprehensive online platform for continuous education and certification for healthcare professionals.",
    image: "/lovable-uploads/51402e45-82fe-473e-9b47-d98d4c45bd2f.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "Web",
    size: "large", // Changed from small to large
    featured: true, // Added a featured flag for the second row project
  },
  {
    id: 5,
    title: "Medical Device Instruction System",
    description: "Interactive tutorials and guides for medical device operation, improving safety and efficiency in clinical settings.",
    image: "/lovable-uploads/cdfd6c76-4c8c-4f11-a613-e12558868db7.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "3D",
    size: "large",
  },
  {
    id: 6,
    title: "AR-Powered Anatomy Learning Tool",
    description: "Augmented reality application that helps medical students visualize and understand human anatomy in 3D space.",
    image: "/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "AR",
    size: "medium",
  }
];

const Projects = () => {
  const { isVisible, elementRef } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.type.toLowerCase() === activeFilter.toLowerCase());

  // Separate the featured project from the others
  const featuredProject = filteredProjects.find(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              WORK
            </h1>
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveFilter}>
              <TabsList className="bg-transparent h-auto p-0 space-x-4">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:decoration-2 px-0 hover:text-gray-300"
                >
                  All work
                </TabsTrigger>
                <TabsTrigger 
                  value="3d" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:decoration-2 px-0 hover:text-gray-300"
                >
                  3D
                </TabsTrigger>
                <TabsTrigger 
                  value="ar" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:decoration-2 px-0 hover:text-gray-300"
                >
                  AR/VR
                </TabsTrigger>
                <TabsTrigger 
                  value="design" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:decoration-2 px-0 hover:text-gray-300"
                >
                  Design
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>
        
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* First row of projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 mb-2">
            {regularProjects.slice(0, 3).map((project) => (
              <ProjectItem 
                key={project.id}
                project={project}
              />
            ))}
          </div>

          {/* Second row with featured project */}
          {featuredProject && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mb-2">
              <div className="lg:col-span-12">
                <ProjectItem 
                  key={featuredProject.id}
                  project={featuredProject}
                  isFeatured={true}
                />
              </div>
            </div>
          )}

          {/* Third row of projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2">
            {regularProjects.slice(3).map((project) => (
              <ProjectItem 
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ProjectItem Component
interface ProjectItemProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    videoUrl: string;
    type: string;
    size: string;
    featured?: boolean;
  };
  isFeatured?: boolean;
}

const ProjectItem = ({ project, isFeatured = false }: ProjectItemProps) => {
  const { isVisible, elementRef } = useScrollAnimation();
  
  // Determine grid column span based on size
  const gridClass = {
    small: "lg:col-span-4",
    medium: "lg:col-span-6",
    large: "lg:col-span-12", 
  }[project.size] || "lg:col-span-6";
  
  return (
    <div 
      ref={elementRef}
      className={cn(
        "group relative overflow-hidden transition-all duration-500", 
        gridClass
      )}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 700ms ease'
      }}
    >
      <Dialog>
        <DialogTrigger className="w-full block">
          <div className="relative">
            <AspectRatio 
              ratio={isFeatured || project.size === "large" ? 16/9 : 4/3} 
              className="bg-gray-900 overflow-hidden"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </AspectRatio>
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
              <div>
                <h3 className="text-lg font-medium text-white">{project.title}</h3>
              </div>
              <div className="text-xs text-gray-400">0{project.id}</div>
            </div>
          </div>
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
    </div>
  );
};

export default Projects;
