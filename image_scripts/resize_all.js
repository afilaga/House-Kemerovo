const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory() {
    const sourceDir = '/Users/andreyfilatiev/Desktop/House/retouch_low_res/All';
    const targetDir = '/Users/andreyfilatiev/Desktop/House/retouch_low_res/low_res';

    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png'));

    console.log(`Found ${imageFiles.length} images to process...`);

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        try {
            // Get image dimensions
            const metadata = await sharp(sourcePath).metadata();
            const isLandscape = metadata.width >= metadata.height;

            // Resize preserving aspect ratio
            await sharp(sourcePath)
                .resize({
                    width: isLandscape ? 1600 : undefined,
                    height: isLandscape ? undefined : 1600,
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 90 }) // Convert/Save as JPEG with high quality
                .toFile(targetPath);

            console.log(`[${i + 1}/${imageFiles.length}] Resized: ${file}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log('✅ All images resized and saved to "low_res" folder!');
}

processDirectory();
