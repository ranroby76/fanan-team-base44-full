import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BuyNow() {
  const [machineIds, setMachineIds] = React.useState({
    madMidi: "",
    max: ""
  });

  const [serials, setSerials] = React.useState({
    madMidi: "",
    max: ""
  });

  const handlePurchase = (pack) => {
    // Placeholder for purchase logic
    const serial = "XXXX-XXXX-XXXX-XXXX";
    setSerials({...serials, [pack]: serial});
    alert(`Purchase successful! Your serial: ${serial} will be sent to your email.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Background Image */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://fananteam.com/images/A5.jpg" 
          alt="Synthesizer background" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">WELCOME TO</h1>
        </div>
      </div>

      {/* Store Logo */}
      <div className="flex justify-center mb-12">
        <img 
          src="https://fananteam.com/images/A6.png" 
          alt="Fanan Store" 
          className="h-20 w-auto"
        />
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* Mad MIDI Machines Pack */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <img 
              src="https://fananteam.com/images/mad%20midi%20machines.png" 
              alt="Mad MIDI Machines Pack" 
              className="h-24 w-auto"
            />
          </div>
          
          <p className="text-5xl font-bold text-primary text-center mb-6">$22.00</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-destructive mb-2">ENTER YOUR ID HERE FIRST!</p>
              <p className="text-xs text-muted-foreground mb-3">Find this in the plugin's "REGISTER" window.</p>
              <Input
                placeholder="enter your id here"
                value={machineIds.madMidi}
                onChange={(e) => setMachineIds({...machineIds, madMidi: e.target.value})}
                className="mb-4"
              />
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-2">Serial Number</p>
              <p className="text-xs text-muted-foreground mb-3">Your serial will be sent to your email and shown here</p>
              <Input
                placeholder=""
                value={serials.madMidi}
                readOnly
                className="bg-muted"
              />
            </div>
            
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
              onClick={() => handlePurchase('madMidi')}
              disabled={!machineIds.madMidi}
            >
              BUY NOW
            </Button>
          </div>
        </div>

        {/* Max Pack */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <img 
              src="https://fananteam.com/images/pro%20pack.png" 
              alt="Max Pack" 
              className="h-24 w-auto"
            />
          </div>
          
          <p className="text-5xl font-bold text-primary text-center mb-6">$12.00</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-destructive mb-2">ENTER YOUR ID HERE FIRST!</p>
              <p className="text-xs text-muted-foreground mb-3">Find this in the plugin's "REGISTER" window.</p>
              <Input
                placeholder="enter your id here"
                value={machineIds.max}
                onChange={(e) => setMachineIds({...machineIds, max: e.target.value})}
                className="mb-4"
              />
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-2">Serial Number</p>
              <p className="text-xs text-muted-foreground mb-3">Your serial will be sent to your email and shown here</p>
              <Input
                placeholder=""
                value={serials.max}
                readOnly
                className="bg-muted"
              />
            </div>
            
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
              onClick={() => handlePurchase('max')}
              disabled={!machineIds.max}
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="text-center text-muted-foreground">
        <p>
          Don't know what to do? Read the{" "}
          <Link to="/HowToBuy" className="text-primary hover:underline font-semibold">
            purchasing instructions
          </Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
}