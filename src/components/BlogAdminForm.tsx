
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, FileText, Briefcase, Podcast, Cpu, Newspaper, ImageUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
import TagsInput from "@/components/TagsInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the schema for blog post form
const blogPostSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  slug: z.string().min(5, { message: "Slug must be at least 5 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug must contain only lowercase letters, numbers, and hyphens" 
    }),
  content: z.string().min(10, { message: "Content is required" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  image_url: z.string().url({ message: "Please upload an image" }).or(z.string().length(0)),
  video_url: z.string().url({ message: "Please enter a valid URL for the video" }).optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  read_time: z.string().min(1, { message: "Read time is required" }),
  publish: z.boolean().default(false),
  published_at: z.date().optional(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

// Helper function to dispatch form update events
const dispatchFormUpdate = (formData: Partial<BlogPostFormValues>) => {
  const event = new CustomEvent('blog-form-update', {
    detail: formData
  });
  window.dispatchEvent(event);
};

const BlogAdminForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);

  // Define form
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "",
      image_url: "",
      video_url: "",
      tags: [],
      read_time: "",
      publish: false,
      published_at: new Date(),
    },
  });

  // Watch form values for preview
  const watchedValues = form.watch();
  
  // Update preview when form values change
  useEffect(() => {
    dispatchFormUpdate(watchedValues);
  }, [watchedValues]);

  // Function to generate slug from title
  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      form.setValue("slug", slug);
    }
  };

  // Function to handle image uploads for featured image
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    try {
      setUploadingFeaturedImage(true);
      
      // Upload image to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);
        
      if (error) {
        throw error;
      }
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);
        
      form.setValue("image_url", publicUrlData.publicUrl);
      
      toast({
        title: "Featured image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading featured image:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingFeaturedImage(false);
    }
  };

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for insertion
      const blogPostData = {
        Title: values.title,
        slug: values.slug,
        content: values.content,
        excerpt: values.excerpt,
        category: values.category,
        image_url: values.image_url,
        video_url: values.video_url || null,
        tags: values.tags.length > 0 ? values.tags : null,
        read_time: values.read_time,
        published_at: values.publish ? values.published_at?.toISOString() : null,
      };

      // Insert into database
      const { error } = await supabase
        .from('blog_posts')
        .insert([blogPostData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Blog post created",
        description: "Your blog post has been successfully created.",
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting blog post:", error);
      toast({
        title: "Error creating blog post",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="mt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={generateSlug}
                    >
                      Generate Slug
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="your-post-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="news-insights">
                        <div className="flex items-center">
                          <Newspaper className="mr-2 h-4 w-4" />
                          News & Insights
                        </div>
                      </SelectItem>
                      <SelectItem value="case-studies">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Case Studies
                        </div>
                      </SelectItem>
                      <SelectItem value="podcasts">
                        <div className="flex items-center">
                          <Podcast className="mr-2 h-4 w-4" />
                          Podcasts
                        </div>
                      </SelectItem>
                      <SelectItem value="tech-trends">
                        <div className="flex items-center">
                          <Cpu className="mr-2 h-4 w-4" />
                          Tech & Trends
                        </div>
                      </SelectItem>
                      <SelectItem value="our-work">
                        <div className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" />
                          Our Work
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="read_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Time</FormLabel>
                  <FormControl>
                    <Input placeholder="5 min read" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief summary of the post" 
                    className="h-20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('featuredImageUpload')?.click()}
                              disabled={uploadingFeaturedImage}
                              className="w-full h-10"
                            >
                              {uploadingFeaturedImage ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <ImageUp className="h-4 w-4 mr-2" />
                                  Upload Image
                                </>
                              )}
                            </Button>
                            <Input
                              id="featuredImageUpload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFeaturedImageUpload}
                              disabled={uploadingFeaturedImage}
                            />
                          </div>
                        </FormControl>
                      </div>
                      
                      {field.value && (
                        <div className="relative h-40 w-full bg-gray-900 rounded-md overflow-hidden border border-gray-700">
                          <img
                            src={field.value}
                            alt="Featured"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Error+Loading+Image";
                            }}
                          />
                        </div>
                      )}
                      
                      <input 
                        type="hidden" 
                        {...field} 
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/embed/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsInput 
                    value={field.value} 
                    onChange={field.onChange} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="publish"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish immediately</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      If checked, the post will be published on the selected date.
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="published_at"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Publish Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Blog Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogAdminForm;
