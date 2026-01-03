Deno.serve(async (req) => {
    try {
        const { customerEmail, customerName, amount, serialNumber, packName } = await req.json();
        
        if (!customerEmail || !serialNumber) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const serviceId = Deno.env.get("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
        const templateId = Deno.env.get("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
        const publicKey = Deno.env.get("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
        const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");
        
        if (!serviceId || !templateId || !publicKey) {
            console.error("EmailJS credentials not set");
            return Response.json({ error: 'Email service not configured' }, { status: 500 });
        }

        // Send email via EmailJS REST API
        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                accessToken: privateKey || undefined,
                template_params: {
                    to_email: customerEmail,
                    to_name: customerName || 'Customer',
                    amount: amount,
                    serial_number: serialNumber,
                    pack_name: packName
                }
            })
        });

        if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            console.error("EmailJS error:", errorText);
            return Response.json({ 
                success: false, 
                error: 'Failed to send email',
                details: errorText 
            }, { status: 500 });
        }

        return Response.json({ success: true });

    } catch (error) {
        console.error("Email send error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});