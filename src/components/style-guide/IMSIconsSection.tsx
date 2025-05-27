
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import IconsTable from "./IconsTable";

interface IMSIcon {
  id: string;
  name: string;
  folder: string;
  public_url: string;
}

const IMSIconsSection = () => {
  const [icons, setIcons] = useState<IMSIcon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('icons')
        .select('id, name, folder, public_url')
        .order('name');

      if (error) {
        console.error('Error fetching icons from database:', error);
        setIcons([]);
        return;
      }

      setIcons(data || []);
    } catch (error) {
      console.error('Error fetching icons:', error);
      setIcons([]);
    } finally {
      setLoading(false);
    }
  };

  const renderIconGrid = (folder: string) => {
    const folderIcons = icons.filter(icon => icon.folder === folder);
    
    if (folderIcons.length === 0) {
      return (
        <div className="p-8 text-center text-gray-400">
          No icons found in this folder. Use the "Sync with Storage" button in the table view to import icons.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {folderIcons.map((icon) => (
          <Card key={icon.id} className="bg-black/50 border border-gray-800">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center mb-2">
                <img
                  src={icon.public_url}
                  alt={`${icon.name} icon`}
                  className="max-h-12 max-w-12 object-contain"
                />
              </div>
              <span className="text-xs text-center text-gray-400 truncate w-full" title={icon.name}>
                {icon.name}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">IMS Icons</h2>
        
        <Card className="bg-black/50 border border-gray-800">
          <CardContent className="p-6">
            <p className="text-gray-300 mb-6">
              These icons are organized in three distinct styles: White, Gradient, and Black. Each style serves different design contexts and needs.
            </p>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <Tabs defaultValue="table" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="white">White</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="black">Black</TabsTrigger>
                </TabsList>
                
                <TabsContent value="table">
                  <h3 className="text-xl font-bold mb-4">Icons Database</h3>
                  <p className="text-gray-400 mb-6">Complete overview of all icons stored in the database with management features.</p>
                  <IconsTable />
                </TabsContent>
                
                <TabsContent value="white">
                  <h3 className="text-xl font-bold mb-4">White Icons</h3>
                  <p className="text-gray-400 mb-6">Clean, minimalist white icons ideal for dark backgrounds.</p>
                  {renderIconGrid("white")}
                </TabsContent>
                
                <TabsContent value="gradient">
                  <h3 className="text-xl font-bold mb-4">Gradient Icons</h3>
                  <p className="text-gray-400 mb-6">Vibrant gradient icons adding depth and visual interest.</p>
                  {renderIconGrid("gradient")}
                </TabsContent>
                
                <TabsContent value="black">
                  <h3 className="text-xl font-bold mb-4">Black Icons</h3>
                  <p className="text-gray-400 mb-6">Bold black icons for light backgrounds and high contrast needs.</p>
                  {renderIconGrid("black")}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IMSIconsSection;
