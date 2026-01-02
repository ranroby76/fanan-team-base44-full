import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export default function PacksList() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <Package className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary">Packs List</h1>
        <p className="text-lg mt-2 text-muted-foreground">
          Explore our collection of VSTi plugins and tools
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/MadMidiMachinePack" className="group block">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
             <div className="aspect-video relative p-4 flex items-center justify-center bg-secondary/50">
                <img 
                  src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/mad%20midi%20machines.png" 
                  alt="Mad MIDI Machines"
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform"
                />
             </div>
             <div className="p-4">
               <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Mad MIDI Machines</h3>
               <p className="text-muted-foreground text-sm">Creative MIDI processing tools</p>
             </div>
          </div>
        </Link>

        <Link to="/MaxPack" className="group block">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
             <div className="aspect-video relative p-4 flex items-center justify-center bg-secondary/50">
                <img 
                  src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/pro%20pack.png" 
                  alt="Max! Pack"
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform"
                />
             </div>
             <div className="p-4">
               <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Max! Pack</h3>
               <p className="text-muted-foreground text-sm">The Complete Professional Collection</p>
             </div>
          </div>
        </Link>

        <Link to="/FreePack" className="group block">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
             <div className="aspect-video relative p-4 flex items-center justify-center bg-secondary/50">
                <img 
                  src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/free%20pack.png" 
                  alt="Free Pack"
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform"
                />
             </div>
             <div className="p-4">
               <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Free Pack</h3>
               <p className="text-muted-foreground text-sm">Get started with free tools</p>
             </div>
          </div>
        </Link>
      </div>
    </div>
  );
}