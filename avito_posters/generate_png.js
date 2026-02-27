const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const versions = [
    { template: 'template.html', outDir: 'templates_v1' },
    { template: 'template_v2.html', outDir: 'templates_v2' },
    { template: 'template_v3.html', outDir: 'templates_v3' }
];

async function generateTemplates() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1200 });

    for (const { template, outDir } of versions) {
        const fullOutDir = path.join(__dirname, outDir);
        if (!fs.existsSync(fullOutDir)) fs.mkdirSync(fullOutDir, { recursive: true });

        const templatePath = path.join(__dirname, template);

        for (let i = 0; i < data.length; i++) {
            const slide = data[i];
            const htmlContent = fs.readFileSync(templatePath, 'utf8');

            await page.setContent(htmlContent, { waitUntil: 'load', timeout: 60000 });
            // Wait a moment for fonts/CSS to apply
            await new Promise(resolve => setTimeout(resolve, 500));

            // Important: Remove body background and hide the image layer to get true transparency
            await page.evaluate((slideData) => {
                document.body.style.background = 'transparent';
                const bg = document.getElementById('bg');
                if (bg) bg.style.display = 'none';
                window.setupData = slideData;

                // Ensure the global render function runs
                if (typeof renderInfo === 'function') {
                    renderInfo();
                    // Force hide image again in case renderInfo re-adds it
                    const bg2 = document.getElementById('bg');
                    if (bg2) bg2.style.backgroundImage = 'none';
                }
            }, slide);

            const filename = `${String(i + 1).padStart(2, '0')}_${slide.id}.png`;
            const outputPath = path.join(fullOutDir, filename);

            await page.screenshot({
                path: outputPath,
                type: 'png',
                omitBackground: true
            });

            console.log(`[${outDir}] -> Saved: ${filename}`);
        }
    }

    await browser.close();
    console.log('✅ Transparent PNG templates generated successfully!');
}

generateTemplates().catch(console.error);
