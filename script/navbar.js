document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const body = document.body;
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');

    
    let mobileOverlay = document.querySelector('.mobile-overlay');
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.classList.add('mobile-overlay');
        body.appendChild(mobileOverlay);
    }

    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });


    function toggleMobileMenu() {
        const isActive = navLinks?.classList.contains('active');
        
        if (isActive) {
            
            navLinks?.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
            mobileOverlay?.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn?.setAttribute('aria-expanded', 'false');
            

            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        } else {
            
            navLinks?.classList.add('active');
            mobileMenuBtn?.classList.add('active');
            mobileOverlay?.classList.add('active');
            body.classList.add('menu-open');
            mobileMenuBtn?.setAttribute('aria-expanded', 'true');
        }
    }

    
    mobileMenuBtn?.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close button click handler
    mobileCloseBtn?.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    
    mobileOverlay?.addEventListener('click', function() {
        if (navLinks?.classList.contains('active')) {
            toggleMobileMenu();
        }
    });


    document.addEventListener('click', function(e) {
        
        if (window.innerWidth <= 768) {
            const isClickInsideNav = navLinks?.contains(e.target);
            const isClickOnMenuBtn = mobileMenuBtn?.contains(e.target);
            const isMenuOpen = navLinks?.classList.contains('active');

            if (isMenuOpen && !isClickInsideNav && !isClickOnMenuBtn) {
                toggleMobileMenu();
            }
        }
    });

    
    // Prevent dropdown content clicks from closing the dropdown on desktop
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach(content => {
        content.addEventListener('click', function(e) {
            // Only stop propagation on desktop, not on mobile
            if (window.innerWidth > 768) {
                e.stopPropagation();
            }
        });
    });


    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                
                navLinks?.classList.remove('active');
                mobileMenuBtn?.classList.remove('active');
                mobileOverlay?.classList.remove('active');
                body.classList.remove('menu-open');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        }, 150);
    });

    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navLinks?.classList.contains('active')) {
                toggleMobileMenu();
            }
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    
    window.toggleMobileMenu = toggleMobileMenu;

    console.log('✅ Navbar initialized successfully');
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        
        if (href && href !== '#' && href !== 'javascript:void(0);' && !href.includes('javascript:')) {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  let isDesktop = window.innerWidth > 768;
  
  console.log('🔧 Dropdown script loaded. Found toggles:', dropdownToggles.length);

  
  window.addEventListener("resize", () => {
    isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      closeAllDropdowns();
    }
  });

  // Navbar Services Dropdown (unique classes to avoid footer conflicts)
  const navServicesToggles = document.querySelectorAll(".nav-services-toggle");
  console.log('🔧 Navbar services dropdown script loaded. Found toggles:', navServicesToggles.length);

  navServicesToggles.forEach((toggle) => {
    const dropdown = toggle.parentElement;

    
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🖱️ Dropdown clicked');
      
      const isActive = dropdown.classList.contains("active");
      console.log('Current state:', isActive ? 'active' : 'inactive');
      
      // Close all other nav dropdowns first
      document.querySelectorAll(".nav-services-dropdown").forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("active");
        }
      });
      
      // Toggle the current dropdown
      if (isActive) {
        console.log('➖ Closing dropdown');
        dropdown.classList.remove("active");
      } else {
        console.log('➕ Opening dropdown');
        dropdown.classList.add("active");
      }
      
      // Verify class was added
      console.log('✅ Dropdown classes after toggle:', dropdown.className);
      console.log('📏 Dropdown content display:', window.getComputedStyle(dropdown.querySelector('.nav-services-content')).display);
      console.log('📏 Dropdown content max-height:', window.getComputedStyle(dropdown.querySelector('.nav-services-content')).maxHeight);
    });

    

    dropdown.addEventListener("mouseenter", () => {
      if (isDesktop) {
        // Close all other nav dropdowns
        document.querySelectorAll(".nav-services-dropdown").forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("active");
          }
        });
        dropdown.classList.add("active");
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      if (isDesktop) {
        dropdown.classList.remove("active");
      }
    });
  });

  // ——— CLOSE NAV DROPDOWN WHEN CLICKING A LINK INSIDE IT ———
  document.querySelectorAll('.nav-services-content a').forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('🔗 Nav service link clicked, closing dropdown');
      // Close the dropdown on link click (both mobile and desktop)
      const dropdown = this.closest('.nav-services-dropdown');
      if (dropdown) {
        dropdown.classList.remove('active');
      }
    });
  });

  
  document.addEventListener("click", function (e) {
    const clickedInsideDropdown = e.target.closest(".nav-services-dropdown");
    const clickedMenuBtn = e.target.closest(".mobile-menu-btn");

    if (!clickedInsideDropdown && !clickedMenuBtn) {
      console.log('🚫 Clicked outside, closing all nav dropdowns');
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    document.querySelectorAll(".nav-services-dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }

  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
    }
  });
  
  console.log('✅ Dropdown handlers registered successfully');
});