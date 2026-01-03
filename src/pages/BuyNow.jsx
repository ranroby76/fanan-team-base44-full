import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import emailjs from "@emailjs/browser";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

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

  const { data: prices = [] } = useQuery({
    queryKey: ["packPrices"],
    queryFn: () => base44.entities.PackPrice.list(),
  });

  const madMidiPrice = React.useMemo(() => {
    const price = prices.find(p => p.pack_name === "Mad MIDI Machines");
    return price ? price.price : 22.00;
  }, [prices]);

  const maxPackPrice = React.useMemo(() => {
    const price = prices.find(p => p.pack_name === "Max Pack");
    return price ? price.price : 12.00;
  }, [prices]);

  React.useEffect(() => {
    // Detect user's location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserCountry(data.country_code);
      })
      .catch(err => console.error('Location detection failed:', err));
  }, []);

  const handlePayPalApprove = async (data, pack, price, packName, details) => {
    try {
      // Verify payment on backend
      const verification = await base44.functions.invoke('verifyPayPalPayment', {
        orderId: data.orderID
      });

      if (!verification.data.success) {
        alert("Payment verification failed. Please contact support.");
        return;
      }

      // Calculate serial number from machine ID based on pack
      const machineId = parseInt(machineIds[pack]);
      let serial;
      
      if (pack === 'madMidi') {
        // Mad MIDI Machines formula
        const serialNumber = Math.floor(((((((machineId + 8354) * 2) + 1691) * 2) - 9097) * 0.1));
        serial = serialNumber.toString();
      } else if (pack === 'max') {
        // Max Pack formula
        const serialNumber = ((((machineId + 7541) * 2) + 2001) * 2) - 9002;
        serial = serialNumber.toString();
      }
      
      setSerials({...serials, [pack]: serial});

      // Send email via EmailJS
      try {
        const customerEmail = verification.data.payer.email;
        const customerName = verification.data.payer.name || "Customer";

        await emailjs.send(
          import.meta.env.VITE_NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            to_email: customerEmail,
            to_name: customerName,
            amount: verification.data.amount,
            serial_number: serial,
            pack_name: packName
          },
          import.meta.env.VITE_NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
        
        alert(`Payment successful! Your serial: ${serial} has been sent to ${customerEmail}`);
      } catch (error) {
        console.error("Email send error:", error);
        alert(`Payment successful! Your serial: ${serial}\n(Email notification failed, but your serial is displayed here)`);
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment processing failed. Please contact support with order ID: " + data.orderID);
    }
  };

  return (
    <PayPalScriptProvider options={{ 
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
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
          
          <p className="text-5xl font-bold text-primary text-center mb-6">${madMidiPrice.toFixed(2)}</p>
          
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
                          value: madMidiPrice.toFixed(2),
                          currency_code: "USD"
                        },
                        description: "Mad MIDI Machines Pack"
                      }]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePayPalApprove(data, 'madMidi', madMidiPrice, 'Mad MIDI Machines Pack', details);
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
          
          <p className="text-5xl font-bold text-primary text-center mb-6">${maxPackPrice.toFixed(2)}</p>
          
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
                          value: maxPackPrice.toFixed(2),
                          currency_code: "USD"
                        },
                        description: "Max Pack"
                      }]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePayPalApprove(data, 'max', maxPackPrice, 'Max Pack', details);
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