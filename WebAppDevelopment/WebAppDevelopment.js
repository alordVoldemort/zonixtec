// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }

    // Mobile dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');

                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-menu-btn')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // Footer dropdown functionality
    document.querySelectorAll('.footer-dropdown-header').forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            parent.classList.toggle('open');
        });
    });

    // Show image placeholder if image fails to load
    const image = document.querySelector('.services-image img');
    const placeholder = document.getElementById('image-placeholder');

    if (image && image.naturalWidth === 0) {
        image.style.display = 'none';
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Booking modal functionality
    window.openBookingModal = function() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeBookingModal = function() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('bookingModal');
        if (modal && event.target === modal) {
            closeBookingModal();
        }
    });
});

// Navigation step functions for booking modal
window.nextStep = function(currentStep) {
    // Implementation for next step in booking modal
    console.log('Next step from:', currentStep);
};

window.previousStep = function(currentStep) {
    // Implementation for previous step in booking modal
    console.log('Previous step from:', currentStep);
};

// Initialize Flatpickr for date input
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        flatpickr(dateInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateStr, instance) {
                const nextBtn = document.getElementById('dateNextBtn');
                if (nextBtn) {
                    nextBtn.disabled = !dateStr;
                }
            }
        });
    }

    // Time slot selection
    document.querySelectorAll('.booking-time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove active class from all slots
            document.querySelectorAll('.booking-time-slot').forEach(s => {
                s.classList.remove('active');
            });
            
            // Add active class to clicked slot
            this.classList.add('active');
            
            // Enable next button
            const nextBtn = document.getElementById('timeNextBtn');
            if (nextBtn) {
                nextBtn.disabled = false;
            }
        });
    });

    // Form submission
    const bookingForm = document.getElementById('bookingFormPage');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const phone = document.getElementById('bookingPhone').value;
            
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.error-text').forEach(error => {
                error.textContent = '';
            });
            
            // Name validation
            if (!name.trim()) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }
            
            // Email validation
            if (!email.trim()) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Phone validation
            if (!phone.trim()) {
                document.getElementById('phoneError').textContent = 'Phone is required';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                console.log('Form submitted successfully');
                
                // Show success message
                const successPage = document.getElementById('bookingSuccessPage');
                const step4 = document.getElementById('step4');
                if (successPage && step4) {
                    step4.style.display = 'none';
                    successPage.style.display = 'block';
                    
                    // Close modal after 3 seconds
                    setTimeout(() => {
                        closeBookingModal();
                    }, 3000);
                }
            }
        });
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for global access
window.toggleMobileMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
};

// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    mobileBtn.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Mobile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close mobile menu when clicking links
    const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileBtn = document.querySelector('.mobile-menu-btn');
                
                navLinksContainer.classList.remove('active');
                mobileBtn.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all mobile dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Make sure to update your existing JavaScript to include this mobile functionality
window.toggleMobileMenu = toggleMobileMenu;
