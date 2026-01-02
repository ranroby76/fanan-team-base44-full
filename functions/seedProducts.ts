import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const products = [
  // Mad MIDI Machines
  {
    title: "Betelgeuse",
    short_description: "Arranger Module",
    pack: "Mad MIDI Machines",
    main_image: "https://fananteam.com/images/B1.jpg",
    formats: ["VST", "VSTi", "Windows 32bit", "Windows 64bit", "Stand-Alone"],
    page_slug: "Betelgeuse"
  },
  {
    title: "Playlisted 2",
    short_description: "Media Playlist Player",
    pack: "Mad MIDI Machines",
    main_image: "https://fananteam.com/images/playlisted3.jpg",
    gallery_images: ["https://fananteam.com/images/playlisted3.jpg", "https://fananteam.com/images/playlisted4.jpg"],
    formats: ["VSTi", "Windows 64bit", "Mac", "CLAP"],
    page_slug: "Playlisted2",
    long_description: `<p>Playlisted is a unique VST instrument (VSTi3/AU/CLAP) designed to bridge the gap between music production and live performance...</p>`,
    features: [
      "Real-Time Pitch Shifting",
      "Variable Speed Control",
      "High-Performance Video Engine",
      "MIDI Remote Control"
    ],
    demo_link: "https://icedrive.net/s/tBFZvbf8FX4fGb8wzb9Nv5Q3fuPB"
  },
  {
    title: "Truculentus",
    short_description: "Multi Band Multi Distortion",
    pack: "Mad MIDI Machines",
    main_image: "https://fananteam.com/images/truculentus1.jpg",
    formats: ["VST", "Windows 32bit", "Windows 64bit"],
    page_slug: "Truculentus"
  },
  
  // Max! Pack
  { title: "AnyImage", short_description: "Image Album Generator", pack: "Max! Pack", main_image: "https://fananteam.com/images/anyimage1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "AnyImage" },
  { title: "Arpomaniac", short_description: "Rhythmic Synth", pack: "Max! Pack", main_image: "https://fananteam.com/images/arpomanica1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Arpomaniac" },
  { title: "Brunetta", short_description: "Vocals Toolkit Multi-Fx", pack: "Max! Pack", main_image: "https://fananteam.com/images/Brunetta1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Brunetta" },
  { title: "Callisto", short_description: "Arranger Module", pack: "Max! Pack", main_image: "https://fananteam.com/images/calisto1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit", "Stand-Alone"], page_slug: "Callisto" },
  { title: "Concordia", short_description: "Ambient Accompaniment", pack: "Max! Pack", main_image: "https://fananteam.com/images/CONCORDIA1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Concordia" },
  { title: "Gala Duo", short_description: "Hybrid Multi - Instrument Ensemble", pack: "Max! Pack", main_image: "https://fananteam.com/images/galaduo1.png", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "GalaDuo" },
  { title: "Gala XL", short_description: "Multi Instrument Ensemble", pack: "Max! Pack", main_image: "https://fananteam.com/images/gala1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "GalaXL" },
  { title: "Kitton Stylist", short_description: "Advanced Stylist Sampler", pack: "Max! Pack", main_image: "https://fananteam.com/images/kittonstylist1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "KittonStylist" },
  { title: "Midimotor", short_description: "Motored Midi Controller", pack: "Max! Pack", main_image: "https://fananteam.com/images/midimotor1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Midimotor" },
  { title: "Midiverus", short_description: "Advanced Midi Hardware Router", pack: "Max! Pack", main_image: "https://fananteam.com/images/midiverus1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Midiverus" },
  { title: "Playlisted", short_description: "Playlist Player", pack: "Max! Pack", main_image: "https://fananteam.com/images/Playlisted1.png", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Playlisted" },
  { title: "Randomidi", short_description: "Advanced Midi Controller and arp", pack: "Max! Pack", main_image: "https://fananteam.com/images/randomidi1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Randomidi" },
  { title: "Ringo", short_description: "Midi Groove Machine", pack: "Max! Pack", main_image: "https://fananteam.com/images/ringo1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Ringo" },
  { title: "Rythmos", short_description: "Pattern Midi Arp", pack: "Max! Pack", main_image: "https://fananteam.com/images/Rhythmos1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Rythmos" },
  { title: "ScandiSoul 2", short_description: "Nord Soul Organ Module", pack: "Max! Pack", main_image: "https://fananteam.com/images/scandisoul1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "ScandiSoul2" },
  { title: "Sultana 2", short_description: "Darbuka Machine", pack: "Max! Pack", main_image: "https://fananteam.com/images/sultana1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Sultana2" },
  { title: "Tropicana", short_description: "Caribbean Rhythmic Synth", pack: "Max! Pack", main_image: "https://fananteam.com/images/tropikana1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Tropicana" },
  { title: "Yogi", short_description: "Rhythmic Pad Machine", pack: "Max! Pack", main_image: "https://fananteam.com/images/yogi1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Yogi" },
  { title: "Yowlseq 2", short_description: "Vowel Phaser - Wah", pack: "Max! Pack", main_image: "https://fananteam.com/images/Yowlseq1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Yowlseq2" },
  { title: "Ziggy", short_description: "Advanced Bass Module", pack: "Max! Pack", main_image: "https://fananteam.com/images/zigi1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Ziggy" },
  { title: "Zoe 2", short_description: "Drum Machine", pack: "Max! Pack", main_image: "https://fananteam.com/images/ZOE1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Zoe2" },

  // Free Pack
  { title: "999 gen2", short_description: "Rhythmic Midi Arp", pack: "Free Pack", main_image: "https://fananteam.com/images/9991.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "999Gen2" },
  { title: "AnyText", short_description: "Textual Comments Generator", pack: "Free Pack", main_image: "https://fananteam.com/images/anytext1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "AnyText" },
  { title: "Bella", short_description: "Bell Machine", pack: "Free Pack", main_image: "https://fananteam.com/images/bella1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Bella" },
  { title: "Bjorn", short_description: "Filter Module", pack: "Free Pack", main_image: "https://fananteam.com/images/Bjorn1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Bjorn" },
  { title: "Blue Lue", short_description: "Slots Driven Drum Machine", pack: "Free Pack", main_image: "https://fananteam.com/images/bluelue1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "BlueLue" },
  { title: "Bonnie", short_description: "Drum Slots Sampler", pack: "Free Pack", main_image: "https://fananteam.com/images/bonnie1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Bonnie" },
  { title: "Djup", short_description: "Nordish Bass Module", pack: "Free Pack", main_image: "https://fananteam.com/images/djup1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Djup" },
  { title: "Kitton 3", short_description: "GM Compatible Drum Machine", pack: "Free Pack", main_image: "https://fananteam.com/images/kitton31.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Kitton3" },
  { title: "Midmid", short_description: "Multi-Channel Midi Router", pack: "Free Pack", main_image: "https://fananteam.com/images/midmid1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Midmid" },
  { title: "Mini Ringo", short_description: "Midi Groove", pack: "Free Pack", main_image: "https://fananteam.com/images/mini%20ringo1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "MiniRingo" },
  { title: "Monica 3", short_description: "90's Style Dual Layered Synth-Arp", pack: "Free Pack", main_image: "https://fananteam.com/images/monica1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Monica3" },
  { title: "Quentin", short_description: "Polyrhythmic synth", pack: "Free Pack", main_image: "https://fananteam.com/images/quentin1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "Quentin" },
  { title: "Randomidi free", short_description: "Advanced Midi Controller and arp", pack: "Free Pack", main_image: "https://fananteam.com/images/randomidi1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "RandomidiFree" },
  { title: "RandRobin", short_description: "Random Round Robin Module", pack: "Free Pack", main_image: "https://fananteam.com/images/randomrobin1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "RandRobin" },
  { title: "Rebellion", short_description: "Multi-Band Exciter", pack: "Free Pack", main_image: "https://fananteam.com/images/rebellion1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Rebellion" },
  { title: "Saxophia gen2", short_description: "Ethnic saxophone module", pack: "Free Pack", main_image: "https://fananteam.com/images/saxsophia1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "SaxophiaGen2" },
  { title: "ScandiClavia 2", short_description: "Nordish Organ Module", pack: "Free Pack", main_image: "https://fananteam.com/images/scandiclavia21.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "ScandiClavia2" },
  { title: "Solina2k", short_description: "Ensemble Machine", pack: "Free Pack", main_image: "https://fananteam.com/images/solina2k1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Solina2k" },
  { title: "Spacelifter 3", short_description: "Modular Echo Reverb", pack: "Free Pack", main_image: "https://fananteam.com/images/spacelifter1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Spacelifter3" },
  { title: "Spacelifter 4", short_description: "Modular Echo - Reverb", pack: "Free Pack", main_image: "https://fananteam.com/images/spacelifter1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Spacelifter4" },
  { title: "Tropicana Fun", short_description: "Caribbean Rhythmic Synth", pack: "Free Pack", main_image: "https://fananteam.com/images/TROPIKANA%20FUN1.jpg", formats: ["VSTi", "Windows 32bit", "Windows 64bit"], page_slug: "TropicanaFun" },
  { title: "Ymer", short_description: "Massive Distortion", pack: "Free Pack", main_image: "https://fananteam.com/images/ymer1.jpg", formats: ["VST", "Windows 32bit", "Windows 64bit"], page_slug: "Ymer" },
];

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Use service role to bypass potential permission issues if user isn't admin yet (though they should be)
        // Check existing to avoid duplicates
        const existing = await base44.asServiceRole.entities.Product.list({ limit: 100 });
        if (existing.length > 0) {
            return Response.json({ message: "Products already seeded", count: existing.length });
        }

        const result = await base44.asServiceRole.entities.Product.bulkCreate(products);
        
        return Response.json({ message: "Seeded products", count: result.length });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});