
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface IconInfo {
  name: string;
  variants: ('default' | 'magenta' | 'cyan')[];
}

export const fetchIconList = async (): Promise<IconInfo[]> => {
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
    
    return iconList;
    
  } catch (error) {
    console.error('Error fetching icons:', error);
    toast({
      variant: 'destructive',
      title: 'Failed to load icons',
      description: 'There was an error fetching the icons',
    });
    return [];
  }
};

export const deleteIcon = async (iconName: string): Promise<boolean> => {
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
    
    return true;
  } catch (error) {
    console.error('Error deleting icon:', error);
    toast({
      variant: 'destructive',
      title: 'Delete failed',
      description: 'There was an error deleting the icon',
    });
    return false;
  }
};
