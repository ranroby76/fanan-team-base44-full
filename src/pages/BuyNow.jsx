import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function BuyNow() {
  const [machineIds, setMachineIds] = React.useState({
    madMidi: "",
    max: ""
  });

  const [serials, setSerials] = React.useState({
    madMidi: "",
    max: ""
  });

  const [userCountry, setUserCountry] = React.useState(null);

  React.useEffect(() => {
    // Detect user's location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserCountry(data.country_code);
      })
      .catch(err => console.error('Location detection failed:', err));
  }, []);

  const handlePayPalApprove = (data, pack, price) => {
    // Handle successful payment
    const serial = "XXXX-XXXX-XXXX-XXXX";
    setSerials({...serials, [pack]: serial});
    alert(`Payment successful! Your serial: ${serial} will be sent to your email.`);
  };

  return (
    <PayPalScriptProvider options={{ 
      "client-id": "AdoK3-mdDQxleLLbYSTCtVy1naeCPfP78ayxahlSAcwwhIEGtY6eEiaBJZrbFCKWdQ0g9seXWYTcO5zo",
      currency: "USD",
      intent: "capture",
      vault: false
    }}>
    <div className="container mx-auto px-4 py-8">
      {/* Background Image */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://fananteam.com/images/A5.jpg" 
          alt="Synthesizer background" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">WELCOME TO</h1>
        </div>
      </div>

      {/* Store Logo */}
      <div className="flex justify-center mb-12">
        <img 
          src="https://fananteam.com/images/A6.png" 
          alt="Fanan Store" 
          className="h-20 w-auto"
        />
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* Mad MIDI Machines Pack */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <img 
              src="https://fananteam.com/images/mad%20midi%20machines.png" 
              alt="Mad MIDI Machines Pack" 
              className="h-24 w-auto"
            />
          </div>
          
          <p className="text-5xl font-bold text-primary text-center mb-6">$22.00</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-destructive mb-2">ENTER YOUR ID HERE FIRST!</p>
              <p className="text-xs text-muted-foreground mb-3">Find this in the plugin's "REGISTER" window.</p>
              <Input
                placeholder="enter your id here"
                value={machineIds.madMidi}
                onChange={(e) => setMachineIds({...machineIds, madMidi: e.target.value})}
                className="mb-4"
              />
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-2">Serial Number</p>
              <p className="text-xs text-muted-foreground mb-3">Your serial will be sent to your email and shown here</p>
              <Input
                placeholder=""
                value={serials.madMidi}
                readOnly
                className="bg-muted"
              />
            </div>
            
            {machineIds.madMidi.length >= 3 && (
              <div className="mt-4">
                {userCountry && (
                  <div className="flex items-center justify-center gap-2 mb-3 text-sm text-muted-foreground">
                    <span className="text-2xl">{String.fromCodePoint(0x1F1E6 + userCountry.charCodeAt(0) - 65, 0x1F1E6 + userCountry.charCodeAt(1) - 65)}</span>
                    <span>Payment from {userCountry}</span>
                  </div>
                )}
                <PayPalButtons
                  style={{ 
                    layout: "vertical",
                    shape: "rect"
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: "22.00",
                          currency_code: "USD"
                        },
                        description: "Mad MIDI Machines Pack"
                      }]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePayPalApprove(data, 'madMidi', 22.00);
                    });
                  }}
                  onError={(err) => {
                    alert("Payment error. Please try again.");
                  }}
                  fundingSource={undefined}
                />
              </div>
            )}
          </div>
        </div>

        {/* Max Pack */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <img 
              src="https://fananteam.com/images/pro%20pack.png" 
              alt="Max Pack" 
              className="h-24 w-auto"
            />
          </div>
          
          <p className="text-5xl font-bold text-primary text-center mb-6">$12.00</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-destructive mb-2">ENTER YOUR ID HERE FIRST!</p>
              <p className="text-xs text-muted-foreground mb-3">Find this in the plugin's "REGISTER" window.</p>
              <Input
                placeholder="enter your id here"
                value={machineIds.max}
                onChange={(e) => setMachineIds({...machineIds, max: e.target.value})}
                className="mb-4"
              />
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-2">Serial Number</p>
              <p className="text-xs text-muted-foreground mb-3">Your serial will be sent to your email and shown here</p>
              <Input
                placeholder=""
                value={serials.max}
                readOnly
                className="bg-muted"
              />
            </div>
            
            {machineIds.max.length >= 3 && (
              <div className="mt-4">
                {userCountry && (
                  <div className="flex items-center justify-center gap-2 mb-3 text-sm text-muted-foreground">
                    <span className="text-2xl">{String.fromCodePoint(0x1F1E6 + userCountry.charCodeAt(0) - 65, 0x1F1E6 + userCountry.charCodeAt(1) - 65)}</span>
                    <span>Payment from {userCountry}</span>
                  </div>
                )}
                <PayPalButtons
                  style={{ 
                    layout: "vertical",
                    shape: "rect"
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: "12.00",
                          currency_code: "USD"
                        },
                        description: "Max Pack"
                      }]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePayPalApprove(data, 'max', 12.00);
                    });
                  }}
                  onError={(err) => {
                    alert("Payment error. Please try again.");
                  }}
                  fundingSource={undefined}
                />
              </div>
            )}
          </div>
        </div>
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
    </PayPalScriptProvider>
  );
}