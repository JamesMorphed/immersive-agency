import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, FileText, Briefcase, Podcast, Cpu, Newspaper, ImageUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { marked } from 'marked';

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
  author: z.string().min(1, { message: "Author is required" }),
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
  const [uploadingPDF, setUploadingPDF] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Define form
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
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

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    }
    fetchUser();
  }, []);

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

  const handlePDFDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadError(null);
    const file = e.dataTransfer.files[0];
    if (!file || file.type !== 'application/pdf') {
      setUploadError('Please upload a valid PDF file.');
      return;
    }
    await uploadPDF(file);
  };

  const handlePDFSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      setUploadError('Please upload a valid PDF file.');
      return;
    }
    await uploadPDF(file);
  };

  const uploadPDF = async (file: File) => {
    setUploadingPDF(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (userEmail) {
        formData.append('user_email', userEmail);
      }
      const res = await fetch('http://n8n-immersive-insights-dev.captain.digitalpfizer.com/webhook-test/CMS', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload PDF');
      const result = await res.json();

      // Handle both array and object response
      let outputString = null;
      if (Array.isArray(result) && result[0]?.output) {
        outputString = result[0].output;
      } else if (result.output) {
        outputString = result.output;
      }

      // Remove Markdown code block if present
      if (outputString && outputString.startsWith('```json')) {
        outputString = outputString.replace(/^```json\n?|```$/g, '').trim();
        if (outputString.endsWith('```')) {
          outputString = outputString.slice(0, -3).trim();
        }
      }

      if (outputString) {
        const data = JSON.parse(outputString);
        console.log('AI extracted data:', data); // For debugging
        if (data.title) form.setValue('title', data.title);
        if (data.slug) form.setValue('slug', data.slug);
        if (data.read_time) form.setValue('read_time', data.read_time);
        if (data.excerpt) form.setValue('excerpt', data.excerpt);
        if (data.content) {
          const htmlContent = marked.parse(data.content) as string;
          form.setValue('content', htmlContent);
          form.trigger('content');
        }
        if (data.tags) form.setValue('tags', data.tags);
        if (data.author) form.setValue('author', data.author);
        if (data.category) form.setValue('category', data.category);
        toast({ title: 'PDF processed!', description: 'Blog fields were auto-filled from your PDF.', variant: 'default' });
      } else {
        throw new Error('Unexpected response format from webhook');
      }
    } catch (err) {
      setUploadError('Failed to upload PDF.');
      toast({ title: 'Upload failed', description: 'Could not send PDF to n8n.', variant: 'destructive' });
    } finally {
      setUploadingPDF(false);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    }
  };

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for insertion
      const blogPostData = {
        Title: values.title,
        slug: values.slug,
        author: values.author,
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      variant="secondary" 
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
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
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
                  <div className="text-white">
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Blog PDF (optional)</label>
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handlePDFDrop}
              className="my-2 p-4 border-2 border-dashed border-cyberpunk-magenta rounded bg-black/40 text-center cursor-pointer transition-all flex flex-col items-center"
              style={{ minHeight: 60 }}
              onClick={() => pdfInputRef.current?.click()}
              tabIndex={0}
              role="button"
              aria-label="Upload PDF"
            >
              <span className="text-cyberpunk-magenta font-semibold text-sm mb-1">Drag & drop a PDF or <span className="underline">click to upload</span></span>
              <span className="text-gray-400 text-xs mb-1">We'll extract blog details for you.</span>
              {uploadingPDF && <span className="text-cyberpunk-magenta text-xs mt-1">Uploading...</span>}
              {uploadError && <span className="text-red-400 text-xs mt-1">{uploadError}</span>}
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePDFSelect}
              />
            </div>
          </div>
          
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
                              variant="secondary"
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
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors z-10"
                            onClick={() => form.setValue('image_url', '')}
                            aria-label="Delete featured image"
                          >
                            &times;
                          </button>
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
                          variant={"secondary"}
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
