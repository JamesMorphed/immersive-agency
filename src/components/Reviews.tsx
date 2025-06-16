
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";

const Reviews = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jesper Landberg",
      role: "Creative Developer",
      content: "OSAP it can be tricky to navigation concepts to real-tennis and lila have with this treasure-niques. There's yone here, grab-and-go p jumping off point. This OSAP stamp of approval.",
      avatar: "/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png"
    },
    {
      id: 2,
      name: "Jordan Gilroy",
      role: "Web Designer", 
      content: "The creative developer's cheat code. Osmo is a one-stop shop, offering everything from snippets to help you set up your site to advanced animations and interactions that elevate it to the next level. The resources are so easy to implement, and with some imagination, you can adapt them to create something unique.",
      avatar: "/lovable-uploads/500f43d3-618c-46a4-a399-9dbac3ed7eb3.png"
    },
    {
      id: 3,
      name: "Erwin Luijendijk",
      role: "Cut The Code",
      content: "Osmo Supply is a gem for clever and well-thought-out code/no-code solutions for animations and components. 'Even I' came across a few neat tricks I hadn't seen before. It's a resource both beginners and seasoned pros will find incredibly useful. Lama stamp of approval on this one, and I'll deffo be coming back to it!",
      avatar: "/lovable-uploads/8e763063-9744-464b-acc0-bd9b621df7ac.png"
    },
    {
      id: 4,
      name: "Bino Tri",
      role: "Webflow Developer",
      content: "The Osmo Vault is a must-have for freelancers and agencies. It saves you a tremendous amount of time, delivers exceptional quality, and enhances creativity in your projects.",
      avatar: "/lovable-uploads/a5e7e3f9-7c95-4cda-bfe3-91d86c44387b.png"
    }
  ];

  const trustedByAvatars = [
    "/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png",
    "/lovable-uploads/500f43d3-618c-46a4-a399-9dbac3ed7eb3.png",
    "/lovable-uploads/8e763063-9744-464b-acc0-bd9b621df7ac.png",
    "/lovable-uploads/a5e7e3f9-7c95-4cda-bfe3-91d86c44387b.png",
    "/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png",
    "/lovable-uploads/fea9bd6d-520b-4876-8837-51cfff8d38f1.png",
    "/lovable-uploads/82dd739a-c698-4e53-9c0d-cf65f9a0e55a.png",
    "/lovable-uploads/327266b3-5b53-410c-a2bc-07c8212d93ee.png",
    "/lovable-uploads/43322700-8af4-44cc-97f2-3d09e6482f5e.png",
    "/lovable-uploads/51402e45-82fe-473e-9b47-d98d4c45bd2f.png"
  ];

  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToTestimonial = (avatarSrc: string) => {
    // Find the matching testimonial based on avatar
    const testimonialIndex = testimonials.findIndex(testimonial => testimonial.avatar === avatarSrc);
    
    if (testimonialIndex !== -1 && testimonialRefs.current[testimonialIndex]) {
      testimonialRefs.current[testimonialIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Trusted by section */}
        <div className="text-center mb-16">
          <h3 className="text-lg font-medium text-gray-400 mb-8">Trusted by:</h3>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {trustedByAvatars.map((avatar, index) => (
              <Avatar 
                key={index} 
                className="w-12 h-12 ring-2 ring-gray-800 hover:ring-gray-600 transition-all cursor-pointer hover:scale-110 transform"
                onClick={() => scrollToTestimonial(avatar)}
              >
                <AvatarImage src={avatar} alt={`Trusted by ${index + 1}`} />
                <AvatarFallback className="bg-gray-800 text-gray-400">
                  {String.fromCharCode(65 + index)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              ref={(el) => (testimonialRefs.current[index] = el)}
              className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <CardContent className="p-6">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gray-800 text-gray-400">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
