const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const paginatedController = require('../controllers/paginatedController');

router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
// router.get('/products', productController.listProducts);
router.get('/products', paginatedController.getPaginatedData);

module.exports = router;
