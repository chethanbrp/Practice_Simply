// ============================================
// INITIALIZATION
// ============================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    
    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .cert-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor?.classList.add('cursor-hover');
        cursorFollower?.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor?.classList.remove('cursor-hover');
        cursorFollower?.classList.remove('cursor-hover');
    });
});

// ============================================
// NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ============================================
// THEME TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Save preference
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light-theme');
    } else {
        localStorage.removeItem('theme');
    }
    
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// TERMINAL TYPING ANIMATION
// ============================================

const commands = [
    'aws ec2 describe-instances',
    'kubectl get pods',
    'terraform apply',
    'docker ps -a',
    'git push origin main',
    'helm upgrade --install',
    'ansible-playbook deploy.yml'
];

let commandIndex = 0;

if (document.getElementById('typedText')) {
    const typed = new Typed('#typedText', {
        strings: commands,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false,
        onStringTyped: () => {
            displayTerminalOutput(commands[commandIndex]);
            commandIndex = (commandIndex + 1) % commands.length;
        }
    });
}

function displayTerminalOutput(command) {
    const output = document.getElementById('terminalOutput');
    const responses = {
        'aws ec2 describe-instances': '✓ Fetching EC2 instances... Found 12 running instances',
        'kubectl get pods': '✓ NAME STATUS RESTARTS\napp-pod-1 Running 0\napp-pod-2 Running 0',
        'terraform apply': '✓ Plan: 3 to add, 0 to change, 0 to destroy\nApply complete!',
        'docker ps -a': '✓ CONTAINER ID IMAGE STATUS\n3f2a4b1c nginx Up 2 hours',
        'git push origin main': '✓ Counting objects: 5, done.\nTo github.com:user/repo.git',
        'helm upgrade --install': '✓ Release "myapp" has been upgraded. Happy Helming!',
        'ansible-playbook deploy.yml': '✓ PLAY RECAP ****************\nok=5 changed=3 unreachable=0'
    };
    
    if (output) {
        output.innerHTML = `<div class="output-line">${responses[command] || ''}</div>`;
    }
}

// ============================================
// SKILLS PROGRESS BARS
// ============================================

const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;
    
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
    
    skillsAnimated = true;
};

// Trigger animation when skills section is in view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ============================================
// EXPERIENCE TABS
// ============================================

const tabButtons = document.querySelectorAll('.tab-button');
const tabIndicator = document.querySelector('.tab-indicator');
const companyPanels = document.querySelectorAll('.company-panel');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        companyPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        const companyId = button.getAttribute('data-company');
        document.getElementById(companyId)?.classList.add('active');
        
        // Move indicator
        if (window.innerWidth > 1024) {
            tabIndicator.style.transform = `translateY(${index * 42}px)`;
        } else {
            tabIndicator.style.transform = `translateX(${index * 100}px)`;
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card, .project-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// FORM HANDLING (If you add a contact form later)
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would send the form data to your backend
    console.log('Form data:', data);
    
    // Show success message
    alert('Message sent successfully! I\'ll get back to you soon.');
    contactForm.reset();
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-color);
        color: var(--bg-primary);
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', scrollToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

createScrollTopButton();

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #8892b0; font-size: 14px;');