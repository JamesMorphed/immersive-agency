import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ImageUp, X, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const serviceSchema = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
  slug: z.string().min(3, { message: 'Slug is required' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must contain only lowercase letters, numbers, and hyphens' }),
  description: z.string().optional(),
  hero_image: z.string().optional(),
  overview: z.string().optional(),
  features: z.string().optional(), // JSON string
  technologies: z.string().optional(), // JSON string
  gallery_images: z.string().optional(), // JSON string
  service_icons: z.string().optional(), // JSON string
  featured_images: z.string().optional(), // JSON string
  thumbnail_image: z.string().optional(),
  background_image: z.string().optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

// Default technologies from Technology.tsx
const DEFAULT_TECHNOLOGIES = [
  { name: 'Artificial Intelligence', icon: '/lovable-uploads/a107c033-2a7a-4b3d-9018-76d2d14c7e9c.png' },
  { name: 'Virtual Reality', icon: '/lovable-uploads/8e0b70f4-ab04-4e04-907b-1471d03875ba.png' },
  { name: 'Augmented Reality', icon: '/lovable-uploads/cdfd6c76-4c8c-4f11-a613-e12558868db7.png' },
  { name: 'Interactive 3D', icon: '/lovable-uploads/80e89f8b-7fea-4ece-9503-e388557a6fd3.png' },
];

interface ServiceAdminFormProps {
  initialData?: any;
  onSave?: () => void;
  onDelete?: () => void;
}

const ServiceAdminForm: React.FC<ServiceAdminFormProps> = ({ initialData, onSave, onDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [features, setFeatures] = useState<{ title: string; description: string; icon?: string }[]>([]);
  const [technologies, setTechnologies] = useState<{ name: string; icon: string }[]>(DEFAULT_TECHNOLOGIES);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [serviceIcons, setServiceIcons] = useState<string[]>([]);
  const [featuredImages, setFeaturedImages] = useState<string[]>([]);
  const [uploadingPDF, setUploadingPDF] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [featureIconModalOpen, setFeatureIconModalOpen] = useState<number | null>(null);
  const [serviceIconModalOpen, setServiceIconModalOpen] = useState(false);
  const [iconOptions, setIconOptions] = useState<string[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData ? {
      title: initialData.title || '',
      slug: initialData.slug || '',
      description: initialData.description || '',
      hero_image: initialData.hero_image || '',
      overview: initialData.overview || '',
      features: JSON.stringify(initialData.features || []),
      technologies: JSON.stringify(initialData.technologies || []),
      gallery_images: JSON.stringify(initialData.gallery_images || []),
      service_icons: JSON.stringify(initialData.service_icons || []),
      featured_images: JSON.stringify(initialData.featured_images || []),
      thumbnail_image: initialData.thumbnail_image || '',
      background_image: initialData.background_image || '',
    } : {
      title: '',
      slug: '',
      description: '',
      hero_image: '',
      overview: '',
      features: '[]',
      technologies: '[]',
      gallery_images: '[]',
      service_icons: '[]',
      featured_images: '[]',
      thumbnail_image: '',
      background_image: '',
    },
  });

  // Sync features array to form value as JSON
  React.useEffect(() => {
    form.setValue('features', JSON.stringify(features));
    form.setValue('technologies', JSON.stringify(technologies));
    form.setValue('gallery_images', JSON.stringify(galleryImages));
    form.setValue('service_icons', JSON.stringify(serviceIcons));
    form.setValue('featured_images', JSON.stringify(featuredImages));
  }, [features, technologies, galleryImages, serviceIcons, featuredImages]);

  React.useEffect(() => {
    if (initialData) {
      if (Array.isArray(initialData.features)) setFeatures(initialData.features);
      if (Array.isArray(initialData.technologies)) setTechnologies(initialData.technologies);
      if (Array.isArray(initialData.gallery_images)) setGalleryImages(initialData.gallery_images);
      if (Array.isArray(initialData.service_icons)) setServiceIcons(initialData.service_icons);
      if (Array.isArray(initialData.featured_images)) setFeaturedImages(initialData.featured_images);
    } else {
      setFeatures([]);
      setTechnologies(DEFAULT_TECHNOLOGIES);
      setGalleryImages([]);
      setServiceIcons([]);
      setFeaturedImages([]);
    }
  }, [initialData]);

  const onSubmit = async (values: ServiceFormValues) => {
    setIsSubmitting(true);
    setSuccess(false);
    try {
      const servicePayload = {
        title: values.title,
        slug: values.slug,
        description: values.description || null,
        hero_image: values.hero_image || null,
        overview: values.overview || null,
        features: JSON.parse(values.features || '[]'),
        technologies: JSON.parse(values.technologies || '[]'),
        gallery_images: JSON.parse(values.gallery_images || '[]'),
        service_icons: JSON.parse(values.service_icons || '[]'),
        featured_images: JSON.parse(values.featured_images || '[]'),
        thumbnail_image: values.thumbnail_image || null,
        background_image: values.background_image || null,
      };
      let error;
      if (initialData && initialData.id) {
        // Update
        ({ error } = await supabase.from('service_details').update(servicePayload).eq('id', initialData.id));
      } else {
        // Create
        (servicePayload as any).created_at = new Date().toISOString();
        ({ error } = await supabase.from('service_details').insert([servicePayload]));
      }
      if (error) throw error;
      setSuccess(true);
      form.reset();
      if (onSave) onSave();
    } catch (error) {
      alert('Error saving service: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Refactor handleHeroImageUpload to accept either a ChangeEvent or a File
  const handleHeroImageUpload = async (eOrFile: React.ChangeEvent<HTMLInputElement> | File) => {
    let file: File | undefined;
    if (eOrFile instanceof File) {
      file = eOrFile;
    } else {
      file = eOrFile.target.files?.[0];
    }
    if (!file || !file.type.startsWith('image/')) return;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `hero_images/${fileName}`;
    try {
      setUploadingHeroImage(true);
      // Upload image to Supabase Storage
      const { error } = await supabase.storage
        .from('services-bucket')
        .upload(filePath, file);
      if (error) throw error;
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('services-bucket')
        .getPublicUrl(filePath);
      form.setValue('hero_image', publicUrlData.publicUrl);
    } catch (error) {
      alert('Error uploading hero image: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setUploadingHeroImage(false);
    }
  };

  // PDF upload logic (placeholder, adjust endpoint/fields as needed)
  const handlePDFDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadError(null);
    const file = e.dataTransfer.files[0];
    if (!file || !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'].includes(file.type)) {
      setUploadError('Please upload a valid PDF, DOC, DOCX, PPT, or PPTX file.');
      return;
    }
    await uploadPDF(file);
  };

  const handlePDFSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file || !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'].includes(file.type)) {
      setUploadError('Please upload a valid PDF, DOC, DOCX, PPT, or PPTX file.');
      return;
    }
    await uploadPDF(file);
  };

  const uploadPDF = async (file: File) => {
    setUploadingPDF(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      // You can add user email or other info if needed
      const res = await fetch('https://n8n-immersive-insights-dev.captain.digitalpfizer.com/webhook/ServicesCMS', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload PDF');
      const result = await res.json();

      // Handle both array and object response
      let outputString = null;
      if (Array.isArray(result) && result[0]?.output) {
        outputString = result[0].output;
      } else if (result.output) {
        outputString = result.output;
      }

      // Remove Markdown code block if present
      if (outputString && outputString.startsWith('```json')) {
        outputString = outputString.replace(/^```json\n?|```$/g, '').trim();
        if (outputString.endsWith('```')) {
          outputString = outputString.slice(0, -3).trim();
        }
      }

      if (outputString) {
        const data = JSON.parse(outputString);
        // Map extracted fields to form fields as appropriate
        if (data.title) form.setValue('title', data.title);
        if (data.slug) form.setValue('slug', data.slug);
        if (data.overview) form.setValue('overview', data.overview);
        if (data.description) form.setValue('description', data.description);
        // Only set features if both AI response has features and user has added features
        if (Array.isArray(data.features) && data.features.length > 0 && features.length > 0) {
          // Fill up to the number of features the user has added
          const filledFeatures = features.map((f, i) => data.features[i] || f);
          setFeatures(filledFeatures);
          form.setValue('features', JSON.stringify(filledFeatures));
        }
        if (data.technologies) form.setValue('technologies', JSON.stringify(data.technologies));
        // Add more mappings as needed
        toast({ title: 'PDF processed!', description: 'Service fields were auto-filled from your PDF.', variant: 'default' });
      } else {
        throw new Error('Unexpected response format from webhook');
      }
    } catch (err) {
      setUploadError('Failed to upload PDF.');
    } finally {
      setUploadingPDF(false);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    }
  };

  // Fetch icons from Supabase Storage
  const fetchIcons = async () => {
    setLoadingIcons(true);
    const { data, error } = await supabase.storage.from('icons').list('White Icons');
    if (data) {
      setIconOptions(
        data
          .filter(file => file.name.endsWith('.svg') || file.name.endsWith('.png') || file.name.endsWith('.jpg'))
          .map(file => supabase.storage.from('icons').getPublicUrl(`White Icons/${file.name}`).data.publicUrl)
      );
    }
    setLoadingIcons(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Service</h2>
      {/* PDF Upload Area for n8n */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">Service File (PDF, DOC, PPT, etc. - optional)</label>
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handlePDFDrop}
          className="my-2 p-4 border-2 border-dashed border-cyberpunk-magenta rounded bg-black/40 text-center cursor-pointer transition-all flex flex-col items-center"
          style={{ minHeight: 60 }}
          onClick={() => pdfInputRef.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="Upload File"
        >
          <span className="text-cyberpunk-magenta font-semibold text-sm mb-1">Drag & drop a PDF, DOC, DOCX, PPT, or PPTX or <span className="underline">click to upload</span></span>
          <span className="text-gray-400 text-xs mb-1">We'll extract service details for you.</span>
          {uploadingPDF && (
            <span className="text-cyberpunk-magenta text-xs mt-1 flex items-center gap-2">
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Uploading
            </span>
          )}
          {uploadError && <span className="text-red-400 text-xs mt-1">{uploadError}</span>}
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            className="hidden"
            onChange={handlePDFSelect}
          />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Service title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormControl>
                    <Input placeholder="service-slug" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const title = form.getValues('title');
                      if (title) {
                        const slug = title
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-');
                        form.setValue('slug', slug);
                      }
                    }}
                  >
                    Generate Slug
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Service description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hero_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <div className="space-y-4">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={async e => {
                      e.preventDefault();
                      if (uploadingHeroImage) return;
                      const file = e.dataTransfer.files[0];
                      if (!file || !file.type.startsWith('image/')) return;
                      await handleHeroImageUpload(file);
                    }}
                    className={`flex items-center justify-center w-full h-10 border-2 border-dashed rounded cursor-pointer transition-all border-cyberpunk-magenta bg-gray-900 ${uploadingHeroImage ? 'opacity-60 pointer-events-none' : ''}`}
                    style={{ minHeight: 40 }}
                    onClick={() => document.getElementById('heroImageUpload')?.click()}
                    tabIndex={0}
                    role="button"
                    aria-label="Upload Hero Image"
                  >
                    {uploadingHeroImage ? (
                      <><Loader2 className="h-4 w-4 mr-2 text-cyberpunk-magenta animate-spin" /><span className="text-cyberpunk-magenta">Uploading...</span></>
                    ) : (
                      <><ImageUp className="h-4 w-4 mr-2 text-cyberpunk-magenta" /><span className="text-cyberpunk-magenta">Drag & drop or click to upload image</span></>
                    )}
                    <Input
                      id="heroImageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleHeroImageUpload}
                      disabled={uploadingHeroImage}
                    />
                  </div>
                  {field.value && (
                    <div className="relative h-40 w-full bg-gray-900 rounded-md overflow-hidden border border-gray-700">
                      <img
                        src={field.value}
                        alt="Hero"
                        className="h-full w-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Error+Loading+Image";
                        }}
                      />
                    </div>
                  )}
                  <input type="hidden" {...field} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overview</FormLabel>
                <FormControl>
                  <Textarea placeholder="Service overview" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Features</FormLabel>
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-2 items-start bg-gray-900 p-4 rounded-md border border-gray-700 relative">
                  <div className="flex-1">
                    <Input
                      className="mb-2"
                      placeholder="Feature title"
                      value={feature.title}
                      onChange={e => {
                        const newFeatures = [...features];
                        newFeatures[idx].title = e.target.value;
                        setFeatures(newFeatures);
                      }}
                    />
                    <Input
                      placeholder="Feature description"
                      value={feature.description}
                      onChange={e => {
                        const newFeatures = [...features];
                        newFeatures[idx].description = e.target.value;
                        setFeatures(newFeatures);
                      }}
                    />
                  </div>
                  {/* Icon picker for this feature */}
                  <div className="flex flex-col items-center ml-2">
                    {feature.icon && (
                      <img src={feature.icon} alt="Feature Icon" className="w-8 h-8 border rounded mb-1" />
                    )}
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={async () => {
                        await fetchIcons();
                        setFeatureIconModalOpen(idx);
                      }}
                    >
                      {feature.icon ? 'Change Icon' : 'Pick Icon'}
                    </Button>
                    {feature.icon && (
                      <button
                        type="button"
                        className="mt-1 text-red-400 hover:text-red-600 text-xs"
                        onClick={() => {
                          const newFeatures = [...features];
                          newFeatures[idx].icon = '';
                          setFeatures(newFeatures);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-red-400 hover:text-red-600"
                    onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                    aria-label="Remove feature"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  {/* Icon picker modal for this feature */}
                  <Dialog open={featureIconModalOpen === idx} onOpenChange={open => setFeatureIconModalOpen(open ? idx : null)}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Choose an Icon for Feature</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                        {loadingIcons ? (
                          <span>Loading...</span>
                        ) : (
                          iconOptions.map(url => (
                            <img
                              key={url}
                              src={url}
                              alt="icon"
                              className="w-12 h-12 cursor-pointer border rounded hover:border-cyberpunk-magenta"
                              onClick={() => {
                                const newFeatures = [...features];
                                newFeatures[idx].icon = url;
                                setFeatures(newFeatures);
                                setFeatureIconModalOpen(null);
                              }}
                            />
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => setFeatures([...features, { title: '', description: '' }])}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Feature
              </Button>
            </div>
          </div>
          <div>
            <FormLabel>Technologies</FormLabel>
            <div className="space-y-4">
              {technologies.map((tech, idx) => (
                <div key={idx} className="flex gap-2 items-start bg-gray-900 p-4 rounded-md border border-gray-700 relative">
                  <div className="flex-1">
                    <Input
                      className="mb-2"
                      placeholder="Technology name"
                      value={tech.name}
                      onChange={e => {
                        const newTech = [...technologies];
                        newTech[idx].name = e.target.value;
                        setTechnologies(newTech);
                      }}
                    />
                    <Input
                      placeholder="Icon URL"
                      value={tech.icon}
                      onChange={e => {
                        const newTech = [...technologies];
                        newTech[idx].icon = e.target.value;
                        setTechnologies(newTech);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-red-400 hover:text-red-600"
                    onClick={() => setTechnologies(technologies.filter((_, i) => i !== idx))}
                    aria-label="Remove technology"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => setTechnologies([...technologies, { name: '', icon: '' }])}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Technology
              </Button>
            </div>
          </div>
          <div>
            <FormLabel>Gallery Images</FormLabel>
            <div className="space-y-4">
              {galleryImages.map((url, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-gray-900 p-4 rounded-md border border-gray-700 relative">
                  <Input
                    className="flex-1"
                    placeholder="Image URL"
                    value={url}
                    onChange={e => {
                      const newImages = [...galleryImages];
                      newImages[idx] = e.target.value;
                      setGalleryImages(newImages);
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 text-red-400 hover:text-red-600"
                    onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                    aria-label="Remove gallery image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => setGalleryImages([...galleryImages, ''])}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Gallery Image
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name="service_icons"
            render={({ field }) => {
              // Parse the value as an array
              let iconArr: string[] = [];
              try {
                iconArr = field.value ? JSON.parse(field.value) : [];
              } catch {
                iconArr = [];
              }
              return (
                <FormItem>
                  <FormLabel>Service Icon</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Icon URL"
                      value={iconArr[0] || ''}
                      onChange={e => {
                        const icons = iconArr;
                        icons[0] = e.target.value;
                        form.setValue('service_icons', JSON.stringify(icons));
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={async () => {
                        await fetchIcons();
                        setServiceIconModalOpen(true);
                      }}
                    >
                      Choose Icon
                    </Button>
                    {iconArr[0] && (
                      <div className="relative ml-2">
                        <img src={iconArr[0]} alt="Selected Icon" className="w-8 h-8 border rounded" />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                          onClick={() => {
                            const icons = [...iconArr];
                            icons.splice(0, 1);
                            form.setValue('service_icons', JSON.stringify(icons));
                          }}
                          aria-label="Delete selected icon"
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                  <Dialog open={serviceIconModalOpen} onOpenChange={setServiceIconModalOpen}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Choose an Icon</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                        {loadingIcons ? (
                          <span>Loading...</span>
                        ) : (
                          iconOptions.map(url => (
                            <img
                              key={url}
                              src={url}
                              alt="icon"
                              className="w-12 h-12 cursor-pointer border rounded hover:border-cyberpunk-magenta"
                              onClick={() => {
                                const icons = iconArr;
                                icons[0] = url;
                                form.setValue('service_icons', JSON.stringify(icons));
                                setServiceIconModalOpen(false);
                              }}
                            />
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="featured_images"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Featured Images</FormLabel>
                  <div className="space-y-4">
                    {field.value.split(',').map((url: string, idx: number) => (
                      <div key={idx} className="flex gap-2 items-center bg-gray-900 p-4 rounded-md border border-gray-700 relative">
                        <Input
                          className="flex-1"
                          placeholder="Image URL"
                          value={url}
                          onChange={e => {
                            const newImages = [...field.value.split(',')];
                            newImages[idx] = e.target.value;
                            field.onChange(newImages.join(','));
                          }}
                        />
                        <button
                          type="button"
                          className="ml-2 text-red-400 hover:text-red-600"
                          onClick={() => {
                            const newImages = field.value.split(',').filter((_, i) => i !== idx);
                            field.onChange(newImages.join(','));
                          }}
                          aria-label="Remove featured image"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-2"
                      onClick={() => field.onChange([...field.value.split(','), ''])}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Featured Image
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="thumbnail_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="background_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? (initialData ? 'Saving...' : 'Submitting...') : (initialData ? 'Confirm Edit' : 'Create Service')}
          </Button>
          {success && <div className="text-green-400 mt-2">Service created successfully!</div>}
          {initialData && initialData.id && (
            <Button type="button" variant="destructive" className="w-full" onClick={async () => {
              if (!window.confirm('Are you sure you want to delete this service?')) return;
              setIsSubmitting(true);
              try {
                const { error } = await supabase.from('service_details').delete().eq('id', initialData.id);
                if (error) throw error;
                if (onDelete) onDelete();
              } catch (error) {
                alert('Error deleting service: ' + (error instanceof Error ? error.message : 'Unknown error'));
              } finally {
                setIsSubmitting(false);
              }
            }}>
              Delete Service
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ServiceAdminForm;
