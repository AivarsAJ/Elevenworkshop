// Dropdown Menu Toggle
const navMenuToggle = document.getElementById('nav-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (navMenuToggle && navMenu) {
    navMenuToggle.addEventListener('click', () => {
        navMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.character-section, .intro-section, .location-section, .cta-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Trailer button functionality
document.querySelectorAll('.btn-trailer').forEach(button => {
    button.addEventListener('click', function() {
        // In a real implementation, this would open a video modal
        alert('Trailer would play here. In a real implementation, this would open a video player.');
    });
});

// Wishlist button functionality
const wishlistBtn = document.querySelector('.btn-wishlist');
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
        // In a real implementation, this would redirect to store
        alert('Wishlist functionality would redirect to store here.');
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.email-input').value;
        if (email) {
            alert(`Thank you for subscribing! (Email: ${email})`);
            this.querySelector('.email-input').value = '';
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

// YouTube Videos Slider for Mobile
const youtubeSliderTrack = document.getElementById('youtube-slider-track');
const youtubeDots = document.querySelectorAll('.youtube-dots .dot');

if (youtubeSliderTrack && youtubeDots.length > 0) {
    let currentSlide = 0;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const totalSlides = youtubeDots.length;

    // Update slider position
    const updateSlider = () => {
        const translateX = -currentSlide * 100;
        youtubeSliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        youtubeDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Dot navigation
    youtubeDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Touch events for mobile swipe
    youtubeSliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    youtubeSliderTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        touchEndX = e.touches[0].clientX;
    }, { passive: false });

    youtubeSliderTrack.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                // Swipe left - next slide
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                // Swipe right - previous slide
                currentSlide--;
            }
            updateSlider();
        }
    });

    // Mouse drag for desktop (optional)
    youtubeSliderTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - youtubeSliderTrack.offsetLeft;
        scrollLeft = currentSlide;
        youtubeSliderTrack.style.cursor = 'grabbing';
    });

    youtubeSliderTrack.addEventListener('mouseleave', () => {
        isDragging = false;
        youtubeSliderTrack.style.cursor = 'grab';
    });

    youtubeSliderTrack.addEventListener('mouseup', () => {
        isDragging = false;
        youtubeSliderTrack.style.cursor = 'grab';
    });

    youtubeSliderTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - youtubeSliderTrack.offsetLeft;
        const walk = (x - startX) * 2;
        // Only apply mouse drag if on desktop (not touch device)
        if (window.innerWidth > 768) {
            // Desktop mouse drag can be implemented here if needed
        }
    });

    // Initialize
    updateSlider();
}

// Character image hover effects
document.querySelectorAll('.character-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Jason Duval image switching - PIRMS to PEC with cool transition
const jasonImage = document.getElementById('jason-image');
if (jasonImage) {
    const characterImageContainer = jasonImage.closest('.character-image');
    let imageChanged = false;
    
    // Function to check if image is in viewport (mobile-friendly)
    const isInViewport = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        // Check if element is at least partially visible in viewport
        return (
            rect.top < windowHeight &&
            rect.bottom > 0 &&
            rect.left < windowWidth &&
            rect.right > 0
        );
    };
    
    // Check visibility and start transition
    const checkAndTransition = () => {
        if (!imageChanged && jasonImage && characterImageContainer && isInViewport(jasonImage.closest('.character-section'))) {
            imageChanged = true;
            
            // Wait 2 seconds after section is visible, then transition (1.5x faster)
            setTimeout(() => {
                // Add transitioning class for border glow effect to container
                characterImageContainer.classList.add('transitioning');
                
                // Fade out current image with scale effect
                jasonImage.classList.add('fade-out');
                
                // After fade out completes, change image and fade in
                setTimeout(() => {
                    jasonImage.src = 'PEC.jpg';
                    jasonImage.alt = 'After';
                    
                    // Remove fade-out, add fade-in for smooth transition
                    jasonImage.classList.remove('fade-out');
                    jasonImage.classList.add('fade-in');
                    
                    // Remove transitioning class after animation
                    setTimeout(() => {
                        characterImageContainer.classList.remove('transitioning');
                    }, 700); // Match transition duration (1.5x faster)
                }, 530); // Match transition duration (1.5x faster)
            }, 2000); // 1.5x faster: 3000ms / 1.5 = 2000ms
        }
    };
    
    // Check on scroll and on load
    window.addEventListener('scroll', checkAndTransition);
    window.addEventListener('load', checkAndTransition);
    
    // Initial check
    checkAndTransition();
}

// AUTO KRĀSOŠANA image switching - pirms2 to pec2 with cool transition
const autokrasosanaImage = document.getElementById('autokrasosana-image');
if (autokrasosanaImage) {
    const characterImageContainer = autokrasosanaImage.closest('.character-image');
    let imageChanged = false;
    
    // Function to check if image is in viewport (mobile-friendly)
    const isInViewport = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        // Check if element is at least partially visible in viewport
        return (
            rect.top < windowHeight &&
            rect.bottom > 0 &&
            rect.left < windowWidth &&
            rect.right > 0
        );
    };
    
    // Check visibility and start transition
    const checkAndTransition = () => {
        if (!imageChanged && autokrasosanaImage && characterImageContainer && isInViewport(autokrasosanaImage.closest('.character-section'))) {
            imageChanged = true;
            
            // Wait 2 seconds after section is visible, then transition (1.5x faster)
            setTimeout(() => {
                // Add transitioning class for border glow effect to container
                characterImageContainer.classList.add('transitioning');
                
                // Fade out current image with scale effect
                autokrasosanaImage.classList.add('fade-out');
                
                // After fade out completes, change image and fade in
                setTimeout(() => {
                    autokrasosanaImage.src = 'pec2.jpg';
                    autokrasosanaImage.alt = 'After';
                    
                    // Remove fade-out, add fade-in for smooth transition
                    autokrasosanaImage.classList.remove('fade-out');
                    autokrasosanaImage.classList.add('fade-in');
                    
                    // Remove transitioning class after animation
                    setTimeout(() => {
                        characterImageContainer.classList.remove('transitioning');
                    }, 700); // Match transition duration (1.5x faster)
                }, 530); // Match transition duration (1.5x faster)
            }, 2000); // 1.5x faster: 3000ms / 1.5 = 2000ms
        }
    };
    
    // Check on scroll and on load
    window.addEventListener('scroll', checkAndTransition);
    window.addEventListener('load', checkAndTransition);
    
    // Initial check
    checkAndTransition();
}

// Custom Cursor - Only on desktop (not mobile)
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot && !isMobile) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor ring follows with delay
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Dot follows immediately
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .feature-slide-item, .nav-link, .platforms span');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
} else if (cursor && cursorDot) {
    // Hide cursor elements on mobile
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
    document.body.style.cursor = 'auto';
}

