import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        // Use service role to allow public access to products
        const products = await base44.asServiceRole.entities.Product.list({ limit: 1000 });
        return Response.json(products);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});