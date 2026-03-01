import React from "react";
import { Link } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import PackPurchaseCard from "@/components/PackPurchaseCard";
import PullToRefresh from "@/components/PullToRefresh";

// Hardcoded packs with their logos
const HARDCODED_PACKS = [
  { name: "Colosseum", logo: "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/colosseum_logo.png", defaultPrice: 20.00 },
  { name: "Mad MIDI Machines", logo: "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/mad%20midi%20machines.png", defaultPrice: 22.00 },
  { name: "Max Pack", logo: "https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/pro%20pack.png", defaultPrice: 12.00 },
];

export default function BuyNow() {
  const [userCountry, setUserCountry] = React.useState(null);
  const [paypalError, setPaypalError] = React.useState(null);
  const [paypalClientId, setPaypalClientId] = React.useState(null);

  // Fetch PayPal client ID from backend
  React.useEffect(() => {
    base44.functions.invoke('getPayPalClientId')
      .then(response => {
        if (response.data.clientId) {
          setPaypalClientId(response.data.clientId);
        } else {
          setPaypalError("PayPal client ID not configured");
        }
      })
      .catch(err => {
        console.error("Failed to get PayPal client ID:", err);
        setPaypalError("Failed to load PayPal configuration");
      });
  }, []);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me().catch(() => null),
  });

  const { data: userPurchases = [], refetch: refetchPurchases } = useQuery({
    queryKey: ["userPurchases", user?.email],
    queryFn: () => base44.entities.Purchase.filter({ customer_email: user.email }),
    enabled: !!user?.email,
  });

  const { data: dbPacks = [], refetch: refetchPacks } = useQuery({
    queryKey: ["packPrices"],
    queryFn: () => base44.entities.PackPrice.list(),
  });

  const normalizePackName = (name) => (name || '').toLowerCase().replace(/pack/g, '').replace(/[^a-z0-9]/g, '');

  // Build list of all paid packs (hardcoded + dynamic from DB)
  const allPaidPacks = React.useMemo(() => {
    const hardcodedNames = HARDCODED_PACKS.map(p => normalizePackName(p.name));
    
    // Get hardcoded packs with prices from DB
    const hardcodedWithPrices = HARDCODED_PACKS.map(pack => {
      const dbPrice = dbPacks.find(p => 
        normalizePackName(p.pack_name) === normalizePackName(pack.name)
      );
      return {
        name: pack.name,
        logo: pack.logo,
        price: dbPrice ? dbPrice.price : pack.defaultPrice
      };
    });
    
    // Add new packs from database that aren't hardcoded and aren't free
    const dynamicPacks = dbPacks
      .filter(p => {
        const normalizedName = normalizePackName(p.pack_name);
        const originalNormalized = p.pack_name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isFree = originalNormalized.includes('free') || p.price === 0;
        return !hardcodedNames.includes(normalizedName) && !isFree;
      })
      .map(p => ({
        name: p.pack_name,
        logo: p.logo_url,
        price: p.price
      }));
    
    return [...hardcodedWithPrices, ...dynamicPacks];
  }, [dbPacks]);

  React.useEffect(() => {
    // Detect user's location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserCountry(data.country_code);
      })
      .catch(err => console.error('Location detection failed:', err));
  }, []);

  if (!paypalClientId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-card border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Loading PayPal...</h2>
          {paypalError && (
            <p className="text-destructive">{paypalError}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": paypalClientId,
        currency: "USD",
        intent: "capture"
      }}
      onError={(err) => {
        console.error("PayPal SDK Error:", err);
        setPaypalError("PayPal failed to load");
      }}
    >
    <PullToRefresh onRefresh={async () => { await Promise.all([refetchPurchases(), refetchPacks()]); }}>
    <>
    <style>{`
      @keyframes blink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0.3; }
      }
      .blink-text {
        animation: blink 1.5s ease-in-out infinite;
      }
    `}</style>
    <div className="container mx-auto px-4 py-8">
      {/* Background Image */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/buy_now_back.jpg" 
          alt="Synthesizer background" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">WELCOME TO</h1>
        </div>
      </div>

      {/* Store Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src="https://raw.githubusercontent.com/ranroby76/studio-fanan-team/fanan-team/public/images/fanan_store_logo.png" 
          alt="Fanan Store" 
          className="h-20 w-auto"
        />
      </div>

      {/* Policy Announcement */}
      <div className="max-w-3xl mx-auto mb-8 bg-card border-2 border-primary/40 rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <h2 className="text-2xl font-bold text-primary mb-3 uppercase tracking-wider">
          50% Discount Policy
        </h2>
        <p className="text-foreground/90 text-lg mb-2">
          Need an additional license for a pack you already own?
        </p>
        <p className="text-foreground/80">
          We offer a <strong className="text-primary font-bold text-xl">50% discount</strong> on second and subsequent purchases of the same pack!
          <br/>
          Simply ensure you are logged in with the email used for your initial purchase, and the discount will be applied automatically below.
        </p>
      </div>

      {!user && (
        <div className="text-center mb-10 p-4 bg-primary/10 rounded-lg max-w-md mx-auto border border-primary/20">
          <p className="text-sm">
            <strong className="text-primary">Not logged in?</strong>{" "}
            Please log in to your account to claim your returning customer discounts.
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {allPaidPacks.map((pack) => {
          const packPurchases = userPurchases.filter(p => normalizePackName(p.pack_name) === normalizePackName(pack.name));
          const hasPurchased = packPurchases.length > 0;
          // Sort by created_date descending to get the latest purchase
          packPurchases.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
          const latestPurchase = hasPurchased ? packPurchases[0] : null;
          const finalPrice = hasPurchased ? pack.price * 0.5 : pack.price;
          
          return (
            <PackPurchaseCard
              key={pack.name}
              packName={pack.name}
              price={finalPrice}
              originalPrice={pack.price}
              hasDiscount={hasPurchased}
              latestPurchase={latestPurchase}
              logoUrl={pack.logo}
              userCountry={userCountry}
              paypalError={paypalError}
              onPurchaseSuccess={() => refetchPurchases()}
            />
          );
        })}
      </div>

      {/* Help Section */}
      <div className="text-center text-muted-foreground">
        <p>
          Don't know what to do? Read the{" "}
          <Link to="/HowToBuy" className="text-primary hover:underline font-semibold">
            purchasing instructions
          </Link>{" "}
          page.
        </p>
      </div>
    </div>
    </>
    </PullToRefresh>
    </PayPalScriptProvider>
  );
}