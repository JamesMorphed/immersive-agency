import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Technology = () => {
  const technologies = [
    { name: 'React', icon: '/lovable-uploads/01369c1f-3951-415f-9395-1ca49c9392e7.png' },
    { name: 'Node.js', icon: '/lovable-uploads/43c48816-f49f-4459-a995-9165394b9c1c.png' },
    { name: 'TypeScript', icon: '/lovable-uploads/295741b4-6539-4c45-a194-4823e94965f1.png' },
    { name: 'Next.js', icon: '/lovable-uploads/6999f244-0986-41c6-a578-b39999484344.png' },
    { name: 'Tailwind CSS', icon: '/lovable-uploads/881d9440-e34a-4594-bca1-02994b0a647a.png' },
    { name: 'PostgreSQL', icon: '/lovable-uploads/45c9a0a7-4998-45d9-b949-094948934b21.png' },
    { name: 'MongoDB', icon: '/lovable-uploads/9653809a-6295-404b-b54c-791690b83c0a.png' },
    { name: 'AWS', icon: '/lovable-uploads/c978824a-349b-4999-8990-73799946ca49.png' },
    { name: 'Docker', icon: '/lovable-uploads/1169953a-39a7-4031-b145-50a11f419c96.png' },
    { name: 'Kubernetes', icon: '/lovable-uploads/b905956a-a991-4c39-b9a5-159502095667.png' },
  ];

  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technology Stack
          </h2>
          <p className="text-gray-400 text-lg">
            The core technologies we use to build robust and scalable applications.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={elementRef}
            className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 transition-colors duration-300">
                <img src={tech.icon} alt={tech.name} className="custom-icon mb-2" />
                <p className="text-white font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
