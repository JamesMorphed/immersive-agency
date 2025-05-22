
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CustomIcon } from '@/components/ui/custom-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IconInfo {
  name: string;
  variants: ('default' | 'magenta' | 'cyan')[];
}

interface IconGalleryProps {
  onRefresh?: () => void;
}

const IconGallery = ({ onRefresh }: IconGalleryProps) => {
  const [icons, setIcons] = useState<IconInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteIcon, setDeleteIcon] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .from('icons')
        .list();

      if (error) {
        throw error;
      }

      // Process the files to group them by icon name and identify variants
      const iconMap = new Map<string, Set<'default' | 'magenta' | 'cyan'>>();
      
      data.forEach(file => {
        if (!file.name.endsWith('.svg')) return;
        
        let iconName: string;
        let variant: 'default' | 'magenta' | 'cyan' = 'default';
        
        // Check if the filename has a variant suffix
        if (file.name.includes('-magenta.svg')) {
          iconName = file.name.replace('-magenta.svg', '');
          variant = 'magenta';
        } else if (file.name.includes('-cyan.svg')) {
          iconName = file.name.replace('-cyan.svg', '');
          variant = 'cyan';
        } else {
          iconName = file.name.replace('.svg', '');
        }
        
        // Add to the map
        if (!iconMap.has(iconName)) {
          iconMap.set(iconName, new Set());
        }
        iconMap.get(iconName)?.add(variant);
      });
      
      // Convert map to array of IconInfo
      const iconList: IconInfo[] = Array.from(iconMap.entries()).map(([name, variants]) => ({
        name,
        variants: Array.from(variants)
      }));
      
      setIcons(iconList);
      
    } catch (error) {
      console.error('Error fetching icons:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to load icons',
        description: 'There was an error fetching the icons',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (iconName: string) => {
    setRefreshing(true);
    try {
      const filesToDelete = [
        `${iconName}.svg`,
        `${iconName}-magenta.svg`,
        `${iconName}-cyan.svg`
      ];
      
      for (const file of filesToDelete) {
        await supabase.storage.from('icons').remove([file]);
      }
      
      toast({
        title: 'Icon deleted',
        description: `${iconName} and its variants have been removed`,
      });
      
      // Refresh icon list
      fetchIcons();
      
      // Call refresh callback if provided
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error deleting icon:', error);
      toast({
        variant: 'destructive',
        title: 'Delete failed',
        description: 'There was an error deleting the icon',
      });
    } finally {
      setRefreshing(false);
      setDeleteIcon(null);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchIcons()
      .then(() => {
        if (onRefresh) onRefresh();
        toast({
          title: 'Icons refreshed',
          description: 'Icon gallery has been updated',
        });
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-black/50 border border-gray-800">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="animate-pulse w-16 h-16 bg-gray-700/30 rounded-md mb-4"></div>
              <div className="animate-pulse w-24 h-4 bg-gray-700/30 rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Icon Gallery</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {icons.length === 0 ? (
        <Card className="bg-black/50 border border-gray-800">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-40">
            <p className="text-gray-400">No icons found in storage</p>
            <p className="text-sm text-gray-500 mt-2">Upload your first icon using the form above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {icons.map((icon) => (
            <Card key={icon.name} className="bg-black/50 border border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">{icon.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => setDeleteIcon(icon.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  {icon.variants.includes('default') && (
                    <div className="flex flex-col items-center">
                      <CustomIcon name={icon.name} size="lg" />
                      <span className="text-xs text-gray-400 mt-2">Default</span>
                    </div>
                  )}
                  
                  {icon.variants.includes('magenta') && (
                    <div className="flex flex-col items-center">
                      <CustomIcon name={icon.name} variant="magenta" size="lg" />
                      <span className="text-xs text-gray-400 mt-2">Magenta</span>
                    </div>
                  )}
                  
                  {icon.variants.includes('cyan') && (
                    <div className="flex flex-col items-center">
                      <CustomIcon name={icon.name} variant="cyan" size="lg" />
                      <span className="text-xs text-gray-400 mt-2">Cyan</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {icon.variants.length} variant{icon.variants.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <AlertDialog open={!!deleteIcon} onOpenChange={(open) => !open && setDeleteIcon(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{deleteIcon}" icon and all its variants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteIcon && handleDelete(deleteIcon)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IconGallery;
