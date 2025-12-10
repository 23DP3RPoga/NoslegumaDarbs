
let toggle = false;

function darkModeToggle() {
    document.body.classList.toggle("dark-mode");
    toggle = !toggle;
    
    const toggleBtn = document.getElementById("dark-mode-toggle");
    toggleBtn.textContent = toggle ? "☼" : "⏾";



}
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
    

    const hamburger = document.getElementById('hamburger');
    const navButtons = document.getElementById('nav-buttons');
    
    if (hamburger && navButtons) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navButtons.contains(e.target)) {
                hamburger.classList.remove('active');
                navButtons.classList.remove('active');
            }
        });
    }
    
    
    const form = document.getElementById('contactForm');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successBox = document.getElementById('success-box');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            
            clearAllErrors();
            successBox.classList.remove('show');
            
            let isValid = true;
            
           
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'name-error', 'Name is required!');
                isValid = false;
            }
            
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'email-error', 'Email is required!');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, 'email-error', 'Please enter a valid email address!');
                isValid = false;
            }
            
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'message-error', 'Message is required!');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'message-error', 'Message must contain at least 10 characters long!');
                isValid = false;
            }
            
           
            if (isValid) {
                form.style.display = 'none';
                successBox.classList.add('show');
                
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successBox.classList.remove('show');
                }, 3000);
            }
        });
        
        function showError(input, errorId, message) {
            input.classList.add('error');
            const errorElement = document.getElementById(errorId);
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        function clearAllErrors() {
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            messageInput.classList.remove('error');
            
            document.querySelectorAll('.error-message').forEach(el => {
                el.classList.remove('show');
                el.textContent = '';
            });
        }
        
        
        nameInput.addEventListener('input', () => nameInput.classList.remove('error'));
        emailInput.addEventListener('input', () => emailInput.classList.remove('error'));
        messageInput.addEventListener('input', () => messageInput.classList.remove('error'));
    }
});
