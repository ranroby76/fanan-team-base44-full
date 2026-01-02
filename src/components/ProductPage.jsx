import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ShoppingCart, Info, CheckCircle2, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function ProductPage({ 
  productName, 
  productDescription, 
  productImage, 
  galleryImages = [], 
  features = [], 
  supportedFormats = { audio: "MP3, WAV, AIFF, FLAC, OGG, M4A", video: "MP4, AVI, MOV, MKV, WEBM, MPG" },
  versions = [
    { name: "Free Mode", desc: "Fully functional, limited tracks." },
    { name: "Pro Mode", desc: "Unlocks unlimited tracks and playlists." }
  ],
  price = "$22.00",
  demoLink = "#",
  buyLink = "/BuyNow",
  packName = "Product Pack",
  packLink = "/PacksList",
  longDescription
}) {
  // Fetch dynamic data if available
  const { data: dbProduct } = useQuery({
    queryKey: ['product', productName],
    queryFn: async () => {
      // Try to find product by title
      const products = await base44.entities.Product.list({ limit: 1000 }); // Simple list for now as no filter by title in list() directly usually unless filtered
      return products.find(p => p.title === productName) || null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Merge/Override props with DB data if exists
  const finalProduct = dbProduct ? {
    name: dbProduct.title,
    description: dbProduct.short_description,
    image: dbProduct.main_image,
    gallery: dbProduct.gallery_images && dbProduct.gallery_images.length > 0 ? dbProduct.gallery_images : [],
    features: dbProduct.features || [],
    formats: {
      audio: dbProduct.supported_audio_formats,
      video: dbProduct.supported_video_formats
    },
    versions: dbProduct.versions || [],
    price: dbProduct.price,
    demoLink: dbProduct.demo_link,
    buyLink: dbProduct.buy_link || "/BuyNow",
    longDescription: dbProduct.long_description,
    pack: dbProduct.pack
  } : {
    name: productName,
    description: productDescription,
    image: productImage,
    gallery: galleryImages,
    features: features,
    formats: supportedFormats,
    versions: versions,
    price: price,
    demoLink: demoLink,
    buyLink: buyLink,
    longDescription: longDescription,
    pack: packName
  };

  const [mainImage, setMainImage] = useState(finalProduct.image || productImage);
  
  // Update main image if dbProduct loads and differs (optional, but good for UX)
  React.useEffect(() => {
    if (finalProduct.image && finalProduct.image !== mainImage) {
      setMainImage(finalProduct.image);
    }
  }, [finalProduct.image]);

  const allImages = finalProduct.gallery && finalProduct.gallery.length > 0 ? finalProduct.gallery : [finalProduct.image].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Top Breadcrumb/Logo */}
      <div className="flex justify-center mb-4">
        <Link to={packLink} className="hover:opacity-90 transition-opacity flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to {finalProduct.pack || packName}
        </Link>
      </div>

      <h1 className="text-5xl font-bold font-headline text-primary mb-8 text-center">{finalProduct.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Gallery (3 cols) */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden sticky top-24">
            <Dialog>
              <DialogTrigger asChild>
                <button className="block relative w-full bg-muted cursor-zoom-in group">
                  <img
                    src={mainImage}
                    alt={`Main view of ${finalProduct.name}`}
                    className="object-contain p-2 w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none flex justify-center items-center">
                <img
                  src={mainImage}
                  alt="Full view"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
              </DialogContent>
            </Dialog>

            {allImages.length > 1 && (
              <div className="p-4 bg-background border-t">
                <div className="flex gap-4 justify-center flex-wrap">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`relative h-24 w-24 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        mainImage === img 
                          ? "border-primary shadow-lg scale-105" 
                          : "border-transparent hover:border-primary/50 hover:scale-105"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="font-semibold tracking-tight font-headline text-2xl text-primary mb-4">About this Plugin</h2>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  {finalProduct.longDescription ? (
                     <div dangerouslySetInnerHTML={{ __html: finalProduct.longDescription }} />
                  ) : (
                    <p>{finalProduct.description}</p>
                  )}
                </div>
              </div>

              {finalProduct.features && finalProduct.features.length > 0 && finalProduct.features.some(f => f.trim() !== "") && (
                <div>
                  <h3 className="text-xl font-headline text-primary font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-3">
                    {finalProduct.features.map((feature, idx) => (
                      feature && (
                        <li key={idx} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{feature}</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}

              <Separator className="bg-primary/20" />

              {(finalProduct.formats.audio || finalProduct.formats.video) && (
                <div>
                  <h3 className="text-xl font-headline text-primary font-semibold mb-3">Supported Formats</h3>
                  <div className={`grid ${finalProduct.formats.audio && finalProduct.formats.video ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                    {finalProduct.formats.audio && (
                      <div className="bg-secondary/30 p-3 rounded border border-secondary">
                        <strong className="block text-primary mb-1">Audio</strong>
                        <span className="text-sm">{finalProduct.formats.audio}</span>
                      </div>
                    )}
                    {finalProduct.formats.video && (
                      <div className="bg-secondary/30 p-3 rounded border border-secondary">
                        <strong className="block text-primary mb-1">Video</strong>
                        <span className="text-sm">{finalProduct.formats.video}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {finalProduct.versions && finalProduct.versions.length > 0 && finalProduct.versions.some(v => v.name) && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <h3 className="text-lg font-headline text-primary font-bold mb-2">Versions</h3>
                  <div className="space-y-2 text-sm">
                    {finalProduct.versions.map((v, idx) => (
                      v.name && <p key={idx}><span className="font-bold text-foreground">{v.name}:</span> {v.desc}</p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Actions Card */}
          <Card className="shadow-xl border-2 border-primary sticky top-24">
            <CardContent className="p-6 space-y-6">
              {finalProduct.price && (
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{finalProduct.price}</p>
                </div>
              )}

              {finalProduct.demoLink && (
                <div className="bg-secondary/50 p-3 rounded-lg text-center border border-secondary">
                  <h4 className="font-semibold text-secondary-foreground flex items-center justify-center gap-2 text-sm mb-1">
                    <Info className="w-4 h-4" /> Demo Limitations
                  </h4>
                  <p className="text-xs text-secondary-foreground/80">Occasional silence / Limited features</p>
                </div>
              )}

              <div className="space-y-3">
                {finalProduct.demoLink && (
                  <Button asChild variant="outline" className="w-full h-12 text-base font-semibold border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                    <a href={finalProduct.demoLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" /> Download Demo
                    </a>
                  </Button>
                )}

                {finalProduct.buyLink && (
                  <Button asChild className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all">
                    <Link to={finalProduct.buyLink}>
                      <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}