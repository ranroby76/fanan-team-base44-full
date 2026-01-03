import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const { customerEmail, customerName, amount, serialNumber, packName } = await req.json();
        
        if (!customerEmail || !serialNumber) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const serviceId = Deno.env.get("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
        const templateId = Deno.env.get("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
        const publicKey = Deno.env.get("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
        
        if (!serviceId || !templateId || !publicKey) {
            console.error("EmailJS credentials not set");
            return Response.json({ error: 'Email service not configured' }, { status: 500 });
        }

        // Send email via EmailJS API using form data
        const formData = new FormData();
        formData.append('service_id', serviceId);
        formData.append('template_id', templateId);
        formData.append('user_id', publicKey);
        formData.append('template_params', JSON.stringify({
            to_email: customerEmail,
            to_name: customerName || 'Customer',
            amount: amount,
            serial_number: serialNumber,
            pack_name: packName
        }));

        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
            method: 'POST',
            body: formData
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