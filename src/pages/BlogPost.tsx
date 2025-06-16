import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Clock, ArrowLeft, Share2, BookmarkPlus, Tag, ChevronLeft, ChevronRight, X, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  image_gallery: string[] | null;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const [podcastUrl, setPodcastUrl] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
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
  
  useEffect(() => {
    if (!post) return;
    // Fetch podcast for this blog post
    supabase
      .from('blog_podcasts')
      .select('mp3_url')
      .eq('blog_id', post.id)
      .single()
      .then(({ data }) => {
        if (data && data.mp3_url) setPodcastUrl(data.mp3_url);
        else setPodcastUrl(null);
      });
  }, [post]);
  
  useEffect(() => {
    if (!post) return;
    async function fetchRelated() {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .neq('id', post.id)
        .order('created_at', { ascending: false });
      if (post.tags && post.tags.length > 0) {
        // Find posts with at least one matching tag or same category
        query = query.or(`category.eq.${post.category},tags.cs.{${post.tags.map(tag => `"${tag}"`).join(',')}}`);
      } else {
        // Only match by category if no tags
        query = query.eq('category', post.category);
      }
      const { data, error } = await query.limit(3);
      if (!error && data) setRelatedPosts(data);
    }
    fetchRelated();
  }, [post]);
  
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
    }
  };
  
  const handleBookmark = () => {
    // No toast notification for bookmarking
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (post?.image_gallery && post.image_gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === post.image_gallery!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (post?.image_gallery && post.image_gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? post.image_gallery!.length - 1 : prev - 1
      );
    }
  };
  
  // Safer function to process content without DOM manipulation issues
  const processContent = (content: string) => {
    if (!content) return '';
    
    // Use regex to replace img tags with wrapped versions
    const processedContent = content.replace(
      /<img([^>]*)>/g, 
      (match, attributes) => {
        return `<div class="my-4"><img${attributes} class="w-full h-auto object-cover rounded-lg" /></div>`;
      }
    );
    
    return processedContent;
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
        margin: 1rem 0;
        border: none;
        box-shadow: none;
      }
      .rich-text-content blockquote {
        border-left: 4px solid #38bdf8;
        padding-left: 1rem;
        font-style: italic;
        margin: 1.5rem 0;
      }
      .aspect-w-16 {
        position: relative;
        padding-bottom: 56.25%;
      }
      .aspect-h-9 {
        position: relative;
      }
      .aspect-w-16 > img, .aspect-h-9 > img {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-cyberpunk-cyan mb-8 hover:text-cyberpunk-magenta transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all insights
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
              {/* Featured image and content wrapper */}
              <div className="max-w-2xl mx-auto">
                {/* Featured image */}
                <div className="rounded-lg overflow-hidden border border-gray-800 shadow-lg">
                  <AspectRatio ratio={16 / 7}>
                    <img 
                      src={post.image_url} 
                      alt={post.Title} 
                      className="w-full h-full object-cover"
                      style={{ minHeight: 0, minWidth: 0 }}
                    />
                  </AspectRatio>
                </div>

                <div className="mb-6 mt-4">
                  <span className="bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
                  {post.Title}
                  {!podcastUrl && (
                    <button
                      type="button"
                      className="ml-2 p-2 rounded-full bg-black/60 hover:bg-cyberpunk-magenta transition-colors border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyberpunk-magenta"
                      aria-label="Listen to podcast"
                      onClick={async () => {
                        if (!post) return;
                        try {
                          const response = await fetch('http://n8n-immersive-insights-dev.captain.digitalpfizer.com/webhook-test/transcribe-blog', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              title: post.Title,
                              excerpt: post.excerpt,
                              content: post.content,
                            }),
                          });
                          if (response.ok) {
                            toast({
                              title: 'Podcast request sent!',
                              description: 'The blog content was sent for transcription.',
                            });
                          } else {
                            toast({
                              title: 'Error',
                              description: 'Failed to send blog content to podcast service.',
                              variant: 'destructive',
                            });
                          }
                        } catch (err) {
                          toast({
                            title: 'Error',
                            description: 'An unexpected error occurred.',
                            variant: 'destructive',
                          });
                        }
                      }}
                    >
                      <Mic size={28} className="text-white" />
                    </button>
                  )}
                </h1>
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

                {/* Content box */}
                <div className="bg-black/80 rounded-lg p-8 mt-2 mb-8 border border-gray-800">
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
                      dangerouslySetInnerHTML={{ __html: processContent(post.content || '') }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Image Gallery */}
              {post.image_gallery && post.image_gallery.length > 0 && (
                <div className="mt-12 mb-8">
                  <h3 className="text-xl font-bold mb-4">Image Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {post.image_gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => openGallery(index)}
                      >
                        <AspectRatio ratio={16/9} className="overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                          <span className="text-white text-sm">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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
                {relatedPosts.length === 0 ? (
                  <p className="text-cyberpunk-cyan">No related articles found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(rp => (
                      <Card key={rp.id} className="bg-black/60 border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group">
                        <Link to={`/blog/${rp.slug}`}> 
                          <div className="relative h-40 overflow-hidden">
                            <img src={rp.image_url} alt={rp.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute top-4 left-4 bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">{rp.category}</div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center mb-2 text-xs text-gray-400">
                              <CalendarIcon size={14} className="mr-1" />
                              <span>{new Date(rp.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">{rp.Title}</h4>
                            <p className="text-gray-400 mb-2 line-clamp-3">{rp.excerpt}</p>
                            <span className="text-cyberpunk-cyan text-xs font-medium">Read More</span>
                          </div>
                        </Link>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Fullscreen Image Gallery */}
      {galleryOpen && post?.image_gallery && post.image_gallery.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-cyberpunk-cyan"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-cyberpunk-cyan"
          >
            <ChevronLeft size={36} />
          </button>
          
          <div className="w-full max-w-4xl">
            <AspectRatio ratio={16/9} className="overflow-hidden">
              <img 
                src={post.image_gallery[currentImageIndex]} 
                alt="Gallery Image"
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-cyberpunk-cyan"
          >
            <ChevronRight size={36} />
          </button>
          
          <div className="absolute bottom-4 text-white">
            {currentImageIndex + 1} / {post.image_gallery.length}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
