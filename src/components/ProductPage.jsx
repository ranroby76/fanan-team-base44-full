import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ShoppingCart, Info, CheckCircle2, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

// Helper to convert GitHub URLs to raw format
const fixImageUrl = (url) => {
  if (!url) return url;
  
  // If it's already a full URL (http/https), return as-is (includes Base44 storage and GitHub raw URLs)
  if (url.includes('http://') || url.includes('https://')) {
    // Fix GitHub tree URLs to raw format
    if (url.includes('github.com') && url.includes('/tree/')) {
      return url.replace('/tree/', '/raw/');
    }
    return url;
  }
  
  // If it's just a filename, prepend the GitHub raw URL
  const githubRawBase = "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/";
  return githubRawBase + url;
};

export default function ProductPage({ 
  productName, 
  slug, // Add slug support for more reliable lookup
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
    queryKey: ['product', slug || productName], // Unique key per product
    queryFn: async () => {
      // Try to find product by slug or title using backend function for public access
      const response = await base44.functions.invoke('getProducts');
      const products = response.data || response;
      if (slug) {
        // First try exact slug match
        const bySlug = products.find(p => p.page_slug === slug);
        if (bySlug) return bySlug;
        // Also try matching by auto-generated slug from title
        const byTitleSlug = products.find(p => 
          p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === slug
        );
        if (byTitleSlug) return byTitleSlug;
      }
      return products.find(p => p.title === productName) || null;
    },
    staleTime: 300000, // Cache for 5 minutes
    gcTime: 600000,
    enabled: !!(slug || productName), // Only fetch when we have slug or productName
  });

  // Fetch pack prices
  const { data: packPrices } = useQuery({
    queryKey: ['packPrices'],
    queryFn: async () => {
      const prices = await base44.entities.PackPrice.list();
      return prices;
    },
    staleTime: 60000, // Cache for 1 minute
  });

  // Merge/Override props with DB data if exists
  const finalProduct = dbProduct ? {
    name: dbProduct.title,
    description: dbProduct.short_description,
    image: fixImageUrl(dbProduct.main_image),
    gallery: dbProduct.gallery_images && dbProduct.gallery_images.length > 0 ? dbProduct.gallery_images.map(fixImageUrl) : [],
    features: dbProduct.features || [],
    formats: {
      audio: dbProduct.supported_audio_formats,
      video: dbProduct.supported_video_formats,
      list: dbProduct.formats || []
    },
    versions: dbProduct.versions || [],
    price: dbProduct.price,
    demoLink: dbProduct.demo_link,
    buyLink: dbProduct.buy_link || "/BuyNow",
    longDescription: dbProduct.long_description,
    pack: dbProduct.pack,
    downloadLinks: dbProduct.download_links || [],
    youtubeLinks: dbProduct.youtube_links || [],
    demoLimitations: dbProduct.demo_limitations
  } : {
    name: productName,
    description: productDescription,
    image: fixImageUrl(productImage),
    gallery: galleryImages.map(fixImageUrl),
    features: features,
    formats: supportedFormats,
    versions: versions,
    price: price,
    demoLink: demoLink,
    buyLink: buyLink,
    longDescription: longDescription,
    pack: packName,
    downloadLinks: [],
    youtubeLinks: [],
    demoLimitations: null
  };

  // Get pack price if available - prioritize pack price over individual product price
  // Handle pack name variations (e.g., "Max Pack" vs "Max! Pack")
  const packPrice = packPrices?.find(p => 
    p.pack_name === finalProduct.pack || 
    p.pack_name.replace(/[!]/g, '') === finalProduct.pack.replace(/[!]/g, '')
  );
  const displayPrice = finalProduct.pack === "Free Pack" ? "Free" : (packPrice ? `$${packPrice.price.toFixed(2)}` : (finalProduct.price || price));

  const [mainImage, setMainImage] = useState(finalProduct.image || productImage);
  
  // Reset main image when product changes
  React.useEffect(() => {
    setMainImage(finalProduct.image || productImage);
  }, [finalProduct.image, productImage, slug, productName]);

  const allImages = finalProduct.gallery && finalProduct.gallery.length > 0 ? finalProduct.gallery : [finalProduct.image].filter(Boolean);

  // If product is hidden, show message
  if (dbProduct?.is_hidden) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-muted-foreground mb-4">Product Not Available</h1>
        <p className="text-muted-foreground">This product is currently hidden.</p>
      </div>
    );
  }

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
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none flex justify-center items-center">
                <img
                  src={mainImage}
                  alt="Full view"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                  }}
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
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x100?text=N/A';
                        }}
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
                    <div className="space-y-3">
                       {(() => {
                         const lines = finalProduct.longDescription.split('\n');
                         const elements = [];
                         let currentList = [];
                         
                         lines.forEach((line, i) => {
                           const trimmed = line.trim();
                           
                           if (trimmed.startsWith('##')) {
                             // Close any open list
                             if (currentList.length > 0) {
                               elements.push(<ul key={`list-${i}`} className="list-disc ml-6 space-y-2 my-3 marker:text-primary">{currentList}</ul>);
                               currentList = [];
                             }
                             elements.push(<h3 key={i} className="text-xl font-bold text-primary mt-6 mb-3">{trimmed.replace(/^##\s*/, '')}</h3>);
                           } else if (trimmed.startsWith('#')) {
                             currentList.push(<li key={i} className="text-foreground/90">{trimmed.replace(/^#\s*/, '')}</li>);
                           } else if (trimmed) {
                             // Close any open list
                             if (currentList.length > 0) {
                               elements.push(<ul key={`list-${i}`} className="list-disc ml-6 space-y-2 my-3 marker:text-primary">{currentList}</ul>);
                               currentList = [];
                             }
                             elements.push(<p key={i} className="text-foreground/90 leading-relaxed">{trimmed}</p>);
                           } else if (currentList.length > 0) {
                             // Empty line closes the list
                             elements.push(<ul key={`list-${i}`} className="list-disc ml-6 space-y-2 my-3 marker:text-primary">{currentList}</ul>);
                             currentList = [];
                           }
                         });
                         
                         // Close any remaining list
                         if (currentList.length > 0) {
                           elements.push(<ul key="list-final" className="list-disc ml-6 space-y-2 my-3">{currentList}</ul>);
                         }
                         
                         return elements;
                       })()}
                    </div>
                  ) : (
                    <p>{finalProduct.description}</p>
                  )}
                </div>
              </div>

              {/* Features - only show if legacy format (array) is used, since new format uses description text */}
              {(!finalProduct.longDescription || !finalProduct.longDescription.includes("# ")) && finalProduct.features && finalProduct.features.length > 0 && finalProduct.features.some(f => f && f.trim() !== "") && (
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

              {/* Supported Formats Section */}
              {(() => {
                const audio = finalProduct.formats?.audio;
                const video = finalProduct.formats?.video;
                const list = Array.isArray(finalProduct.formats?.list) ? finalProduct.formats.list : [];
                const hasAnyFormat = audio || video || list.length > 0;

                if (!hasAnyFormat) return null;

                return (
                  <div>
                    <h3 className="text-xl font-headline text-primary font-semibold mb-3">Supported Formats</h3>
                    
                    {/* Format List (VST, Windows, etc.) */}
                    {list.length > 0 && (
                       <div className="flex flex-wrap gap-2 mb-4">
                          {list.map(f => (
                             <span key={f} className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold border border-secondary">
                                {f}
                             </span>
                          ))}
                       </div>
                    )}

                    {(audio || video) && (
                      <div className={`grid ${audio && video ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                        {audio && (
                          <div className="bg-secondary/30 p-3 rounded border border-secondary">
                            <strong className="block text-primary mb-1">Audio</strong>
                            <span className="text-sm">{audio}</span>
                          </div>
                        )}
                        {video && (
                          <div className="bg-secondary/30 p-3 rounded border border-secondary">
                            <strong className="block text-primary mb-1">Video</strong>
                            <span className="text-sm">{video}</span>
                          </div>
                        )}
                      </div>
                    )}
                    </div>
                    );
                    })()}

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

              {/* YouTube Videos */}
              {finalProduct.youtubeLinks && finalProduct.youtubeLinks.length > 0 && (
                <div className="space-y-6 mt-8">
                  <h3 className="text-xl font-headline text-primary font-semibold">Videos</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {finalProduct.youtubeLinks.map((link, idx) => {
                      if (!link) return null;
                      // Simple regex to extract video ID for embed
                      const videoId = link.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{11})/)?.[1];
                      return videoId ? (
                        <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-border shadow-md">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`YouTube video ${idx + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Actions Card */}
          <Card className="shadow-xl border-2 border-primary sticky top-24">
            <CardContent className="p-6 space-y-6">
              {displayPrice && (
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{displayPrice}</p>
                </div>
              )}

              <div className="bg-secondary/50 p-3 rounded-lg text-center border border-secondary">
                <h4 className="font-semibold text-secondary-foreground flex items-center justify-center gap-2 text-sm mb-1">
                  <Info className="w-4 h-4" /> Demo Limitations
                </h4>
                <p className="text-xs text-secondary-foreground/80">
                  {finalProduct.demoLimitations || "None"}
                </p>
              </div>

              <div className="space-y-3">
                {/* Custom Download Links */}
                {finalProduct.downloadLinks && finalProduct.downloadLinks.length > 0 && finalProduct.downloadLinks.map((link, idx) => (
                  (link.url || link.label) && (
                    <Button key={idx} asChild className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all">
                      <a href={link.url || "#"} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" /> {link.label || "Download"}
                      </a>
                    </Button>
                  )
                ))}

                {/* Legacy Links (only if no custom download links) */}
                {(!finalProduct.downloadLinks || finalProduct.downloadLinks.length === 0) && (
                  <>
                    {finalProduct.demoLink && (
                      <Button asChild variant="outline" className="w-full h-12 text-base font-semibold border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                        <a href={finalProduct.demoLink} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-5 w-5" /> Download
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
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}