import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Fetch all products using service role for public access
        const products = await base44.asServiceRole.entities.Product.list('', 1000);
        
        console.log('Fetched products count:', products.length);
        
        // Flatten products to include all fields at root level
        const flattenedProducts = products.map(p => ({
            id: p.id,
            title: p.data.title,
            short_description: p.data.short_description,
            pack: p.data.pack,
            formats: p.data.formats,
            main_image: p.data.main_image,
            gallery_images: p.data.gallery_images || [],
            long_description: p.data.long_description,
            download_links: p.data.download_links || [],
            youtube_links: p.data.youtube_links || [],
            price: p.data.price,
            buy_link: p.data.buy_link,
            demo_link: p.data.demo_link,
            page_slug: p.data.page_slug,
            supported_audio_formats: p.data.supported_audio_formats,
            supported_video_formats: p.data.supported_video_formats,
            created_date: p.created_date,
            updated_date: p.updated_date
        }));
        
        console.log('Returning products:', flattenedProducts.length);
        return Response.json(flattenedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});