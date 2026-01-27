const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    }
}

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = 'home';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    updateActiveNavLink();
});

window.addEventListener('load', () => {
    updateActiveNavLink();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            }

            setTimeout(() => {
                updateActiveNavLink();
            }, 100);
        }
    });
});



const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showFormStatus('Please fill out all fields.', 'danger');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email address.', 'danger');
        return;
    }

    showFormStatus('Sending message...', 'info');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    try {
        const response = await emailjs.send(
            'service_qoqhp4d',
            'template_jag566i',
            templateParams
        );

        console.log('SUCCESS!', response.status, response.text);
        showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = '';
        }, 5000);

    } catch (error) {
        console.log('FAILED...', error);
        showFormStatus('Failed to send message. Please try again or contact me directly.', 'danger');

        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = '';
        }, 5000);
    } finally {
        submitButton.disabled = false;
    }
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = '';

    if (type === 'success') {
        formStatus.classList.add('alert', 'alert-success');
    } else if (type === 'danger') {
        formStatus.classList.add('alert', 'alert-danger');
    } else if (type === 'info') {
        formStatus.classList.add('alert', 'alert-info');
    }
}

const typingText = document.querySelector('.hero-subtitle');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }

    setTimeout(typeWriter, 500);
}



const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const animateCounters = () => {
    const heroSection = document.getElementById('home');
    const sectionTop = heroSection.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > sectionTop && !counterAnimated) {
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPlus = target.includes('+');
            const isPercent = target.includes('%');
            const numericValue = parseInt(target.replace(/\D/g, ''));

            let count = 0;
            const increment = numericValue / 50;

            const updateCounter = () => {
                if (count < numericValue) {
                    count += increment;
                    counter.textContent = Math.ceil(count) + (isPlus ? '+' : '') + (isPercent ? '%' : '');
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
        counterAnimated = true;
    }
};

window.addEventListener('scroll', animateCounters);

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
`;
document.head.appendChild(backToTopStyle);

console.log('Portfolio loaded successfully! 🚀');