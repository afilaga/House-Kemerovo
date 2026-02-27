document.addEventListener('DOMContentLoaded', () => {

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // GSAP INITIALIZATION
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Hero Reveal Animation
    gsap.fromTo(".tag-sale",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(".location",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );

    gsap.fromTo(".gs-reveal > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.6 }
    );

    // 2. Parallax effect for backgrounds
    const parallaxBgs = document.querySelectorAll(".parallax-bg");
    parallaxBgs.forEach(bg => {
        gsap.fromTo(bg,
            { yPercent: -15, scale: 1.1 },
            {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: bg.parentElement.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });

    // 3. Info Cards Slide Up Reveal
    const infoCards = document.querySelectorAll(".info-card, .cta-content");
    infoCards.forEach(card => {
        gsap.fromTo(card,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Trigger when top of card hits 85% of viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 4. Feature sequence animation inside slides
    const featureLists = document.querySelectorAll(".features-list");
    featureLists.forEach(list => {
        const listItems = list.querySelectorAll("li");
        gsap.fromTo(listItems,
            { x: -30, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2, // Animate one by one
                ease: "power2.out",
                scrollTrigger: {
                    trigger: list,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 5. Intermission feature boxes reveal
    const featureBoxes = document.querySelectorAll(".feature-box");
    gsap.fromTo(featureBoxes,
        { y: 50, opacity: 0, scale: 0.95 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: ".info-section",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // 6. PHOTO GALLERY LOGIC
    const galleryGrid = document.getElementById("photo-gallery");

    // Elements for Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");

    const images = window.galleryImages || [];

    if (galleryGrid && images.length > 0) {
        // Generate inner DOM structure for top 12 images initially
        images.slice(0, 12).forEach((imgFile, idx) => {
            const item = document.createElement('div');
            item.className = 'gallery-item visible';
            // slight delay based on index for fade animation
            item.style.animationDelay = `${idx * 0.1}s`;
            item.innerHTML = `
                <img src="images/gallery/${imgFile}" loading="lazy" alt="Фото интерьера коттеджа в Кемерово — ${imgFile.replace('.JPG', '')}">
                <div class="gallery-overlay">
                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </div>
            `;
            // Lightbox trigger logic
            item.addEventListener('click', () => {
                lightboxImg.src = `images/gallery/${imgFile}`;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent scrolling behind lightbox
            });
            galleryGrid.appendChild(item);
        });

        // Lightbox close mechanisms
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close on click outside the image
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target !== lightboxImg) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    } else if (galleryGrid) {
        galleryGrid.innerHTML = "<p class='text-center' style='grid-column: 1/-1'>Фотографии загружаются...</p>";
    }

});
