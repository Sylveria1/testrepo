const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/admin';
}

const fetchBrands = async () => {
    try {
        const response = await fetch('/admin/brands', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const brands = await response.json();
        const brandList = document.getElementById('brand-list');
        brandList.innerHTML = '';

        brands.forEach(brand => {
            const brandItem = document.createElement('div');
            brandItem.innerHTML = `
                <h3>${brand.name}</h3>
                <button onclick="deleteBrand(${brand.id})">Delete</button>
            `;
            brandList.appendChild(brandItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const deleteBrand = async (id) => {
    try {
        await fetch(`/admin/brands/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        fetchBrands();
    } catch (error) {
        console.error('Error:', error);
    }
};

document.getElementById('brand-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;

    try {
        await fetch('/admin/brands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name }),
        });

        fetchBrands();
    } catch (error) {
        console.error('Error:', error);
    }
});

fetchBrands();
