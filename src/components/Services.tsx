
import { Card } from '@/components/ui/card';

const services = [
  {
    title: "AI-Powered Education",
    description: "Interactive learning systems that adapt to individual professional needs for optimal knowledge retention and application.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a9 9 0 0 1 9 9c0 3.18-1.65 5.92-4.12 7.5" />
        <path d="M12 2v12l6.37 3.18" />
        <path d="M12 2v12L5.63 17.18" />
      </svg>
    ),
  },
  {
    title: "Virtual Product Experiences",
    description: "Immersive VR and AR platforms that allow detailed exploration of pharmaceutical products and their mechanisms.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        <path d="M15 5 19 9" />
      </svg>
    ),
  },
  {
    title: "Advanced HCP Training",
    description: "Interactive scenarios and simulations that prepare healthcare professionals for real-world applications of new treatments.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Data Visualization",
    description: "Transform complex clinical data into comprehensible visual narratives that highlight product benefits and outcomes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 21H3" />
        <path d="M10 4h4v4h-4z" />
        <path d="M3 9h4v4H3z" />
        <path d="M17 14h4v4h-4z" />
      </svg>
    ),
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyberpunk-cyan text-xl font-medium mb-3">OUR SERVICES</h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            <span className="neon-text-magenta">Transformative</span> 
            <span className="text-white"> Solutions</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-black border border-gray-800 hover:border-cyberpunk-magenta transition-all duration-300 p-6 group">
              <div className="mb-5 text-cyberpunk-cyan group-hover:text-cyberpunk-magenta transition-colors duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-magenta transition-colors duration-300">{service.title}</h4>
              <p className="text-gray-400">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
