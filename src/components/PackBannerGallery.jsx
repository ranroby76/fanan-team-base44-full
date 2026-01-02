import React, { useState, useEffect } from "react";

export default function PackBannerGallery({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter products with images
  const productImages = products
    .filter(p => p.main_image)
    .map(p => ({ image: p.main_image, title: p.title }));

  // Auto-cycle through images
  useEffect(() => {
    if (productImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % productImages.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [productImages.length]);

  if (productImages.length === 0) return null;

  return (
    <div className="relative w-full h-64 md:h-96 mb-10 overflow-hidden rounded-lg shadow-2xl bg-black/20">
      {/* Main Image Display */}
      <div className="relative w-full h-full flex items-center justify-center">
        {productImages.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full object-contain p-4"
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {productImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {productImages.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex(prev => (prev - 1 + productImages.length) % productImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % productImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}