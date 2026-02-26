import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ImageUploader from "../ImageUploader";

// Helper to ensure array has fixed size with empty placeholders
const ensureArraySize = (arr, size, fill) => {
  const res = Array.isArray(arr) ? [...arr] : [];
  while (res.length < size) res.push(fill);
  return res.slice(0, size);
};

export default function EditProduct({ product, onClose }) {
  const queryClient = useQueryClient();

  // Fetch all packs from database
  const { data: packs = [] } = useQuery({
    queryKey: ['packPrices'],
    queryFn: () => base44.entities.PackPrice.list(),
  });

  const allPackNames = React.useMemo(() => {
    const hardcoded = ["Mad MIDI Machines", "Max! Pack", "Free Pack"];
    const dbPacks = packs.map(p => p.pack_name);
    return [...new Set([...hardcoded, ...dbPacks])];
  }, [packs]);
  
  // Prepare default values
  const defaultValues = {
    ...product,
    title: product.title || "",
    short_description: product.short_description || "",
    pack: product.pack || "Mad MIDI Machines",
    buy_link: product.buy_link || "/BuyNow",
    demo_link: product.demo_link || "",
    page_slug: product.page_slug || "",
    long_description: product.long_description || "",
    supported_audio_formats: product.supported_audio_formats || "",
    supported_video_formats: product.supported_video_formats || "",
    formats: product.formats || [],
    download_links: ensureArraySize(product.download_links, 4, { label: "", url: "" }),
    youtube_links: ensureArraySize(product.youtube_links, 4, ""),
  };

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues
  });

  // Reset form when product changes
  useEffect(() => {
    const newDefaults = {
      ...product,
      title: product.title || "",
      short_description: product.short_description || "",
      pack: product.pack || "Mad MIDI Machines",
      buy_link: product.buy_link || "/BuyNow",
      demo_link: product.demo_link || "",
      page_slug: product.page_slug || "",
      long_description: product.long_description || "",
      supported_audio_formats: product.supported_audio_formats || "",
      supported_video_formats: product.supported_video_formats || "",
      formats: product.formats || [],
      download_links: ensureArraySize(product.download_links, 4, { label: "", url: "" }),
      youtube_links: ensureArraySize(product.youtube_links, 4, ""),
    };
    reset(newDefaults);
    setImage1(product.main_image || "");
    setGalleryImages(ensureArraySize(product.gallery_images, 6, ""));
  }, [product, reset]);

  // Manage images state for 7 slots (1 main + 6 gallery)
  const [image1, setImage1] = React.useState(product.main_image || "");
  const [galleryImages, setGalleryImages] = React.useState(ensureArraySize(product.gallery_images, 6, ""));

  const setGalleryImage = (idx, val) => {
    const newGallery = [...galleryImages];
    newGallery[idx] = val;
    setGalleryImages(newGallery);
  };

  const updateProductMutation = useMutation({
    mutationFn: async (data) => {
      // Auto-generate page_slug from title if not set
      if (!data.page_slug && data.title) {
        data.page_slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      
      if (product.id) {
        return base44.entities.Product.update(product.id, data);
      } else {
        return base44.entities.Product.create(data);
      }
    },
    onMutate: async (newProductData) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      await queryClient.cancelQueries({ queryKey: ['products-admin'] });
      const previousProducts = queryClient.getQueryData(['products']);
      const previousAdminProducts = queryClient.getQueryData(['products-admin']);
      
      const updateData = (old) => {
        if (!old) return [];
        if (product.id) {
           return old.map(p => p.id === product.id ? { ...p, ...newProductData } : p);
        } else {
           return [...old, { ...newProductData, id: 'temp-' + Date.now() }];
        }
      };

      queryClient.setQueryData(['products'], updateData);
      queryClient.setQueryData(['products-admin'], updateData);

      return { previousProducts, previousAdminProducts };
    },
    onSuccess: (savedProduct, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products-admin'] });
      const slug = variables.page_slug || variables.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      toast.success(
        product.id 
          ? "Product updated successfully" 
          : `Product created! Access it at /${slug}`
      );
      onClose();
    },
    onError: (error, variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      if (context?.previousAdminProducts) {
        queryClient.setQueryData(['products-admin'], context.previousAdminProducts);
      }
      toast.error("Failed to save product: " + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products-admin'] });
    }
  });

  const onSubmit = (data) => {
    // Construct final data matching requirements
    const finalData = {
      ...data,
      main_image: image1,
      gallery_images: galleryImages.filter(img => img && img.trim() !== ""),
      // Filter empty links for cleaner DB, but ensure structure
      download_links: data.download_links.filter(l => l.label || l.url), 
      youtube_links: data.youtube_links.filter(l => l && l.trim() !== "")
    };
    updateProductMutation.mutate(finalData);
  };

  const handleFormatChange = (format, checked) => {
    const currentFormats = watch("formats") || [];
    if (checked) {
      setValue("formats", [...currentFormats, format]);
    } else {
      setValue("formats", currentFormats.filter(f => f !== format));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border-primary/20 animate-in fade-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <CardTitle className="text-2xl font-headline text-primary">{product.id ? `Edit: ${product.title}` : 'Create New Product'}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} className="gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
            
            {/* 1. Product Title */}
            <div className="space-y-2">
              <Label className="text-lg font-bold">Product Title</Label>
              <Input {...register("title", { required: true })} placeholder="Product Name" />
            </div>

            {/* 2. Short Description */}
            <div className="space-y-2">
              <Label className="text-lg font-bold">Short Description</Label>
              <p className="text-sm text-muted-foreground">Brief description shown on product cards and gallery banners</p>
              <Input {...register("short_description")} placeholder="Brief description for cards" />
            </div>

            {/* 3. Product Pack */}
            <div className="space-y-2">
              <Label className="text-lg font-bold">Product Pack</Label>
              <Controller
                control={control}
                name="pack"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Pack" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPackNames.map(packName => (
                        <SelectItem key={packName} value={packName}>
                          {packName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Coming Soon Toggle */}
            <div className="flex items-center space-x-3 p-4 border rounded-lg bg-muted/10">
              <Controller
                control={control}
                name="is_coming_soon"
                render={({ field }) => (
                  <Checkbox 
                    id="is_coming_soon" 
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="is_coming_soon" className="text-lg font-bold cursor-pointer">
                🚀 Coming Soon
              </Label>
              <span className="text-sm text-muted-foreground">
                Shows "Coming Soon" banner on product card and page
              </span>
            </div>

            {/* 4. Formats */}
            <div className="space-y-3 border p-4 rounded-lg bg-muted/10">
              <Label className="text-lg font-bold">Formats</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["VST", "VSTi", "Windows 32bit", "Windows 64bit", "Mac", "CLAP", "AU", "Stand-Alone"].map(fmt => (
                  <div key={fmt} className="flex items-center space-x-2">
                    <Checkbox 
                      id={fmt} 
                      checked={(watch("formats") || []).includes(fmt)}
                      onCheckedChange={(checked) => handleFormatChange(fmt, checked)}
                    />
                    <Label htmlFor={fmt} className="cursor-pointer">{fmt}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Uploader */}
            <ImageUploader />

            {/* 5-11. Images 1-7 */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Images</h3>
              <p className="text-sm text-muted-foreground">Use the uploader above to get reliable URLs, then paste them here</p>
              
              <div className="space-y-2">
                <Label>Image 1 (Main)</Label>
                <div className="flex gap-2">
                  <Input value={image1} onChange={e => setImage1(e.target.value)} placeholder="Main Image URL" />
                  {image1 && <img src={image1} className="h-10 w-10 object-contain bg-muted" alt="1" />}
                </div>
              </div>

              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="space-y-2">
                  <Label>Image {idx + 2} of the gallery</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={galleryImages[idx] || ""} 
                      onChange={e => setGalleryImage(idx, e.target.value)} 
                      placeholder={`Gallery Image ${idx + 2} URL`} 
                    />
                    {galleryImages[idx] && <img src={galleryImages[idx]} className="h-10 w-10 object-contain bg-muted" alt={`${idx+2}`} />}
                  </div>
                </div>
              ))}
            </div>

            {/* 12. About this Plugin (Main Description) */}
            <div className="space-y-2">
              <Label className="text-lg font-bold">About this Plugin</Label>
              <p className="text-sm text-muted-foreground">Main product description. Use "##" for titles and "#" for list items.</p>
              <textarea 
                {...register("long_description")} 
                className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="## Overview&#10;This is a great plugin...&#10;&#10;## Key Features&#10;# Feature 1&#10;# Feature 2"
              />
            </div>

            {/* 13-20. Download Links (4 pairs) */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Download Links</h3>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded">
                  <div className="space-y-2">
                    <Label>Download link {i + 1} label</Label>
                    <Controller
                      control={control}
                      name={`download_links.${i}.label`}
                      render={({ field }) => (
                        <Input {...field} value={field.value || ""} placeholder={`e.g. Download VST (Win)`} />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Download link {i + 1}</Label>
                    <Controller
                      control={control}
                      name={`download_links.${i}.url`}
                      render={({ field }) => (
                        <Input {...field} value={field.value || ""} placeholder="https://..." />
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 21-24. YouTube Video Links */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="text-lg font-bold">YouTube Videos</h3>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <Label>YouTube video {i + 1} link</Label>
                  <Input {...register(`youtube_links.${i}`)} placeholder="https://youtube.com/watch?v=..." />
                </div>
              ))}
            </div>

            {/* Other Fields - Links, Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-2">
                <Label>Buy Link</Label>
                <Input {...register("buy_link")} />
              </div>
              <div className="space-y-2">
                <Label>Demo Link</Label>
                <Input {...register("demo_link")} />
              </div>
              <div className="space-y-2">
                <Label>Demo Limitations Text</Label>
                <Input {...register("demo_limitations")} placeholder="e.g. Occasional silence / Limited features" />
              </div>
               <div className="space-y-2">
                <Label>Page Slug (Internal ID)</Label>
                <Input {...register("page_slug")} placeholder="e.g. Playlisted2" />
              </div>
               <div className="space-y-2">
                <Label>Supported Audio Formats</Label>
                <Input {...register("supported_audio_formats")} />
              </div>
               <div className="space-y-2">
                <Label>Supported Video Formats</Label>
                <Input {...register("supported_video_formats")} />
              </div>
            </div>

          </form>
        </ScrollArea>
      </Card>
    </div>
  );
}