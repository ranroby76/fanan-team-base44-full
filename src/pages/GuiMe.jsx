import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Sparkles } from "lucide-react";

export default function GuiMe() {
  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in space-y-12">
        <div className="text-center">
          <Palette className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary">GUI Me Design Philosophy</h1>
          <p className="text-lg mt-2 text-muted-foreground max-w-3xl mx-auto">
            Our approach to interface design and user experience
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <Sparkles className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-3xl">Beautiful, Functional Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">
              At Fanan Team, we believe that great software isn't just about what it does—it's also about how it looks and feels. Our GUI Me philosophy centers around creating interfaces that are both visually stunning and intuitively functional.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-secondary border border-border text-secondary-foreground rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Visual Clarity</h3>
                <p className="leading-relaxed">
                  Every element has a purpose. We design with intention, ensuring that each control and display serves the musician's workflow without clutter or confusion.
                </p>
              </div>
              
              <div className="p-6 bg-secondary border border-border text-secondary-foreground rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Intuitive Controls</h3>
                <p className="leading-relaxed">
                  Our interfaces are designed to feel natural. Whether you're a beginner or a pro, you'll find our plugins easy to navigate and quick to master.
                </p>
              </div>
              
              <div className="p-6 bg-secondary border border-border text-secondary-foreground rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Aesthetic Excellence</h3>
                <p className="leading-relaxed">
                  Beautiful design inspires creativity. We craft interfaces that you'll enjoy looking at during those long studio sessions.
                </p>
              </div>
              
              <div className="p-6 bg-secondary border border-border text-secondary-foreground rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Performance First</h3>
                <p className="leading-relaxed">
                  Pretty interfaces mean nothing if they slow you down. Our GUIs are optimized to be lightweight and responsive.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
              <p className="text-lg font-semibold mb-2">Our Promise</p>
              <p className="leading-relaxed">
                We're committed to constantly evolving our design language while maintaining the core principles that make our plugins a joy to use. Your feedback shapes every update and new release.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}