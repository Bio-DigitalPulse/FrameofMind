const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#name-login');
  const password = document.querySelector('#password-login')

  if (name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login',
      {
      method: 'POST',
        body: JSON.stringify
          ({
        username: name.value,
        password: password.value,
      }),
        headers:
        {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to login.');
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

