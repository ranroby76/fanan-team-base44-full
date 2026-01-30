import React from "react";
import ProductPage from "../components/ProductPage";

export default function Product() {
  // Get slug from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  if (!slug) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-muted-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">No product specified.</p>
      </div>
    );
  }
  
  return <ProductPage slug={slug} />;
}