import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

// SEO Meta Tags Component
const SEOHead = () => {
  React.useEffect(() => {
    // Set page title
    document.title = "Fanan Team - VST Plugins & MIDI Tools for Music Production";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Fanan Team creates professional VST plugins and MIDI tools for music producers. Explore our Mad MIDI Machines, Max! Pack, and Free Pack. Affordable, high-quality VSTi instruments and effects.";
    if (!document.querySelector('meta[name="description"]')) document.head.appendChild(metaDescription);
    
    // Meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "VST plugins, VSTi, MIDI tools, music production, audio plugins, synthesizer, virtual instruments, DAW plugins, Windows VST, Mac AU, CLAP plugins, Fanan Team, Mad MIDI Machines, free VST";
    if (!document.querySelector('meta[name="keywords"]')) document.head.appendChild(metaKeywords);
    
    // Open Graph tags for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "Fanan Team - VST Plugins & MIDI Tools";
    if (!document.querySelector('meta[property="og:title"]')) document.head.appendChild(ogTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = "Professional VST plugins and MIDI tools for music producers. High-quality, affordable virtual instruments.";
    if (!document.querySelector('meta[property="og:description"]')) document.head.appendChild(ogDescription);
    
    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = "website";
    if (!document.querySelector('meta[property="og:type"]')) document.head.appendChild(ogType);
    
    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = "https://fanan-team-com.base44.app";
    if (!document.querySelector('meta[property="og:url"]')) document.head.appendChild(ogUrl);
    
    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/fanan_logo.png";
    if (!document.querySelector('meta[property="og:image"]')) document.head.appendChild(ogImage);
    
    // Twitter Card tags
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.name = "twitter:card";
    twitterCard.content = "summary_large_image";
    if (!document.querySelector('meta[name="twitter:card"]')) document.head.appendChild(twitterCard);
    
    // Canonical URL - use primary domain
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://fanan-team-com.base44.app";
    
    // Site name for better branding
    const ogSiteName = document.querySelector('meta[property="og:site_name"]') || document.createElement('meta');
    ogSiteName.setAttribute('property', 'og:site_name');
    ogSiteName.content = "Fanan Team";
    if (!document.querySelector('meta[property="og:site_name"]')) document.head.appendChild(ogSiteName);
    
  }, []);
  
  return null;
};

const FlexedBicepIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 11.93a5 5 0 0 0-3.35 1.78 4.49 4.49 0 0 0-.65 4.54l1.3 2.76A2.5 2.5 0 0 0 7.5 22H10" />
    <path d="M18 6.32a5 5 0 0 0-4.47-1.25 4.49 4.49 0 0 0-3.53 4.19V14a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V7.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 0 0-3A1.5 1.5 0 0 1 18 6.32Z" />
  </svg>
);

export default function Home() {
  return (
    <div className="space-y-12 animate-fade-in">
      <SEOHead />
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
        <div className="bg-secondary/50 p-6 rounded-lg shadow-md border border-secondary">
          <p className="text-lg font-semibold text-secondary-foreground">
             New to fanan team? Please, always read the "how to buy?" instructions before purchasing
          </p>
          <p className="text-md mt-2 text-secondary-foreground/80">
            New folks, please, Always try the demo first before purchasing. Never buy before first testing a demo on your system
          </p>
        </div>
      </section>

      <section className="w-full py-4 bg-gradient-to-r from-green-200 via-yellow-200 to-orange-200">
        <div className="container mx-auto px-4">
           <div className="flex justify-between items-center">
            <img
              src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/A4.png"
              alt="Promo graphic"
              className="hidden sm:block object-contain w-40 h-40"
            />
            <h2 className="text-3xl font-headline font-bold text-slate-800 tracking-wider uppercase text-center px-4">
              WE BELIEVE EVERY SEASON IS SALES SEASON
            </h2>
            <img
              src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/A4.png"
              alt="Promo graphic"
              className="hidden sm:block object-contain w-40 h-40"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
             <img
              src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/intruduce_playlisted_online.jpg"
              alt="Screenshot of the Playlisted website interface"
              className="rounded-lg shadow-2xl object-cover w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-headline font-bold text-yellow-400 flex items-center justify-center md:justify-start gap-3">
              Playlisted Goes Online!
              <FlexedBicepIcon className="h-10 w-10" />
            </h2>
            <p className="text-xl mt-4 text-gray-300">The external, video-supporting version of our beloved VSTi.</p>
            <p className="mt-2 text-gray-400">
              Discover the new online version of Playlisted! Build smart, shareable playlists from your favorite links with video support, and communicate directly with your audio interface's drivers for a seamless experience.
            </p>
            <Button asChild size="lg" className="mt-6 bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold">
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
        <div className="space-y-6 flex flex-col items-center">
          <Link to="/MadMidiMachinePack" className="group w-full max-w-2xl">
            <div className="h-32 bg-zinc-900 rounded-full border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center p-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/mad%20midi%20machines.png"
                alt="Mad MIDI Machines Pack"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <Link to="/MaxPack" className="group w-full max-w-2xl">
            <div className="h-32 bg-zinc-900 rounded-full border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center p-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/pro%20pack.png"
                alt="Max! Pack"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <Link to="/FreePack" className="group w-full max-w-2xl">
            <div className="h-32 bg-zinc-900 rounded-full border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center p-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/free%20pack.png"
                alt="Free Pack"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
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
              src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/A2.png"
              alt="GUI Me Design Philosophy"
              className="object-contain w-full h-auto shadow-lg rounded-lg transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </div>
        </Link>
      </section>
    </div>
  );
}