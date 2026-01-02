import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function BuyNow() {
  const [machineIds, setMachineIds] = React.useState({
    madMidi: "",
    max: "",
    free: ""
  });

  const handlePurchase = (pack) => {
    alert(`Purchase flow for ${pack} would be implemented here with Machine ID: ${machineIds[pack]}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in space-y-8">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary">Buy Now</h1>
          <p className="text-lg mt-2 text-muted-foreground">
            Enter your Machine ID and complete your purchase
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Mad MIDI Machines</CardTitle>
              <CardDescription>Creative MIDI processing tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">$29.99</p>
              </div>
              <Input
                placeholder="Enter Machine ID"
                value={machineIds.madMidi}
                onChange={(e) => setMachineIds({...machineIds, madMidi: e.target.value})}
              />
              <Button 
                className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                onClick={() => handlePurchase('madMidi')}
              >
                BUY NOW
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">MAX! Pack</CardTitle>
              <CardDescription>All veteran plugins in one bundle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">$49.99</p>
                <p className="text-sm text-muted-foreground">Most Popular</p>
              </div>
              <Input
                placeholder="Enter Machine ID"
                value={machineIds.max}
                onChange={(e) => setMachineIds({...machineIds, max: e.target.value})}
              />
              <Button 
                className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                onClick={() => handlePurchase('max')}
              >
                BUY NOW
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Free Pack</CardTitle>
              <CardDescription>Get started with free tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">FREE</p>
              </div>
              <Input
                placeholder="Enter Machine ID"
                value={machineIds.free}
                onChange={(e) => setMachineIds({...machineIds, free: e.target.value})}
              />
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => handlePurchase('free')}
              >
                GET FREE PACK
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}