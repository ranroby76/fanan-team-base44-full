import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const payload = await req.json();
        const { orderId } = payload;
        
        if (!orderId) {
            return Response.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
        const secret = Deno.env.get("PAYPAL_SECRET");
        
        if (!clientId || !secret) {
            console.error("PayPal credentials not set");
            return Response.json({ error: 'PayPal credentials not configured' }, { status: 500 });
        }

        // Get access token from PayPal
        const auth = btoa(`${clientId}:${secret}`);
        const tokenResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        if (!tokenResponse.ok) {
            console.error("Failed to get PayPal token:", await tokenResponse.text());
            return Response.json({ error: 'Failed to authenticate with PayPal' }, { status: 500 });
        }

        const { access_token } = await tokenResponse.json();

        // Verify the order details
        const orderResponse = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!orderResponse.ok) {
            console.error("Failed to verify order:", await orderResponse.text());
            return Response.json({ error: 'Failed to verify payment' }, { status: 500 });
        }

        const orderDetails = await orderResponse.json();
        
        // Check if payment was actually completed
        if (orderDetails.status !== 'COMPLETED') {
            return Response.json({ 
                success: false, 
                error: 'Payment not completed',
                status: orderDetails.status 
            }, { status: 400 });
        }

        const base44 = createClientFromRequest(req);

        // Get additional data from request to save purchase
        const { packName, serialNumber, machineId } = payload;
        
        // Save purchase to database
        if (packName && serialNumber) {
            try {
                console.log("Saving purchase:", {
                    email: orderDetails.payer.email_address,
                    pack: packName,
                    serial: serialNumber
                });
                
                const savedPurchase = await base44.asServiceRole.entities.Purchase.create({
                    customer_email: orderDetails.payer.email_address,
                    customer_name: orderDetails.payer.name.given_name || "Customer",
                    pack_name: packName,
                    serial_number: serialNumber,
                    machine_id: machineId || "",
                    amount_paid: parseFloat(orderDetails.purchase_units[0].amount.value),
                    paypal_order_id: orderDetails.id
                });
                
                console.log("Purchase saved successfully:", savedPurchase.id);
            } catch (error) {
                console.error("Failed to save purchase:", error.message);
                console.error("Full error:", error);
            }
        } else {
            console.log("Missing packName or serialNumber - purchase not saved");
        }

        // Return verified payment details
        return Response.json({
            success: true,
            orderId: orderDetails.id,
            status: orderDetails.status,
            amount: orderDetails.purchase_units[0].amount.value,
            currency: orderDetails.purchase_units[0].amount.currency_code,
            payer: {
                email: orderDetails.payer.email_address,
                name: orderDetails.payer.name.given_name
            }
        });

    } catch (error) {
        console.error("Payment verification error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});