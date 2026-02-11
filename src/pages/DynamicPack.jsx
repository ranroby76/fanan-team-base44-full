import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

export default function DynamicPack() {
  // Extract pack name from URL (e.g., /ColosseumPack -> Colosseum)
  const path = window.location.pathname;
  const packSlug = path.replace(/^\//, '').replace(/Pack$/i, '');
  
  // Fetch all packs to find the matching one
  const { data: allPacks = [] } = useQuery({
    queryKey: ['allPackPrices'],
    queryFn: () => base44.entities.PackPrice.list(),
    staleTime: 300000,
  });

  // Find the pack that matches the URL
  const matchedPack = React.useMemo(() => {
    const normalizedSlug = packSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
    return allPacks.find(p => {
      const normalizedPackName = p.pack_name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normalizedPackName === normalizedSlug || 
             normalizedPackName.includes(normalizedSlug) ||
             normalizedSlug.includes(normalizedPackName);
    });
  }, [allPacks, packSlug]);

  const packName = matchedPack?.pack_name || packSlug;

  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products', packName],
    queryFn: async () => {
      const allProducts = await base44.entities.Product.filter({ pack: packName, is_hidden: { $ne: true } });
      return allProducts.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    },
    staleTime: 300000,
    gcTime: 600000,
    enabled: !!packName,
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
        {matchedPack?.logo_url ? (
          <img 
            src={matchedPack.logo_url} 
            alt={packName} 
            className="h-32 w-auto object-contain"
          />
        ) : (
          <h1 className="text-4xl font-bold text-primary">{packName} Pack</h1>
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