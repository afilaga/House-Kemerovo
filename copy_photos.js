const fs = require('fs');
const path = require('path');

const copies = [
    // Hero
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/15.JPG", "landing/images/hero/2.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/27.JPG", "landing/images/hero/3.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/117.JPG", "landing/images/hero/4.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/127.JPG", "landing/images/hero/5.jpg"],
    // Kitchen (10.JPG at the end)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/10.JPG", "landing/images/kitchen_slider/7.jpg"],
    // Master bedroom (1.JPG, 7.JPG for before/after, 4.HQ, 2.lq, 4.lq for carousel)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/1.JPG", "landing/images/master/1.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/7.JPG", "landing/images/master/1_night.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/4.JPG", "landing/images/master/2.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/2.JPG", "landing/images/master/3.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/4.JPG", "landing/images/master/4.jpg"],
    // Wardrobe (25.JPG, 5.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/5.JPG", "landing/images/wardrobe/1.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/25.JPG", "landing/images/wardrobe/2.jpg"],
    // Kids (13.JPG, 18.JPG, 6.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/13.JPG", "landing/images/kids/1.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/18.JPG", "landing/images/kids/2.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_HQ/6.JPG", "landing/images/kids/3.jpg"],
    // Cabinet (26.JPG, 25.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/26.JPG", "landing/images/cabinet/1.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/25.JPG", "landing/images/cabinet/2.jpg"],
    // Cozy room (93.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/93.JPG", "landing/images/cozy/1.jpg"],
    // Bath 1 (89.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/89.JPG", "landing/images/bath1/2.jpg"],
    // Bath 2 (10.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/10.JPG", "landing/images/bath2/2.jpg"],
    // Garage (28.JPG, 11.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/28.JPG", "landing/images/garage/1.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/11.JPG", "landing/images/garage/2.jpg"],
    // Terrace (18.JPG, 17.JPG, 137.JPG)
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/18.JPG", "landing/images/terrace/1.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/17.JPG", "landing/images/terrace/2.jpg"],
    ["/Users/andreyfilatiev/Desktop/House/Photos/Все_ниже_кач_интернет/137.JPG", "landing/images/terrace/3.jpg"],
    // Tech features
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/Firefly_GeminiFlash копия-2.jpg", "landing/images/tech.jpg"],
    // FOMO / CTA
    ["/Users/andreyfilatiev/Desktop/House/Photos/Photos_gen_lq/13.JPG", "landing/images/fomo.jpg"],
];

copies.forEach(([src, dest]) => {
    const fullDest = path.join("/Users/andreyfilatiev/Desktop/House", dest);
    fs.mkdirSync(path.dirname(fullDest), { recursive: true });
    try {
        fs.copyFileSync(src, fullDest);
    } catch (e) {
        console.error("Failed to copy", src, e.message);
    }
});
console.log("Done copying");
