import React, { useEffect } from "react";
import BlogAdminForm from "@/components/BlogAdminForm";
import BlogPostsTable from "@/components/BlogPostsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const BlogAdminPage = () => {
  useEffect(() => {
    document.title = "Blog Admin | Manage Blog Posts";
  }, []);
  return <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
        
        <Tabs defaultValue="create" className="w-full">
          
          
          <TabsContent value="create" className="space-y-4">
            <BlogAdminForm />
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4">
            <BlogPostsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default BlogAdminPage;