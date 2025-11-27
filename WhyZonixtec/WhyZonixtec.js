// ==============================
// WHAT MAKES ZONIXTEC DIFFERENT SLIDER (INFINITE AUTO-SCROLL)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const featureList = document.getElementById("feature-list");

  if (!featureList) return;

  const featureBoxes = Array.from(featureList.children);

  // Clone all items for infinite loop effect
  featureBoxes.forEach((box) => {
    const clone = box.cloneNode(true);
    featureList.appendChild(clone);
  });

  let scrollPosition = 0;
  let isScrolling = true;
  let animationId;

  function infiniteScroll() {
    if (!isScrolling) return;

    const cardWidth = featureBoxes[0].offsetWidth;
    const gap = 34;
    const moveDistance = cardWidth + gap;

    scrollPosition += 0.5; // Adjust speed here (higher = faster)

    // Reset position when we've scrolled past original items
    if (scrollPosition >= moveDistance * featureBoxes.length) {
      scrollPosition = 0;
    }

    featureList.style.transform = `translateX(-${scrollPosition}px)`;
    featureList.style.transition = "none"; // Smooth continuous movement

    animationId = requestAnimationFrame(infiniteScroll);
  }

  function stopScrolling() {
    isScrolling = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function startScrolling() {
    // Prevent multiple animation loops from starting
    if (isScrolling && animationId) {
      return; // Already running
    }
    isScrolling = true;
    infiniteScroll();
  }

  // Pause on hover
  featureList.addEventListener("mouseenter", stopScrolling);
  featureList.addEventListener("mouseleave", startScrolling);

  // Handle window resize
  window.addEventListener("resize", () => {
    scrollPosition = 0;
    featureList.style.transform = "translateX(0)";
  });

  // Start infinite scrolling
  startScrolling();
});

// Header animation on load
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  header.classList.add("loaded");
});

// Scroll Animation Observer with performance optimization
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Use requestAnimationFrame to prevent layout thrashing
      requestAnimationFrame(() => {
        entry.target.classList.add("visible");
      });
    }
  });
}, observerOptions);

