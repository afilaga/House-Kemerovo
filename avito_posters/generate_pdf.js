const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function createPDF() {
    const outputDir = path.join(__dirname, 'output_v2');
    // Get all jpg images and sort them alphabetically
    // This will naturally order them by the prefix 01, 02, etc.
    const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg')).sort();

    // Filter out the 'var2' variants to have a clean, non-repeating presentation
    const selectedFiles = files.filter(f => !f.includes('var2'));

    const doc = new PDFDocument({
        layout: 'landscape',
        size: [1600, 1200],
        margin: 0
    });

    const pdfPath = '/Users/andreyfilatiev/Desktop/House/Коттедж_Презентация.pdf';
    doc.pipe(fs.createWriteStream(pdfPath));

    for (let i = 0; i < selectedFiles.length; i++) {
        if (i > 0) {
            doc.addPage({ size: [1600, 1200], layout: 'landscape', margin: 0 });
        }
        const filePath = path.join(outputDir, selectedFiles[i]);
        doc.image(filePath, 0, 0, { width: 1600, height: 1200 });
    }

    doc.end();
    console.log('✅ PDF Presentation created successfully at: ' + pdfPath);
}

createPDF();
