import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const { password } = await req.json();
        const vipPass = Deno.env.get("VIP_PASS");
        
        if (password === vipPass) {
            return Response.json({ success: true });
        } else {
            return Response.json({ success: false }, { status: 401 });
        }
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});