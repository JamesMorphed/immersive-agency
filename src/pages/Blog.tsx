import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Define the BlogPost type to match our Supabase schema
type BlogPost = {
  id: number;
  created_at: string;
  Title: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string;
  category: string;
  read_time: string;
  published_at: string;
  slug: string;
};

const blogPosts = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    Title: "The Future of Immersive Learning in Healthcare",
    excerpt: "Exploring how VR and AR are transforming medical education and patient care experiences through realistic simulations and interactive training modules.",
    date: "May 6, 2025",
    content: "",
    author: "Dr. Sarah Chen",
    image_url: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
    category: "Virtual Reality",
    read_time: "8 min read",
    published_at: new Date().toISOString(),
    slug: "future-immersive-learning-healthcare"
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    Title: "AI-Powered Patient Education: Case Studies",
    excerpt: "How pharmaceutical companies are leveraging artificial intelligence to improve patient understanding and adherence through personalized educational content.",
    date: "April 28, 2025",
    content: "",
    author: "Michael Rodriguez",
    image_url: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
    category: "Artificial Intelligence",
    read_time: "6 min read",
    published_at: new Date().toISOString(),
    slug: "ai-powered-patient-education"
  },
  {
    id: 3,
    created_at: new Date().toISOString(),
    Title: "Interactive 3D Models in Medical Training",
    excerpt: "Breaking down complex procedures through interactive visualization technology that allows students to explore anatomical structures in unprecedented detail.",
    date: "April 15, 2025",
    content: "",
    author: "Dr. James Wilson",
    image_url: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
    category: "3D Technology",
    read_time: "5 min read",
    published_at: new Date().toISOString(),
    slug: "interactive-3d-models-medical-training"
  },
  {
    id: 4,
    created_at: new Date().toISOString(),
    Title: "Enhancing Patient Communication with XR",
    excerpt: "How extended reality is bridging the gap between complex medical information and patient comprehension in clinical settings.",
    date: "April 2, 2025",
    content: "",
    author: "Emma Thompson",
    image_url: "/lovable-uploads/61b09af8-feee-4583-aaa1-1b782e76c76e.png",
    category: "Extended Reality",
    read_time: "7 min read",
    published_at: new Date().toISOString(),
    slug: "enhancing-patient-communication-xr"
  },
  {
    id: 5,
    created_at: new Date().toISOString(),
    Title: "Data Visualization Trends in Pharmaceutical Research",
    excerpt: "New approaches to visualizing complex datasets that are accelerating discoveries and improving decision-making in drug development.",
    date: "March 22, 2025",
    content: "",
    author: "Dr. Robert Chang",
    image_url: "/lovable-uploads/753996d7-1824-47d4-965a-34455cb82c44.png",
    category: "Data Science",
    read_time: "4 min read",
    published_at: new Date().toISOString(),
    slug: "data-visualization-trends-pharmaceutical-research"
  },
  {
    id: 6,
    created_at: new Date().toISOString(),
    Title: "Gamification Elements in Medical Education",
    excerpt: "Examining how game-based learning principles are increasing engagement and knowledge retention in healthcare training programs.",
    date: "March 10, 2025",
    content: "",
    author: "Sophia Martinez",
    image_url: "/lovable-uploads/25052a8d-9aa8-4923-8e7d-e35ff888af78.png",
    category: "Educational Technology",
    read_time: "6 min read",
    published_at: new Date().toISOString(),
    slug: "gamification-elements-medical-education"
  }
];

