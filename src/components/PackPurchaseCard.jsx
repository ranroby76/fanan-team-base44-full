import React from "react";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { base44 } from "@/api/base44Client";

// Helper to fix GitHub URLs to raw format
const fixImageUrl = (url) => {
  if (!url) return url;
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }
  return url;
};

// Serial generation formulas by pack
const generateSerial = (packName, machineId) => {
  const id = parseInt(machineId);
  if (isNaN(id) || id <= 0) return null;
  
  // Different formulas for different packs
  if (packName === "Mad MIDI Machines") {
    return Math.floor(((((((id + 8354) * 2) + 1691) * 2) - 9097) * 0.1)).toString();
  } else if (packName === "Max Pack" || packName === "Max! Pack") {
    return (((((id + 7541) * 2) + 2001) * 2) - 9002).toString();
  } else if (packName === "Colosseum" || packName === "Colosseum Pack") {
    // Formula: (((((ID+7999)*2)+1111)*2)-9392)
    return (((((id + 7999) * 2) + 1111) * 2) - 9392).toString();
  } else {
    // Default formula for new packs - simple transformation
    return Math.floor(((id + 5000) * 3) + 7777).toString();
  }
};

export default function PackPurchaseCard({ 
  packName, 
  price, 
  originalPrice,
  hasDiscount,
  logoUrl, 
  userCountry, 
  paypalError 
}) {
  const [machineId, setMachineId] = React.useState("");
  const [serial, setSerial] = React.useState("");

  const handlePayPalApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      
      const id = parseInt(machineId);
      if (isNaN(id) || id <= 0) {
        alert("Invalid Machine ID. Please enter a valid numeric ID.");
        return;
      }
      
      const generatedSerial = generateSerial(packName, machineId);
      setSerial(generatedSerial);

      // Verify payment and save purchase on backend
      const verification = await base44.functions.invoke('verifyPayPalPayment', {
        orderId: data.orderID,
        packName,
        serialNumber: generatedSerial,
        machineId: id.toString()
      });

      if (!verification.data.success) {
        alert("Payment verification failed. Please contact support.");
        return;
      }

      // Send email via backend
      try {
        const customerEmail = verification.data.payer.email;
        const customerName = verification.data.payer.name || "Customer";

        await base44.functions.invoke('sendConfirmationEmail', {
          customerEmail,
          customerName,
          amount: verification.data.amount,
          serialNumber: generatedSerial,
          packName
        });

        alert(`Payment successful! Your serial: ${generatedSerial} has been sent to ${customerEmail}`);
      } catch (error) {
        console.error("Email send error:", error);
        alert(`Payment successful! Your serial: ${generatedSerial}\n(Email notification failed, but your serial is displayed here)`);
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment processing failed. Please contact support with order ID: " + data.orderID);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
      <div className="flex justify-center mb-6 h-24">
        {logoUrl ? (
          <img 
            src={fixImageUrl(logoUrl)} 
            alt={packName} 
            className="h-full w-auto object-contain"
          />
        ) : (
          <span className="text-2xl font-bold text-primary flex items-center">{packName}</span>
        )}
      </div>
      
      <div className="text-center mb-6">
        {hasDiscount && (
          <div className="mb-2 flex justify-center">
            <span className="text-sm font-bold bg-green-500/20 text-green-500 px-3 py-1 rounded-full border border-green-500/50">
              50% OFF - Additional License
            </span>
          </div>
        )}
        <div className="flex items-center justify-center gap-3">
          {hasDiscount && originalPrice && (
            <p className="text-3xl font-bold text-muted-foreground line-through">${originalPrice.toFixed(2)}</p>
          )}
          <p className="text-5xl font-bold text-primary">${price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-destructive mb-2 blink-text">ENTER YOUR ID HERE FIRST!</p>
          <p className="text-xs text-muted-foreground mb-3">Find this in the plugin's "REGISTER" window.</p>
          <Input
            placeholder="enter your id here"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            className="mb-4"
          />
        </div>
        
        <div>
          <p className="text-sm font-semibold mb-2">Serial Number</p>
          <p className="text-xs text-muted-foreground mb-3">Your serial will be shown here. You can always log in with your email and see your purchases and serials in the "My Purchases" page.</p>
          <Input
            placeholder=""
            value={serial}
            readOnly
            className={serial ? "bg-green-900/50 border-green-600" : "bg-muted"}
          />
        </div>
        
        {machineId.length >= 3 && (
          <div className="mt-4">
            {paypalError && (
              <div className="mb-3 p-3 bg-destructive/10 text-destructive text-sm rounded">
                {paypalError}
              </div>
            )}
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
                      value: price.toFixed(2),
                      currency_code: "USD"
                    },
                    description: packName
                  }]
                });
              }}
              onApprove={handlePayPalApprove}
              onError={(err) => {
                alert("Payment error. Please try again.");
              }}
              fundingSource={undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}