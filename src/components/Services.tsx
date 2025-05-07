
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const serviceItems = [
    {
      id: 1,
      title: 'Digital Strategy',
      description: 'We craft comprehensive digital strategies tailored to your business goals, helping you navigate the digital landscape with confidence.',
      image: '/lovable-uploads/51402e45-82fe-473e-9b47-d98d4c45bd2f.png'
    },
    {
      id: 2,
      title: 'App Development',
      description: 'Our expert team creates intuitive, high-performance applications that deliver seamless user experiences across all platforms.',
      image: '/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png'
    },
    {
      id: 3,
      title: 'Experience Design',
      description: 'We design immersive digital experiences that captivate your audience and strengthen your brand connection through innovative interfaces.',
      image: '/lovable-uploads/b18971a1-8da3-4e08-9765-335dda7922c3.png'
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-50">Our</span>{' '}
            <span className="text-cyberpunk-magenta">Services</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of digital services designed to elevate your brand and drive meaningful engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((service) => (
            <Card key={service.id} className="bg-black border border-cyberpunk-magenta/20 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-50">{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="border border-cyberpunk-magenta bg-transparent text-cyberpunk-magenta hover:bg-cyberpunk-magenta/10">
                  Read more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
