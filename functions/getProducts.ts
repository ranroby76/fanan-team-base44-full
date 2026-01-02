import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Fetch all products, sorted by title
        // Using service role to ensure public access
        const products = await base44.asServiceRole.entities.Product.list({ title: 1 }, 1000);
        
        return Response.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});