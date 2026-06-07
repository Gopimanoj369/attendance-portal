// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaBtn = document.getElementById('ctaBtn');
    const scrollBtn = document.getElementById('scrollBtn');
    const contactForm = document.getElementById('contactForm');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // CTA Button scroll to contact
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Scroll button to portfolio
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function() {
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const subject = subjectInput ? subjectInput.value : '';
            const message = messageInput ? messageInput.value : '';

            // Basic validation
            if (name && email && subject && message) {
                // Show success message
                showNotification('Thank you ' + name + '! Your message has been sent successfully. I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    // Intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Prevent form submission errors
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
        });
    });

    // Form input validation styles
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#f5576c';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });

    // Add portfolio item click animation
    const portfolioViewBtns = document.querySelectorAll('.view-btn');
    portfolioViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening project details...', 'info');
        });
    });
});

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#667eea' : type === 'error' ? '#f5576c' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        max-width: 400px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Preload body opacity
document.body.style.opacity = '0.95';