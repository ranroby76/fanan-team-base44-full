import React from "react";
import { Link } from "react-router-dom";

export default function MaxPack() {
  const products = [
    {
      id: "callisto",
      name: "Callisto",
      description: "Arranger Module",
      image: "https://fananteam.com/images/calisto1.jpg",
      footer: "VSTi | Windows 32bit/64bit | Stand-Alone",
      link: "/Callisto"
    },
    {
      id: "zoe-2",
      name: "Zoe 2",
      description: "Drum Machine",
      image: "https://fananteam.com/images/ZOE1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Zoe2"
    },
    {
      id: "ringo",
      name: "Ringo",
      description: "Midi Groove Machine",
      image: "https://fananteam.com/images/ringo1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Ringo"
    },
    {
      id: "anyimage",
      name: "AnyImage",
      description: "Image Album Generator",
      image: "https://fananteam.com/images/anyimage1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/AnyImage"
    },
    {
      id: "playlisted-2",
      name: "Playlisted 2",
      description: "Media Playlist Player",
      image: "https://fananteam.com/images/playlisted3.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Playlisted2"
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
      id: "ziggy",
      name: "Ziggy",
      description: "Advanced Bass Module",
      image: "https://fananteam.com/images/zigi1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Ziggy"
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
      id: "randomidi-xl",
      name: "Randomidi XL",
      description: "Advanced Midi Controller",
      image: "https://fananteam.com/images/randomidi1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Randomidi"
    },
    {
      id: "brunetta",
      name: "Brunetta",
      description: "Vocals Toolkit Multi-Fx",
      image: "https://fananteam.com/images/Brunetta1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Brunetta"
    },
    {
      id: "majoris",
      name: "Majoris",
      description: "Synth Based Arranger",
      image: "https://fananteam.com/images/majoris1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Majoris"
    },
    {
      id: "scandisoul-2",
      name: "ScandiSoul 2",
      description: "Nord Soul Organ Module",
      image: "https://fananteam.com/images/scandisoul1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/ScandiSoul2"
    },
    {
      id: "yowlseq-2",
      name: "Yowlseq 2",
      description: "Vowel Phaser - Wah",
      image: "https://fananteam.com/images/Yowlseq1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Yowlseq2"
    },
    {
      id: "midimotor",
      name: "Midimotor",
      description: "Motored Midi Controller",
      image: "https://fananteam.com/images/midimotor1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Midimotor"
    },
    {
      id: "midisquid",
      name: "Midisquid",
      description: "Midi Routing Solution",
      image: "https://fananteam.com/images/midisquid1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Midisquid"
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
      id: "yogi",
      name: "Yogi",
      description: "Rhythmic Pad Machine",
      image: "https://fananteam.com/images/yogi1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Yogi"
    },
    {
      id: "rythmos",
      name: "Rythmos",
      description: "Pattern Midi Arp",
      image: "https://fananteam.com/images/Rhythmos1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Rythmos"
    },
    {
      id: "tropicana",
      name: "Tropicana",
      description: "Caribbean Rhythmic Synth",
      image: "https://fananteam.com/images/tropikana1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Tropicana"
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

              {/* Content - WITH PROPER BANNER DESIGN (Dark Gray Background, Gold Text) */}
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