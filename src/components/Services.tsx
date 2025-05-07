
import { Card } from '@/components/ui/card';

const services = [
  {
    title: "AI-Powered Education",
    description: "Interactive learning systems that adapt to individual professional needs for optimal knowledge retention and application.",
    icon: "/lovable-uploads/51402e45-82fe-473e-9b47-d98d4c45bd2f.png", // Brain icon
  },
  {
    title: "Virtual Product Experiences",
    description: "Immersive VR and AR platforms that allow detailed exploration of pharmaceutical products and their mechanisms.",
    icon: "/lovable-uploads/fa655753-27f2-484d-9698-79ee6956f691.png", // VR cube icon
  },
  {
    title: "Advanced HCP Training",
    description: "Interactive scenarios and simulations that prepare healthcare professionals for real-world applications of new treatments.",
    icon: "/lovable-uploads/0cbdeafd-f97e-459a-adea-24a405ef9a4a.png", // Medical icon
  },
  {
    title: "Data Visualization",
    description: "Transform complex clinical data into comprehensible visual narratives that highlight product benefits and outcomes.",
    icon: "/lovable-uploads/ae38a894-938e-4b5c-9d0a-1c1847168a71.png", // Data visualization icon
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
              <div className="mb-5 flex justify-center">
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="custom-icon group-hover:filter group-hover:brightness-110"
                />
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
