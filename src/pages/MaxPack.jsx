import React from "react";
import { Link } from "react-router-dom";

export default function MaxPack() {
  const products = [
    {
      id: "sultana-2",
      name: "Sultana 2",
      description: "Darbuka Machine",
      image: "https://fananteam.com/images/sultana1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Sultana2"
    },
    {
      id: "kitton-stylist",
      name: "Kitton Stylist",
      description: "Advanced Stylist Sampler",
      image: "https://fananteam.com/images/kittonstylist1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/KittonStylist"
    },
    {
      id: "callisto",
      name: "Callisto",
      description: "Arranger Module",
      image: "https://fananteam.com/images/calisto1.jpg",
      footer: "VSTi | Windows 32bit/64bit | Stand-Alone",
      link: "/Callisto"
    },
    {
      id: "concordia",
      name: "Concordia",
      description: "Ambient Accompaniment",
      image: "https://fananteam.com/images/CONCORDIA1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Concordia"
    },
    {
      id: "gala-xl",
      name: "Gala XL",
      description: "Multi Instrument Ensemble",
      image: "https://fananteam.com/images/gala1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/GalaXL"
    },
    {
      id: "gala-duo",
      name: "Gala Duo",
      description: "Hybrid Multi - Instrument Ensemble",
      image: "https://fananteam.com/images/galaduo1.png",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/GalaDuo"
    },
    {
      id: "arpomaniac",
      name: "Arpomaniac",
      description: "Rhythmic Synth",
      image: "https://fananteam.com/images/arpomanica1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Arpomaniac"
    },
    {
      id: "anyimage",
      name: "AnyImage",
      description: "Image Album Generator",
      image: "https://fananteam.com/images/anyimage1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/AnyImage"
    }
  ];

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
            <Link to={product.link} className="flex flex-col h-full">
              {/* Image Container */}
              <div className="relative overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-auto p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col space-y-1.5 flex-grow p-4 bg-muted">
                <h2 className="tracking-tight text-xl font-bold font-headline text-primary truncate transition-colors">
                  {product.name}
                </h2>
                <p className="text-sm text-foreground/80 h-10 line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center p-3 border-t border-border bg-muted/30 mt-auto">
                <p className="text-base text-muted-foreground text-center truncate w-full">
                  {product.footer}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}