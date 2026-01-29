import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@2.5.2';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { purchaseId } = await req.json();

    // Fetch the purchase
    const purchase = await base44.entities.Purchase.get(purchaseId);

    // Verify the purchase belongs to the user
    if (purchase.customer_email !== user.email) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Create PDF
    const doc = new jsPDF();

    // Header
    doc.setFontSize(24);
    doc.setTextColor(218, 123, 0); // Primary color
    doc.text('FANAN TEAM', 105, 30, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Purchase Receipt', 105, 45, { align: 'center' });

    // Divider
    doc.setDrawColor(218, 123, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    // Purchase Details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    
    const purchaseDate = new Date(purchase.created_date);
    const formattedDate = purchaseDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let y = 70;
    
    doc.text('Receipt #:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(purchase.id, 60, y);
    
    y += 10;
    doc.setTextColor(100, 100, 100);
    doc.text('Date:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(formattedDate, 60, y);

    y += 10;
    doc.setTextColor(100, 100, 100);
    doc.text('Customer:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(purchase.customer_name || purchase.customer_email, 60, y);

    y += 10;
    doc.setTextColor(100, 100, 100);
    doc.text('Email:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(purchase.customer_email, 60, y);

    // Product Section
    y += 20;
    doc.setFontSize(14);
    doc.setTextColor(218, 123, 0);
    doc.text('Product Details', 20, y);
    
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Pack Name:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(purchase.pack_name, 60, y);

    y += 15;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Serial Number:', 20, y);
    doc.setTextColor(218, 123, 0);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(16);
    doc.text(purchase.serial_number, 60, y);
    doc.setFont(undefined, 'normal');

    if (purchase.machine_id) {
      y += 12;
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Machine ID:', 20, y);
      doc.setTextColor(0, 0, 0);
      doc.text(purchase.machine_id, 60, y);
    }

    // Payment Section
    y += 20;
    doc.setDrawColor(218, 123, 0);
    doc.line(20, y, 190, y);
    
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Amount Paid:', 20, y);
    doc.setTextColor(218, 123, 0);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(`$${purchase.amount_paid.toFixed(2)}`, 60, y);
    doc.setFont(undefined, 'normal');

    // Footer
    y = 260;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for your purchase!', 105, y, { align: 'center' });
    y += 5;
    doc.text('For support, please contact us through our website.', 105, y, { align: 'center' });

    const pdfBytes = doc.output('arraybuffer');

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Fanan-Team-Receipt-${purchase.id}.pdf"`
      }
    });
  } catch (error) {
    console.error('Receipt generation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});