import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MadMidiMachinePack() {
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products', 'Mad MIDI Machines'],
    queryFn: async () => {
      const { data } = await base44.functions.invoke('getProducts');
      if (!Array.isArray(data)) throw new Error("Invalid data format received");
      
      return data
        .filter(p => p.pack === "Mad MIDI Machines")
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
      {/* Header Image */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg h-auto">
          <img
            src="https://fananteam.com/images/mad%20midi%20machines.png"
            alt="Mad MIDI Machines Pack Logo"
            className="object-contain w-full h-auto"
          />
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="rounded-lg border border-border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              <Link to={product.page_slug ? `/${product.page_slug}` : "#"} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="aspect-video relative overflow-hidden bg-muted flex items-center justify-center">
                  {product.main_image ? (
                    <img
                      src={product.main_image}
                      alt={product.title}
                      className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm">No Image</div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col space-y-1.5 flex-grow p-4 bg-muted/50">
                  <h2 className="tracking-tight text-xl font-bold font-headline text-primary truncate transition-colors">
                    {product.title}
                  </h2>
                  <p className="text-sm text-foreground/80 line-clamp-2 min-h-[2.5rem]">
                    {product.short_description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center p-3 border-t border-border bg-muted/30 mt-auto">
                  <p className="text-xs text-muted-foreground text-center truncate w-full">
                    {Array.isArray(product.formats) ? product.formats.join(" | ") : product.formats}
                  </p>
                </div>
              </Link>
            </div>
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