const BlogPage = () => {
  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isFeaturedVisible, elementRef: featuredRef } = useScrollAnimation();
  const { isVisible: isGridVisible, elementRef: gridRef } = useScrollAnimation();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [regularPosts, setRegularPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from Supabase
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching blog posts:', error);
          toast({
            variant: "destructive",
            title: "Error loading blog posts",
            description: "Please try again later.",
          });
        } else if (data && data.length > 0) {
          setBlogPosts(data);
          
          // Set the first post as featured
          setFeaturedPost(data[0]);
          
          // Set the rest as regular posts
          setRegularPosts(data.slice(1));
        }
      } catch (err) {
        console.error('Exception fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlogPosts();
  }, []);

  // If we have no data yet, use the placeholder data from the original component
  const placeholderPosts = [
    {
      id: 1,
      created_at: new Date().toISOString(),
      Title: "The Future of Immersive Learning in Healthcare",
      excerpt: "Exploring how VR and AR are transforming medical education and patient care experiences through realistic simulations and interactive training modules.",
      date: "May 6, 2025",
      content: "",
      author: "Dr. Sarah Chen",
      image_url: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
      category: "Virtual Reality",
      read_time: "8 min read",
      published_at: new Date().toISOString(),
      slug: "future-immersive-learning-healthcare"
    },
    {
      id: 2,
      created_at: new Date().toISOString(),
      Title: "AI-Powered Patient Education: Case Studies",
      excerpt: "How pharmaceutical companies are leveraging artificial intelligence to improve patient understanding and adherence through personalized educational content.",
      date: "April 28, 2025",
      content: "",
      author: "Michael Rodriguez",
      image_url: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
      category: "Artificial Intelligence",
      read_time: "6 min read",
      published_at: new Date().toISOString(),
      slug: "ai-powered-patient-education"
    },
    // ... keep the rest of the placeholder posts
  ];

  // Use real data or fall back to placeholders
  const displayFeaturedPost = featuredPost || placeholderPosts[0];
  const displayRegularPosts = regularPosts.length > 0 ? regularPosts : placeholderPosts.slice(1);

  // Render loading skeletons while fetching data
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, i) => (
      <Card key={i} className="bg-black/60 backdrop-blur-sm border border-gray-800 overflow-hidden">
        <div className="h-48">
          <Skeleton className="h-full w-full bg-gray-800" />
        </div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-1/4 bg-gray-800" />
          <Skeleton className="h-6 w-3/4 bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-1/2 bg-gray-800" />
        </div>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div 
            ref={titleRef}
            className={`mb-16 text-center transition-all duration-1000 transform ${
              isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">OUR BLOG</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Immersive </span>
              <span className="gradient-text">Insights</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our latest thoughts on emerging technologies and innovations transforming the pharmaceutical education landscape.
            </p>
          </div>
          
          {/* Featured Post Section */}
          <div 
            ref={featuredRef}
            className={`mb-16 transition-all duration-1000 transform ${
              isFeaturedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-8 border-l-4 border-cyberpunk-magenta pl-4">Latest Article</h3>
            
            {loading ? (
              <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <Skeleton className="h-[400px] bg-gray-800" />
                  <div className="p-8 space-y-6">
                    <Skeleton className="h-6 w-1/3 bg-gray-800" />
                    <Skeleton className="h-10 w-3/4 bg-gray-800" />
                    <Skeleton className="h-24 w-full bg-gray-800" />
                    <Skeleton className="h-10 w-1/3 bg-gray-800" />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                    <img 
                      src={displayFeaturedPost.image_url} 
                      alt={displayFeaturedPost.Title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">
                      {displayFeaturedPost.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4 text-sm text-gray-400">
                      <span className="font-medium text-white">{displayFeaturedPost.author}</span>
                      <span className="mx-2">·</span>
                      <Calendar size={16} className="mr-1" />
                      <span>{new Date(displayFeaturedPost.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <span className="mx-2">·</span>
                      <Clock size={16} className="mr-1" />
                      <span>{displayFeaturedPost.read_time}</span>
                    </div>
                    
                    <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                      {displayFeaturedPost.Title}
                    </h4>
                    
                    <p className="text-gray-400 mb-8">
                      {displayFeaturedPost.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${displayFeaturedPost.slug}`}
                      className="border border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan/10 px-4 py-2 rounded flex items-center w-fit mt-auto"
                    >
                      Read Full Article
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* Blog Grid Section */}
          <div 
            ref={gridRef}
            className={`transition-all duration-1000 transform ${
              isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-8 border-l-4 border-cyberpunk-cyan pl-4">Recent Articles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loading ? renderSkeletons() : displayRegularPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group"
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    opacity: isGridVisible ? 1 : 0,
                    transform: isGridVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 700ms ease, transform 700ms ease'
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.Title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3 text-sm text-gray-400">
                      <BookOpen size={16} className="mr-2" />
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <span className="mx-2">·</span>
                      <span>{post.read_time}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300 line-clamp-2">
                      {post.Title}
                    </h4>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="flex items-center text-cyberpunk-cyan font-medium group-hover:text-cyberpunk-magenta transition-colors duration-300"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-16">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="border border-gray-800 hover:border-cyberpunk-cyan bg-black text-white" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="bg-cyberpunk-magenta border-cyberpunk-magenta text-white">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="border-gray-800 hover:border-cyberpunk-cyan bg-black text-white">
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="border-gray-800 hover:border-cyberpunk-cyan bg-black text-white">
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="border border-gray-800 hover:border-cyberpunk-cyan bg-black text-white" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
