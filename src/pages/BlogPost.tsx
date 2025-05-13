
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Clock, ArrowLeft, Share2, BookmarkPlus, Tag } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Define the BlogPost type to match our Supabase schema
type BlogPost = {
  id: number;
  created_at: string;
  Title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  published_at: string;
  slug: string;
  image_url: string;
  video_url: string | null;
  tags: string[] | null;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error) {
          console.error('Error fetching blog post:', error);
          setError('Failed to load blog post. Please try again later.');
        } else if (data) {
          setPost(data);
          setError(null);
        } else {
          setError('Blog post not found.');
        }
      } catch (err) {
        console.error('Exception fetching blog post:', err);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.Title || 'Blog Post',
        text: post?.excerpt || 'Check out this blog post',
        url: window.location.href,
      })
      .catch((err) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Blog post link copied to clipboard.",
      });
    }
  };
  
  const handleBookmark = () => {
    toast({
      title: "Post saved!",
      description: "Blog post saved to your bookmarks.",
    });
  };
  
  // Add CSS for the rich text content
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .rich-text-content h1 { 
        font-size: 2.25rem;
        font-weight: 700;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
      }
      .rich-text-content h2 {
        font-size: 1.875rem;
        font-weight: 700;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
      }
      .rich-text-content h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
      }
      .rich-text-content p {
        margin-bottom: 1rem;
      }
      .rich-text-content ul, .rich-text-content ol {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
      }
      .rich-text-content ul {
        list-style-type: disc;
      }
      .rich-text-content ol {
        list-style-type: decimal;
      }
      .rich-text-content a {
        color: #38bdf8;
        text-decoration: underline;
      }
      .rich-text-content img {
        max-width: 100%;
        height: auto;
        margin: 1.5rem 0;
      }
      .rich-text-content blockquote {
        border-left: 4px solid #38bdf8;
        padding-left: 1rem;
        font-style: italic;
        margin: 1.5rem 0;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-cyberpunk-cyan mb-8 hover:text-cyberpunk-magenta transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all articles
          </Link>
          
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 bg-gray-800" />
              <Skeleton className="h-6 w-1/2 bg-gray-800" />
              <Skeleton className="h-96 w-full bg-gray-800" />
              <Skeleton className="h-6 w-full bg-gray-800" />
              <Skeleton className="h-6 w-full bg-gray-800" />
              <Skeleton className="h-6 w-3/4 bg-gray-800" />
            </div>
          ) : error ? (
            <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 p-8 text-center">
              <h2 className="text-xl text-cyberpunk-magenta mb-4">{error}</h2>
              <Link 
                to="/blog" 
                className="inline-flex items-center px-4 py-2 border border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan hover:text-black transition-colors rounded-md"
              >
                Return to Blog
              </Link>
            </Card>
          ) : post && (
            <>
              <div className="mb-6">
                <span className="bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.Title}</h1>
              
              <div className="flex items-center mb-8 text-sm text-gray-400">
                <CalendarIcon size={16} className="mr-1" />
                <span className="mr-2">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="mx-2">·</span>
                <Clock size={16} className="mr-1" />
                <span>{post.read_time}</span>
              </div>
              
              <div className="mb-8 border-y border-gray-800 py-4 flex justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleShare} 
                    className="flex items-center text-gray-400 hover:text-cyberpunk-cyan transition-colors"
                  >
                    <Share2 size={18} className="mr-2" />
                    <span>Share</span>
                  </button>
                  <button 
                    onClick={handleBookmark} 
                    className="flex items-center text-gray-400 hover:text-cyberpunk-cyan transition-colors"
                  >
                    <BookmarkPlus size={18} className="mr-2" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Featured image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={post.image_url} 
                    alt={post.Title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <Tag size={16} className="text-cyberpunk-cyan" />
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-gray-300 mb-8 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div 
                  className="rich-text-content text-gray-200 leading-relaxed space-y-6" 
                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
              </div>
              
              {/* Embedded Video */}
              {post.video_url && (
                <div className="mt-8 mb-12">
                  <h3 className="text-xl font-bold mb-4">Related Video</h3>
                  <div className="rounded-lg overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        src={post.video_url}
                        title="Video content"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </AspectRatio>
                  </div>
                </div>
              )}
              
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <p className="text-cyberpunk-cyan">Future enhancement: Display related articles here</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
