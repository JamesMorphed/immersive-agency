
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Upload, Loader2 } from 'lucide-react';

interface IconUploaderProps {
  onSuccess?: () => void;
}

const IconUploader = ({ onSuccess }: IconUploaderProps) => {
  const [iconName, setIconName] = useState('');
  const [defaultIcon, setDefaultIcon] = useState<File | null>(null);
  const [magentaIcon, setMagentaIcon] = useState<File | null>(null);
  const [cyanIcon, setCyanIcon] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!iconName) {
      toast({
        variant: 'destructive',
        title: 'Icon name required',
        description: 'Please enter a name for the icon',
      });
      return;
    }

    if (!defaultIcon) {
      toast({
        variant: 'destructive',
        title: 'Default icon required',
        description: 'Please upload at least the default icon',
      });
      return;
    }

    setUploading(true);

    try {
      // Upload default icon
      const defaultIconPath = `${iconName}.svg`;
      await uploadFile(defaultIcon, defaultIconPath);

      // Upload magenta variant if provided
      if (magentaIcon) {
        const magentaIconPath = `${iconName}-magenta.svg`;
        await uploadFile(magentaIcon, magentaIconPath);
      }

      // Upload cyan variant if provided
      if (cyanIcon) {
        const cyanIconPath = `${iconName}-cyan.svg`;
        await uploadFile(cyanIcon, cyanIconPath);
      }

      toast({
        title: 'Icon uploaded successfully',
        description: `${iconName} icon has been uploaded with its variants`,
      });

      // Reset form
      setIconName('');
      setDefaultIcon(null);
      setMagentaIcon(null);
      setCyanIcon(null);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error uploading icons:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: 'There was an error uploading the icons',
      });
    } finally {
      setUploading(false);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const { error } = await supabase.storage
      .from('icons')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="icon-name">Icon Name</Label>
        <Input
          id="icon-name"
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
          placeholder="e.g., chat, user, settings"
          className="bg-black/50"
          disabled={uploading}
        />
        <p className="text-xs text-gray-400">
          Use lowercase letters and hyphens only.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="default-icon">Default Icon (SVG)</Label>
        <Input
          id="default-icon"
          type="file"
          accept=".svg"
          onChange={(e) => setDefaultIcon(e.target.files?.[0] || null)}
          className="bg-black/50"
          disabled={uploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="magenta-icon">Magenta Variant (SVG) - Optional</Label>
        <Input
          id="magenta-icon"
          type="file"
          accept=".svg"
          onChange={(e) => setMagentaIcon(e.target.files?.[0] || null)}
          className="bg-black/50"
          disabled={uploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cyan-icon">Cyan Variant (SVG) - Optional</Label>
        <Input
          id="cyan-icon"
          type="file"
          accept=".svg"
          onChange={(e) => setCyanIcon(e.target.files?.[0] || null)}
          className="bg-black/50"
          disabled={uploading}
        />
      </div>

      <Button 
        type="submit" 
        variant="neon" 
        disabled={uploading}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Icon
          </>
        )}
      </Button>
    </form>
  );
};

export default IconUploader;