// Observe all animation elements when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Throttle animations on mobile for better performance
  const isMobile = window.innerWidth <= 768;
  const animationDelay = isMobile ? 0.05 : 0.1;

  // Observe all sections with animation classes
  const animatedSections = document.querySelectorAll(
    "section.fade-in, section.slide-in-left, section.slide-in-right"
  );
  animatedSections.forEach((section) => {
    observer.observe(section);
  });

  // Feature boxes animation with stagger effect
  const featureBoxes = document.querySelectorAll(".feature-box.scale-in");
  featureBoxes.forEach((box, index) => {
    const delay = isMobile ? index * animationDelay : index * 0.15;
    box.style.transitionDelay = `${delay}s`;
    observer.observe(box);
  });

  // Benefits cards animation with bounce effect
  const benefitsCards = document.querySelectorAll(".benefits-card.bounce-in");
  benefitsCards.forEach((card, index) => {
    const delay = isMobile ? index * animationDelay : index * 0.2;
    card.style.transitionDelay = `${delay}s`;
    observer.observe(card);
  });

  // CTA section animation
  const ctaSection = document.querySelector(".cta-section.fade-in");
  if (ctaSection) {
    observer.observe(ctaSection);
  }

  // Why description section animation
  const whyDesc = document.querySelector(".why-desc");
  if (whyDesc) {
    whyDesc.classList.add("slide-in-left");
    observer.observe(whyDesc);
  }

  // Service cards animation (if any)
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    const delay = isMobile ? index * animationDelay : index * 0.1;
    card.style.transitionDelay = `${delay}s`;
    card.classList.add("scale-in");
    observer.observe(card);
  });

  // Stat boxes animation (if any)
  const statBoxes = document.querySelectorAll(".stat-box");
  statBoxes.forEach((box, index) => {
    const delay = isMobile ? index * animationDelay : index * 0.2;
    box.style.transitionDelay = `${delay}s`;
    box.classList.add("bounce-in");
    observer.observe(box);
  });

  // Industry cards animation (if any)
  const industryCards = document.querySelectorAll(".industry-card");
  industryCards.forEach((card, index) => {
    const delay = isMobile ? index * animationDelay : index * 0.1;
    card.style.transitionDelay = `${delay}s`;
    card.classList.add("fade-in");
    observer.observe(card);
  });

  // Contact form animation (if any)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.classList.add("slide-in-right");
    observer.observe(contactForm);
  }

  // Contact info animation (if any)
  const contactInfo = document.querySelector(".contact-info");
  if (contactInfo) {
    contactInfo.classList.add("slide-in-left");
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
const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((number) => {
          const finalValue = parseInt(number.textContent);
          number.textContent = "0";
          setTimeout(() => {
            animateValue(number, 0, finalValue, 2000);
          }, 500);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

// Navigation functionality removed - handled by external files

// Contact Form Functionality with localStorage database
// Contact Form with LocalStorage Database (Working Solution)
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";
      formMessage.style.display = "none";

      const formData = {
        id: Date.now(), // Unique ID
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
        timestamp: new Date().toLocaleString(),
        ip: "local",
        status: "new",
      };

      // Enhanced Validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        showMessage("Please fill in all required fields.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }

      // Name validation (min 2 characters)
      if (formData.name.length < 2) {
        showMessage("Name must be at least 2 characters long.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }

      // Subject validation (min 5 characters)
      if (formData.subject.length < 5) {
        showMessage("Subject must be at least 5 characters long.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }

      // Message validation (min 10 characters)
      if (formData.message.length < 10) {
        showMessage("Message must be at least 10 characters long.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }

      if (!isValidEmail(formData.email)) {
        showMessage("Please enter a valid email address.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }

      // Save to localStorage database
      try {
        saveToLocalDatabase(formData);
        showMessage(
          "✅ Thank you! Your message has been saved successfully. We will contact you soon.",
          "success"
        );
        contactForm.reset();

        // Log to console for verification
        console.log("📁 Saved to Local Database:", formData);
        displayAllMessages(); // Show all saved messages in console
      } catch (error) {
        showMessage(
          "Thank you! Message received. (Temporary storage)",
          "success"
        );
        contactForm.reset();
        console.log("Form data:", formData);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // Save to localStorage database
  function saveToLocalDatabase(formData) {
    // Get existing messages or initialize empty array
    const existingMessages = JSON.parse(
      localStorage.getItem("zonixtec_contact_messages") || "[]"
    );

    // Add new message with unique ID
    formData.id = Date.now();
    formData.timestamp = new Date().toLocaleString();

    // Add to array
    existingMessages.push(formData);

    // Save back to localStorage (max 50 messages to prevent overflow)
    const trimmedMessages = existingMessages.slice(-50);
    localStorage.setItem(
      "zonixtec_contact_messages",
      JSON.stringify(trimmedMessages)
    );

    return formData.id;
  }

  // Display all saved messages in console (for testing)
  function displayAllMessages() {
    const messages = JSON.parse(
      localStorage.getItem("zonixtec_contact_messages") || "[]"
    );
    console.log("📊 ALL SAVED MESSAGES:", messages);
    console.log(`💾 Total messages stored: ${messages.length}`);

    // Show recent messages
    if (messages.length > 0) {
      console.log("🆕 Recent messages:");
      messages.slice(-3).forEach((msg) => {
        console.log(`   📝 ${msg.name} - ${msg.subject} (${msg.timestamp})`);
      });
    }
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.display = "block";
    formMessage.style.backgroundColor =
      type === "success" ? "rgba(39, 174, 96, 0.1)" : "rgba(231, 76, 60, 0.1)";
    formMessage.style.color = type === "success" ? "#27ae60" : "#e74c3c";
    formMessage.style.border = `1px solid ${
      type === "success" ? "#27ae60" : "#e74c3c"
    }`;

    if (type === "success") {
      setTimeout(() => {
        formMessage.style.display = "none";
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

// Viewport height fix for mobile
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVh();
window.addEventListener("resize", setVh);
window.addEventListener("orientationchange", () => {
  setTimeout(setVh, 100);
});

// Prevent layout shifts during animations
document.addEventListener("DOMContentLoaded", function () {
  // Add loaded class to prevent FOUC
  document.body.classList.add("loaded");

  // Add a small delay before starting animations to ensure layout is stable
  setTimeout(() => {
    document.body.classList.add("animations-ready");
  }, 100);
});

// Hero Slider Functionality with Video Switching
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const videos = document.querySelectorAll(".hero-bg-video");
const totalSlides = slides.length;
let autoSlideInterval;

// Function to show specific slide and change video
function showSlide(index) {
  // Remove active class from all slides and videos
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "prev");
    if (i !== index) {
      slide.style.opacity = "0";
      slide.style.transform = "translateX(100%)";
    }
  });
  videos.forEach((video) => {
    video.classList.remove("active");
  });

  // Calculate previous slide index
  const prevIndex = currentSlideIndex;
  currentSlideIndex = index;

  // Add appropriate classes for slides with smooth animation
  if (slides[currentSlideIndex]) {
    slides[currentSlideIndex].classList.add("active");
    slides[currentSlideIndex].style.opacity = "1";
    slides[currentSlideIndex].style.transform = "translateX(0)";

    // Add prev class to previous slide for smooth transition
    if (slides[prevIndex] && prevIndex !== currentSlideIndex) {
      slides[prevIndex].classList.add("prev");
      slides[prevIndex].style.transform = "translateX(-100%)";
    }
  }

  // Change background video with fade effect
  if (videos[currentSlideIndex]) {
    // Pause all other videos
    videos.forEach((video, i) => {
      if (i !== currentSlideIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Activate and play current video
    videos[currentSlideIndex].classList.add("active");
    videos[currentSlideIndex].currentTime = 0;
    videos[currentSlideIndex].play().catch((err) => {
      console.log("Video autoplay failed:", err);
    });
  }

  // Add visual feedback for slide change
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.style.transform = "scale(1.005)";
    setTimeout(() => {
      heroSection.style.transform = "scale(1)";
    }, 300);
  }
}

// Function to go to next slide
function nextSlide() {
  const nextIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(nextIndex);
}

// Function to go to previous slide
function prevSlide() {
  const prevIndex =
    currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1;
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
  return setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize videos - preload all videos
  videos.forEach((video, index) => {
    video.load();
    video.muted = true; // Ensure videos are muted for autoplay
    if (index !== 0) {
      video.pause();
    }
  });

  // Start auto-play
  let autoSlideInterval = startAutoSlide();

  // Enhanced pause/resume functionality
  const heroSection = document.querySelector(".hero");
  const sliderControls = document.querySelectorAll(".prev-btn, .next-btn");

  if (heroSection) {
    // Pause on hover
    heroSection.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });

    // Resume on mouse leave
    heroSection.addEventListener("mouseleave", () => {
      autoSlideInterval = startAutoSlide();
    });

    // Pause when user interacts with controls
    sliderControls.forEach((control) => {
      control.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        // Resume after 3 seconds of inactivity
        setTimeout(() => {
          autoSlideInterval = startAutoSlide();
        }, 3000);
      });
    });

    // Pause when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(autoSlideInterval);
        videos.forEach((video) => video.pause());
      } else {
        autoSlideInterval = startAutoSlide();
        // Resume current video
        if (videos[currentSlideIndex]) {
          videos[currentSlideIndex].play().catch((err) => {
            console.log("Video autoplay failed:", err);
          });
        }
      }
    });
  }

  // Enhanced keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
      clearInterval(autoSlideInterval);
      autoSlideInterval = startAutoSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
      clearInterval(autoSlideInterval);
      autoSlideInterval = startAutoSlide();
    } else if (e.key === " ") {
      // Spacebar to pause/resume
      e.preventDefault();
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      } else {
        autoSlideInterval = startAutoSlide();
      }
    }
  });

  // Enhanced touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  heroSection?.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  heroSection?.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > swipeThreshold && diffY < swipeThreshold) {
      if (diffX > 0) {
        // Swiped left - go to next slide
        nextSlide();
      } else {
        // Swiped right - go to previous slide
        prevSlide();
      }
      clearInterval(autoSlideInterval);
      autoSlideInterval = startAutoSlide();
    }
  }
});

// Make functions global for onclick handlers
window.changeSlide = changeSlide;

// ==============================
// CLIENT TESTIMONIALS SLIDER (INFINITE AUTO-SCROLL)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const testimonialList = document.getElementById("testimonial-list");
  const testimonialPrevBtn = document.getElementById("testimonialPrev");
  const testimonialNextBtn = document.getElementById("testimonialNext");

  if (!testimonialList || !testimonialPrevBtn || !testimonialNextBtn) return;

  const testimonialCards = Array.from(testimonialList.children);

  // Clone all items for infinite loop effect
  testimonialCards.forEach((card) => {
    const clone = card.cloneNode(true);
    testimonialList.appendChild(clone);
  });

  let testimonialScrollPosition = 0;
  let isTestimonialScrolling = true;
  let testimonialAnimationId;
  let testimonialResumeTimeout = null; // Track pending resume timeout

  function infiniteTestimonialScroll() {
    if (!isTestimonialScrolling) return;

    const cardWidth = testimonialCards[0].offsetWidth;
    const gap = 34;
    const moveDistance = cardWidth + gap;

    testimonialScrollPosition += 0.5; // Adjust speed here (higher = faster)

    // Reset position when we've scrolled past original items
    if (testimonialScrollPosition >= moveDistance * testimonialCards.length) {
      testimonialScrollPosition = 0;
    }

    testimonialList.style.transform = `translateX(-${testimonialScrollPosition}px)`;
    testimonialList.style.transition = "none";

    testimonialAnimationId = requestAnimationFrame(infiniteTestimonialScroll);
  }

  function stopTestimonialScrolling() {
    isTestimonialScrolling = false;
    if (testimonialAnimationId) {
      cancelAnimationFrame(testimonialAnimationId);
      testimonialAnimationId = null;
    }
    // Clear any pending resume timeout
    if (testimonialResumeTimeout) {
      clearTimeout(testimonialResumeTimeout);
      testimonialResumeTimeout = null;
    }
  }

  function startTestimonialScrolling() {
    // Prevent multiple animation loops from starting
    if (isTestimonialScrolling && testimonialAnimationId) {
      return; // Already running
    }
    isTestimonialScrolling = true;
    infiniteTestimonialScroll();
  }

  // Manual navigation
  testimonialPrevBtn.addEventListener("click", () => {
    stopTestimonialScrolling();
    const cardWidth = testimonialCards[0].offsetWidth;
    const gap = 34;
    const moveDistance = cardWidth + gap;
    
    // Calculate new position
    testimonialScrollPosition = Math.max(
      0,
      testimonialScrollPosition - moveDistance
    );
    
    // Reset if we go back to the beginning
    if (testimonialScrollPosition <= 0) {
      testimonialScrollPosition = 0;
    }
    
    testimonialList.style.transform = `translateX(-${testimonialScrollPosition}px)`;
    testimonialList.style.transition = "transform 0.5s ease";
    
    // Clear any existing timeout and set a new one
    if (testimonialResumeTimeout) {
      clearTimeout(testimonialResumeTimeout);
    }
    testimonialResumeTimeout = setTimeout(() => {
      startTestimonialScrolling();
      testimonialResumeTimeout = null;
    }, 3000);
  });

  testimonialNextBtn.addEventListener("click", () => {
    stopTestimonialScrolling();
    const cardWidth = testimonialCards[0].offsetWidth;
    const gap = 34;
    const moveDistance = cardWidth + gap;
    const maxScroll = moveDistance * testimonialCards.length;
    
    // Calculate new position
    testimonialScrollPosition += moveDistance;
    
    // Reset if we've scrolled past all original items
    if (testimonialScrollPosition >= maxScroll) {
      testimonialScrollPosition = 0;
    }
    
    testimonialList.style.transform = `translateX(-${testimonialScrollPosition}px)`;
    testimonialList.style.transition = "transform 0.5s ease";
    
    // Clear any existing timeout and set a new one
    if (testimonialResumeTimeout) {
      clearTimeout(testimonialResumeTimeout);
    }
    testimonialResumeTimeout = setTimeout(() => {
      startTestimonialScrolling();
      testimonialResumeTimeout = null;
    }, 3000);
  });

  // Pause on hover
  testimonialList.addEventListener("mouseenter", stopTestimonialScrolling);
  testimonialList.addEventListener("mouseleave", startTestimonialScrolling);

  // Handle window resize
  window.addEventListener("resize", () => {
    testimonialScrollPosition = 0;
    testimonialList.style.transform = "translateX(0)";
  });

  // Start infinite scrolling
  startTestimonialScrolling();
});

