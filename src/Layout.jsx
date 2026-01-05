import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Menu, X, Home, VenetianMask, List, HelpCircle, ShoppingCart, Mail, Package, ChevronDown, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    base44.auth.me()
      .then(u => setUser(u))
      .catch(() => setUser(null));
  }, []);

  // Navigation structure matching reference
  const mainNavLinks = [
    { name: "GUI Me", page: "GuiMe", path: "/GuiMe", icon: VenetianMask },
    { name: "Packs List", page: "PacksList", path: "/PacksList", icon: List },
    { name: "How to Buy", page: "HowToBuy", path: "/HowToBuy", icon: HelpCircle },
    { name: "Buy Now", page: "BuyNow", path: "/BuyNow", icon: ShoppingCart },
    { name: "Contact Us", page: "ContactUs", path: "/ContactUs", icon: Mail },
    { name: "VIP Login", page: "ProductManager", path: "/ProductManager", icon: List },
  ];

  const productLinks = [
    { name: "Mad MIDI Machines", path: "/MadMidiMachinePack" },
    { name: "Max! Pack", path: "/MaxPack" },
    { name: "Free Pack", path: "/FreePack" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <style>{`
        :root {
          --background: 0 0% 7%;
          --foreground: 0 0% 93%;
          --card: 0 0% 12%;
          --card-foreground: 0 0% 93%;
          --popover: 0 0% 12%;
          --popover-foreground: 0 0% 93%;
          --primary: 38 92% 40%;
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
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-foreground hover:opacity-90 transition-colors flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team-3/public/images/fanan_logo.png" alt="Fanan Team" className="h-10 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild className={`hover:bg-primary-foreground/10 text-primary-foreground ${currentPageName === 'Home' ? 'bg-primary-foreground/10' : ''}`}>
                <Link to="/" className="flex items-center gap-2">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:bg-primary-foreground/10 text-primary-foreground gap-2">
                    <Package size={18} />
                    <span>Products</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary text-primary-foreground border-primary-foreground/20">
                  {productLinks.map((link) => (
                    <DropdownMenuItem key={link.path} asChild className="focus:bg-primary-foreground/20 focus:text-primary-foreground cursor-pointer">
                      <Link to={link.path}>{link.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {mainNavLinks.map((item) => (
                <Button key={item.page} variant="ghost" asChild className={`hover:bg-primary-foreground/10 text-primary-foreground ${currentPageName === item.page ? 'bg-primary-foreground/10' : ''}`}>
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              ))}

              {user ? (
                <>
                  <Button variant="ghost" asChild className={`hover:bg-primary-foreground/10 text-primary-foreground ${currentPageName === 'MyPurchases' ? 'bg-primary-foreground/10' : ''}`}>
                    <Link to="/MyPurchases" className="flex items-center gap-2">
                      <Package size={18} />
                      <span>My Purchases</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hover:bg-primary-foreground/10 text-primary-foreground gap-2">
                        <User size={18} />
                        <span>{user.full_name || user.email}</span>
                        <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-primary text-primary-foreground border-primary-foreground/20">
                      <DropdownMenuItem 
                        onClick={() => base44.auth.logout()} 
                        className="focus:bg-primary-foreground/20 focus:text-primary-foreground cursor-pointer"
                      >
                        <LogOut size={14} className="mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
                  className="hover:bg-primary-foreground/10 text-primary-foreground gap-2"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Button>
              )}
            </div>

            <button
              className="md:hidden text-primary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-primary-foreground/10 rounded transition-colors text-primary-foreground flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={18} /> Home
              </Link>
              
              <div className="py-2 px-4 text-primary-foreground font-semibold flex items-center gap-2 opacity-70">
                <Package size={18} /> Products
              </div>
              {productLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 px-8 hover:bg-primary-foreground/10 rounded transition-colors text-primary-foreground/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {mainNavLinks.map((item) => (
                <Link
                  key={item.page}
                  to={item.path}
                  className="block py-2 px-4 hover:bg-primary-foreground/10 rounded transition-colors text-primary-foreground flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon size={18} /> {item.name}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/MyPurchases"
                    className="block py-2 px-4 hover:bg-primary-foreground/10 rounded transition-colors text-primary-foreground flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package size={18} /> My Purchases
                  </Link>
                  <button
                    onClick={() => {
                      base44.auth.logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-4 hover:bg-primary-foreground/10 rounded transition-colors text-primary-foreground flex items-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    base44.auth.redirectToLogin(window.location.pathname);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 hover:bg-primary-foreground/10 rounded transition-colors text-primary-foreground flex items-center gap-2"
                >
                  <LogIn size={18} /> Login
                </button>
              )}
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
            <div className="mt-4">
            <Link to="/Dashboard" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            </div>
            </div>
            </footer>
    </div>
  );
}