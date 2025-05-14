import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus, X, Image, ImageUp, Loader2 } from "lucide-react";
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
  image_gallery: z.array(z.string().url()).default([]),
  read_time: z.string().min(1, { message: "Read time is required" }),
  publish: z.boolean().default(false),
  published_at: z.date().optional(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const BlogAdminForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);

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
      image_gallery: [],
      read_time: "",
      publish: false,
      published_at: new Date(),
    },
  });

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

  // Function to handle image uploads for gallery
  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `gallery-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    try {
      setUploadingGalleryImage(true);
      
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
      
      const currentGallery = form.getValues("image_gallery") || [];
      form.setValue("image_gallery", [...currentGallery, publicUrlData.publicUrl]);
      
      toast({
        title: "Gallery image uploaded",
        description: "Your image has been added to the gallery.",
      });
    } catch (error) {
      console.error("Error uploading gallery image:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingGalleryImage(false);
    }
  };

  // Function to add an image URL to the gallery
  const addToGallery = () => {
    if (galleryUrlInput && galleryUrlInput.trim() !== "") {
      try {
        // Basic URL validation
        new URL(galleryUrlInput);
        
        const currentGallery = form.getValues("image_gallery") || [];
        form.setValue("image_gallery", [...currentGallery, galleryUrlInput]);
        setGalleryUrlInput("");
      } catch (e) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid image URL",
          variant: "destructive",
        });
      }
    }
  };

  // Function to remove an image from the gallery
  const removeFromGallery = (indexToRemove: number) => {
    const currentGallery = form.getValues("image_gallery");
    form.setValue(
      "image_gallery", 
      currentGallery.filter((_, index) => index !== indexToRemove)
    );
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
        image_gallery: values.image_gallery.length > 0 ? values.image_gallery : null,
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
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
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
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
                    placeholder="Write your blog post content here..."
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
                        
                        {field.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => form.setValue("image_url", "")}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
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
            name="image_gallery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Gallery (optional)</FormLabel>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('galleryImageUpload')?.click()}
                      disabled={uploadingGalleryImage}
                      className="w-full"
                    >
                      {uploadingGalleryImage ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Image className="h-4 w-4 mr-2" />
                          Upload Gallery Image
                        </>
                      )}
                    </Button>
                    <Input
                      id="galleryImageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleGalleryImageUpload}
                      disabled={uploadingGalleryImage}
                    />
                    
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-400">or add by URL:</p>
                      <div className="flex flex-1 gap-2">
                        <Input 
                          placeholder="https://example.com/gallery-image.jpg"
                          value={galleryUrlInput}
                          onChange={(e) => setGalleryUrlInput(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={addToGallery}
                          className="flex-shrink-0"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {field.value.length > 0 && (
                    <div className="bg-gray-900/50 p-3 rounded-md border border-gray-700">
                      <p className="text-sm mb-2">Gallery images ({field.value.length}):</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {field.value.map((url, index) => (
                          <div key={index} className="relative group">
                            <div className="h-24 bg-gray-800 rounded overflow-hidden border border-gray-700">
                              <img 
                                src={url} 
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/120?text=Error";
                                }}
                              />
                            </div>
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => removeFromGallery(index)}
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
