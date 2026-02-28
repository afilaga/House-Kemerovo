document.addEventListener('DOMContentLoaded', () => {
    const mobileMedia = window.matchMedia('(max-width: 768px)');
    const reduceMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = mobileMedia.matches;
    const prefersReducedMotion = reduceMotionMedia.matches;

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let navTicking = false;
    const updateNavbar = () => {
        navTicking = false;
        if (!navbar) {
            return;
        }
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            return;
        }
        navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', () => {
        if (navTicking) {
            return;
        }
        navTicking = true;
        window.requestAnimationFrame(updateNavbar);
    }, { passive: true });
    updateNavbar();

    // GSAP INITIALIZATION
    const canAnimate = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion;
    const revealProfile = isMobile
        ? { y: 82, duration: 1.05, stagger: 0.12, start: 'top 94%', ease: 'expo.out' }
        : { y: 100, duration: 1, stagger: 0.15, start: 'top 85%' };
    const listProfile = isMobile
        ? { x: -36, duration: 0.8, stagger: 0.1, start: 'top 95%', ease: 'expo.out' }
        : { x: -30, duration: 0.8, stagger: 0.15, start: 'top 80%' };
    if (canAnimate) {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (canAnimate) {
        // 1. Initial Hero Reveal Animation
        gsap.fromTo('.tag-sale',
            { y: isMobile ? -28 : -20, opacity: 0 },
            { y: 0, opacity: 1, duration: isMobile ? 0.95 : 0.8, ease: isMobile ? 'expo.out' : 'power3.out', delay: 0.2 }
        );

        gsap.fromTo('.location',
            { y: isMobile ? -28 : -20, opacity: 0 },
            { y: 0, opacity: 1, duration: isMobile ? 0.95 : 0.8, ease: isMobile ? 'expo.out' : 'power3.out', delay: 0.45 }
        );

        gsap.fromTo('.gs-reveal > *',
            { y: isMobile ? 72 : 50, opacity: 0 },
            { y: 0, opacity: 1, duration: isMobile ? 1.15 : 1, stagger: isMobile ? 0.12 : 0.15, ease: isMobile ? 'expo.out' : 'power3.out', delay: isMobile ? 0.5 : 0.6 }
        );
    }

    // 2. Parallax effect for backgrounds
    if (canAnimate && !isMobile) {
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        parallaxBgs.forEach(bg => {
            gsap.fromTo(bg,
                { yPercent: -12, scale: 1.06 },
                {
                    yPercent: 12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: bg.parentElement.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.5
                    }
                }
            );
        });
    }

    // 3. Info Cards Slide Up Reveal
    if (canAnimate) {
        const infoCards = document.querySelectorAll('.info-card, .cta-content');
        infoCards.forEach(card => {
            gsap.fromTo(card,
                { y: revealProfile.y, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: revealProfile.duration,
                    ease: revealProfile.ease || 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: revealProfile.start,
                        once: true
                    }
                }
            );
        });
    }

    // 4. Feature sequence animation inside slides
    if (canAnimate) {
        const featureLists = document.querySelectorAll('.features-list');
        featureLists.forEach(list => {
            const listItems = list.querySelectorAll('li');
            gsap.fromTo(listItems,
                { x: listProfile.x, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: listProfile.duration,
                    stagger: listProfile.stagger,
                    ease: listProfile.ease || 'power2.out',
                    scrollTrigger: {
                        trigger: list,
                        start: listProfile.start,
                        once: true
                    }
                }
            );
        });
    }

    // 5. Intermission feature boxes reveal
    if (canAnimate) {
        const featureBoxes = document.querySelectorAll('.feature-box');
        if (featureBoxes.length > 0) {
            gsap.fromTo(featureBoxes,
                { y: isMobile ? 56 : 50, opacity: 0, scale: isMobile ? 0.965 : 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: isMobile ? 0.9 : 0.8,
                    stagger: isMobile ? 0.13 : 0.2,
                    ease: isMobile ? 'expo.out' : 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: '.info-section',
                        start: isMobile ? 'top 93%' : 'top 75%',
                        once: true
                    }
                }
            );
        }
    }

    if (!canAnimate) {
        document.querySelectorAll('.gs-reveal > *, .info-card, .cta-content, .features-list li, .feature-box').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    if (canAnimate) {
        const handleMotionChange = (event) => {
            if (event.matches) {
                ScrollTrigger.getAll().forEach((trigger) => {
                    trigger.kill();
                });
            }
        };
        if (typeof reduceMotionMedia.addEventListener === 'function') {
            reduceMotionMedia.addEventListener('change', handleMotionChange);
        }
    }

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
