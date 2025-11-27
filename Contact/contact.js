
    

      // FAQ functionality
      document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
          const faqItem = question.parentElement;

          // Close other FAQs
          document.querySelectorAll(".faq-item").forEach((item) => {
            if (item !== faqItem && item.classList.contains("active")) {
              item.classList.remove("active");
            }
          });

          // Toggle current FAQ
          faqItem.classList.toggle("active");
        });
      });

      // Real-time Form Validation
      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contactForm");
        if (!form) return; // Exit if form doesn't exist

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const phoneError = document.getElementById("phoneError");
        const subjectError = document.getElementById("subjectError");
        const messageError = document.getElementById("messageError");

        // Validation state tracking
        const validationState = {
          name: false,
          email: false,
          phone: false,
          subject: false,
          message: false,
        };

        // Validation Functions
        function validateName(value) {
          const trimmed = value.trim();
          if (trimmed.length === 0) {
            return { valid: false, message: "Full name is required." };
          }
          if (!/^[A-Za-z\s]+$/.test(trimmed)) {
            return {
              valid: false,
              message: "Full name should contain only letters and spaces.",
            };
          }
          if (trimmed.length < 2) {
            return {
              valid: false,
              message: "Full name must be at least 2 characters.",
            };
          }
          if (trimmed.length > 50) {
            return {
              valid: false,
              message: "Full name must not exceed 50 characters.",
            };
          }
          return { valid: true, message: "" };
        }

        function validateEmail(value) {
          const trimmed = value.trim();
          if (trimmed.length === 0) {
            return { valid: false, message: "Email is required." };
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(trimmed)) {
            return {
              valid: false,
              message: "Please enter a valid email address.",
            };
          }
          return { valid: true, message: "" };
        }

        function validatePhone(value) {
          const trimmed = value.trim();
          if (trimmed.length === 0) {
            return { valid: false, message: "Phone number is required." };
          }
          // Remove any non-digit characters
          const digitsOnly = trimmed.replace(/\D/g, "");
          if (digitsOnly.length !== 10) {
            return {
              valid: false,
              message:
                "Enter a valid 10-digit Indian phone number starting with 6–9.",
            };
          }
          if (!/^[6-9]/.test(digitsOnly)) {
            return {
              valid: false,
              message:
                "Enter a valid 10-digit Indian phone number starting with 6–9.",
            };
          }
          return { valid: true, message: "" };
        }

        function validateSubject(value) {
          const trimmed = value.trim();
          if (trimmed.length === 0) {
            return { valid: false, message: "Subject is required." };
          }
          if (trimmed.length < 2) {
            return {
              valid: false,
              message: "Subject must be at least 2 characters.",
            };
          }
          return { valid: true, message: "" };
        }

        function validateMessage(value) {
          const trimmed = value.trim();
          if (trimmed.length === 0) {
            return { valid: false, message: "Message is required." };
          }
          if (trimmed.length < 5) {
            return {
              valid: false,
              message: "Message must be at least 5 characters.",
            };
          }
          return { valid: true, message: "" };
        }

        // Update UI based on validation result
        function updateFieldValidation(
          input,
          errorElement,
          isValid,
          errorMessage
        ) {
          if (isValid) {
            input.classList.remove("error");
            input.classList.add("valid");
            errorElement.textContent = "";
          } else {
            input.classList.remove("valid");
            input.classList.add("error");
            errorElement.textContent = errorMessage;
          }
        }

        // Real-time validation handlers
        function handleNameValidation() {
          const result = validateName(nameInput.value);
          validationState.name = result.valid;
          updateFieldValidation(
            nameInput,
            nameError,
            result.valid,
            result.message
          );
        }

        function handleEmailValidation() {
          const result = validateEmail(emailInput.value);
          validationState.email = result.valid;
          updateFieldValidation(
            emailInput,
            emailError,
            result.valid,
            result.message
          );
        }

        function handlePhoneValidation() {
          // Only allow digits
          phoneInput.value = phoneInput.value.replace(/\D/g, "");
          const result = validatePhone(phoneInput.value);
          validationState.phone = result.valid;
          updateFieldValidation(
            phoneInput,
            phoneError,
            result.valid,
            result.message
          );
        }

        function handleSubjectValidation() {
          const result = validateSubject(subjectInput.value);
          validationState.subject = result.valid;
          updateFieldValidation(
            subjectInput,
            subjectError,
            result.valid,
            result.message
          );
        }

        function handleMessageValidation() {
          const result = validateMessage(messageInput.value);
          validationState.message = result.valid;
          updateFieldValidation(
            messageInput,
            messageError,
            result.valid,
            result.message
          );
        }

        // Check if all fields are valid
        function isFormValid() {
          return Object.values(validationState).every(
            (valid) => valid === true
          );
        }

        // Attach event listeners for real-time validation
        nameInput.addEventListener("input", handleNameValidation);
        nameInput.addEventListener("keyup", handleNameValidation);
        nameInput.addEventListener("blur", handleNameValidation);

        emailInput.addEventListener("input", handleEmailValidation);
        emailInput.addEventListener("keyup", handleEmailValidation);
        emailInput.addEventListener("blur", handleEmailValidation);

        phoneInput.addEventListener("input", handlePhoneValidation);
        phoneInput.addEventListener("keyup", handlePhoneValidation);
        phoneInput.addEventListener("blur", handlePhoneValidation);

        subjectInput.addEventListener("input", handleSubjectValidation);
        subjectInput.addEventListener("keyup", handleSubjectValidation);
        subjectInput.addEventListener("blur", handleSubjectValidation);

        messageInput.addEventListener("input", handleMessageValidation);
        messageInput.addEventListener("keyup", handleMessageValidation);
        messageInput.addEventListener("blur", handleMessageValidation);

        // Form submission validation
        form.addEventListener("submit", function (e) {
          // Validate all fields on submit
          handleNameValidation();
          handleEmailValidation();
          handlePhoneValidation();
          handleSubjectValidation();
          handleMessageValidation();

          if (!isFormValid()) {
            e.preventDefault();
            // Focus on first invalid field
            if (!validationState.name) {
              nameInput.focus();
            } else if (!validationState.email) {
              emailInput.focus();
            } else if (!validationState.phone) {
              phoneInput.focus();
            } else if (!validationState.subject) {
              subjectInput.focus();
            } else if (!validationState.message) {
              messageInput.focus();
            }
            return false;
          }
        });
      });

      // Fix layout stability and prevent alignment issues on page load
      document.addEventListener("DOMContentLoaded", function () {
        // Add loaded class to body to fade in content
        setTimeout(() => {
          document.body.classList.add("loaded");
        }, 100);

        // Force layout recalculation to prevent alignment issues
        const sections = document.querySelectorAll(
          ".contact-section, .footer-container"
        );
        sections.forEach((section) => {
          section.style.display = "none";
          section.offsetHeight; // Force reflow
          section.style.display = "";
        });
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
