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
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-foreground hover:opacity-90 transition-colors">
              Fanan Team
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