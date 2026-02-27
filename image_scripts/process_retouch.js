const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const piexif = require('piexifjs');

const inputDir = '/Users/andreyfilatiev/Desktop/House/retouch';
const outFullDir = '/Users/andreyfilatiev/Desktop/House/retouch_jpg';
const outLowDir = '/Users/andreyfilatiev/Desktop/House/retouch_low_res';
const websiteUrl = 'https://it.filatiev.pro/';

if (!fs.existsSync(outFullDir)) fs.mkdirSync(outFullDir, { recursive: true });
if (!fs.existsSync(outLowDir)) fs.mkdirSync(outLowDir, { recursive: true });

async function processImages() {
    const files = fs.readdirSync(inputDir).filter(f => !f.startsWith('.') && /\.(png|jpe?g)$/i.test(f));

    // Sort files by creation time so retouch-1, retouch-2 is sequentially matched to timeframe
    files.sort((a, b) => fs.statSync(path.join(inputDir, a)).mtimeMs - fs.statSync(path.join(inputDir, b)).mtimeMs);

    let counter = 1;
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const newName = `retouch-${counter}.jpg`;
        console.log(`Processing [${counter}/${files.length}] ${file} -> ${newName}`);

        const img = sharp(inputPath);
        const metadata = await img.metadata();

        // FULL RES (JPG conversion format)
        let fullBuffer = await img.clone().jpeg({ quality: 90 }).toBuffer();
        fullBuffer = addExif(fullBuffer, websiteUrl);
        fs.writeFileSync(path.join(outFullDir, newName), fullBuffer);

        // LOW RES (1600px long side)
        const longSide = 1600;
        const isLandscape = metadata.width >= metadata.height;
        // We only resize if the original is actually larger than 1600
        let lowBuffer;
        if (metadata.width > longSide || metadata.height > longSide) {
            const resizeOpts = isLandscape
                ? { width: longSide, withoutEnlargement: true }
                : { height: longSide, withoutEnlargement: true };

            lowBuffer = await img.clone()
                .resize(resizeOpts)
                .jpeg({ quality: 85 })
                .toBuffer();
        } else {
            lowBuffer = await img.clone().jpeg({ quality: 85 }).toBuffer();
        }

        lowBuffer = addExif(lowBuffer, websiteUrl);
        fs.writeFileSync(path.join(outLowDir, newName), lowBuffer);

        counter++;
    }

    console.log(`✅ All ${files.length} images processed successfully!`);
    console.log(`Full-res JPGs saved to: ${outFullDir}`);
    console.log(`1600px Low-res JPGs saved to: ${outLowDir}`);
}

function addExif(jpegBuffer, stringValue) {
    // Add EXIF copyright and artist info using piexifjs
    const zeroth = {};
    zeroth[piexif.ImageIFD.ImageDescription] = stringValue;
    zeroth[piexif.ImageIFD.Artist] = stringValue;
    zeroth[piexif.ImageIFD.Copyright] = stringValue;
    const exifObj = { "0th": zeroth, "Exif": {}, "GPS": {} };

    const exifbytes = piexif.dump(exifObj);

    // Convert Node buffer to base64 Data URI that piexifjs expects
    const base64Str = "data:image/jpeg;base64," + jpegBuffer.toString('base64');
    const newBase64 = piexif.insert(exifbytes, base64Str);
    const data = newBase64.replace(/^data:image\/jpeg;base64,/, "");
    return Buffer.from(data, 'base64');
}

processImages().catch(console.error);
