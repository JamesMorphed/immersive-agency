import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TeamSection = () => {
  // Team members data with new images
  const teamMembers = [
    {
      name: "Jane Smith",
      title: "Creative Director",
      bio: "Responsible for spearheading our creativity and innovation across our immersive experiences.",
      image: "/lovable-uploads/a5e7e3f9-7c95-4cda-bfe3-91d86c44387b.png",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "John Davis",
      title: "Lead Designer",
      bio: "Drives our creative vision from concept to execution, focusing on immersive user experiences.",
      image: "/lovable-uploads/82dd739a-c698-4e53-9c0d-cf65f9a0e55a.png",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "Emily Johnson",
      title: "Product Manager",
      bio: "Ensures seamless delivery of products by managing the development process from concept to delivery.",
      image: "/lovable-uploads/500f43d3-618c-46a4-a399-9dbac3ed7eb3.png",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "Michael Brown",
      title: "Technical Lead",
      bio: "Leads our engineering team to build robust and scalable foundations for our immersive projects.",
      image: "/lovable-uploads/25f3beb7-03a1-48ee-9a1f-28431d852fe6.png",
      socials: {
        linkedin: "#"
      }
    },
    {
      name: "Sarah Lee",
      title: "UX/UI Designer",
      bio: "Crafts user-centered designs that deliver exceptional digital experiences across all platforms.",
      image: "/lovable-uploads/8e763063-9744-464b-acc0-bd9b621df7ac.png",
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
    <section id="team" className="py-16 bg-black">
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
                  <AvatarImage 
                    src={member.image} 
                    alt={member.name}
                    className="object-cover object-center scale-110"
                    style={{
                      objectPosition: 'center 20%'
                    }}
                  />
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
