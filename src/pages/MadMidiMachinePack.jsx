import React from "react";
import { Link } from "react-router-dom";

export default function MadMidiMachinePack() {
  const products = [
    {
      id: "betelgeuse",
      name: "Betelgeuse",
      description: "Arranger Module",
      image: "https://fananteam.com/images/B1.jpg",
      footer: "VST | VSTi | Windows 32bit/64bit | Stand-Alone",
      link: "/Betelgeuse"
    },
    {
      id: "truculentus",
      name: "Truculentus",
      description: "Multi Band Multi Distortion",
      image: "https://fananteam.com/images/truculentus1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Truculentus"
    },
    {
      id: "playlisted-2",
      name: "Playlisted 2",
      description: "Media Playlist Player",
      image: "https://fananteam.com/images/playlisted3.jpg",
      footer: "VSTi | Windows 64bit | Mac | CLAP",
      link: "/Playlisted2"
    }
  ];

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
              <div className="flex flex-col space-y-1.5 flex-grow p-4 bg-slate-200 dark:bg-muted">
                <h2 className="tracking-tight text-xl font-bold font-headline text-accent-foreground truncate group-hover:text-primary transition-colors">
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