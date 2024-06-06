const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateJWT, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, isAdmin, productController.createProduct);
router.get('/', authenticateJWT, productController.getAllProducts);
router.get('/:id', authenticateJWT, productController.getProductById);
router.put('/:id', authenticateJWT, isAdmin, productController.updateProduct);
router.delete('/:id', authenticateJWT, isAdmin, productController.deleteProduct);

module.exports = router;
