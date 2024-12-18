const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/fileUpload'); // Import updated multer config

// Route for adding a new product
router.post('/addProduct/:id', upload.array('images', 5), productController.addProducts);

// Route for updating an existing product by ID
// router.post('/addProduct/:id', upload.array('images', 5), productController.updateProduct);

// Route for fetching products
router.get('/getProducts', productController.getProducts);

module.exports = router;
