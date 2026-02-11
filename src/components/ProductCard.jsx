import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const COMING_SOON_BANNER = "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/COMING%20SOON%20BANNER.png";

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Combine main image and gallery images into one array
  // Filter out empty strings or nulls
  const images = [
    product.main_image,
    ...(Array.isArray(product.gallery_images) ? product.gallery_images : [])
  ].filter(img => img && typeof img === 'string' && img.trim() !== "");

  // Cycle images on hover
  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 1500); // Switch every 1.5 seconds
    } else {
      setCurrentImageIndex(0); // Reset to main image when not hovering
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div 
      className="rounded-lg border border-border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={product.page_slug ? `/${product.page_slug}` : `/Product?slug=${encodeURIComponent(product.title)}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="aspect-video relative overflow-hidden bg-muted flex items-center justify-center bg-black/5">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={`${product.title} view ${currentImageIndex + 1}`}
              className="object-contain w-full h-full p-1 transition-opacity duration-300"
            />
          ) : (
            <div className="text-muted-foreground text-sm">No Image</div>
          )}

          {/* Coming Soon Banner */}
          {product.is_coming_soon && (
            <img 
              src={COMING_SOON_BANNER} 
              alt="Coming Soon" 
              className="absolute top-2 right-2 pointer-events-none"
              style={{ width: '20%', height: 'auto' }}
            />
          )}
          
          {/* Gallery Indicator (only if multiple images) */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex gap-1 bg-black/20 p-1 rounded-full backdrop-blur-sm">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors ${idx === currentImageIndex ? 'bg-primary' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col space-y-1.5 flex-grow p-4 bg-muted/50">
          <h2 className="tracking-tight text-2xl font-bold font-headline text-primary truncate transition-colors">
            {product.title}
          </h2>
          <p className="text-base text-foreground/80 line-clamp-2 min-h-[3rem]">
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
  );
}