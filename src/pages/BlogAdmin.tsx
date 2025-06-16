import React, { useEffect, useState } from "react";
import BlogAdminForm from "@/components/BlogAdminForm";
import BlogPostsTable from "@/components/BlogPostsTable";
import BlogPreview from "@/components/BlogPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import Navbar from "@/components/Navbar";
import ServiceAdminForm from "@/components/ServiceAdminForm";
import ManageServicesTable from "@/components/ManageServicesTable";

const BlogAdminPage = () => {
  const navigate = useNavigate();
  const [manageTab, setManageTab] = useState<'posts' | 'services'>('posts');

  useEffect(() => {
    document.title = "Blog Admin | Manage Blog Posts";
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    }
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="w-full py-8 px-4 md:px-6 mt-24">
        <Tabs defaultValue="create-post" className="w-full">
          <div className="flex justify-center">
            <TabsList className="mb-6">
              <TabsTrigger value="create-post">Create Insights</TabsTrigger>
              <TabsTrigger value="create-service">Create Solutions</TabsTrigger>
              <TabsTrigger value="manage">Manage Content</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="create-post" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BlogAdminForm />
              <BlogPreview />
            </div>
          </TabsContent>
          <TabsContent value="create-service" className="space-y-4">
            <ServiceAdminForm />
          </TabsContent>
          <TabsContent value="manage" className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-md shadow-sm bg-gray-900 border border-gray-700">
                <button
                  className={`px-6 py-2 font-semibold rounded-l-md focus:outline-none transition-colors ${manageTab === 'posts' ? 'bg-cyberpunk-magenta text-white' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setManageTab('posts')}
                  type="button"
                >
                  Insights
                </button>
                <button
                  className={`px-6 py-2 font-semibold rounded-r-md focus:outline-none transition-colors ${manageTab === 'services' ? 'bg-cyberpunk-magenta text-white' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setManageTab('services')}
                  type="button"
                >
                  Solutions
                </button>
              </div>
            </div>
            {manageTab === 'posts' ? <BlogPostsTable /> : <ManageServicesTable />}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BlogAdminPage;
