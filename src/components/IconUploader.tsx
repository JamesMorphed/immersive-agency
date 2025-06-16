import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IconUploaderProps {
  onSuccess?: () => void;
}

const IconUploader = ({ onSuccess }: IconUploaderProps) => {
  const [iconName, setIconName] = useState('');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [folder, setFolder] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!iconName) {
      setErrorMsg('Please enter a name for the icon.');
      return;
    }
    if (!iconFile) {
      setErrorMsg('Please upload an SVG file.');
      return;
    }
    if (!folder) {
      setErrorMsg('Please select a folder for the icon.');
      return;
    }
    setUploading(true);
    try {
      // Upload to storage
      const filePath = `${folder}/${iconName}.svg`;
      const { error: uploadError } = await supabase.storage
        .from('icons')
        .upload(filePath, iconFile, {
          cacheControl: '3600',
          upsert: true,
        });
      if (uploadError) {
        throw uploadError;
      }
      // Get public URL
      const publicUrl = supabase.storage
        .from('icons')
        .getPublicUrl(filePath).data.publicUrl;
      // Insert into database
      const { error: dbError } = await supabase
        .from('icons')
        .insert({
          name: iconName,
          folder: folder,
          file_path: filePath,
          file_size: iconFile.size,
          content_type: iconFile.type,
          public_url: publicUrl,
          tags: [],
          description: null
        });
      if (dbError) {
        throw dbError;
      }
      setSuccessMsg(`${iconName} icon has been uploaded to ${folder} folder.`);
      setTimeout(() => setSuccessMsg(null), 2500);
      // Reset form
      setIconName('');
      setIconFile(null);
      setFolder('');
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error uploading icon:', error);
      setErrorMsg(error.message || 'There was an error uploading the icon.');
      setTimeout(() => setErrorMsg(null), 2500);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      {(errorMsg || successMsg) && (
        <div className={`text-center py-2 rounded mb-2 ${successMsg ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{successMsg || errorMsg}</div>
      )}
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
        <Label htmlFor="folder-select">Folder</Label>
        <Select value={folder} onValueChange={setFolder} disabled={uploading}>
          <SelectTrigger className="bg-black/50">
            <SelectValue placeholder="Select folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="black">Black</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon-file">Icon File (SVG)</Label>
        <Input
          id="icon-file"
          type="file"
          accept=".svg"
          onChange={(e) => setIconFile(e.target.files?.[0] || null)}
          className="bg-black/50"
          disabled={uploading}
        />
      </div>

      <Button 
        type="submit" 
        variant="default" 
        disabled={uploading || !iconName || !iconFile || !folder}
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
