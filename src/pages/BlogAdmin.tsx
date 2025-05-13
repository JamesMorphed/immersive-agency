
import React from "react";
import { Helmet } from "react-helmet";
import BlogAdminForm from "@/components/BlogAdminForm";
import BlogPostsTable from "@/components/BlogPostsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlogAdminPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Helmet>
        <title>Blog Admin | Manage Blog Posts</title>
      </Helmet>
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="create">Create Post</TabsTrigger>
            <TabsTrigger value="manage">Manage Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <BlogAdminForm />
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
