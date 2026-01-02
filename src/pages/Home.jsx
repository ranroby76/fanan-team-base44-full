import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="relative flex justify-center w-full mx-auto">
        <div className="w-full">
          <img
            src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/SITE%20TOP.png"
            alt="Site Top Banner"
            className="object-cover w-full h-auto"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 text-center">
        <div className="bg-secondary p-6 rounded-lg shadow-md border border-border border-l-4 border-primary">
          <p className="text-lg font-semibold text-secondary-foreground">
            New to fanan team? Please, always read the "how to buy?" instructions before purchasing
          </p>
          <p className="text-md mt-2 text-secondary-foreground/80">
            New folks, please, Always try the demo first before purchasing. Never buy before first testing a demo on your system
          </p>
        </div>
      </section>

      <section className="w-full py-4 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <img
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=160&h=160&fit=crop"
              alt="Promo graphic"
              className="hidden sm:block object-contain w-40 h-40"
            />
            <h2 className="text-3xl font-bold text-primary tracking-wider uppercase text-center px-4">
              WE BELIEVE EVERY SEASON IS SALES SEASON
            </h2>
            <img
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=160&h=160&fit=crop"
              alt="Promo graphic"
              className="hidden sm:block object-contain w-40 h-40"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-secondary">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=619&h=398&fit=crop"
              alt="Playlisted website interface"
              className="rounded-lg shadow-2xl object-cover w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-primary">Playlisted Goes Online!</h2>
            <p className="text-xl mt-4">The external, video-supporting version of our beloved VSTi.</p>
            <p className="mt-2 text-muted-foreground">
              Discover the new online version of Playlisted! Build smart, shareable playlists from your favorite links with video support, and communicate directly with your audio interface's drivers for a seamless experience.
            </p>
            <Button asChild size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
              <a href="https://studio--playlisted-store.us-central1.hosted.app/" target="_blank" rel="noopener noreferrer">
                Visit Playlisted <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-primary">Our Plugins Packs</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="space-y-8 flex flex-col items-center">
          <Link to="/MadMidiMachinePack" className="block group">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700&h=104&fit=crop"
              alt="Mad MIDI Machines Pack"
              className="h-auto rounded-lg shadow-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
          <Link to="/MaxPack" className="block group">
            <img
              src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=700&h=142&fit=crop"
              alt="Max! Pack"
              className="w-full h-auto rounded-lg shadow-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
          <Link to="/FreePack" className="block group w-10/12 md:w-auto">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=560&h=114&fit=crop"
              alt="Free Pack"
              className="h-auto w-full rounded-lg shadow-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Separator className="my-8" />
      </div>

      <section className="container mx-auto px-4 pt-8 text-center">
        <Link to="/GuiMe" className="block group">
          <div className="w-full max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1406&h=670&fit=crop"
              alt="GUI Me Design Philosophy"
              className="object-contain w-full h-auto shadow-lg rounded-lg transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </div>
        </Link>
      </section>
    </div>
  );
}