// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initTheme();
    initNavigation();
    initScrollAnimations();
    initNavbarEffects();
    initSkillHovers();
});

// === EFEITO MÁQUINA DE ESCREVER ===
function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter-text');
    const cursor = document.querySelector('.cursor');
    
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            cursor.style.display = 'none';
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// === TEMA LIGHT/DARK CORRIGIDO ===
function initTheme() {
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Verificar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
    
    function setTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark');
            sunIcon.style.opacity = '0.4';
            moonIcon.style.opacity = '1';
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0.4';
            localStorage.setItem('theme', 'light');
        }
    }
    
    function toggleTheme() {
        const currentTheme = html.classList.contains('dark') ? 'light' : 'dark';
        setTheme(currentTheme);
    }
    
    // Detectar mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// === NAVEGAÇÃO SUAVE ===
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.section, .project-card, .skill-item, .about-main p, .education-item, .contact-item');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        if (index % 3 === 0) el.classList.add('delay-1');
        else if (index % 3 === 1) el.classList.add('delay-2');
        else el.classList.add('delay-3');
        observer.observe(el);
    });
}

// === NAVBAR EFFECTS ===
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = document.documentElement.classList.contains('dark') 
                ? 'rgba(10, 10, 15, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(40px)';
        } else {
            navbar.style.background = document.documentElement.classList.contains('dark') 
                ? 'rgba(10, 10, 15, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(25px)';
        }
    });
}

// === SKILL HOVERS ===
function initSkillHovers() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.3) rotateY(360deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
}