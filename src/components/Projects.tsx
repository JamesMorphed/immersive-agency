
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Projects = () => {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Projects content here */}
    </div>
  );
};

export default Projects;
