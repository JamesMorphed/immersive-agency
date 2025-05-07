
import { Card } from '@/components/ui/card';

const technologies = [
  {
    title: "Artificial Intelligence",
    description: "Our AI systems adapt and learn from user interactions to create increasingly effective educational experiences.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 1.6.3 2.9.9 4.1.3.5 4.7 7.4 5.8 9a3 3 0 0 0 2.6 0c1.1-1.6 5.5-8.5 5.8-9 .6-1.2.9-2.5.9-4.1a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Virtual Reality",
    description: "Create immersive, hands-on training environments that simulate real-world scenarios for enhanced learning retention.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M12 4l0 4" />
        <path d="M12 16l0 4" />
        <path d="M4 12l4 0" />
        <path d="M16 12l4 0" />
      </svg>
    ),
  },
  {
    title: "Augmented Reality",
    description: "Overlay digital information onto physical materials to enhance understanding of product features and benefits.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.5 8.5l3 -3" />
        <path d="M2 11.5l5 -5" />
        <path d="M15.5 17l-3 3" />
        <path d="M10 19l-7 -7" />
        <path d="M17.5 6.5l3 3" />
        <path d="M14 3.5l5 5" />
        <path d="M8.5 8.5l7 7" />
        <path d="M12 3l9 9h-18z" />
      </svg>
    ),
  },
  {
    title: "Interactive 3D",
    description: "Dynamic 3D models that can be manipulated to explore pharmaceutical compounds from every possible angle.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
        <path d="M2 13.5v5.5l5 3" />
        <path d="M7 16.5l5 -3" />
        <path d="M12 13.5l5 -3" />
        <path d="M17 16.5v-5.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
        <path d="M22 13.5v-5.5l-5 -3" />
      </svg>
    ),
  }
];

const Technology = () => {
  return (
    <section id="technology" className="py-20 bg-gradient-to-b from-cyberpunk-dark-blue to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3">
            <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">OUR TECH</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Cutting-Edge</span> <br />
              <span className="neon-text-cyan">Technology</span>
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

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <Card 
                key={index} 
                className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan transition-all duration-300 p-6 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyberpunk-cyan/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-5 text-cyberpunk-cyan group-hover:text-cyberpunk-magenta transition-colors duration-300">
                  {tech.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                  {tech.title}
                </h4>
                <p className="text-gray-400">
                  {tech.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
