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
        
        if (!serviceId || !templateId || !publicKey || !privateKey) {
            console.error("EmailJS credentials not set");
            return Response.json({ error: 'Email service not configured' }, { status: 500 });
        }

        // Send email via EmailJS REST API with private key
        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                accessToken: privateKey,
                template_params: {
                    to_email: customerEmail,
                    to_name: customerName || 'Customer',
                    amount: amount,
                    serial_number: serialNumber,
                    pack_name: packName
                }
            })
        });

        const responseText = await emailResponse.text();
        
        if (!emailResponse.ok) {
            console.error("EmailJS error:", responseText);
            return Response.json({ 
                success: false, 
                error: 'Failed to send email',
                details: responseText 
            }, { status: 500 });
        }

        return Response.json({ 
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error("Email send error:", error);
        return Response.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
});