import React from "react";
import { Link } from "react-router-dom";

export default function FreePack() {
  const products = [
    {
      id: "blue-lue",
      name: "Blue Lue",
      description: "Slots Driven Drum Machine",
      image: "https://fananteam.com/images/bluelue1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/BlueLue"
    },
    {
      id: "999-gen2",
      name: "999 gen2",
      description: "Rhythmic Midi Arp",
      image: "https://fananteam.com/images/9991.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/999Gen2"
    },
    {
      id: "anytext",
      name: "AnyText",
      description: "Textual Comments Generator",
      image: "https://fananteam.com/images/anytext1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/AnyText"
    },
    {
      id: "bella",
      name: "Bella",
      description: "Bell Machine",
      image: "https://fananteam.com/images/bella1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Bella"
    },
    {
      id: "bjorn",
      name: "Bjorn",
      description: "Filter Module",
      image: "https://fananteam.com/images/Bjorn1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Bjorn"
    },
    {
      id: "bonnie",
      name: "Bonnie",
      description: "Drum Slots Sampler",
      image: "https://fananteam.com/images/bonnie1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Bonnie"
    },
    {
      id: "djup",
      name: "Djup",
      description: "Nordish Bass Module",
      image: "https://fananteam.com/images/djup1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Djup"
    },
    {
      id: "kitton-3",
      name: "Kitton 3",
      description: "GM Compatible Drum Machine",
      image: "https://fananteam.com/images/kitton31.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Kitton3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Header Image */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg h-auto">
          <img
            src="https://fananteam.com/images/free%20pack.png"
            alt="Free Pack Logo"
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