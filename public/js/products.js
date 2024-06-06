document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Confirm token retrieval
  
    if (!token) {
      alert('No token found. Please log in.');
      window.location.href = '/admin';
      return;
    }
  
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  
    console.log('Headers before fetch:', headers); // Confirm headers before fetch
  
    fetch('/admin/products', {
      method: 'GET',
      headers: headers
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched products:', data); // Confirm fetched data
      // Logic to display products on the page
    })
    .catch(error => {
      console.error('Error fetching products:', error); // Confirm errors if any
      alert('Failed to fetch products');
    });
  });
  