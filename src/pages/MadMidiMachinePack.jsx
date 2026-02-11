import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const PACK_NAME = "Mad MIDI Machines";

export default function MadMidiMachinePack() {
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products', PACK_NAME],
    queryFn: async () => {
      // Direct entity fetch - much faster than backend function
      const rawData = await base44.entities.Product.filter({ pack: PACK_NAME, is_hidden: false });
      // Flatten data structure if nested
      const data = rawData.map(p => {
        const d = p.data || p;
        return { id: p.id, ...d };
      });
      return data.sort((a, b) => {
        const orderA = typeof a.display_order === 'number' ? a.display_order : 999;
        const orderB = typeof b.display_order === 'number' ? b.display_order : 999;
        return orderA - orderB;
      });
    },
    staleTime: 300000, // Cache for 5 minutes
    gcTime: 600000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
           <AlertCircle className="w-12 h-12 text-destructive" />
           <h2 className="text-2xl font-bold">Error Loading Products</h2>
           <p className="text-muted-foreground">{error.message}</p>
           <Button onClick={() => refetch()}>Try Again</Button>
        </div>
     );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Header Image - Full Width Banner */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-4xl h-auto">
          <img
            src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/mad%20midi%20machines.png"
            alt="Mad MIDI Machines Pack Logo"
            className="object-contain w-full h-auto shadow-xl rounded-lg bg-black/20"
          />
        </div>
      </div>



      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}