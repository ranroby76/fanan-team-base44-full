import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const PACK_NAME = "Colosseum";

export default function ColosseumPack() {
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products', PACK_NAME],
    queryFn: async () => {
      const allProducts = await base44.entities.Product.filter({ pack: PACK_NAME, is_hidden: { $ne: true } });
      return allProducts.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    },
    staleTime: 300000,
    gcTime: 600000,
  });

  // Fetch pack info for logo
  const { data: packInfo } = useQuery({
    queryKey: ['packPrice', PACK_NAME],
    queryFn: async () => {
      const packs = await base44.entities.PackPrice.filter({ pack_name: PACK_NAME });
      return packs[0] || null;
    },
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive mb-4">Failed to load products</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Pack Header */}
      <div className="flex justify-center mb-8">
        {packInfo?.logo_url ? (
          <img 
            src={packInfo.logo_url} 
            alt={PACK_NAME} 
            className="h-32 w-auto object-contain"
          />
        ) : (
          <h1 className="text-4xl font-bold text-primary">{PACK_NAME} Pack</h1>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No products available in this pack yet.
        </div>
      )}
    </div>
  );
}