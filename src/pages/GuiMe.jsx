import React from "react";

export default function GuiMe() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Banner */}
      <div className="mb-10">
        <img 
          src="https://fananteam.com/images/A1.png" 
          alt="GUI Me Banner" 
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-3">GUI Me: Our Design Philosophy</h1>
          <p className="text-lg opacity-90">
            Crafting intuitive and inspiring user interfaces for your creative flow.
          </p>
        </div>

        {/* Design as desired Section */}
        <section className="bg-card border border-border rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-primary mb-4">Design as desired</h2>
          <p className="text-lg leading-relaxed text-foreground">
            Have you ever wanted to design your favorite plugin with your own imagination or maybe add in it a special dedication for someone you love? or maybe add some unique graphical characters of your own? Now you can.
          </p>
        </section>

        {/* How it works Section */}
        <section className="bg-card border border-border rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-primary mb-4">So, how it works?</h2>
          <p className="text-lg leading-relaxed text-foreground">
            Fill the form below and send us a description of your idea and we'll try to think together with you what's best way to fulfill it. You'll get a quotation and once you are happy with it, your GUI-ME project is underway and gonna sent to you as a download link.
          </p>
        </section>

        {/* Pricing Section */}
        <section className="bg-card border border-border rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-primary mb-4">What are the prices?</h2>
          <p className="text-lg leading-relaxed text-foreground">
            Our policy is generally to keep the prices low as possible, but it depends the time that needed for applying everything. Starting price will be 30$.
          </p>
        </section>

        {/* Feedback Section */}
        <section className="bg-secondary/50 border border-border rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-primary mb-4">Feedback & Questions</h2>
          <p className="text-lg leading-relaxed text-foreground mb-4">
            We'd love to hear from you! Feel free to write to us about anything—whether you have feedback, questions, or just want to say hello.
          </p>
          <p className="text-lg">
            You can reach us at:{" "}
            <a 
              href="mailto:fananteam@gmail.com" 
              className="text-primary hover:underline font-semibold"
            >
              fananteam@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}