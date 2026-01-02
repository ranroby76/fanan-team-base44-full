import React from "react";
import ProductPage from "../components/ProductPage";

export default function Playlisted2() {
  return (
    <ProductPage
      productName="Playlisted 2"
      productDescription="Media Playlist Player"
      productImage="https://fananteam.com/images/playlisted3.jpg"
      galleryImages={[
        "https://fananteam.com/images/playlisted3.jpg",
        "https://fananteam.com/images/playlisted4.jpg"
      ]}
      packName="Mad MIDI Machines"
      packLink="/MadMidiMachinePack"
      demoLink="https://icedrive.net/s/tBFZvbf8FX4fGb8wzb9Nv5Q3fuPB"
      longDescription={`
        <p>Playlisted is a unique VST instrument (VSTi3/AU/CLAP) designed to bridge the gap between music production and live performance. It transforms your Digital Audio Workstation (DAW) into a powerful, stable media player capable of handling audio and video playlists directly within your session.</p>
        <p>Instead of switching between your DAW and external media players like VLC or iTunes during a live set or practice session, Playlisted brings your backing tracks and reference videos right into your mixer channel—complete with professional audio processing features.</p>
        <br/>
        <h3>What Can It Do?</h3>
        <p>Playlisted allows you to load lists of media files and play them back through your DAW's audio engine. This means you can process your backing tracks with your favorite VST effects, route them to specific outputs, and control everything via MIDI, all while keeping your hands on your instrument.</p>
        <br/>
        <h3>The Intelligent Playlist</h3>
        <p>The heart of the plugin is its smart playlist system, designed specifically for the needs of live performers. How it Works? You can add individual files or set a "Default Folder" to quickly load your entire repertoire. The playlist interface is clean and dark-mode friendly, ensuring visibility on dimly lit stages.</p>
        <br/>
        <h3>Per-Track Controls</h3>
        <p>Every track in your playlist has an expandable "Banner" that gives you granular control over that specific file: Volume: Individual gain staging (up to +22dB) to balance louder and quieter tracks. Pitch & Speed; Settings are saved per track, so "Song A" can be pitched down -2 semitones while "Song B" plays at 1.1x speed. Auto-Wait; (Transition Logic): A game-changer for live sets. You can set a specific "Wait" time (e.g., 5 seconds) for each track. When the song finishes, Playlisted will visually count down that duration before automatically launching the next track—giving you just enough time to talk to the crowd or switch instruments.</p>
        <br/>
        <h3>Who is it For?</h3>
        <p>Live Performers: Singers and bands running backing tracks who need reliability and the ability to change keys instantly.</p>
        <p>Karaoke Hosts: Run a professional karaoke setup entirely within a DAW, utilizing high-quality vocal chains for the singers.</p>
        <p>Musicians in Practice: Slow down fast passages in video or audio files to learn complex parts.</p>
        <p>Producers: Watch reference videos or score-to-picture without clogging up the DAW's main timeline.</p>
      `}
      features={[
        "Real-Time Pitch Shifting: Change the key of any song by +/- 12 semitones instantly without changing the playback speed.",
        "Variable Speed Control: Slow down or speed up tracks (0.1x to 2.1x).",
        "High-Performance Video Engine: Video decoding happens in a separate, protected process.",
        "MIDI Remote Control: Fully mappable for hands-free operation."
      ]}
    />
  );
}