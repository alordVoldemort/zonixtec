        // ==========================================
        // SCROLL ANIMATION SYSTEM
        // ==========================================
        
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.classList.add('animated');
                        
                        // Determine animation type based on element
                        if (element.classList.contains('beginning-left')) {
                            element.classList.add('fade-in-left');
                        } else if (element.classList.contains('beginning-right')) {
                            element.classList.add('fade-in-right');
                        } else if (element.classList.contains('stat-card')) {
                            element.classList.add('scale-in');
                        } else if (element.classList.contains('highlight-box') || 
                                   element.classList.contains('highlight-boxx')) {
                            element.classList.add('slide-in-up');
                        } else {
                            element.classList.add('fade-in-up');
                        }
                        
                        // Stop observing after animation
                        observer.unobserve(element);
                    }
                });
            }, observerOptions);

            // Observe all elements
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Initialize animations when DOM is ready
        document.addEventListener('DOMContentLoaded', initScrollAnimations);

        // ==========================================
        // FOOTER DROPDOWNS
        // ==========================================
        
        document.querySelectorAll('.footer-dropdown-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.parentElement;
                parent.classList.toggle('open');
            });
        });
    
       
        // Header scroll effect
        window.addEventListener('scroll', function () {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
  