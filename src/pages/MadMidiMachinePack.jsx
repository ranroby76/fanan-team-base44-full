import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";


export default function MadMidiMachinePack() {
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products', 'Mad MIDI Machines'],
    queryFn: async () => {
      const { data } = await base44.functions.invoke('getProducts');
      if (!Array.isArray(data)) throw new Error("Invalid data format received");

      console.log('Mad MIDI Machines - Raw data:', data.filter(p => p.pack === "Mad MIDI Machines").map(p => `${p.title}: display_order=${p.display_order}`));

      // Deduplicate products
      const seen = new Set();
      const uniqueData = data.filter(p => {
        if (!p.title) return false;
        if (seen.has(p.title)) return false;
        seen.add(p.title);
        return true;
      });

      const sorted = uniqueData
        .filter(p => p.pack === "Mad MIDI Machines" && !p.is_hidden)
        .sort((a, b) => {
          const orderA = typeof a.display_order === 'number' ? a.display_order : 999;
          const orderB = typeof b.display_order === 'number' ? b.display_order : 999;
          return orderA - orderB;
        });
      
      console.log('Mad MIDI Machines - After sort:', sorted.map(p => `${p.title}: display_order=${p.display_order}`));
      return sorted;
    },
    initialData: [],
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
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