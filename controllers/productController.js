const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;          
cloudinary.config({ 
  cloud_name: 'ds0d5t7iy', 
  api_key: '799238868729833', 
  api_secret: 'EOpVU2T645loiVXwTj96O1E9J6Y' 
});



// Create a new product
const createProduct = async (req, res) => {
  try {
    const { product_cate_id, product_name, product_price } = req.body;
    console.log("hello req ---------", req.files);
    const file = req.files.product_img;

    cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
      if (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Error uploading image' });
      }
      console.log(result);
      
      
      const newProduct =  Product.create({
        product_cate_id,
        product_name,
        product_price,
        product_img: result.url,
      });
      console.log("--------------------------------------------------",result.url)
      console.log(newProduct)
      // Send success response
      res.json(newProduct);
      // res.json(result);
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};


// Get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};
const getProductByCategoryId = async (req, res) => {
  const categoryId = req.params.id; // Assuming the category ID is passed as a parameter in the request
  console.log(categoryId);
  try {
    let products; // Use 'let' instead of 'const'

    if (categoryId) {
      products = await Product.findAll({ where: { product_cate_id: categoryId } });
    } else {
      products = await Product.findAll();
    }

    // console.log(products);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified category ID' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// module.exports = getProductByCategoryId;

// Get a specific product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { product_cate_id, product_name, product_price, product_img } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.product_cate_id = product_cate_id;
    product.product_name = product_name;
    product.product_price = product_price;
    product.product_img = product_img;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Soft delete a product (set 'deleted_at' and 'is_deleted' fields)
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.deleted_at = new Date();
    product.is_deleted = true;
    await product.save();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByCategoryId,
  updateProduct,
  deleteProduct,
};
