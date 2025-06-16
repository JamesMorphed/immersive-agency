import React, { useEffect, useState, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, BookOpen, Calendar, Clock, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';

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

const CATEGORIES = [
  { value: 'news-insights', label: 'News & Insights' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'podcasts', label: 'Podcasts' },
  { value: 'tech-trends', label: 'Tech & Trends' },
  { value: 'our-work', label: 'Our Work' },
];

const BlogPage = () => {
  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isFeaturedVisible, elementRef: featuredRef } = useScrollAnimation();
  const { isVisible: isGridVisible, elementRef: gridRef } = useScrollAnimation();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [regularPosts, setRegularPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Fetch blog posts from Supabase
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.error('Error fetching blog posts:', error);
        } else if (data && data.length > 0) {
          setBlogPosts(data);
          setFeaturedPost(data[0]);
          setRegularPosts(data.slice(1));
        } else {
          setBlogPosts([]);
          setFeaturedPost(null);
          setRegularPosts([]);
        }
      } catch (err) {
        console.error('Exception fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  // Filter and search logic
  const filteredPosts = Array.isArray(regularPosts)
    ? regularPosts.filter(post => {
        if (selectedCategory && post.category !== selectedCategory) return false;
        if (!searchTerm) return true;
        return (
          post.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  // Only show dropdown if user has typed something
  const showDropdown = searchTerm.trim().length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterOpen]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Command Palette Search Bar above OUR INSIGHTS (commented out for now) */}
          {/**
          <div className="flex justify-end mb-2">
            <div className="w-full md:w-96">
              <Command shouldFilter={false} className="bg-black/80 border border-gray-700 rounded-lg shadow-lg">
                <CommandInput
                  placeholder="Search insights..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  className="text-white bg-transparent"
                />
                {showDropdown ? (
                  <CommandList className="bg-black/90">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.slice(0, 10).map(post => (
                        <CommandItem
                          key={post.id}
                          onSelect={() => navigate(`/blog/${post.slug}`)}
                          className="flex items-center gap-4 cursor-pointer hover:bg-cyberpunk-magenta/20"
                        >
                          <img src={post.image_url} alt={post.Title} className="w-12 h-12 object-cover rounded-md border border-gray-800" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate text-white">{post.Title}</div>
                            <div className="text-xs text-gray-400 truncate">{post.excerpt}</div>
                          </div>
                          {post.category && (
                            <span className="ml-2 px-2 py-0.5 rounded bg-cyberpunk-magenta text-xs text-white font-bold">{post.category}</span>
                          )}
                        </CommandItem>
                      ))
                    ) : (
                      <CommandEmpty>No insights found.</CommandEmpty>
                    )}
                  </CommandList>
                ) : null}
              </Command>
            </div>
          </div>
          */}
          {/* Header Section */}
          <div 
            ref={titleRef}
            className={`mb-16 text-center transition-all duration-1000 transform ${
              isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">OUR INSIGHTS</h2>
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
            <h3 className="text-2xl font-bold mb-8 border-l-4 border-cyberpunk-cyan pl-4">Latest Insight</h3>
            
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
            ) : featuredPost ? (
              <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                    <img 
                      src={featuredPost.image_url} 
                      alt={featuredPost.Title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-cyberpunk-magenta/80 text-white text-xs px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4 text-sm text-gray-400">
                      <span className="font-medium text-white">{featuredPost.author}</span>
                      <span className="mx-2">·</span>
                      <Calendar size={16} className="mr-1" />
                      <span>{new Date(featuredPost.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <span className="mx-2">·</span>
                      <Clock size={16} className="mr-1" />
                      <span>{featuredPost.read_time}</span>
                    </div>
                    
                    <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                      {featuredPost.Title}
                    </h4>
                    
                    <p className="text-gray-400 mb-8">
                      {featuredPost.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${featuredPost.slug}`}
                      className="border border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan/10 px-4 py-2 rounded flex items-center w-fit mt-auto"
                    >
                      View Insight
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="text-center text-gray-400 py-12">No insights found.</div>
            )}
          </div>
          
          {/* Blog Grid Section - always visible */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h3 className="text-2xl font-bold border-l-4 border-cyberpunk-cyan pl-4 mb-4 md:mb-0">Recent Insights</h3>
            {/* Category Filter Dropdown */}
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <div className="relative inline-block text-left" ref={filterRef}>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-cyberpunk-magenta shadow-sm px-4 py-2 bg-black text-sm font-medium text-cyberpunk-magenta hover:bg-cyberpunk-magenta hover:text-black focus:outline-none focus:ring-2 focus:ring-cyberpunk-magenta"
                  id="category-menu"
                  aria-haspopup="true"
                  aria-expanded={filterOpen}
                  onClick={() => setFilterOpen((open) => !open)}
                >
                  {selectedCategory ? (CATEGORIES.find(c => c.value === selectedCategory)?.label || 'All Categories') : 'All Categories'}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                {filterOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                    <div className="py-1">
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${!selectedCategory ? 'text-cyberpunk-magenta font-bold' : 'text-white'}`}
                        onClick={() => { setSelectedCategory(''); setFilterOpen(false); }}
                      >
                        All Categories
                      </button>
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.value}
                          className={`block w-full text-left px-4 py-2 text-sm ${selectedCategory === cat.value ? 'text-cyberpunk-magenta font-bold' : 'text-white'}`}
                          onClick={() => { setSelectedCategory(cat.value); setFilterOpen(false); }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? renderSkeletons() : filteredPosts.length > 0 ? filteredPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-cyberpunk-cyan overflow-hidden group"
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
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                    <span className="mx-2">·</span>
                    <Clock size={16} className="mr-1" />
                    <span>{post.read_time}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white group-hover:text-cyberpunk-cyan transition-colors duration-300">
                    {post.Title}
                  </h4>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="border border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan/10 px-4 py-2 rounded flex items-center w-fit mt-auto"
                  >
                    View Insight
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </Card>
            )) : (
              <div className="text-center text-gray-400 py-12">No insights found.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;