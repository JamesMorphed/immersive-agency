
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface IconData {
  id: string;
  name: string;
  folder: string;
  file_path: string;
  file_size: number | null;
  content_type: string | null;
  public_url: string;
  tags: string[] | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface IconInfo {
  name: string;
  variants: string[];
  urls: Record<string, string>;
  data: Record<string, IconData>;
}

const IconsTable = () => {
  const [icons, setIcons] = useState<IconInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchIconsFromDatabase();
  }, []);

  const fetchIconsFromDatabase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('icons')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching icons from database:', error);
        toast({
          variant: 'destructive',
          title: 'Error fetching icons',
          description: error.message,
        });
        return;
      }

      // Group icons by name
      const iconMap = new Map<string, IconInfo>();

      data.forEach((iconData: IconData) => {
        const existing = iconMap.get(iconData.name) || {
          name: iconData.name,
          variants: [],
          urls: {},
          data: {}
        };
        
        existing.variants.push(iconData.folder);
        existing.urls[iconData.folder] = iconData.public_url;
        existing.data[iconData.folder] = iconData;
        
        iconMap.set(iconData.name, existing);
      });

      setIcons(Array.from(iconMap.values()));
    } catch (error) {
      console.error('Error fetching icons:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch icons from database',
      });
    } finally {
      setLoading(false);
    }
  };

  const syncWithStorage = async () => {
    setSyncing(true);
    try {
      const folders = ["white", "gradient", "black"];
      
      for (const folder of folders) {
        const { data: files, error } = await supabase
          .storage
          .from('icons')
          .list(folder, {
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          console.error(`Error fetching files from ${folder}:`, error);
          continue;
        }

        // Process SVG files
        const svgFiles = files.filter(file => file.name.endsWith('.svg'));
        
        for (const file of svgFiles) {
          const iconName = file.name.replace('.svg', '');
          const filePath = `${folder}/${file.name}`;
          const publicUrl = supabase.storage
            .from('icons')
            .getPublicUrl(filePath).data.publicUrl;

          // Check if icon already exists in database
          const { data: existingIcon } = await supabase
            .from('icons')
            .select('id')
            .eq('name', iconName)
            .eq('folder', folder)
            .single();

          if (!existingIcon) {
            // Insert new icon
            const { error: insertError } = await supabase
              .from('icons')
              .insert({
                name: iconName,
                folder: folder,
                file_path: filePath,
                file_size: file.metadata?.size || null,
                content_type: file.metadata?.mimetype || 'image/svg+xml',
                public_url: publicUrl,
                tags: [],
                description: null
              });

            if (insertError) {
              console.error('Error inserting icon:', insertError);
            }
          }
        }
      }

      toast({
        title: 'Sync completed',
        description: 'Icons have been synced with storage bucket',
      });

      // Refresh the table
      fetchIconsFromDatabase();
    } catch (error) {
      console.error('Error syncing with storage:', error);
      toast({
        variant: 'destructive',
        title: 'Sync failed',
        description: 'Failed to sync icons with storage bucket',
      });
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-black/50 border border-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/50 border border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Icons Database ({icons.length} icons)</CardTitle>
        <Button
          onClick={syncWithStorage}
          disabled={syncing}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync with Storage'}
        </Button>
      </CardHeader>
      <CardContent>
        {icons.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No icons found in database</p>
            <p className="text-sm text-gray-500 mt-2">
              Click "Sync with Storage" to import icons from the storage bucket
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon Name</TableHead>
                <TableHead>White</TableHead>
                <TableHead>Gradient</TableHead>
                <TableHead>Black</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {icons.map((icon) => (
                <TableRow key={icon.name}>
                  <TableCell className="font-medium">{icon.name}</TableCell>
                  <TableCell>
                    {icon.variants.includes('white') ? (
                      <img
                        src={icon.urls.white}
                        alt={`${icon.name} white`}
                        className="w-8 h-8 object-contain bg-gray-800 rounded p-1"
                      />
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {icon.variants.includes('gradient') ? (
                      <img
                        src={icon.urls.gradient}
                        alt={`${icon.name} gradient`}
                        className="w-8 h-8 object-contain bg-gray-900 rounded p-1"
                      />
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {icon.variants.includes('black') ? (
                      <img
                        src={icon.urls.black}
                        alt={`${icon.name} black`}
                        className="w-8 h-8 object-contain bg-gray-200 rounded p-1"
                      />
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {icon.variants.map((variant) => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-400">
                    {icon.data[icon.variants[0]]?.created_at ? 
                      new Date(icon.data[icon.variants[0]].created_at).toLocaleDateString() : 
                      '-'
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default IconsTable;
