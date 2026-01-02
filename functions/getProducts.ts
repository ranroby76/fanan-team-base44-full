import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Fetch all products using service role for public access
        const products = await base44.asServiceRole.entities.Product.filter({});
        
        console.log('Fetched products count:', products.length);
        
        // Flatten products to include all fields at root level
        const flattenedProducts = products.map(p => ({
            id: p.id,
            ...p.data,
            created_date: p.created_date,
            updated_date: p.updated_date
        }));
        
        return Response.json(flattenedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});