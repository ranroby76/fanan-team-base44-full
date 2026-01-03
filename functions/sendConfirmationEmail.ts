import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const { customerEmail, customerName, amount, serialNumber, packName } = await req.json();
        
        if (!customerEmail || !serialNumber) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const base44 = createClientFromRequest(req);

        // Prepare email body
        const emailBody = `
            <h2>Thank you for your purchase!</h2>
            <p>Dear ${customerName},</p>
            <p>Your payment of $${amount} for <strong>${packName}</strong> has been confirmed.</p>
            <p><strong>Your Serial Number: ${serialNumber}</strong></p>
            <p>Please copy this serial number and use it to activate your product.</p>
            <p>If you have any questions, please contact us.</p>
            <p>Best regards,<br>Fanan Team</p>
        `;

        // Send email using Base44's built-in integration
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: customerEmail,
            subject: `Your ${packName} Serial Number`,
            body: emailBody
        });

        return Response.json({ 
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error("Email send error:", error.message);
        return Response.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
});