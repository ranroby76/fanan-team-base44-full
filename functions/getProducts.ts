import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        console.log("Fetching products...");
        
        // Try passing parameters as positional args as per standard SDK
        // list(sort, limit, skip)
        const products = await base44.asServiceRole.entities.Product.list(undefined, 1000);
        
        console.log(`Found ${products.length} products`);
        return Response.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});