
      document.querySelectorAll(".footer-dropdown-header").forEach((header) => {
        header.addEventListener("click", () => {
          const parent = header.parentElement;
          parent.classList.toggle("open");
        });
      });
   
      // Mobile menu toggle
      document
        .querySelector(".mobile-menu-btn")
        .addEventListener("click", function () {
          document.querySelector(".nav-links").classList.toggle("active");
          document.querySelector("body").classList.toggle("menu-open");
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
   
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".circle-wrapper").forEach((circle) => {
          let value = circle.getAttribute("data-value");
          let progress = circle.querySelector(".circle-progress");
          let radius = 60,
            circumference = 2 * Math.PI * radius;
          let offset = circumference - (value / 100) * circumference;
          progress.style.strokeDashoffset = offset;
        });
      });
  