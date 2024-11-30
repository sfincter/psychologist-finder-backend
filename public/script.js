const apiUrl = 'https://psychologist-finder-backend-production.up.railway.app'; // URL бэкенда

async function registerUser(event) {
    event.preventDefault();
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('User registered successfully!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error connecting to the server');
    }
}

document.getElementById('registerForm').addEventListener('submit', registerUser);
