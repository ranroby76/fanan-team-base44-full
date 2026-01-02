import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export default function PacksList() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Our Plugins Packs</h1>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link to="/MadMidiMachinePack" className="group block">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
             <img 
               src="https://fananteam.com/images/mad%20midi%20machines.png" 
               alt="Mad MIDI Machines Pack"
               className="w-full h-auto object-contain"
             />
          </div>
        </Link>

        <Link to="/MaxPack" className="group block">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
             <img 
               src="https://fananteam.com/images/pro%20pack.png" 
               alt="Max! Pack"
               className="w-full h-auto object-contain"
             />
          </div>
        </Link>

        <Link to="/FreePack" className="group block">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
             <img 
               src="https://fananteam.com/images/free%20pack.png" 
               alt="Free Pack"
               className="w-full h-auto object-contain"
             />
          </div>
        </Link>
      </div>
    </div>
  );
}