
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BlogPreview = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image_url: '',
    tags: [],
    published_at: new Date(),
    read_time: '',
  });

  // Listen for custom events from the BlogAdminForm
  useEffect(() => {
    const handleFormUpdate = (event: CustomEvent) => {
      setFormData(event.detail);
    };

    // Add event listener
    window.addEventListener('blog-form-update' as any, handleFormUpdate as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('blog-form-update' as any, handleFormUpdate as EventListener);
    };
  }, []);

  // Function to get readable category name
  const getCategoryName = (categorySlug: string) => {
    switch (categorySlug) {
      case 'news-insights': return 'News & Insights';
      case 'case-studies': return 'Case Studies';
      case 'podcasts': return 'Podcasts';
      case 'tech-trends': return 'Tech & Trends';
      case 'our-work': return 'Our Work';
      default: return categorySlug;
    }
  };

  // Safer function to process content without DOM manipulation issues
  const processContent = (content: string) => {
    if (!content) return '';
    
    // Use regex to replace img tags with wrapped versions
    const processedContent = content.replace(
      /<img([^>]*)>/g, 
      (match, attributes) => {
        return `
          <div class="aspect-ratio-wrapper my-6">
            <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img${attributes} class="w-full h-full object-cover" />
            </div>
          </div>
        `;
      }
    );
    
    return processedContent;
  };

  return (
    <div className="sticky top-24">
      <Card className="bg-gray-800 border-gray-700 shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Live Preview
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[800px]">
          {formData.title || formData.content ? (
            <div className="space-y-4">
              {formData.image_url && (
                <div className="mb-4">
                  <AspectRatio ratio={16/9} className="rounded-md overflow-hidden">
                    <img 
                      src={formData.image_url} 
                      alt={formData.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/800x400?text=Preview+Image";
                      }}
                    />
                  </AspectRatio>
                </div>
              )}
              
              <h1 className="text-2xl font-bold">{formData.title || 'Untitled Post'}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-400 gap-3">
                {formData.category && (
                  <span className="bg-gray-700 px-2 py-1 rounded">
                    {getCategoryName(formData.category)}
                  </span>
                )}
                
                {formData.published_at && (
                  <span>{format(formData.published_at, 'MMMM d, yyyy')}</span>
                )}
                
                {formData.read_time && (
                  <span>{formData.read_time}</span>
                )}
              </div>
              
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 my-3">
                  {formData.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-blue-900/40 text-blue-400 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div 
                className="prose prose-invert max-w-none mt-4 blog-content"
                dangerouslySetInnerHTML={{ 
                  __html: formData.content ? 
                    processContent(formData.content) : 
                    '<p class="text-gray-400">Content will appear here...</p>' 
                }}
              />
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <Eye className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p>Your blog post preview will appear here as you type</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPreview;
