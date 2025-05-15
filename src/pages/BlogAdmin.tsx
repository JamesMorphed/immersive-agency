
import React, { useEffect } from "react";
import BlogAdminForm from "@/components/BlogAdminForm";
import BlogPostsTable from "@/components/BlogPostsTable";
import BlogPreview from "@/components/BlogPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlogAdminPage = () => {
  useEffect(() => {
    document.title = "Blog Admin | Manage Blog Posts";
  }, []);

  return (
    <div className="w-full py-8 px-4 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog Management</h1>
        
        <Tabs defaultValue="create" className="w-full">
          <div className="flex justify-center">
            <TabsList className="mb-6">
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="manage">Manage Posts</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BlogAdminForm />
              <BlogPreview />
            </div>
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4">
            <BlogPostsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogAdminPage;
