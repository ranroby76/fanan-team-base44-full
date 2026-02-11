import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// List of known serial formula secrets
const SERIAL_FORMULA_SECRETS = [
  "SERIAL_FORMULA-COLOSSEUM",
  "SERIAL_FORMULA-MAD_MIDI_MACHINES", 
  "SERIAL_FORMULA-MAX"
];

// Normalize string for comparison (lowercase, remove special chars)
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get all packs from database
    const packs = await base44.asServiceRole.entities.PackPrice.list();
    
    const results = [];
    
    for (const pack of packs) {
      const packNameNormalized = normalize(pack.pack_name);
      
      // Find matching secret
      let matchedSecret = null;
      let matchScore = 0;
      
      for (const secret of SERIAL_FORMULA_SECRETS) {
        // Extract the name part after "SERIAL_FORMULA-"
        const secretName = secret.replace("SERIAL_FORMULA-", "");
        const secretNameNormalized = normalize(secretName);
        
        // Check for match
        if (packNameNormalized.includes(secretNameNormalized) || 
            secretNameNormalized.includes(packNameNormalized)) {
          // Calculate match score based on similarity
          const score = Math.min(packNameNormalized.length, secretNameNormalized.length) / 
                       Math.max(packNameNormalized.length, secretNameNormalized.length);
          
          if (score > matchScore) {
            matchScore = score;
            matchedSecret = secret;
          }
        }
      }
      
      // If no direct match, use AI to find best match
      if (!matchedSecret && SERIAL_FORMULA_SECRETS.length > 0) {
        const aiResult = await base44.integrations.Core.InvokeLLM({
          prompt: `Match the pack name "${pack.pack_name}" to one of these serial formula secrets: ${SERIAL_FORMULA_SECRETS.join(", ")}. 
          
          Rules:
          - "Mad MIDI Machines" matches "SERIAL_FORMULA-MAD_MIDI_MACHINES"
          - "Max Pack" or "Max! Pack" matches "SERIAL_FORMULA-MAX"
          - "Colosseum" or "Colosseum Pack" matches "SERIAL_FORMULA-COLOSSEUM"
          
          Return the best matching secret name, or "NONE" if no good match exists.`,
          response_json_schema: {
            type: "object",
            properties: {
              matched_secret: { type: "string" },
              confidence: { type: "number" }
            }
          }
        });
        
        if (aiResult.matched_secret && aiResult.matched_secret !== "NONE" && aiResult.confidence > 0.5) {
          matchedSecret = aiResult.matched_secret;
        }
      }
      
      // Update pack if we found a match and it's different from current
      if (matchedSecret && pack.serial_formula_secret !== matchedSecret) {
        await base44.asServiceRole.entities.PackPrice.update(pack.id, {
          serial_formula_secret: matchedSecret
        });
        
        results.push({
          pack: pack.pack_name,
          linked_to: matchedSecret,
          status: "updated"
        });
      } else if (matchedSecret && pack.serial_formula_secret === matchedSecret) {
        results.push({
          pack: pack.pack_name,
          linked_to: matchedSecret,
          status: "already_linked"
        });
      } else {
        results.push({
          pack: pack.pack_name,
          linked_to: null,
          status: "no_match"
        });
      }
    }

    return Response.json({ 
      success: true, 
      results,
      message: `Processed ${results.length} packs`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});