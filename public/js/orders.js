const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/admin';
}

const fetchOrders = async () => {
    try {
        const response = await fetch('/admin/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const orders = await response.json();
        const orderList = document.getElementById('order-list');
        orderList.innerHTML = '';

        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.innerHTML = `
                <h3>Order ID: ${order.id}</h3>
                <p>Status: ${order.status}</p>
                <button onclick="updateOrderStatus(${order.id}, 'Completed')">Mark as Completed</button>
            `;
            orderList.appendChild(orderItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateOrderStatus = async (id, status) => {
    try {
        await fetch(`/admin/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status }),
        });

        fetchOrders();
    } catch (error) {
        console.error('Error:', error);
    }
};

fetchOrders();