// GENERIC AUTO SCROLLER FUNCTION
// ==============================
function createAutoScroller(containerId, interval = 3000) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = container.children;
  let index = 0;
  let autoScroll;

  function getVisibleItems() {
    return window.innerWidth > 880 ? 2 : 1;
  }

  function scrollItems() {
    const visible = getVisibleItems();
    const maxIndex = items.length - visible;
    index = index + 1 > maxIndex ? 0 : index + 1;

    const cardWidth = items[0].offsetWidth;
    const gap = 34;
    const offset = index * (cardWidth + gap);
    container.style.transform = `translateX(-${offset}px)`;
  }

  function startAutoScroll() {
    autoScroll = setInterval(scrollItems, interval);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  // Start + pause on hover
  startAutoScroll();
  container.addEventListener("mouseenter", stopAutoScroll);
  container.addEventListener("mouseleave", startAutoScroll);

  // Reset on resize
  window.addEventListener("resize", () => {
    index = 0;
    container.style.transform = "translateX(0)";
  });
}

// ==============================
// INITIALIZE SLIDERS
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Benefits section now shows all 4 cards statically on all devices (no auto-scroll needed)
  // Note: Testimonials now use manual navigation buttons (no auto-scroll)
});

// ==============================
// BENEFITS SECTION - All views show all 4 cards (no slider needed)
// ==============================
function initBenefitsSlider() {
  // Disable slider for all screen sizes - show all 4 cards statically
  const sliderContainer = document.getElementById("benefits-slider-list");
  if (sliderContainer) {
    sliderContainer.style.transform = "translateX(0)";
  }
}

// Initialize on DOM load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBenefitsSlider);
} else {
  initBenefitsSlider();
}
