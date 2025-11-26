// Mobile menu toggle
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

    // FAQ Accordion - Only one open at a time
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const wasActive = item.classList.contains('active');
            
            // Close all FAQ items first
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!wasActive) {
                item.classList.add('active');
            }
        });
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
    const body = document.querySelector('body');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
    if (body) {
        body.classList.toggle('menu-open');
    }
};
