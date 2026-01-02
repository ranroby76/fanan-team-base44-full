import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function MaxPack() {
  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in space-y-12">
        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary">MAX! Pack</h1>
          <p className="text-lg mt-2 text-muted-foreground">
            All veteran plugins in one professional bundle
          </p>
        </div>

        <Card className="shadow-xl border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-3xl">The Complete Professional Collection</CardTitle>
            <CardDescription className="text-lg">
              Every plugin we've ever made, in one powerful package
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=400&fit=crop"
              alt="MAX! Pack"
              className="rounded-lg shadow-lg w-full object-cover"
            />
            
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <p className="text-lg font-semibold text-center text-secondary-foreground">
                🎉 Existing customers: Use your old serial number to unlock MAX! Pack completely!
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              The MAX! Pack combines all our veteran plugins into one comprehensive bundle. If you've bought any bundle from us before, you already have access to everything in MAX! with your existing serial number.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-secondary/30 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">Callisto VSTi</h3>
                <p>Powerful synthesizer with unique sound design capabilities</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">Professional Effects</h3>
                <p>Studio-grade reverbs, delays, and modulation effects</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">Arranger Tools</h3>
                <p>Advanced tools for arranging and sequencing</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">MIDI Processors</h3>
                <p>Complete MIDI manipulation suite</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">Utilities</h3>
                <p>Essential production utilities and helpers</p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">& More!</h3>
                <p>Regular updates with new plugins included</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <Button size="lg" className="bg-primary">
                <Download className="mr-2 h-5 w-5" />
                Download Demo
              </Button>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/BuyNow">
                  Buy Now - $49.99
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}