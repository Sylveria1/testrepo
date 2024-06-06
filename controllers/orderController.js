const Order = require('../models/Order');
const User = require('../models/User');
const CartItem = require('../models/CartItem');

// Helper function to update membership status
const updateMembershipStatus = async (userId) => {
  const user = await User.findByPk(userId);
  const totalItemsPurchased = await Order.sum('quantity', {
    where: { user_id: userId },
    include: [{ model: CartItem, attributes: [] }],
  });

  let newStatus = 'Bronze';
  if (totalItemsPurchased >= 30) {
    newStatus = 'Gold';
  } else if (totalItemsPurchased >= 15) {
    newStatus = 'Silver';
  }

  if (user.membership_status !== newStatus) {
    await user.update({ membership_status: newStatus });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    await updateMembershipStatus(req.body.user_id); // Update membership status after creating an order
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders for logged-in user/admin
exports.getAllOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await Order.findAll();
    } else {
      orders = await Order.findAll({ where: { user_id: req.user.id } });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update order status by ID
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update({ status: req.body.status });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order by ID (soft delete)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update({ isdeleted: true });
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
