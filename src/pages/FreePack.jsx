import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

export default function FreePack() {
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products', 'Free Pack'],
    queryFn: async () => {
      const { data } = await base44.functions.invoke('getProducts');
      if (!Array.isArray(data)) throw new Error("Invalid data format received");

      // Deduplicate products
      const seen = new Set();
      const uniqueData = data.filter(p => {
        if (!p.title) return false;
        if (seen.has(p.title)) return false;
        seen.add(p.title);
        return true;
      });

      return uniqueData
        .filter(p => p.pack === "Free Pack")
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    initialData: [],
    staleTime: 0,
    refetchOnWindowFocus: true
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
            src="https://fananteam.com/images/free%20pack.png"
            alt="Free Pack Logo"
            className="object-contain w-full h-auto shadow-xl rounded-lg bg-black/20"
          />
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No products found in this pack.</p>
        </div>
      )}
    </div>
  );
}