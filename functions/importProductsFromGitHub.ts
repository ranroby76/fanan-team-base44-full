import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Fetch the list of JSON files from GitHub
        const filesResponse = await fetch(
            'https://api.github.com/repos/ranroby76/studio-fanan-team/contents/src/data/products?ref=fanan-team'
        );
        const files = await filesResponse.json();

        const importedProducts = [];
        const errors = [];

        // Process each JSON file
        for (const file of files) {
            if (file.type === 'file' && file.name.endsWith('.json')) {
                try {
                    const productResponse = await fetch(file.download_url);
                    const productData = await productResponse.json();

                    // Map GitHub JSON structure to our Product entity schema
                    const product = {
                        title: productData.title || '',
                        short_description: productData.shortDescription || '',
                        pack: productData.pack || 'Free Pack',
                        formats: buildFormatsArray(productData.formats),
                        main_image: productData.mainImage?.url ? `https://fananteam.com${productData.mainImage.url}` : '',
                        gallery_images: (productData.thumbnails || []).map(t => `https://fananteam.com${t.url}`),
                        long_description: productData.description || '',
                        download_links: (productData.downloadLinks || []).map(link => ({
                            label: link.label || 'Download',
                            url: link.url || ''
                        })),
                        youtube_links: productData.videoUrls || [],
                        price: productData.price === 0 ? 'Free' : `$${productData.price}`,
                        page_slug: productData.slug || '',
                        demo_link: productData.demoLimitations ? '/demo' : ''
                    };

                    // Check if product already exists by title
                    const existing = await base44.asServiceRole.entities.Product.filter({ title: product.title }, undefined, 1);
                    
                    if (existing.length > 0) {
                        // Update existing product
                        await base44.asServiceRole.entities.Product.update(existing[0].id, product);
                        importedProducts.push({ action: 'updated', title: product.title });
                    } else {
                        // Create new product
                        await base44.asServiceRole.entities.Product.create(product);
                        importedProducts.push({ action: 'created', title: product.title });
                    }

                } catch (error) {
                    errors.push({ file: file.name, error: error.message });
                }
            }
        }

        return Response.json({
            success: true,
            imported: importedProducts.length,
            products: importedProducts,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});

function buildFormatsArray(formats) {
    if (!formats) return [];
    
    const formatsList = [];
    if (formats.vst) formatsList.push('VST');
    if (formats.vsti) formatsList.push('VSTi');
    if (formats.win32) formatsList.push('Windows 32bit');
    if (formats.win64) formatsList.push('Windows 64bit');
    if (formats.standAlone) formatsList.push('Stand-Alone');
    
    return formatsList;
}