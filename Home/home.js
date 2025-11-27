        // Header animation on load
        document.addEventListener('DOMContentLoaded', function () {
            const header = document.getElementById('header');
            header.classList.add('loaded');
        });

        // Scroll Animation Observer with performance optimization
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame to prevent layout thrashing
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                }
            });
        }, observerOptions);

        // Observe all animation elements when DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            // Throttle animations on mobile for better performance
            const isMobile = window.innerWidth <= 768;
            const animationDelay = isMobile ? 0.05 : 0.1;

            // Add animation classes to elements
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                if (index % 2 === 0) {
                    section.classList.add('fade-in');
                } else {
                    section.classList.add('slide-in-left');
                }
                observer.observe(section);
            });

            // Service cards animation with mobile optimization
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                const delay = isMobile ? index * animationDelay : index * 0.1;
                card.style.animationDelay = `${delay}s`;
                card.classList.add('scale-in');
                observer.observe(card);
            });

            // Stat boxes animation
            const statBoxes = document.querySelectorAll('.stat-box');
            statBoxes.forEach((box, index) => {
                const delay = isMobile ? index * animationDelay : index * 0.2;
                box.style.animationDelay = `${delay}s`;
                box.classList.add('bounce-in');
                observer.observe(box);
            });

            // Testimonial cards animation
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            testimonialCards.forEach((card, index) => {
                const delay = isMobile ? index * animationDelay : index * 0.15;
                card.style.animationDelay = `${delay}s`;
                card.classList.add('slide-in-right');
                observer.observe(card);
            });

            // Industry cards animation
            const industryCards = document.querySelectorAll('.industry-card');
            industryCards.forEach((card, index) => {
                const delay = isMobile ? index * animationDelay : index * 0.1;
                card.style.animationDelay = `${delay}s`;
                card.classList.add('fade-in');
                observer.observe(card);
            });

            // Contact form animation
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.classList.add('slide-in-right');
                observer.observe(contactForm);
            }

            // Contact info animation
            const contactInfo = document.querySelector('.contact-info');
            if (contactInfo) {
                contactInfo.classList.add('slide-in-left');
                observer.observe(contactInfo);
            }
        });

        // Number counter animation for stats
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Trigger number animation when stats come into view
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(number => {
                        const finalValue = parseInt(number.textContent);
                        number.textContent = '0';
                        setTimeout(() => {
                            animateValue(number, 0, finalValue, 2000);
                        }, 500);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.addEventListener('DOMContentLoaded', function () {
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                statsObserver.observe(statsSection);
            }
        });

        // Navigation functionality removed - handled by external files

        // Contact Form Functionality with localStorage database
        // Contact Form with LocalStorage Database (Working Solution)
        document.addEventListener('DOMContentLoaded', function () {
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('form-message');

            if (contactForm) {
                contactForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const submitBtn = contactForm.querySelector('.submit-btn');
                    const originalText = submitBtn.textContent;

                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Saving...';
                    formMessage.style.display = 'none';

                    const formData = {
                        id: Date.now(), // Unique ID
                        name: document.getElementById('name').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        subject: document.getElementById('subject').value.trim(),
                        message: document.getElementById('message').value.trim(),
                        timestamp: new Date().toLocaleString(),
                        ip: 'local',
                        status: 'new'
                    };

                    // Enhanced Validation
                    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                        showMessage('Please fill in all required fields.', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }

                    // Name validation (min 2 characters)
                    if (formData.name.length < 2) {
                        showMessage('Name must be at least 2 characters long.', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }

                    // Subject validation (min 5 characters)
                    if (formData.subject.length < 5) {
                        showMessage('Subject must be at least 5 characters long.', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }

                    // Message validation (min 10 characters)
                    if (formData.message.length < 10) {
                        showMessage('Message must be at least 10 characters long.', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }

                    if (!isValidEmail(formData.email)) {
                        showMessage('Please enter a valid email address.', 'error');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                    }

                    // Save to localStorage database
                    try {
                        saveToLocalDatabase(formData);
                        showMessage('✅ Thank you! Your message has been saved successfully. We will contact you soon.', 'success');
                        contactForm.reset();

                        // Log to console for verification
                        console.log('📁 Saved to Local Database:', formData);
                        displayAllMessages(); // Show all saved messages in console

                    } catch (error) {
                        showMessage('Thank you! Message received. (Temporary storage)', 'success');
                        contactForm.reset();
                        console.log('Form data:', formData);
                    } finally {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }
                });
            }

            // Save to localStorage database
            function saveToLocalDatabase(formData) {
                // Get existing messages or initialize empty array
                const existingMessages = JSON.parse(localStorage.getItem('zonixtec_contact_messages') || '[]');

                // Add new message with unique ID
                formData.id = Date.now();
                formData.timestamp = new Date().toLocaleString();

                // Add to array
                existingMessages.push(formData);

                // Save back to localStorage (max 50 messages to prevent overflow)
                const trimmedMessages = existingMessages.slice(-50);
                localStorage.setItem('zonixtec_contact_messages', JSON.stringify(trimmedMessages));

                return formData.id;
            }

            // Display all saved messages in console (for testing)
            function displayAllMessages() {
                const messages = JSON.parse(localStorage.getItem('zonixtec_contact_messages') || '[]');
                console.log('📊 ALL SAVED MESSAGES:', messages);
                console.log(`💾 Total messages stored: ${messages.length}`);

                // Show recent messages
                if (messages.length > 0) {
                    console.log('🆕 Recent messages:');
                    messages.slice(-3).forEach(msg => {
                        console.log(`   📝 ${msg.name} - ${msg.subject} (${msg.timestamp})`);
                    });
                }
            }

            function showMessage(text, type) {
                formMessage.textContent = text;
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = type === 'success'
                    ? 'rgba(39, 174, 96, 0.1)'
                    : 'rgba(231, 76, 60, 0.1)';
                formMessage.style.color = type === 'success' ? '#27ae60' : '#e74c3c';
                formMessage.style.border = `1px solid ${type === 'success' ? '#27ae60' : '#e74c3c'}`;

                if (type === 'success') {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 8000);
                }
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            // Display existing messages on page load
            setTimeout(() => {
                displayAllMessages();
            }, 1000);
        });

        // Footer dropdown functionality
      

        // Viewport height fix for mobile
        function setVh() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVh();
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVh, 100);
        });

        // Prevent layout shifts during animations
        document.addEventListener('DOMContentLoaded', function () {
            // Add loaded class to prevent FOUC
            document.body.classList.add('loaded');

            // Add a small delay before starting animations to ensure layout is stable
            setTimeout(() => {
                document.body.classList.add('animations-ready');
            }, 100);
        });

        // Hero Slider Functionality with Video Switching
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const videos = document.querySelectorAll('.hero-bg-video');
        const totalSlides = slides.length;
        let autoSlideInterval = null;
        let isTransitioning = false;

        // Function to show specific slide and change video
        function showSlide(index) {
            // Prevent multiple transitions at once
            if (isTransitioning) return;
            isTransitioning = true;

            // Calculate previous slide index
            const prevIndex = currentSlideIndex;
            
            // Update current slide index
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            currentSlideIndex = index;

            // Remove active and prev classes from all slides
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev');
            });

            // Add prev class to previous slide
            if (slides[prevIndex]) {
                slides[prevIndex].classList.add('prev');
            }

            // Add active class to current slide
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].classList.add('active');
            }

            // Change background video with fade effect
            videos.forEach(video => {
                video.classList.remove('active');
            });

            if (videos[currentSlideIndex]) {
                // Pause all other videos
                videos.forEach((video, i) => {
                    if (i !== currentSlideIndex) {
                        video.pause();
                    }
                });

                // Activate and play current video
                videos[currentSlideIndex].classList.add('active');
                videos[currentSlideIndex].currentTime = 0;
                videos[currentSlideIndex].play().catch(err => {
                    console.log('Video autoplay failed:', err);
                });
            }

            // Reset transition lock after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }

        // Function to go to next slide
        function nextSlide() {
            const nextIndex = (currentSlideIndex + 1) % totalSlides;
            showSlide(nextIndex);
        }

        // Function to go to previous slide
        function prevSlide() {
            const prevIndex = currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1;
            showSlide(prevIndex);
        }

        // Function called by navigation buttons
        function changeSlide(direction) {
            if (direction === 1) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        // Auto-play slider
        function startAutoSlide() {
            // Clear any existing interval first
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        }

        // Initialize slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize videos - preload all videos
            videos.forEach((video, index) => {
                video.load();
                video.muted = true; // Ensure videos are muted for autoplay
                if (index !== 0) {
                    video.pause();
                }
            });

            // Start auto-play
            startAutoSlide();

            // Enhanced pause/resume functionality
            const heroSection = document.querySelector('.hero');
            const sliderControls = document.querySelectorAll('.prev-btn, .next-btn');

            if (heroSection) {
                // Pause on hover
                heroSection.addEventListener('mouseenter', () => {
                    if (autoSlideInterval) {
                        clearInterval(autoSlideInterval);
                        autoSlideInterval = null;
                    }
                });

                heroSection.addEventListener('mouseleave', () => {
                    startAutoSlide();
                });

                sliderControls.forEach(control => {
                    control.addEventListener('click', () => {
                        if (autoSlideInterval) {
                            clearInterval(autoSlideInterval);
                            autoSlideInterval = null;
                        }
                        setTimeout(() => {
                            startAutoSlide();
                        }, 3000);
                    });
                });

                
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        if (autoSlideInterval) {
                            clearInterval(autoSlideInterval);
                            autoSlideInterval = null;
                        }
                        videos.forEach(video => video.pause());
                    } else {
                        startAutoSlide();
                       
                        if (videos[currentSlideIndex]) {
                            videos[currentSlideIndex].play().catch(err => {
                                console.log('Video autoplay failed:', err);
                            });
                        }
                    }
                });
            }

            
            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                    startAutoSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                    startAutoSlide();
                } else if (e.key === ' ') { 
                    e.preventDefault();
                    if (autoSlideInterval) {
                        clearInterval(autoSlideInterval);
                        autoSlideInterval = null;
                    } else {
                        startAutoSlide();
                    }
                }
            });

            
            let touchStartX = 0;
            let touchEndX = 0;
            let touchStartY = 0;
            let touchEndY = 0;

            heroSection?.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            heroSection?.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diffX = touchStartX - touchEndX;
                const diffY = Math.abs(touchStartY - touchEndY);

                
                if (Math.abs(diffX) > swipeThreshold && diffY < swipeThreshold) {
                    if (diffX > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    startAutoSlide();
                }
            }
        });

        // Make functions global for onclick handlers
        window.changeSlide = changeSlide;
    
        document.addEventListener('DOMContentLoaded', function () {
            const scrollItems = document.querySelectorAll('.scroll-content-item');
            let currentIndex = 0;
            let autoScrollInterval;

            function showSlide(index) {
                // Remove active class from all items
                scrollItems.forEach(item => item.classList.remove('active'));

                // Add active class to current item
                if (scrollItems[index]) {
                    scrollItems[index].classList.add('active');
                }

                currentIndex = index;
            }

            function nextSlide() {
                const nextIndex = (currentIndex + 1) % scrollItems.length;
                showSlide(nextIndex);
            }

            function startAutoScroll() {
                return setInterval(nextSlide, 3000); // Change slide every 3 seconds
            }

            // Initialize
            if (scrollItems.length > 0) {
                showSlide(0); // Start with first slide
                autoScrollInterval = startAutoScroll();

                // Pause on hover
                const aboutSection = document.querySelector('.about-scroll-section');
                if (aboutSection) {
                    aboutSection.addEventListener('mouseenter', () => {
                        clearInterval(autoScrollInterval);
                    });

                    aboutSection.addEventListener('mouseleave', () => {
                        autoScrollInterval = startAutoScroll();
                    });
                }

                // Pause when page is not visible
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        clearInterval(autoScrollInterval);
                    } else {
                        autoScrollInterval = startAutoScroll();
                    }
                });
            }
        });

        // Tablet navbar alignment fix
        function optimizeNavbarForTablet() {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;

            if (isTablet && navLinks) {
                // Ensure proper flex alignment
                navLinks.style.display = 'flex';
                navLinks.style.alignItems = 'center';
                navLinks.style.justifyContent = 'flex-end';
                navLinks.style.gap = '20px';
                navLinks.style.flexWrap = 'nowrap';

                // Adjust CTA button spacing
                const ctaButton = document.querySelector('.cta-buttons');
                if (ctaButton) {
                    ctaButton.style.marginLeft = '10px';
                    ctaButton.style.flexShrink = '0';
                }

                // Adjust dropdown positioning
                const dropdowns = document.querySelectorAll('.dropdown');
                dropdowns.forEach(dropdown => {
                    dropdown.style.position = 'relative';
                });
            }
        }

        // Run on load and resize
        document.addEventListener('DOMContentLoaded', optimizeNavbarForTablet);
        window.addEventListener('resize', optimizeNavbarForTablet);

        // Handle tablet touch events for dropdowns
        document.addEventListener('DOMContentLoaded', function () {
            const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;

            if (isTablet) {
                const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

                dropdownToggles.forEach(toggle => {
                    toggle.addEventListener('touchstart', function (e) {
                        e.preventDefault();
                        const dropdown = this.parentElement;
                        const isOpen = dropdown.classList.contains('active');

                        // Close all other dropdowns
                        document.querySelectorAll('.dropdown.active').forEach(d => {
                            if (d !== dropdown) d.classList.remove('active');
                        });

                        
                        dropdown.classList.toggle('active');
                    });
                });

                document.addEventListener('touchstart', function (e) {
                    if (!e.target.closest('.dropdown')) {
                        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                            dropdown.classList.remove('active');
                        });
                    }
                });
            }
        });

        

document.addEventListener("DOMContentLoaded", function () {
    const nameField = document.getElementById("name");

    if (nameField) {
        nameField.addEventListener("input", function () {
            const value = nameField.value.trim();

            if (value.length >= 2) {
                nameField.style.borderColor = "green";
            } else {
                nameField.style.borderColor = "red";
            }
        });
    }
});
