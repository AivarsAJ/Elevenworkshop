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
    
    // Function to check if image is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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
    
    // Function to check if image is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot) {
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
}

