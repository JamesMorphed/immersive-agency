
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import IconCard from './IconCard';
import IconGallerySkeleton from './IconGallerySkeleton';
import IconGalleryEmptyState from './IconGalleryEmptyState';
import IconDeleteDialog from './IconDeleteDialog';
import { fetchIconList, deleteIcon, IconInfo } from '@/services/iconService';

interface IconGalleryProps {
  onRefresh?: () => void;
}

const IconGallery = ({ onRefresh }: IconGalleryProps) => {
  const [icons, setIcons] = useState<IconInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteIconName, setDeleteIconName] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadIcons();
  }, []);

  const loadIcons = async () => {
    setLoading(true);
    try {
      const iconList = await fetchIconList();
      setIcons(iconList);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (iconName: string) => {
    setRefreshing(true);
    try {
      const success = await deleteIcon(iconName);
      
      if (success) {
        // Refresh icon list
        await loadIcons();
        
        // Call refresh callback if provided
        if (onRefresh) {
          onRefresh();
        }
      }
    } finally {
      setRefreshing(false);
      setDeleteIconName(null);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadIcons()
      .then(() => {
        if (onRefresh) onRefresh();
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

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
      
      {loading ? (
        <IconGallerySkeleton />
      ) : icons.length === 0 ? (
        <IconGalleryEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {icons.map((icon) => (
            <IconCard 
              key={icon.name}
              name={icon.name}
              variants={icon.variants}
              onDelete={(name) => setDeleteIconName(name)}
            />
          ))}
        </div>
      )}
      
      <IconDeleteDialog
        iconName={deleteIconName}
        onClose={() => setDeleteIconName(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default IconGallery;
