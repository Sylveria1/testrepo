const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/admin';
}

const fetchCategories = async () => {
    try {
        const response = await fetch('/admin/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const categories = await response.json();
        const categoryList = document.getElementById('category-list');
        categoryList.innerHTML = '';

        categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.innerHTML = `
                <h3>${category.name}</h3>
                <button onclick="deleteCategory(${category.id})">Delete</button>
            `;
            categoryList.appendChild(categoryItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const deleteCategory = async (id) => {
    try {
        await fetch(`/admin/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        fetchCategories();
    } catch (error) {
        console.error('Error:', error);
    }
};

document.getElementById('category-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;

    try {
        await fetch('/admin/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name }),
        });

        fetchCategories();
    } catch (error) {
        console.error('Error:', error);
    }
});

fetchCategories();
