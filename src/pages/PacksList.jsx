import React from "react";
import { Link } from "react-router-dom";

export default function PacksList() {
  const packs = [
    {
      name: "Free Pack",
      link: "/FreePack",
      products: [
        "Gala SE", "Randomidi Free", "Spacelifter 3", "Bjorn", "Monica 3", 
        "ScandiClavia 2", "Mini Ringo", "Bonnie", "Solina2k", "Majoris Free", 
        "Anytext", "Djup", "Midmid", "Quentin", "999Gen2", "Kitton 3", 
        "Saxophia gen2", "Rebellion", "Tropicana Fun", "Bella", "Blue Lue"
      ]
    },
    {
      name: "Max! Pack",
      link: "/MaxPack",
      products: [
        "Callisto", "Zoe 2", "Ringo", "AnyImage", "Playlisted 2", "Kitton Stylist", 
        "Ziggi", "Gala XL", "Randomidi XL", "Brunetta", "Majoris", "Scandisoul 2", 
        "Yowlseq 2", "Midimotor", "Midisquid", "Arpomaniac", "Yogi", "Rythmos", "Tropicana"
      ]
    },
    {
      name: "Mad MIDI Machines Pack",
      link: "/MadMidiMachinePack",
      products: ["Betelgeuse", "Truculentus"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Plugin Packs List</h1>
        <p className="text-lg text-muted-foreground">
          Discover what's inside each of our bundles.
        </p>
      </div>
      
      <div className="space-y-10">
        {packs.map((pack) => (
          <div key={pack.name} className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <Link to={pack.link} className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-primary hover:underline">
                {pack.name}
              </h2>
            </Link>
            <p className="text-foreground leading-relaxed">
              {pack.products.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}