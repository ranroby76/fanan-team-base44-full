import React from "react";
import { Link } from "react-router-dom";

export default function FreePack() {
  const products = [
    {
      id: "gala-se",
      name: "Gala SE",
      description: "Free Multi Instrument Ensemble",
      image: "https://fananteam.com/images/galase1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/GalaSE"
    },
    {
      id: "randomidi-free",
      name: "Randomidi Free",
      description: "Advanced Midi Controller and arp",
      image: "https://fananteam.com/images/randomidi1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/RandomidiFree"
    },
    {
      id: "spacelifter-3",
      name: "Spacelifter 3",
      description: "Modular Echo Reverb",
      image: "https://fananteam.com/images/spacelifter1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Spacelifter3"
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
      id: "monica-3",
      name: "Monica 3",
      description: "90's Style Dual Layered Synth-Arp",
      image: "https://fananteam.com/images/monica1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Monica3"
    },
    {
      id: "scandiclavia-2",
      name: "ScandiClavia 2",
      description: "Nordish Organ Module",
      image: "https://fananteam.com/images/scandiclavia21.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/ScandiClavia2"
    },
    {
      id: "mini-ringo",
      name: "Mini Ringo",
      description: "Midi Groove",
      image: "https://fananteam.com/images/mini%20ringo1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/MiniRingo"
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
      id: "solina2k",
      name: "Solina2k",
      description: "Ensemble Machine",
      image: "https://fananteam.com/images/solina2k1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Solina2k"
    },
    {
      id: "majoris-free",
      name: "Majoris Free",
      description: "Synth Based Arranger",
      image: "https://fananteam.com/images/majorisfree1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/MajorisFree"
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
      id: "djup",
      name: "Djup",
      description: "Nordish Bass Module",
      image: "https://fananteam.com/images/djup1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Djup"
    },
    {
      id: "midmid",
      name: "Midmid",
      description: "Multi-Channel Midi Router",
      image: "https://fananteam.com/images/midmid1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Midmid"
    },
    {
      id: "quentin",
      name: "Quentin",
      description: "Polyrhythmic synth",
      image: "https://fananteam.com/images/quentin1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Quentin"
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
      id: "kitton-3",
      name: "Kitton 3",
      description: "GM Compatible Drum Machine",
      image: "https://fananteam.com/images/kitton31.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/Kitton3"
    },
    {
      id: "saxophia-gen2",
      name: "Saxophia gen2",
      description: "Ethnic saxophone module",
      image: "https://fananteam.com/images/saxsophia1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/SaxophiaGen2"
    },
    {
      id: "rebellion",
      name: "Rebellion",
      description: "Multi-Band Exciter",
      image: "https://fananteam.com/images/rebellion1.jpg",
      footer: "VST | Windows 32bit/64bit",
      link: "/Rebellion"
    },
    {
      id: "tropicana-fun",
      name: "Tropicana Fun",
      description: "Caribbean Rhythmic Synth",
      image: "https://fananteam.com/images/TROPIKANA%20FUN1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/TropicanaFun"
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
      id: "blue-lue",
      name: "Blue Lue",
      description: "Slots Driven Drum Machine",
      image: "https://fananteam.com/images/bluelue1.jpg",
      footer: "VSTi | Windows 32bit/64bit",
      link: "/BlueLue"
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