import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { marked } from 'marked';

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
    // Convert markdown to HTML
    return marked(content);
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
        <CardContent className="h-full flex flex-col justify-center items-center text-white">
          {formData.title || formData.content ? (
            <div className="w-full">
              {formData.image_url && (
                <div className="mb-4">
                  <img
                    src={formData.image_url}
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-md border border-gray-700"
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Preview+Image';
                    }}
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-white">{formData.title}</h3>
              <div
                className="prose prose-invert max-w-none text-white"
                dangerouslySetInnerHTML={{ __html: processContent(formData.content) }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <Eye className="w-10 h-10 mb-4 opacity-30" />
              <span className="text-gray-400">Your insight post will appear here as you type</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPreview;
