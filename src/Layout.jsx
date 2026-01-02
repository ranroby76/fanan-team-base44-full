import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Home", page: "Home" },
    { name: "How to Buy?", page: "HowToBuy" },
    { name: "Buy Now", page: "BuyNow" },
    { name: "Contact Us", page: "ContactUs" },
    { name: "GUI Me", page: "GuiMe" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <style>{`
        :root {
          --background: 0 0% 7%;
          --foreground: 0 0% 93%;
          --card: 0 0% 12%;
          --card-foreground: 0 0% 93%;
          --popover: 0 0% 12%;
          --popover-foreground: 0 0% 93%;
          --primary: 38 92% 55%;
          --primary-foreground: 0 0% 7%;
          --secondary: 38 80% 15%;
          --secondary-foreground: 38 70% 75%;
          --muted: 0 0% 20%;
          --muted-foreground: 0 0% 60%;
          --accent: 0 0% 93%;
          --accent-foreground: 0 0% 7%;
          --destructive: 0 70% 50%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 20%;
          --input: 0 0% 20%;
          --ring: 38 92% 55%;
          --radius: 0.5rem;
        }
      `}</style>
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-foreground hover:opacity-90 transition-colors">
              <img src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/fanan_logo.png" alt="Fanan Team" className="h-10 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.page}
                  to={`/${item.page === 'Home' ? '' : item.page}`}
                  className={`hover:opacity-80 transition-colors ${
                    currentPageName === item.page ? "text-primary-foreground font-semibold" : "text-primary-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.page}
                  to={`/${item.page === 'Home' ? '' : item.page}`}
                  className={`block py-2 hover:opacity-80 transition-colors ${
                    currentPageName === item.page ? "text-primary-foreground font-semibold" : "text-primary-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow py-8">
        {children}
      </main>

      <footer className="bg-secondary text-secondary-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <img src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/fanan_logo.png" alt="Fanan Team logo" className="mx-auto h-10 w-auto mb-3 opacity-90" />
          <p className="text-secondary-foreground">
            © {new Date().getFullYear()} Fanan Team. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            VSTi plugins and MIDI tools for music production
          </p>
        </div>
      </footer>
    </div>
  );
}