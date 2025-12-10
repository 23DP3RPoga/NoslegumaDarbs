// dark mode stuff
let isDark = false;

function darkModeToggle() {
    document.body.classList.toggle("dark-mode");
    isDark = !isDark;
    document.getElementById("dark-mode-toggle").textContent = isDark ? "☼" : "⏾";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function openModal() {
    document.getElementById("modal").style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    
    // cards fade in when you scroll to them
    let cards = document.querySelectorAll('.card');
    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } 
        });
    }, {
        threshold: 0.2
    });
    
    for(let i = 0; i < cards.length; i++) {
        observer.observe(cards[i]);
    }
    
    // hamburger menu
    let hamburger = document.getElementById('hamburger');
    let navButtons = document.getElementById('nav-buttons');
    
    if(hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
    }
    
  
   
   const searchInput = document.getElementById('searchInput');
    const kartinas = document.querySelectorAll('.card');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();

            kartinas.forEach(card => {
                const title = card.querySelector('h2')?.textContent.toLowerCase() || "";
                const description = card.querySelector('p')?.textContent.toLowerCase() || "";

                const isVisible =
                    title.includes(searchTerm) ||
                    description.includes(searchTerm);

                card.style.display = isVisible ? 'block' : 'none';

                // animations
                if (isVisible) {
                    card.classList.add('fade-in');
                    card.classList.remove('fade-out');
                } else {
                    card.classList.add('fade-out');
                    card.classList.remove('fade-in');
                }
            });
        });
    }

    
    // form validation - basic stuff
    let form = document.getElementById('contactForm');
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let messageInput = document.getElementById('message');
    let successBox = document.getElementById('success-box');
    
    if(form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            // hide old errors
            let errors = document.querySelectorAll('.error-message');
            for(let i = 0; i < errors.length; i++) {
                errors[i].style.display = 'none';
            }
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            messageInput.classList.remove('error');
            successBox.classList.remove('show');
            
            let hasError = false;
            
            // check name
            if(nameInput.value == '' || nameInput.value.length < 2) {
                nameInput.classList.add('error');
                document.getElementById('name-error').textContent = 'Please enter your name';
                document.getElementById('name-error').style.display = 'block';
                hasError = true;
            }
            
            // check email - just look for @ sign
            if(emailInput.value == '' || emailInput.value.indexOf('@') == -1) {
                emailInput.classList.add('error');
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                document.getElementById('email-error').style.display = 'block';
                hasError = true;
            }
            
            // check message
            if(messageInput.value == '' || messageInput.value.length < 10) {
                messageInput.classList.add('error');
                document.getElementById('message-error').textContent = 'Message should be at least 10 characters';
                document.getElementById('message-error').style.display = 'block';
                hasError = true;
            }
            
            // show success if everything is ok
            if(!hasError) {
                form.style.display = 'none';
                successBox.classList.add('show');
                
                // reset after 3 seconds
                setTimeout(function() {
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    form.style.display = 'block';
                    successBox.classList.remove('show');
                }, 3000);
            }
        };
        
        // remove error styling when user starts typing
        nameInput.oninput = function() {
            nameInput.classList.remove('error');
        };
        emailInput.oninput = function() {
            emailInput.classList.remove('error');
        };
        messageInput.oninput = function() {
            messageInput.classList.remove('error');
        };
    }
});