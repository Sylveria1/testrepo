const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateJWT, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, orderController.createOrder);
router.get('/', authenticateJWT, orderController.getAllOrders);
router.get('/:id', authenticateJWT, orderController.getOrderById);
router.put('/:id', authenticateJWT, isAdmin, orderController.updateOrderStatus);

module.exports = router;
