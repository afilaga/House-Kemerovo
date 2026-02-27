const fs = require('fs');
let html = fs.readFileSync('landing/index.html', 'utf-8');

function makeSwiperBlock(id, newImages) {
    let to = `<div class="swiper ${id}-swiper" style="width: 100%; height: 100%;">
                <div class="swiper-wrapper">
                    ${newImages.map(img => `<div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('${img}?v=2')"></div></div>`).join('\n                    ')}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>`;
    return to;
}

// Terrace
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/terrace1.jpg')"></div>`, makeSwiperBlock('terrace', ['images/terrace1.jpg', 'images/terrace/1.jpg', 'images/terrace/2.jpg', 'images/terrace/3.jpg']));
html = html.replace(`new Swiper('.garage-swiper', generalSwiperOptions);
        new Swiper('.terrace-swiper', generalSwiperOptions);
        new Swiper('.terrace-swiper', generalSwiperOptions);`, `new Swiper('.garage-swiper', generalSwiperOptions);
        new Swiper('.terrace-swiper', generalSwiperOptions);`);

// Technical features image to left side
const techBlockBefore = `<div class="tech-grid">
                <ul class="tech-list">`;
const techBlockAfter = `<div class="tech-container" style="display: flex; gap: 30px; align-items: stretch; flex-wrap: wrap;">
                <div class="tech-image" style="flex: 1 1 350px; border-radius: 12px; overflow: hidden; background: url('images/tech.jpg') center/cover;"></div>
                <div class="tech-grid" style="flex: 2 1 500px;">
                    <ul class="tech-list">`;
html = html.replace(techBlockBefore, techBlockAfter);
html = html.replace(`</li>
                </ul>
            </div>
        </div>
    </section>`, `</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>`);

// CTA block background update
html = html.replace(`style="background-image: url('images/village.jpg')"></div>`, `style="background-image: url('images/fomo.jpg')"></div>`);

fs.writeFileSync('landing/index.html', html);
console.log('Done HTML modifications 2');
