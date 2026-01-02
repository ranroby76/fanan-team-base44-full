import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function EditProduct({ product, onClose }) {
  const queryClient = useQueryClient();
  const { register, control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      ...product,
      gallery_images: product.gallery_images || [],
      features: product.features || [],
      versions: product.versions || [],
      formats: product.formats || [],
    }
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features"
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control,
    name: "gallery_images" // treating as array of strings, but useFieldArray works best with objects. convert carefully.
    // Actually simpler to manage primitive arrays with a custom component or mapped inputs if not using field array objects.
    // But let's try to stick to react-hook-form patterns.
    // Since simple string array is tricky with useFieldArray (needs object wrapper), I'll handle it manually or wrap/unwrap.
    // Let's wrap it on init and unwrap on submit.
  });

  // Helper for simple arrays (features, gallery)
  const [featuresList, setFeaturesList] = React.useState(product.features || []);
  const [galleryList, setGalleryList] = React.useState(product.gallery_images || []);
  const [versionsList, setVersionsList] = React.useState(product.versions || []);

  const updateProductMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.update(product.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product updated successfully");
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to update product: " + error.message);
    }
  });

  const onSubmit = (data) => {
    // Merge manual lists back
    const finalData = {
      ...data,
      features: featuresList,
      gallery_images: galleryList,
      versions: versionsList
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
            <CardTitle className="text-2xl font-headline text-primary">Edit: {product.title}</CardTitle>
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
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Product Title</Label>
                <Input {...register("title", { required: true })} />
              </div>
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input {...register("short_description")} />
              </div>
              <div className="space-y-2">
                <Label>Pack</Label>
                <Controller
                  control={control}
                  name="pack"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Pack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mad MIDI Machines">Mad MIDI Machines</SelectItem>
                        <SelectItem value="Max! Pack">Max! Pack</SelectItem>
                        <SelectItem value="Free Pack">Free Pack</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input {...register("price")} />
              </div>
              <div className="space-y-2">
                <Label>Buy Link</Label>
                <Input {...register("buy_link")} />
              </div>
              <div className="space-y-2">
                <Label>Demo Link</Label>
                <Input {...register("demo_link")} />
              </div>
               <div className="space-y-2">
                <Label>Page Slug (Internal ID)</Label>
                <Input {...register("page_slug")} placeholder="e.g. Playlisted2" />
              </div>
            </div>

            {/* Formats Checkboxes */}
            <div className="space-y-3 border p-4 rounded-lg bg-muted/10">
              <Label className="text-base font-semibold">Formats</Label>
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

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Main Image URL</Label>
                <div className="flex gap-2">
                  <Input {...register("main_image")} className="flex-1" />
                  {watch("main_image") && (
                    <img src={watch("main_image")} alt="Preview" className="h-10 w-10 object-contain rounded border bg-muted" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <div className="space-y-2">
                  {galleryList.map((url, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input 
                        value={url} 
                        onChange={(e) => {
                          const newList = [...galleryList];
                          newList[idx] = e.target.value;
                          setGalleryList(newList);
                        }} 
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => setGalleryList(galleryList.filter((_, i) => i !== idx))}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => setGalleryList([...galleryList, ""])}>
                    <Plus className="w-4 h-4 mr-2" /> Add Image
                  </Button>
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-2">
              <Label>Long Description (HTML)</Label>
              <div className="h-64 mb-12">
                <Controller
                  name="long_description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill theme="snow" value={field.value || ""} onChange={field.onChange} className="h-full" />
                  )}
                />
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 mt-8">
              <Label>Features</Label>
              <div className="space-y-2">
                {featuresList.map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input 
                      value={feature} 
                      onChange={(e) => {
                        const newList = [...featuresList];
                        newList[idx] = e.target.value;
                        setFeaturesList(newList);
                      }} 
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => setFeaturesList(featuresList.filter((_, i) => i !== idx))}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setFeaturesList([...featuresList, ""])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Feature
                </Button>
              </div>
            </div>

            {/* Supported Formats Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Supported Audio Formats</Label>
                <Input {...register("supported_audio_formats")} />
              </div>
              <div className="space-y-2">
                <Label>Supported Video Formats</Label>
                <Input {...register("supported_video_formats")} />
              </div>
            </div>

            {/* Versions */}
             <div className="space-y-2">
              <Label>Versions</Label>
              <div className="space-y-3">
                {versionsList.map((ver, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                      <Input 
                        placeholder="Version Name (e.g. Free Mode)" 
                        value={ver.name} 
                        onChange={(e) => {
                          const newList = [...versionsList];
                          newList[idx] = { ...ver, name: e.target.value };
                          setVersionsList(newList);
                        }} 
                      />
                    </div>
                    <div className="col-span-7">
                       <Input 
                        placeholder="Description" 
                        value={ver.desc} 
                        onChange={(e) => {
                          const newList = [...versionsList];
                          newList[idx] = { ...ver, desc: e.target.value };
                          setVersionsList(newList);
                        }} 
                      />
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="ghost" size="icon" onClick={() => setVersionsList(versionsList.filter((_, i) => i !== idx))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setVersionsList([...versionsList, { name: "", desc: "" }])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Version
                </Button>
              </div>
            </div>

          </form>
        </ScrollArea>
      </Card>
    </div>
  );
}