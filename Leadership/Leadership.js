document
            .querySelector(".mobile-menu-btn")
            .addEventListener("click", function () {
                document.querySelector(".nav-links").classList.toggle("active");
            });

        // Header scroll effect
        window.addEventListener("scroll", function () {
            const header = document.getElementById("header");
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });

        // Footer dropdown functionality
        document.querySelectorAll(".footer-dropdown-header").forEach((header) => {
            header.addEventListener("click", () => {
                const parent = header.parentElement;
                parent.classList.toggle("open");
            });
        });


document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on links
        const navLinksAll = navLinks.querySelectorAll('a');
        navLinksAll.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Handle dropdowns in mobile
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
});


