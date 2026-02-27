const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const imagesDir = path.join(__dirname, 'landing', 'images');
const htmlFile = path.join(__dirname, 'landing', 'index.html');
const cssFile = path.join(__dirname, 'landing', 'css', 'style.css');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else if (/\.(jpe?g|png)$/i.test(file)) {
            const ext = path.extname(file);
            const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');

            try {
                // Convert to webp
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);

                console.log(`Converted: ${filePath} -> ${webpPath}`);

                // Optionally delete original to save space
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error(`Failed to convert ${filePath}:`, err.message);
            }
        }
    }
}

function updateFileReferences(filePath) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace .jpg, .jpeg, .png with .webp (case insensitive) everywhere in the file
    // Including any URL parameters like ?v=2 etc. if they are closely attached.
    // Actually, simple replace of the extensions is safer. Let's do a global replace for all known formats.
    content = content.replace(/\.jpg/gi, '.webp');
    content = content.replace(/\.jpeg/gi, '.webp');
    content = content.replace(/\.png/gi, '.webp');

    // For safety, let's also update .JPG if it was used anywhere.
    // the 'gi' flag handles case.

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated references in: ${filePath}`);
}

async function main() {
    console.log('Starting image conversion to WebP...');
    await processDirectory(imagesDir);
    console.log('\nUpdating HTML and CSS files...');
    updateFileReferences(htmlFile);
    updateFileReferences(cssFile);
    console.log('✅ Done! All images are now WebP.');
}

main().catch(console.error);
