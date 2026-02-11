import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// Hardcoded packs with their products
const HARDCODED_PACKS = [
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

export default function PacksList() {
  // Fetch packs and products from database
  const { data: dbPacks = [] } = useQuery({
    queryKey: ['packPrices'],
    queryFn: () => base44.entities.PackPrice.list(),
    staleTime: 60000,
  });

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ is_hidden: { $ne: true } });
      return products;
    },
    staleTime: 60000,
  });

  // Merge hardcoded packs with dynamic packs from database
  const packs = React.useMemo(() => {
    const hardcodedNames = HARDCODED_PACKS.map(p => p.name.toLowerCase().replace(/[^a-z0-9]/g, ''));
    
    // Add new packs from database that aren't hardcoded
    const dynamicPacks = dbPacks
      .filter(p => {
        const normalizedName = p.pack_name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return !hardcodedNames.includes(normalizedName);
      })
      .map(p => {
        // Get products for this pack from database
        const packProducts = allProducts
          .filter(prod => prod.pack === p.pack_name)
          .map(prod => prod.title);
        
        return {
          name: p.pack_name,
          link: `/${p.pack_name.replace(/[^a-zA-Z0-9]+/g, '')}Pack`,
          products: packProducts
        };
      });
    
    return [...HARDCODED_PACKS, ...dynamicPacks];
  }, [dbPacks, allProducts]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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