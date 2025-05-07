import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const TeamSection = () => {
  // Team members data
  const teamMembers = [{
    name: "Jane Smith",
    title: "Creative Director",
    bio: "Responsible for spearheading our creativity and innovation across our immersive experiences.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=600",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  }, {
    name: "John Davis",
    title: "Lead Designer",
    bio: "Drives our creative vision from concept to execution, focusing on immersive user experiences.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=600&h=600",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  }, {
    name: "Emily Johnson",
    title: "Product Manager",
    bio: "Ensures seamless delivery of products by managing the development process from concept to delivery.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=600",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  }, {
    name: "Michael Brown",
    title: "Technical Lead",
    bio: "Leads our engineering team to build robust and scalable foundations for our immersive projects.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  }, {
    name: "Sarah Lee",
    title: "UX/UI Designer",
    bio: "Crafts user-centered designs that deliver exceptional digital experiences across all platforms.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=600",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  }];

  // Animation for section title
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Animation for team member cards
  const [visibleCards, setVisibleCards] = useState<Array<boolean>>(Array(teamMembers.length).fill(false));
  const cardRefs = useRef<Array<HTMLDivElement | null>>(Array(teamMembers.length).fill(null));
  useEffect(() => {
    // Set up observers for header
    const headerObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsHeaderVisible(true);
        headerObserver.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Set up observers for cards
    const cardObservers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.disconnect();
          }
        }, {
          threshold: 0.1
        });
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
  return;
};
export default TeamSection;