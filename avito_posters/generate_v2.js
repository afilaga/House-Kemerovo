const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const outputDir = path.join(__dirname, 'output_v2');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
    // Launch puppeteer
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to 1600x1200 (4:3 ratio) which is standard for Avito optimal fit
    await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 1 });

    const templatePath = `file://${path.join(__dirname, 'template_v2.html')}`;
    console.log('Template loaded locally:', templatePath);

    for (let i = 0; i < data.length; i++) {
        const slide = data[i];
        console.log(`[${i + 1}/${data.length}] Rendering slide: ${slide.id}`);

        await page.goto(templatePath, { waitUntil: 'networkidle0' });

        // Inject data into the page
        await page.evaluate((slideData) => {
            window.setupData = slideData;
            window.renderInfo();
        }, slide);

        // Wait to make sure custom web fonts (Inter) load and bg image renders
        await new Promise(r => setTimeout(r, 1500));

        const outputFilename = path.join(outputDir, `${(i + 1).toString().padStart(2, '0')}_${slide.id}.jpg`);

        await page.screenshot({
            path: outputFilename,
            type: 'jpeg',
            quality: 95
        });

        console.log(`-> Saved: ${outputFilename}`);
    }

    await browser.close();
    console.log('\n✅ All posters successfully generated in:', outputDir);
})();
