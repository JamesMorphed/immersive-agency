import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, FileText, Pencil, Trash, Tag, Video, Image } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import BlogAdminForm from './BlogAdminForm';
import type { BlogPostFormValues } from './BlogAdminForm';

type BlogPost = {
  id: number;
  Title: string;
  slug: string;
  category: string;
  published_at: string | null;
  created_at: string;
  tags: string[] | null;
  video_url: string | null;
  image_gallery: string[] | null;
};

const BlogPostsTable = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<(Partial<BlogPostFormValues> & { id?: number }) | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, Title, slug, category, published_at, created_at, tags, video_url, image_gallery')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setErrorMsg('Failed to load blog posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete === null) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postToDelete);

      if (error) {
        throw error;
      }

      setBlogPosts(blogPosts.filter(post => post.id !== postToDelete));
      setSuccessMsg('The blog post has been successfully deleted.');
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMsg('Failed to delete blog post. Please try again.');
      setTimeout(() => setErrorMsg(null), 2500);
    } finally {
      setPostToDelete(null);
      setIsDialogOpen(false);
    }
  };

  const handleViewPost = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank');
  };

  const handleEditClick = async (post: BlogPost) => {
    // Fetch the latest full blog post data from Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', post.id)
      .single();
    if (error) {
      alert('Failed to fetch blog post details.');
      return;
    }
    // Map Supabase fields to BlogAdminForm initialValues
    const initialValues = {
      id: data.id,
      title: data.Title || '',
      slug: data.slug || '',
      author: data.author || '',
      content: data.content || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      image_url: data.image_url || '',
      video_url: data.video_url || '',
      tags: data.tags || [],
      read_time: data.read_time || '',
      publish: !!data.published_at,
      published_at: data.published_at ? new Date(data.published_at) : undefined,
    };
    setEditingPost(initialValues);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Insights</h2>
        <Button onClick={fetchBlogPosts} variant="secondary">
          Refresh
        </Button>
      </div>

      {(errorMsg || successMsg) && (
        <div className={`text-center py-2 rounded mb-2 ${successMsg ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{successMsg || errorMsg}</div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <p>Loading blog posts...</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableCaption>A list of all your insights</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No blog posts found. Create your first post!
                  </TableCell>
                </TableRow>
              ) : (
                blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.Title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${post.published_at ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {post.published_at ? 'Published' : 'Draft'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(post.created_at), 'MM/dd/yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          {post.tags && post.tags.length > 0 && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  {post.tags.length}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  Tags: {post.tags.join(', ')}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {post.video_url && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Video className="h-3 w-3" />
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                Has video content
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {post.image_gallery && post.image_gallery.length > 0 && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Image className="h-3 w-3" />
                                  {post.image_gallery.length}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  Image gallery: {post.image_gallery.length} images
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleViewPost(post.slug)}
                          title="View post"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="text-blue-600"
                          onClick={() => handleEditClick(post)}
                          title="Edit post"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteClick(post.id)}
                          title="Delete post"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <BlogAdminForm
              initialValues={editingPost}
              mode="edit"
              onSubmitSuccess={() => setIsEditOpen(false)}
            />
          )}
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPostsTable;
