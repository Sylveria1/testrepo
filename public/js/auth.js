document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        try {
          console.log('Submitting login form...');
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
  
          const data = await response.json();
          console.log('Response received:', data);
  
          if (response.ok) {
            console.log('Login successful, storing token...');
            localStorage.setItem('token', data.token); // Storing the token
            console.log('Token stored, redirecting to /admin/products...');
            window.location.href = '/admin/products'; // Redirect to the products page after successful login
          } else {
            console.log('Login failed:', data.message);
            alert(data.message); // Show an error message if login failed
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    } else {
      console.log('Login form not found'); // Add this line for debugging
    }
  });
  