import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AddPackForm({ onClose }) {
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      pack_name: "",
      price: "",
      logo_url: ""
    }
  });

  const createPackMutation = useMutation({
    mutationFn: (data) => base44.entities.PackPrice.create({
      pack_name: data.pack_name,
      price: parseFloat(data.price),
      logo_url: data.logo_url
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packPrices'] });
      toast.success("Pack created successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to create pack: " + error.message);
    }
  });

  const onSubmit = (data) => {
    createPackMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-primary/20 animate-in fade-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <CardTitle className="text-2xl font-headline text-primary">Add New Pack</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} className="gap-2" disabled={createPackMutation.isPending}>
              <Save className="w-4 h-4" /> Create Pack
            </Button>
          </div>
        </CardHeader>
        
        <ScrollArea className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-lg font-bold">Pack Name *</Label>
              <Input 
                {...register("pack_name", { required: "Pack name is required" })} 
                placeholder="e.g. New Pack" 
              />
              {errors.pack_name && (
                <p className="text-sm text-destructive">{errors.pack_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-bold">Pack Price (USD) *</Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl">$</span>
                <Input 
                  type="number" 
                  step="0.01"
                  {...register("price", { 
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" }
                  })} 
                  placeholder="22.00" 
                  className="text-xl"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-bold">Pack Logo/Banner URL</Label>
              <Input 
                {...register("logo_url")} 
                placeholder="https://example.com/pack-logo.png" 
              />
              <p className="text-sm text-muted-foreground">
                Optional: URL of the pack logo or banner image
              </p>
            </div>
          </form>
        </ScrollArea>
      </Card>
    </div>
  );
}