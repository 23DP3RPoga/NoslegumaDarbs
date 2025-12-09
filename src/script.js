let toggle = false;

// Dark mode toggle with icon change
function darkModeToggle() {
    document.body.classList.toggle("dark-mode");
    toggle = !toggle;
    
    const toggleBtn = document.getElementById("dark-mode-toggle");
    toggleBtn.textContent = toggle ? "☼" : "⏾";
}

// Modal functions
function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}

function openModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== CARD ANIMATIONS ON SCROLL =====
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => observer.observe(card));
    
    // ===== HAMBURGER MENU TOGGLE =====
    const hamburger = document.getElementById('hamburger');
    const navButtons = document.getElementById('nav-buttons');
    
    if (hamburger && navButtons) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navButtons.contains(e.target)) {
                hamburger.classList.remove('active');
                navButtons.classList.remove('active');
            }
        });
        
        // Close menu when clicking a nav link
        const navLinks = navButtons.querySelectorAll('button:not(#dark-mode-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navButtons.classList.remove('active');
            });
        });
    }
});