
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const InsightsBlog = () => {
  const navigate = useNavigate();
  const { isVisible, elementRef } = useScrollAnimation();

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['featured-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return data;
    },
  });

  const defaultPosts = [
    {
      id: 1,
      Title: "The Future of Healthcare Education",
      excerpt: "How immersive technology is revolutionizing medical training and patient education.",
      image_url: "/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png",
      category: "Healthcare Innovation",
      published_at: "2024-01-15",
      slug: "future-healthcare-education"
    },
    {
      id: 2,
      Title: "AI-Powered Patient Engagement",
      excerpt: "Leveraging artificial intelligence to create personalized healthcare experiences.",
      image_url: "/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png",
      category: "Artificial Intelligence",
      published_at: "2024-01-10",
      slug: "ai-patient-engagement"
    },
    {
      id: 3,
      Title: "Data Visualization in Pharma",
      excerpt: "Transforming complex pharmaceutical data into actionable insights through visualization.",
      image_url: "/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png",
      category: "Data Analytics",
      published_at: "2024-01-05",
      slug: "pharma-data-visualization"
    }
  ];

  const posts = blogPosts && blogPosts.length > 0 ? blogPosts : defaultPosts;

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Insights & Case Studies
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Discover the latest trends, innovations, and success stories in healthcare technology
              </p>
            </div>
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline" 
              className="hidden md:flex items-center text-white border-cyberpunk-magenta hover:bg-cyberpunk-magenta hover:text-black"
            >
              View All Insights
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 700ms ease, transform 700ms ease'
                }}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6">
                  <img 
                    src={post.image_url || '/placeholder.svg'} 
                    alt={post.Title || 'Blog post'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {post.category && (
                    <div className="absolute top-4 left-4 bg-cyberpunk-magenta text-black px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyberpunk-magenta transition-colors duration-300">
                    {post.Title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-cyberpunk-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="flex justify-center mt-12 md:hidden">
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline" 
              className="text-white border-cyberpunk-magenta hover:bg-cyberpunk-magenta hover:text-black"
            >
              View All Insights
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsBlog;
