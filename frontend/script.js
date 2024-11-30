const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const userInfo = document.getElementById('userInfo');
const registerError = document.getElementById('registerError');
const loginError = document.getElementById('loginError');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

// Handle registration
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registerError.textContent = '';

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Failed to register');
    }

    alert('Регистрация успешна!');
    registerForm.reset();
  } catch (err) {
    registerError.textContent = err.message;
  }
});

// Handle login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Ошибка при входе в учетную запись');
    }

    const data = await response.json();
    userName.textContent = data.name;
    userEmail.textContent = data.email;
    userInfo.style.display = 'block';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
  } catch (err) {
    loginError.textContent = err.message;
  }

   // Logout button
   logoutButton.addEventListener('click', () => {
    userInfo.style.display = 'none';
    loginForm.style.display = 'block';
    registerForm.style.display = 'block';
    loginForm.reset();
    registerForm.reset();
  });
});
