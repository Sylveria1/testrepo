const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, cartItemController.createCartItem);
router.get('/', authenticateJWT, cartItemController.getAllCartItems);
router.get('/:id', authenticateJWT, cartItemController.getCartItemById);
router.put('/:id', authenticateJWT, cartItemController.updateCartItem);
router.delete('/:id', authenticateJWT, cartItemController.deleteCartItem);

module.exports = router;
