const fs = require('fs');
let html = fs.readFileSync('landing/index.html', 'utf-8');

function replaceHero(html) {
    const from = `<div class="bg-image parallax-bg" style="background-image: url('images/main.jpg');"></div>`;
    const to = `<div class="swiper hero-swiper" style="width: 100%; height: 100%;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/main.jpg?v=2');"></div></div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/hero/2.jpg?v=2');"></div></div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/hero/3.jpg?v=2');"></div></div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/hero/4.jpg?v=2');"></div></div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/hero/5.jpg?v=2');"></div></div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>`;
    return html.replace(from, to);
}

function replaceKitchen(html) {
    const from = `<div class="swiper-slide">
                        <div class="bg-image parallax-bg" style="background-image: url('images/kitchen_slider/6.jpg')">
                        </div>
                    </div>`;
    const to = `<div class="swiper-slide">
                        <div class="bg-image parallax-bg" style="background-image: url('images/kitchen_slider/6.jpg')">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="bg-image parallax-bg" style="background-image: url('images/kitchen_slider/7.jpg')">
                        </div>
                    </div>`;
    return html.replace(from, to);
}

function makeSwiperBlock(id, oldBg, newImages) {
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

function replaceMasterBedroom(html) {
    const from = `<div class="bg-image parallax-bg" style="background-image: url('images/rooms/1.jpg')"></div>`;
    const to = `<div class="swiper master-swiper" style="width: 100%; height: 100%;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide swiper-no-swiping">
                        <div class="comparison-slider" style="position: absolute; width: 100%; height: 100%; overflow: hidden;">
                            <div class="image-before" style="position: absolute; width: 100%; height: 100%; background-image: url('images/master/1.jpg?v=2'); background-size: cover; background-position: center;"></div>
                            <div class="image-after" style="position: absolute; width: 50%; height: 100%; background-image: url('images/master/1_night.jpg?v=2'); background-size: cover; background-position: center; border-right: 3px solid #fff;">
                                <div class="slider-handle" style="position: absolute; top: 50%; right: -15px; width: 30px; height: 30px; background: #fff; border-radius: 50%; transform: translateY(-50%); display:flex; align-items:center; justify-content:center; z-index: 10; font-weight: bold; color: #222; box-shadow: 0 0 10px rgba(0,0,0,0.5);">&lt;&gt;</div>
                            </div>
                            <input type="range" class="comparison-range" min="0" max="100" value="50" style="position: absolute; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; z-index: 20;">
                        </div>
                    </div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/master/2.jpg?v=2');"></div></div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/master/3.jpg?v=2');"></div></div>
                    <div class="swiper-slide"><div class="bg-image parallax-bg" style="background-image: url('images/master/4.jpg?v=2');"></div></div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>`;
    return html.replace(from, to);
}

html = replaceHero(html);
html = replaceKitchen(html);
html = replaceMasterBedroom(html);

// Wardrobe
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/rooms/5.jpg')"></div>`, makeSwiperBlock('wardrobe', '', ['images/wardrobe/1.jpg', 'images/wardrobe/2.jpg']));

// Kids
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/rooms/kids.jpg')"></div>`, makeSwiperBlock('kids', '', ['images/kids/1.jpg', 'images/kids/2.jpg', 'images/kids/3.jpg']));

// Cabinet
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/rooms/room_1.jpg')"></div>`, makeSwiperBlock('cabinet', '', ['images/cabinet/1.jpg', 'images/cabinet/2.jpg']));

// Cozy room
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/rooms/room_2.jpg')"></div>`, makeSwiperBlock('cozy', '', ['images/rooms/room_2.jpg', 'images/cozy/1.jpg']));

// Bath 1
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/rooms/bath_2.jpg')"></div>`, makeSwiperBlock('bath1', '', ['images/rooms/bath_2.jpg', 'images/bath1/2.jpg']));

// Bath 2
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/rooms/bath_1.jpg')"></div>`, makeSwiperBlock('bath2', '', ['images/rooms/bath_1.jpg', 'images/bath2/2.jpg']));

// Garage
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/garage.jpg')"></div>`, makeSwiperBlock('garage', '', ['images/garage.jpg', 'images/garage/1.jpg', 'images/garage/2.jpg']));

// Terrace
html = html.replace(`<div class="bg-image parallax-bg" style="background-image: url('images/terrace.jpg')"></div>`, makeSwiperBlock('terrace', '', ['images/terrace.jpg', 'images/terrace/1.jpg', 'images/terrace/2.jpg', 'images/terrace/3.jpg']));


// Add Swiper Init scripts & Comparison sliders scripts
const newScript = `
        const comparisonSliders = document.querySelectorAll('.comparison-slider');
        comparisonSliders.forEach(slider => {
            const range = slider.querySelector('.comparison-range');
            const afterImage = slider.querySelector('.image-after');
            
            range.addEventListener('input', (e) => {
                afterImage.style.width = e.target.value + '%';
            });
        });

        const generalSwiperOptions = {
            loop: true,
            effect: 'fade',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        };
        new Swiper('.hero-swiper', generalSwiperOptions);
        new Swiper('.master-swiper', { ...generalSwiperOptions, effect: 'slide', noSwiping: true, noSwipingClass: 'swiper-no-swiping' });
        new Swiper('.wardrobe-swiper', generalSwiperOptions);
        new Swiper('.kids-swiper', generalSwiperOptions);
        new Swiper('.cabinet-swiper', generalSwiperOptions);
        new Swiper('.cozy-swiper', generalSwiperOptions);
        new Swiper('.bath1-swiper', generalSwiperOptions);
        new Swiper('.bath2-swiper', generalSwiperOptions);
        new Swiper('.garage-swiper', generalSwiperOptions);
        new Swiper('.terrace-swiper', generalSwiperOptions);
`;

html = html.replace(`        });
    </script>`, `        });${newScript}
    </script>`);

fs.writeFileSync('landing/index.html', html);
console.log('Done HTML modifications');
