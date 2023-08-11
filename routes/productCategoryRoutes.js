const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const ProductCategoryController = require('../controllers/ProductCategoryController');

const router = express.Router();

router.post('/', upload.single('product_cate_img'), ProductCategoryController.createProductCategory);
router.get('/', ProductCategoryController.getAllProductCategories);
router.get('/:id', ProductCategoryController.getProductCategoryById);
router.put('/:id', upload.single('product_cate_img'), ProductCategoryController.updateProductCategory);
router.delete('/:id', ProductCategoryController.deleteProductCategory);

module.exports = router;
