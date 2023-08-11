const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

const productController = require('../controllers/productController');
// Routes for products
// router.post('/', upload.single('product_img'), productController.createProduct);
router.post('/',productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/product_cate_id/:id', productController.getProductByCategoryId);

router.put('/:id',upload.single('product_img'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
