import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";

export default function MadMidiMachinePack() {
  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in space-y-12">
        <div className="text-center">
          <Music className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary">Mad MIDI Machines Pack</h1>
          <p className="text-lg mt-2 text-muted-foreground">
            Creative MIDI processing and generation tools
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Unleash Your MIDI Creativity</CardTitle>
            <CardDescription className="text-lg">
              A collection of innovative MIDI tools for experimental music production
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=400&fit=crop"
              alt="Mad MIDI Machines"
              className="rounded-lg shadow-lg w-full object-cover"
            />
            
            <p className="text-lg leading-relaxed">
              The Mad MIDI Machines pack includes powerful MIDI processing plugins that transform your musical ideas into reality. Create complex patterns, randomize sequences, and explore new sonic territories.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Pattern Generator</h3>
                <p>Create intricate MIDI patterns with intelligent algorithms</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Note Randomizer</h3>
                <p>Add controlled chaos to your sequences for happy accidents</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Arpeggiator Plus</h3>
                <p>Advanced arpeggiation with custom patterns and rhythms</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">MIDI Mapper</h3>
                <p>Transform and route MIDI data in creative ways</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <Button size="lg" className="bg-primary">
                <Download className="mr-2 h-5 w-5" />
                Download Demo
              </Button>
              <Button asChild size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                <Link to={createPageUrl("BuyNow")}>
                  Buy Now - $29.99
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}