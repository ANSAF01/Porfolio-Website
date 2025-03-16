const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('form-status');

const validateForm = () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.classList.remove('text-success'); // Reset classes
        formStatus.classList.add('text-danger');
        return false;
    }

    // Basic email validation (you can add more robust validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.classList.remove('text-success'); // Reset classes
        formStatus.classList.add('text-danger');
        return false;
    }

    return { name, email, message };
};

const sendEmail = (templateParams) => {
    formStatus.textContent = 'Sending...'; // Loading state
    formStatus.classList.remove('text-danger', 'text-success'); // Reset classes
    formStatus.classList.add('text-info'); // Use text-info for loading indication

    emailjs.send('service_qoqhp4d', 'template_jag566i', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            formStatus.textContent = 'Message sent successfully!';
            formStatus.classList.remove('text-info', 'text-danger'); // Remove loading and error classes
            formStatus.classList.add('text-success');
            form.reset();
            setTimeout(() => { // Clear after 3 seconds
                formStatus.textContent = '';
            }, 3000);
        }, (err) => {
            console.log('FAILED...', err);
            formStatus.textContent = 'Failed to send message. Please try again.';
            formStatus.classList.remove('text-info', 'text-success'); // Remove loading and success classes
            formStatus.classList.add('text-danger');
            setTimeout(() => { // Clear after 3 seconds
                formStatus.textContent = '';
            }, 3000);
        });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const templateParams = validateForm();
    if (templateParams) {
        sendEmail(templateParams);
    }
});