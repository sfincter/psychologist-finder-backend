const API_URL = "https://psychologist-finder-backend-production.up.railway.app";

document.getElementById('registerBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registration successful');
        } else {
            alert(result.error || 'Registration failed');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred.');
    }
});

document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('token', result.token);
            alert('Login successful');
        } else {
            alert(result.error || 'Login failed');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred.');
    }
});

document.getElementById('profileBtn').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();
        if (response.ok) {
            alert(`Name: ${result.name}, Email: ${result.email}`);
        } else {
            alert(result.error || 'Failed to fetch profile');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred.');
    }
});
