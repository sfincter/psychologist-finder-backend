const apiUrl = 'https://psychologist-finder-backend-production.up.railway.app'; // URL вашего бэкенда


document.addEventListener('DOMContentLoaded', () => {
// Switch between forms
document.getElementById('toLogin').addEventListener('click', () => {
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
});

document.getElementById('toRegister').addEventListener('click', () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
});

// Registration form handler
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registration successful! Please log in.');
            document.getElementById('registerPage').style.display = 'none';
            document.getElementById('loginPage').style.display = 'block';
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('Error connecting to server.');
    }
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('token', result.token);
            document.getElementById('userName').textContent = result.name;
            document.getElementById('userEmail').textContent = result.email;

            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('profilePage').style.display = 'block';
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('Error connecting to server.');
    }
});

// Logout handler
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    document.getElementById('profilePage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
});

// Auto-login if token exists
const token = localStorage.getItem('token');
if (token) {
    fetch(`${apiUrl}/profile`, {
        headers: { 'Authorization': token },
    })
        .then(response => response.json())
        .then(user => {
            if (user.name && user.email) {
                document.getElementById('userName').textContent = user.name;
                document.getElementById('userEmail').textContent = user.email;

                document.getElementById('loginPage').style.display = 'none';
                document.getElementById('profilePage').style.display = 'block';
            }
        })
        .catch(() => {
            localStorage.removeItem('token');
        });
}
});