const apiUrl = 'https://psychologist-finder-backend-production.up.railway.app'; // URL вашего бэкенда

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
            // Save token to localStorage
            localStorage.setItem('token', result.token);

            // Display user info
            document.getElementById('userName').textContent = result.name;
            document.getElementById('userEmail').textContent = result.email;

            // Toggle views
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
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('profilePage').style.display = 'none';
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