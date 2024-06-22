const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Perform custom validation logic
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (  !Number(email).length===11 || !emailIsValid(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // If validation passes, submit the form
    form.submit();
});

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}