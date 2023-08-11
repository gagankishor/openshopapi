const productCategory = require("../models/ProductCategory");

const createProductCategory = async (req, res) => {
  try {
    const { product_name, product_cate_img } = req.body;
    const newProductCategory = await productCategory.create({
      product_cate_name,
      product_cate_img,
    });
    res.json(newProductCategory);
  } catch (error) {
    console.error('Error creating product category:', error);
    res.status(500).json({ error: 'Error creating product category' });
  }
};

// Get all product categories
const getAllProductCategories = async (req, res) => {
  try {
    const allProductCategories = await productCategory.findAll();
    res.json(allProductCategories);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    res.status(500).json({ error: 'Error fetching product categories' });
  }
};

// Get a specific product category by ID
const getProductCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await productCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching product category:', error);
    res.status(500).json({ error: 'Error fetching product category' });
  }
};

// Update a product category
const updateProductCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { product_name, product_cate_img } = req.body;
  try {
    const category = await productCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    category.product_name = product_name;
    category.product_cate_img = product_cate_img;
    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating product category:', error);
    res.status(500).json({ error: 'Error updating product category' });
  }
};

// Soft delete a product category (set 'deleted_at' and 'is_deleted' fields)
const deleteProductCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await productCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    category.deleted_at = new Date();
    category.is_deleted = true;
    await category.save();
    res.json({ message: 'Product category deleted successfully' });
  } catch (error) {
    console.error('Error deleting product category:', error);
    res.status(500).json({ error: 'Error deleting product category' });
  }
};

module.exports = {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};
