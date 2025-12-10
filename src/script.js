// dark mode stuff
let isDark = false;

function darkModeToggle() {
    document.body.classList.toggle("dark-mode");
    isDark = !isDark;
    document.getElementById("dark-mode-toggle").textContent = isDark ? "☼" : "";
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


const API_KEY = "62a97f89be974c038e4e93e05498c127"; 
const searchInput = document.getElementById("newsSearch");
const searchBtn = document.getElementById("searchNewsBtn");
const results = document.getElementById("news-results");
const errorMsg = document.getElementById("news-error");
const historyList = document.getElementById("history-list");


function loadHistory() {
    let history = JSON.parse(localStorage.getItem("newsHistory")) || [];
    historyList.innerHTML = "";

    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        li.onclick = () => fetchNews(item);
        historyList.appendChild(li);
    });
}

function saveToHistory(query) {
    let history = JSON.parse(localStorage.getItem("newsHistory")) || [];

    // remove duplicates
    history = history.filter(item => item !== query);

    history.unshift(query);

    if (history.length > 5) history.pop(); 

    localStorage.setItem("newsHistory", JSON.stringify(history));
    loadHistory();
}


async function fetchNews(query) {
    if (!query) return;

    results.innerHTML = "";
    errorMsg.style.display = "none";

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            errorMsg.style.display = "block";
            return;
        }

        saveToHistory(query);

        data.articles.slice(0, 10).forEach(article => {
            const card = document.createElement("div");
            card.classList.add("news-card");

            card.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;

            results.appendChild(card);
        });

    } catch (err) {
        errorMsg.style.display = "block";
    }
}

// ===== EVENT LISTENERS =====
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    fetchNews(query);
});

searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        fetchNews(searchInput.value.trim());
    }
});


loadHistory();
