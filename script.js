// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero background animation
const heroBackgrounds = [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
];

let currentBgIndex = 0;
const heroBgElement = document.querySelector('.hero-background');

function changeBackground() {
    currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
    gsap.to(heroBgElement, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            heroBgElement.style.backgroundImage = `url(${heroBackgrounds[currentBgIndex]})`;
            gsap.to(heroBgElement, {
                opacity: 1,
                duration: 1
            });
        }
    });
}

 document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
            document.querySelector('body').classList.toggle('menu-open');
        });

setInterval(changeBackground, 8000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.stat-count, .stat-number');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Start counters when stats section is in view
ScrollTrigger.create({
    trigger: '.stats, .about',
    start: 'top 80%',
    onEnter: animateCounters,
    once: true
});


// 3D Cube Animation (only run if cubeCanvas exists)
const cubeCanvas = document.getElementById('cubeCanvas');
if (cubeCanvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, cubeCanvas.clientWidth / cubeCanvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: cubeCanvas, antialias: true, alpha: true });
    renderer.setSize(cubeCanvas.clientWidth, cubeCanvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;
    // Create cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 });
    const cube = new THREE.LineSegments(edges, lineMaterial);
    scene.add(cube);
    // Add glowing effect
    const glowGeometry = new THREE.BoxGeometry(2.1, 2.1, 2.1);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.1, side: THREE.BackSide });
    const glowCube = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowCube);
    // Add blue lights underneath
    const light1 = new THREE.PointLight(0x0066ff, 1, 5); light1.position.set(1, -2, 1); scene.add(light1);
    const light2 = new THREE.PointLight(0x0066ff, 1, 5); light2.position.set(-1, -2, -1); scene.add(light2);
    const light3 = new THREE.PointLight(0x0066ff, 1, 5); light3.position.set(1, -2, -1); scene.add(light3);
    const light4 = new THREE.PointLight(0x0066ff, 1, 5); light4.position.set(-1, -2, 1); scene.add(light4);
    // Animation loop
    function animateCube() {
        requestAnimationFrame(animateCube);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
        glowCube.rotation.x = cube.rotation.x;
        glowCube.rotation.y = cube.rotation.y;
        renderer.render(scene, camera);
    }
    animateCube();
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = cubeCanvas.clientWidth / cubeCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(cubeCanvas.clientWidth, cubeCanvas.clientHeight);
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});


//About Section Animation
   // Initialize Three.js scene
const aboutScene = new THREE.Scene();
aboutScene.background = new THREE.Color(0x0c0c1d);
 
 
// Create gradient material
const aboutMaterials = [];
const aboutColors = [
    new THREE.Color(0x0072ff), // right
    new THREE.Color(0x00c6ff),  // left
    new THREE.Color(0x00a8ff),  // top
    new THREE.Color(0x0055ff),  // bottom
    new THREE.Color(0x0088ff),  // front
    new THREE.Color(0x0066cc)   // back
];
 
aboutColors.forEach(color => {
    aboutMaterials.push(new THREE.MeshPhongMaterial({
        color: color,
        emissive: color.clone().multiplyScalar(0.2),
        shininess: 80,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
    }));
});
 
const aboutCube = new THREE.Mesh(aboutGeometry, aboutMaterials);
aboutScene.add(aboutCube);
 
// Add wireframe for definition
const aboutWireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(aboutGeometry),
    new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        linewidth: 1,
        transparent: true,
        opacity: 0.7
    })
);
aboutCube.add(aboutWireframe);
 
// Add lights
const aboutAmbientLight = new THREE.AmbientLight(0xffffff, 0.6);
aboutScene.add(aboutAmbientLight);
 
const aboutDirectionalLight = new THREE.DirectionalLight(0x00ccff, 1.5);
aboutDirectionalLight.position.set(1, 1, 1);
aboutScene.add(aboutDirectionalLight);
 
const aboutPointLight = new THREE.PointLight(0x00aaff, 3, 15);
aboutPointLight.position.set(0, 3, 2);
aboutScene.add(aboutPointLight);


 
// Create electric sparks
const sparks = [];
 
function createSparks() {
    for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        spark.className = 'electric-spark';
        
        // Random position around the cube
        const posX = Math.random() * 80 + 10;
        const posY = Math.random() * 80 + 10;
        
        spark.style.left = `${posX}%`;
        spark.style.top = `${posY}%`;
        
        cubeContainer.appendChild(spark);
        sparks.push({
            element: spark,
            x: posX,
            y: posY,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.3,
            life: Math.random() * 100
        });
    }
}
 
// Create heart line pattern background
const heartLinesContainer = document.getElementById('heartLines');
 
function createHeartLines() {
    for (let i = 0; i < 30; i++) {
        const heartLine = document.createElement('div');
        heartLine.className = 'heart-line';
        
        const size = Math.random() * 150 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.1 + 0.05;
        
        heartLine.style.width = `${size}px`;
        heartLine.style.height = `${size}px`;
        heartLine.style.left = `${posX}%`;
        heartLine.style.top = `${posY}%`;
        heartLine.style.opacity = opacity;
        
        heartLinesContainer.appendChild(heartLine);
    }
}
 
