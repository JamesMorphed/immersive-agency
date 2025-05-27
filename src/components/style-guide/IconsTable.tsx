
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

interface IconInfo {
  name: string;
  variants: string[];
  urls: Record<string, string>;
}

const IconsTable = () => {
  const [icons, setIcons] = useState<IconInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIconsFromStorage();
  }, []);

  const fetchIconsFromStorage = async () => {
    setLoading(true);
    try {
      const folders = ["white", "gradient", "black"];
      const iconMap = new Map<string, IconInfo>();

      for (const folder of folders) {
        const { data, error } = await supabase
          .storage
          .from('icons')
          .list(folder, {
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          console.error(`Error fetching icons from ${folder}:`, error);
          continue;
        }

        // Process SVG files
        const folderIcons = data
          .filter(file => file.name.endsWith('.svg'))
          .map(file => file.name.replace('.svg', ''));

        folderIcons.forEach(iconName => {
          const existing = iconMap.get(iconName) || {
            name: iconName,
            variants: [],
            urls: {}
          };
          
          existing.variants.push(folder);
          existing.urls[folder] = supabase.storage
            .from('icons')
            .getPublicUrl(`${folder}/${iconName}.svg`).data.publicUrl;
          
          iconMap.set(iconName, existing);
        });
      }

      setIcons(Array.from(iconMap.values()));
    } catch (error) {
      console.error('Error fetching icons:', error);
    } finally {
      setLoading(false);
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

  if (icons.length === 0) {
    return (
      <Card className="bg-black/50 border border-gray-800">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            <p>No icons found in storage</p>
            <p className="text-sm text-gray-500 mt-2">Upload icons to the storage bucket to see them here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/50 border border-gray-800">
      <CardHeader>
        <CardTitle>Icons from Storage ({icons.length} icons)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon Name</TableHead>
              <TableHead>White</TableHead>
              <TableHead>Gradient</TableHead>
              <TableHead>Black</TableHead>
              <TableHead>Variants</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IconsTable;
