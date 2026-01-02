import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Download } from "lucide-react";

export default function FreePack() {
  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in space-y-12">
        <div className="text-center">
          <Gift className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary">Free Pack</h1>
          <p className="text-lg mt-2 text-muted-foreground">
            Get started with our free plugins and tools
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Try Before You Buy</CardTitle>
            <CardDescription className="text-lg">
              Full-featured free plugins to experience our quality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop"
              alt="Free Pack"
              className="rounded-lg shadow-lg w-full object-cover"
            />
            
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <p className="text-lg font-semibold text-center text-secondary-foreground">
                100% Free Forever - No Strings Attached!
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              Our Free Pack includes fully functional plugins that showcase the quality and design philosophy of Fanan Team. These aren't demos or limited versions—they're complete, professional tools that you can use in your productions forever.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Basic Synthesizer</h3>
                <p>A streamlined synth perfect for learning and experimenting</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">MIDI Monitor</h3>
                <p>Essential tool for debugging and understanding MIDI data</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Simple Delay</h3>
                <p>Clean, straightforward delay effect</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Tuner</h3>
                <p>Accurate tuner for all your instruments</p>
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg border-l-4 border-primary mt-8">
              <p className="font-semibold mb-2">Why Free?</p>
              <p className="leading-relaxed">
                We believe in letting our work speak for itself. Try our free plugins, experience our design quality, and upgrade to our paid packs when you're ready for more advanced features.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <Button size="lg" className="bg-primary">
                <Download className="mr-2 h-5 w-5" />
                Download Free Pack
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}