// Animation functions
function animateSparks() {
    sparks.forEach(spark => {
        spark.x += spark.speedX;
        spark.y += spark.speedY;
        spark.life -= 0.5;
        
        // Boundary check
        if (spark.x < 5 || spark.x > 95) spark.speedX *= -1;
        if (spark.y < 5 || spark.y > 95) spark.speedY *= -1;
        
        spark.element.style.left = `${spark.x}%`;
        spark.element.style.top = `${spark.y}%`;
        
        // Pulsating effect
        const size = spark.size + Math.sin(Date.now() * 0.01) * 3;
        spark.element.style.width = `${size}px`;
        spark.element.style.height = `${size * 3}px`;
        spark.element.style.opacity = spark.opacity + Math.sin(Date.now() * 0.02) * 0.2;
        
        // Regenerate spark if it expires
        if (spark.life < 0) {
            spark.x = Math.random() * 80 + 10;
            spark.y = Math.random() * 80 + 10;
            spark.life = Math.random() * 100;
        }
    });
}
 
function animateTechLabels() {
    techElements.forEach(tech => {
        tech.x += tech.speedX;
        tech.y += tech.speedY;
        
        // Boundary check
        if (tech.x < 10 || tech.x > 90) tech.speedX *= -1;
        if (tech.y < 10 || tech.y > 90) tech.speedY *= -1;
        
        tech.element.style.left = `${tech.x}%`;
        tech.element.style.top = `${tech.y}%`;
        
        // Floating effect
        tech.element.style.transform = `translateY(${Math.sin(Date.now() * 0.002 + tech.x) * 5}px)`;
        
        // Pulsing glow
        const glow = Math.sin(Date.now() * 0.003 + tech.x) * 0.2 + 0.8;
        tech.element.style.opacity = glow;
    });
}
 
// Animation loop
function animateAbout() {
    requestAnimationFrame(animateAbout);
    
    // Rotate cube
    aboutCube.rotation.x += 0.006;
    aboutCube.rotation.y += 0.009;
    
    // Animate electric sparks
    animateSparks();
    
    // Animate tech labels
    animateTechLabels();
    
    aboutRenderer.render(aboutScene, aboutCamera);
}
 
// Initialize
createSparks();
createHeartLines();
animateAbout();
 
// Handle window resize
window.addEventListener('resize', () => {
    aboutCamera.aspect = cubeContainer.clientWidth / cubeContainer.clientHeight;
    aboutCamera.updateProjectionMatrix();
    aboutRenderer.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);
});
 
// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
 
function animateCounter() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const startTime = Date.now();
        
        function updateCounter() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const value = Math.floor(progress * target);
                stat.textContent = value;
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        }
        
        updateCounter();
    });
}
 
// Start counter when section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.disconnect();
        }
    });
}, { threshold: 0.3 });
 
observer.observe(document.querySelector('.about'));

// servies 
 document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.category');
    const bgImage = document.getElementById('bg-img');
    
    // Set initial background
    if (categories.length > 0) {
        const initialImg = categories[0].getAttribute('data-img');
        bgImage.style.backgroundImage = `url(${initialImg})`;
        bgImage.style.opacity = '1';
    }
    
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const img = category.getAttribute('data-img');
            bgImage.style.backgroundImage = `url(${img})`;
            bgImage.style.opacity = '1';
        });
        
        category.addEventListener('click', function() {
            // Reset all categories
            categories.forEach(cat => cat.classList.remove('active'));
            
            // Set active class
            this.classList.add('active');
            
            // Scroll to center the active category
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });
});

//testimonial slider
  // Create particles for background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 40px
        const size = Math.random() * 35 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize the particles when the page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Add hover effect to project links
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'rotate(-45deg) scale(1.2)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'rotate(0) scale(1)';
    });
});

// Add scroll animation to testimonials
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    function animateOnScroll() {
        testimonialCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Trigger on load in case elements are in view
    animateOnScroll();
});

//Animation 
 // Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
 
// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
 
// Scroll animation for elements
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}
 
// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-count');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const isPlus = counter.querySelector('i.fas.fa-plus') !== null;
        const numberSpan = counter.querySelector('.stat-number');
        const plusIcon = counter.querySelector('i.fas.fa-plus');

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (numberSpan) numberSpan.textContent = Math.ceil(current);
                if (plusIcon) plusIcon.style.display = 'inline-block';
                setTimeout(updateCounter, 16);
            } else {
                if (numberSpan) numberSpan.textContent = target;
                if (plusIcon) plusIcon.style.display = 'inline-block';
            }
        };

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: updateCounter,
            once: true
        });
    });
}
 
// Service category hover effect
function initServiceHover() {
    const categories = document.querySelectorAll('.category');
    const bgImg = document.getElementById('bg-img');
    
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const imgUrl = category.getAttribute('data-img');
            bgImg.style.backgroundImage = `url(${imgUrl})`;
            bgImg.style.opacity = '0.3';
            
            // Show content on hover
            const content = category.querySelector('.category-content');
            content.style.display = 'block';
        });
        
        category.addEventListener('mouseleave', () => {
            bgImg.style.opacity = '0.3';
            
            // Hide content on leave
            const content = category.querySelector('.category-content');
            content.style.display = 'none';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    animateCounters();
    initServiceHover();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Footer newsletter subscribe logic (moved from inline script in Home.html)
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('newsletter-btn');
    const emailInput = document.getElementById('newsletter-email');
    const thankyou = document.getElementById('newsletter-thankyou');
    if (btn && emailInput && thankyou) {
        btn.addEventListener('click', function() {
            if(emailInput.value && /\S+@\S+\.\S+/.test(emailInput.value)) {
                thankyou.style.display = 'block';
                setTimeout(() => { thankyou.style.display = 'none'; }, 3000);
                emailInput.value = '';
            } else {
                emailInput.focus();
                emailInput.style.borderColor = '#e74c3c';
                setTimeout(() => { emailInput.style.borderColor = ''; }, 1500);
            }
        });
    }
});

