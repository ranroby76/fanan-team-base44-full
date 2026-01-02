import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function MaxPack() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'Max! Pack'],
    queryFn: async () => {
      const all = await base44.entities.Product.list({ limit: 1000 });
      return all
        .filter(p => p.pack === "Max! Pack")
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Header Image */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg h-auto">
          <img
            src="https://fananteam.com/images/pro%20pack.png"
            alt="Max! Pack Logo"
            className="object-contain w-full h-auto"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {products.map((product) => (
          <div 
            key={product.id}
            className="rounded-lg border border-border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden break-inside-avoid group flex flex-col"
          >
            <Link to={product.page_slug ? `/${product.page_slug}` : "#"} className="flex flex-col h-full">
              {/* Image Container */}
              <div className="relative overflow-hidden bg-muted">
                <img
                  src={product.main_image}
                  alt={product.title}
                  className="object-contain w-full h-auto p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col space-y-1.5 flex-grow p-4 bg-muted">
                <h2 className="tracking-tight text-xl font-bold font-headline text-primary truncate transition-colors">
                  {product.title}
                </h2>
                <p className="text-sm text-foreground/80 h-10 line-clamp-2">
                  {product.short_description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center p-3 border-t border-border bg-muted/30 mt-auto">
                <p className="text-base text-muted-foreground text-center truncate w-full">
                  {Array.isArray(product.formats) ? product.formats.join(" | ") : product.formats}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}