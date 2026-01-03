import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Fetch all products using service role for public access
        const products = await base44.asServiceRole.entities.Product.filter({});
        
        console.log('Fetched products count:', products.length);
        if (products.length > 0) {
            console.log('Sample product structure:', JSON.stringify(products[0], null, 2));
        }
        
        // Flatten products - handle both nested and flat data structures
        const flattenedProducts = products.map(p => {
            const data = p.data || p;
            return {
                id: p.id,
                title: data.title,
                short_description: data.short_description,
                pack: data.pack,
                formats: data.formats,
                main_image: data.main_image,
                gallery_images: data.gallery_images || [],
                long_description: data.long_description,
                download_links: data.download_links || [],
                youtube_links: data.youtube_links || [],
                price: data.price,
                buy_link: data.buy_link,
                demo_link: data.demo_link,
                demo_limitations: data.demo_limitations,
                page_slug: data.page_slug,
                supported_audio_formats: data.supported_audio_formats,
                supported_video_formats: data.supported_video_formats,
                created_date: p.created_date,
                updated_date: p.updated_date
            };
        });
        
        console.log('Sample flattened product:', JSON.stringify(flattenedProducts[0], null, 2));
        
        return Response.json(flattenedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});