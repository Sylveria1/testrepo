const express = require('express');
const router = express.Router();
const { authenticateJWT, isAdmin } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');
const orderController = require('../controllers/orderController');

// Admin login page
router.get('/', (req, res) => {
  res.render('admin/index');
});

// Protect the following routes with authentication and admin check
router.use(authenticateJWT);
router.use(isAdmin);

// Product routes
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Category routes
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Brand routes
router.get('/brands', brandController.getAllBrands);
router.post('/brands', brandController.createBrand);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

// Order routes
router.get('/orders', orderController.getAllOrders);
router.put('/orders/:id', orderController.updateOrderStatus);

module.exports = router;
