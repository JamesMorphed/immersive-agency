import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Simplified blogPosts array with slugs for routing
const staticBlogPosts = [
  {
    title: "The Future of Immersive Learning in Healthcare",
    excerpt: "Exploring how VR and AR are transforming medical education and patient care experiences.",
    date: "May 6, 2025",
    image: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
    category: "Virtual Reality",
    slug: "future-immersive-learning-healthcare"
  },
  {
    title: "AI-Powered Patient Education: Case Studies",
    excerpt: "How pharmaceutical companies are leveraging artificial intelligence to improve patient understanding.",
    date: "April 28, 2025",
    image: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
    category: "Artificial Intelligence",
    slug: "ai-powered-patient-education"
  },
  {
    title: "Interactive 3D Models in Medical Training",
    excerpt: "Breaking down complex procedures through interactive visualization technology.",
    date: "April 15, 2025",
    image: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
    category: "3D Technology",
    slug: "interactive-3d-models-medical-training"
  }
];

const CATEGORIES = [
  { value: 'news-insights', label: 'News & Insights' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'podcasts', label: 'Podcasts' },
  { value: 'tech-trends', label: 'Tech & Trends' },
  { value: 'our-work', label: 'Our Work' },
];

const Blog = () => {
  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isCardsVisible, elementRef: cardsRef } = useScrollAnimation();
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);

  useEffect(() => {
    async function fetchBlogPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('Title, excerpt, published_at, image_url, category, slug')
        .order('published_at', { ascending: false })
        .limit(3);
      if (data && data.length > 0) {
        setBlogPosts(
          data.map(post => ({
            title: post.Title || '',
            excerpt: post.excerpt || '',
            date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
            image: post.image_url || '',
            category: post.category || '',
            slug: post.slug || ''
          }))
        );
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`mb-12 text-center transition-all duration-1000 transform ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Latest </span>
            <span className="gradient-text">Insights</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our thoughts on emerging technologies and innovations in the pharmaceutical education space.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {blogPosts.map((post, index) => (
            <Card 
              key={index}
              className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group"
              style={{ 
                transitionDelay: `${index * 150}ms`,
                opacity: isCardsVisible ? 1 : 0,
                transform: isCardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease, transform 700ms ease'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-gray-400">
                  <BookOpen size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                  {post.title}
                </h4>
                <p className="text-gray-400 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="flex items-center text-cyberpunk-cyan font-medium group-hover:text-cyberpunk-magenta transition-colors duration-300"
                >
                  <span>Read Insight</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 border border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan hover:text-black transition-colors duration-300 rounded-md font-medium"
          >
            View All Insights
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
