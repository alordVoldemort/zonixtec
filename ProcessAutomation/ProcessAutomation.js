
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
});

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}


// // Booking Modal Functionality
// function initBookingModal() {
//     const modal = document.getElementById('bookingModal');
//     const form = document.getElementById('bookingForm');
    
//     if (form) {
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form data
//             const formData = {
//                 name: document.getElementById('bookingName').value,
//                 email: document.getElementById('bookingEmail').value,
//                 phone: document.getElementById('bookingPhone').value,
//                 company: document.getElementById('bookingCompany').value,
//                 date: document.getElementById('bookingDate').value,
//                 time: document.getElementById('bookingTime').value,
//                 service: document.getElementById('bookingService').value,
//                 message: document.getElementById('bookingMessage').value
//             };
            
//             // Basic validation
//             if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.service) {
//                 alert('Please fill in all required fields.');
//                 return;
//             }
            
//             // Here you would typically send the data to your server
//             console.log('Booking form submitted:', formData);
            
//             // Show success message
//             alert('Thank you! Your consultation has been booked. We will contact you shortly.');
            
//             // Close modal and reset form
//             closeBookingModal();
//             form.reset();
//         });
//     }
    
//     // Close modal when clicking outside
//     if (modal) {
//         modal.addEventListener('click', function(e) {
//             if (e.target === modal) {
//                 closeBookingModal();
//             }
//         });
//     }
// }// Booking Modal Functionality
// function initBookingModal() {
//     const modal = document.getElementById('bookingModal');
//     const form = document.getElementById('bookingForm');
    
//     if (form) {
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form data
//             const formData = {
//                 name: document.getElementById('bookingName').value,
//                 email: document.getElementById('bookingEmail').value,
//                 phone: document.getElementById('bookingPhone').value,
//                 company: document.getElementById('bookingCompany').value,
//                 date: document.getElementById('bookingDate').value,
//                 time: document.getElementById('bookingTime').value,
//                 service: document.getElementById('bookingService').value,
//                 message: document.getElementById('bookingMessage').value
//             };
            
//             // Basic validation
//             if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.service) {
//                 alert('Please fill in all required fields.');
//                 return;
//             }
            
//             // Here you would typically send the data to your server
//             console.log('Booking form submitted:', formData);
            
//             // Show success message
//             alert('Thank you! Your consultation has been booked. We will contact you shortly.');
            
//             // Close modal and reset form
//             closeBookingModal();
//             form.reset();
//         });
//     }
    
//     // Close modal when clicking outside
//     if (modal) {
//         modal.addEventListener('click', function(e) {
//             if (e.target === modal) {
//                 closeBookingModal();
//             }
//         });
//     }
// }

// // Image Fallbacks
// function initImageFallbacks() {
//     const images = document.querySelectorAll('img');
//     images.forEach(img => {
//         img.addEventListener('error', function() {
//             const placeholder = this.parentElement.querySelector('.image-placeholder');
//             if (placeholder) {
//                 this.style.display = 'none';
//                 placeholder.style.display = 'flex';
//             }
//         });
//     });
// }

// // Modal Control Functions
// function openBookingModal() {
//     const modal = document.getElementById('bookingModal');
//     if (modal) {
//         modal.style.display = 'block';
//         document.body.style.overflow = 'hidden';
        
//         // Set minimum date to today
//         const today = new Date().toISOString().split('T')[0];
//         const dateInput = document.getElementById('bookingDate');
//         if (dateInput) {
//             dateInput.min = today;
//         }
//     }
// }

// function closeBookingModal() {
//     const modal = document.getElementById('bookingModal');
//     if (modal) {
//         modal.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     }
// }

// Smooth scrolling for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
    });
}


