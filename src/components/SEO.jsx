import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords }) {
  const location = useLocation();

  useEffect(() => {
    // Basic SEO
    const defaultTitle = "Fanan Team - VSTi Plugins and MIDI Tools for Music Production";
    document.title = title ? `${title} | Fanan Team` : defaultTitle;
    
    const setMetaTag = (name, content, property = false) => {
      let element = document.querySelector(property ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const desc = description || "Fanan Team develops high-quality VSTi plugins, MIDI tools, and virtual instruments for music production. Discover innovative synthesizers, drum machines, and creative tools.";
    const kw = keywords || "VSTi, MIDI tools, virtual instruments, music production, synthesizers, drum machines, audio plugins, Fanan Team";
    const url = `https://fananteam.site${location.pathname}`;
    const image = "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/fanan_logo.png";

    setMetaTag('description', desc);
    setMetaTag('keywords', kw);
    setMetaTag('author', "Fanan Team");
    setMetaTag('robots', "index, follow");

    // Open Graph
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:title', document.title, true);
    setMetaTag('og:description', desc, true);
    setMetaTag('og:image', image, true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', url);
    setMetaTag('twitter:title', document.title);
    setMetaTag('twitter:description', desc);
    setMetaTag('twitter:image', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, location.pathname]);

  return null;
}