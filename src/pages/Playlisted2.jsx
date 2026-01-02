import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ShoppingCart, Info, CheckCircle2, Play, Pause, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Playlisted2() {
  const [mainImage, setMainImage] = useState("https://fananteam.com/images/playlisted3.jpg");

  const images = [
    "https://fananteam.com/images/playlisted3.jpg",
    "https://fananteam.com/images/playlisted4.jpg"
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Top Breadcrumb/Logo */}
      <div className="flex justify-center mb-4">
        <Link to="/MadMidiMachinePack" className="w-96 h-auto hover:opacity-90 transition-opacity">
          <img
            src="https://fananteam.com/images/mad%20midi%20machines.png"
            alt="Mad MIDI Machines Pack logo"
            className="object-contain w-full h-auto"
          />
        </Link>
      </div>

      <h1 className="text-5xl font-bold font-headline text-primary mb-8 text-center">Playlisted 2</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Gallery (3 cols) */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden sticky top-24">
            <Dialog>
              <DialogTrigger asChild>
                <button className="block relative w-full bg-muted cursor-zoom-in group">
                  <img
                    src={mainImage}
                    alt="Main view of Playlisted 2"
                    className="object-contain p-2 w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none flex justify-center items-center">
                <img
                  src={mainImage}
                  alt="Full view"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
              </DialogContent>
            </Dialog>

            <div className="p-4 bg-background border-t">
              <div className="flex gap-4 justify-center flex-wrap">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`relative h-24 w-24 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      mainImage === img 
                        ? "border-primary shadow-lg scale-105" 
                        : "border-transparent hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="font-semibold tracking-tight font-headline text-2xl text-primary mb-4">About this Plugin</h2>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Playlisted is a unique VST instrument (VSTi3/AU/CLAP) designed to bridge the gap between music production and live performance. It transforms your Digital Audio Workstation (DAW) into a powerful, stable media player capable of handling audio and video playlists directly within your session.
                  </p>
                  <p>
                    Instead of switching between your DAW and external media players like VLC or iTunes during a live set or practice session, Playlisted brings your backing tracks and reference videos right into your mixer channel—complete with professional audio processing features.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-headline text-primary font-semibold mb-3">What Can It Do?</h3>
                <p className="text-foreground/90">
                  Playlisted allows you to load lists of media files and play them back through your DAW's audio engine. This means you can process your backing tracks with your favorite VST effects, route them to specific outputs, and control everything via MIDI, all while keeping your hands on your instrument.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-headline text-primary font-semibold mb-3">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90"><strong>Real-Time Pitch Shifting:</strong> Change the key of any song by +/- 12 semitones instantly without changing the playback speed. Perfect for vocalists.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90"><strong>Variable Speed Control:</strong> Slow down or speed up tracks (0.1x to 2.1x) for practicing difficult solos or adjusting energy.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90"><strong>High-Performance Video Engine:</strong> Plays video in a dedicated, resizable "Picture-in-Picture" style window. Never crashes your DAW.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90"><strong>MIDI Remote Control:</strong> Fully mappable for hands-free operation (Play, Pause, Stop, Video Toggle).</span>
                  </li>
                </ul>
              </div>

              <Separator className="bg-primary/20" />

              <div>
                <h3 className="text-xl font-headline text-primary font-semibold mb-3">The Intelligent Playlist</h3>
                <p className="text-foreground/90">
                  The heart of the plugin is its smart playlist system. Add individual files or set a "Default Folder" to quickly load your entire repertoire. The interface is clean and dark-mode friendly for dimly lit stages.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-headline text-primary font-semibold mb-3">Per-Track Controls</h3>
                <p className="text-foreground/90 mb-2">Every track has an expandable "Banner" for granular control:</p>
                <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                  <li><strong>Volume:</strong> Individual gain staging (up to +22dB).</li>
                  <li><strong>Pitch & Speed:</strong> Settings saved per track.</li>
                  <li><strong>Auto-Wait (Transition Logic):</strong> Set a wait time between tracks for seamless setlists.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-headline text-primary font-semibold mb-3">Supported Formats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-3 rounded border border-secondary">
                    <strong className="block text-primary mb-1">Audio</strong>
                    <span className="text-sm">MP3, WAV, AIFF, FLAC, OGG, M4A</span>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded border border-secondary">
                    <strong className="block text-primary mb-1">Video</strong>
                    <span className="text-sm">MP4, AVI, MOV, MKV, WEBM, MPG</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-headline text-primary font-semibold mb-3">Who is it For?</h3>
                <ul className="space-y-2 text-foreground/90">
                  <li>🎸 <strong>Live Performers:</strong> Reliability and instant key changes.</li>
                  <li>🎤 <strong>Karaoke Hosts:</strong> Pro setup within a DAW.</li>
                  <li>🎹 <strong>Musicians in Practice:</strong> Slow down fast passages.</li>
                  <li>🎬 <strong>Producers:</strong> Score-to-picture without timeline clutter.</li>
                </ul>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h3 className="text-lg font-headline text-primary font-bold mb-2">Versions</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-foreground">Free Mode:</span> Fully functional (Pitch, Video, Speed), limited to 3 tracks per playlist.</p>
                  <p><span className="font-bold text-foreground">Pro Mode:</span> Unlocks unlimited tracks and playlists.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Actions Card */}
          <Card className="shadow-xl border-2 border-primary sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">$22.00</p>
              </div>

              <div className="bg-secondary/50 p-3 rounded-lg text-center border border-secondary">
                <h4 className="font-semibold text-secondary-foreground flex items-center justify-center gap-2 text-sm mb-1">
                  <Info className="w-4 h-4" /> Demo Limitations
                </h4>
                <p className="text-xs text-secondary-foreground/80">Playlist is limited to 3 tracks</p>
              </div>

              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full h-12 text-base font-semibold border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                  <a href="https://icedrive.net/s/tBFZvbf8FX4fGb8wzb9Nv5Q3fuPB" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" /> Download Demo
                  </a>
                </Button>

                <Button asChild className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all">
                  <Link to="/BuyNow">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}