Deno.serve(async (req) => {
    try {
        const { customerEmail, customerName, amount, serialNumber, packName } = await req.json();
        
        if (!customerEmail || !serialNumber) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiKey = Deno.env.get("SENDGRID_API_KEY");
        
        if (!apiKey) {
            console.error("SendGrid API key not set");
            return Response.json({ error: 'Email service not configured' }, { status: 500 });
        }

        // Prepare email content
        const emailData = {
            personalizations: [{
                to: [{ email: customerEmail, name: customerName || 'Customer' }],
                subject: `Your ${packName} Serial Number`
            }],
            from: {
                email: "noreply@fananteam.com",
                name: "Fanan Team Store"
            },
            content: [{
                type: "text/html",
                value: `
                    <h2>Thank you for your purchase!</h2>
                    <p>Dear ${customerName || 'Customer'},</p>
                    <p>Your payment of $${amount} for <strong>${packName}</strong> has been confirmed.</p>
                    <p><strong>Your Serial Number: ${serialNumber}</strong></p>
                    <p>Please copy this serial number and use it to activate your product.</p>
                    <p>If you have any questions, please contact us.</p>
                    <p>Best regards,<br>Fanan Team</p>
                `
            }]
        };

        // Send email via SendGrid API
        const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            console.error("SendGrid error:", errorText);
            return Response.json({ 
                success: false, 
                error: 'Failed to send email',
                details: errorText 
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