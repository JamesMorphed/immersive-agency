import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TeamSection = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Jane Smith",
      title: "Creative Director",
      bio: "Responsible for spearheading our creativity and innovation across our immersive experiences.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=600",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "John Davis",
      title: "Lead Designer",
      bio: "Drives our creative vision from concept to execution, focusing on immersive user experiences.",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=600&h=600",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "Emily Johnson",
      title: "Product Manager",
      bio: "Ensures seamless delivery of products by managing the development process from concept to delivery.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=600",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "Michael Brown",
      title: "Technical Lead",
      bio: "Leads our engineering team to build robust and scalable foundations for our immersive projects.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "Sarah Lee",
      title: "UX/UI Designer",
      bio: "Crafts user-centered designs that deliver exceptional digital experiences across all platforms.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=600",
      socials: {
        linkedin: "#"
      }
    }
  ];

  // Animation for section title
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Animation for team member cards
  const [visibleCards, setVisibleCards] = useState<Array<boolean>>(Array(teamMembers.length).fill(false));
  const cardRefs = useRef<Array<HTMLDivElement | null>>(Array(teamMembers.length).fill(null));

  useEffect(() => {
    // Set up observers for header
    const headerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsHeaderVisible(true);
        headerObserver.disconnect();
      }
    }, { threshold: 0.1 });

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Set up observers for cards
    const cardObservers: IntersectionObserver[] = [];
    
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.disconnect();
          }
        }, { threshold: 0.1 });
        
        observer.observe(ref);
        cardObservers.push(observer);
      }
    });

    // Cleanup
    return () => {
      headerObserver.disconnect();
      cardObservers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div 
          ref={headerRef} 
          className={`mb-12 text-left transition-all duration-1000 transform ${
            isHeaderVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">Our Team</h3>
          <p className="text-gray-400">Meet the talented individuals behind our innovative solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className={`p-6 rounded-lg border border-gray-800 bg-gray-900/50 flex flex-col items-start text-left transition-all duration-700 transform ${
                visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="mb-4">
                <Avatar className="h-20 w-20 border-2 border-cyberpunk-magenta">
                  <AvatarImage src={member.image} alt={member.name} />
                  <User className="h-12 w-12 text-gray-400" />
                </Avatar>
              </div>
              <h4 className="text-xl font-semibold text-white mb-1">{member.name}</h4>
              <p className="text-cyberpunk-magenta mb-3">{member.title}</p>
              <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              <div className="flex space-x-3 mt-auto">
                <a href={member.socials.linkedin} className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
